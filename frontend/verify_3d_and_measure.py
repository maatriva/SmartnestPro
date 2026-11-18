import asyncio
import base64
import json
import math
import os
import shutil
import subprocess
import tempfile
import time
import urllib.request
import websockets
from http.server import SimpleHTTPRequestHandler
import socketserver
import threading

PORT = 4173
DIST_DIR = os.path.abspath("frontend/dist")
ARTIFACT_DIR = r"C:\Users\arman\.gemini\antigravity\brain\ed74bc02-c728-4316-aea0-3a80673d5bf8"

METRICS_CURVES = {
    "FCP": {"weight": 0.10, "p10": 1800, "median": 3000},
    "SI":  {"weight": 0.10, "p10": 3387, "median": 5800},
    "LCP": {"weight": 0.25, "p10": 2500, "median": 4000},
    "TBT": {"weight": 0.30, "p10": 200,  "median": 600},
    "CLS": {"weight": 0.25, "p10": 0.10, "median": 0.25},
}

def calculate_log_normal_score(value, p10, median):
    if value <= 0:
        return 1.0
    mu = math.log(median)
    sigma = abs(math.log(p10) - mu) / 1.281551565545
    z = (math.log(value) - mu) / (sigma * math.sqrt(2))
    cdf = 0.5 * (1.0 + math.erf(z))
    return max(0.0, min(1.0, 1.0 - cdf))

class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)
    def log_message(self, format, *args):
        pass

def start_server():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("127.0.0.1", PORT), QuietHandler) as httpd:
            httpd.serve_forever()
    except Exception:
        pass

async def main():
    threading.Thread(target=start_server, daemon=True).start()
    time.sleep(0.5)

    temp_dir = tempfile.mkdtemp()
    chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
    chrome_cmd = [
        chrome_path,
        "--headless=new",
        "--remote-debugging-port=9222",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={temp_dir}",
        "about:blank"
    ]
    chrome_proc = subprocess.Popen(chrome_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    ws_url = None
    for _ in range(25):
        try:
            with urllib.request.urlopen("http://127.0.0.1:9222/json", timeout=1) as resp:
                data = json.loads(resp.read().decode())
                if data and len(data) > 0:
                    ws_url = data[0].get("webSocketDebuggerUrl")
                    if ws_url:
                        break
        except Exception:
            await asyncio.sleep(0.2)

    if not ws_url:
        print("Failed to connect to Chrome")
        chrome_proc.terminate()
        return

    print("Connected to Chrome via CDP:", ws_url)

    try:
        async with websockets.connect(ws_url, max_size=20_000_000) as ws:
            msg_id = 1
            pending_responses = {}

            async def cdp_listener():
                try:
                    while True:
                        raw = await ws.recv()
                        msg = json.loads(raw)
                        if "id" in msg:
                            pending_responses[msg["id"]] = msg.get("result", {})
                except Exception:
                    pass

            listener_task = asyncio.create_task(cdp_listener())

            async def call_cdp(method, params=None, timeout=10):
                nonlocal msg_id
                curr_id = msg_id
                msg_id += 1
                payload = {"id": curr_id, "method": method, "params": params or {}}
                await ws.send(json.dumps(payload))
                t0 = time.time()
                while curr_id not in pending_responses:
                    if time.time() - t0 > timeout:
                        return {}
                    await asyncio.sleep(0.04)
                return pending_responses.pop(curr_id)

            await call_cdp("Page.enable")
            await call_cdp("Runtime.enable")

            # 1. Desktop Verification & Screenshot (1280x800)
            print("\n1. Navigating in Desktop Mode (1280x800)...")
            await call_cdp("Emulation.setDeviceMetricsOverride", {
                "width": 1280,
                "height": 800,
                "deviceScaleFactor": 1.0,
                "mobile": False
            })
            await call_cdp("Page.navigate", {"url": f"http://127.0.0.1:{PORT}/"})
            print("Waiting for 3D model to load and render...")
            await asyncio.sleep(3.5)

            shot = await call_cdp("Page.captureScreenshot", {"format": "png"})
            if shot and "data" in shot:
                png_bytes = base64.b64decode(shot["data"])
                desktop_path = os.path.join(ARTIFACT_DIR, "desktop-hero-3d.png")
                with open(desktop_path, "wb") as f:
                    f.write(png_bytes)
                print(f"Saved Desktop Hero screenshot: {desktop_path} ({len(png_bytes)} bytes)")

            # 2. Mobile Verification & Screenshot (412x823)
            print("\n2. Navigating in Mobile Mode (412x823)...")
            await call_cdp("Emulation.setDeviceMetricsOverride", {
                "width": 412,
                "height": 823,
                "deviceScaleFactor": 2.625,
                "mobile": True
            })
            await call_cdp("Emulation.setUserAgentOverride", {
                "userAgent": "Mozilla/5.0 (Linux; Android 11; moto g power (2022)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
            })
            await call_cdp("Page.navigate", {"url": f"http://127.0.0.1:{PORT}/"})
            print("Waiting for 3D model on mobile...")
            await asyncio.sleep(3.5)

            shot_mob = await call_cdp("Page.captureScreenshot", {"format": "png"})
            if shot_mob and "data" in shot_mob:
                png_mob_bytes = base64.b64decode(shot_mob["data"])
                mobile_path = os.path.join(ARTIFACT_DIR, "mobile-hero-3d.png")
                with open(mobile_path, "wb") as f:
                    f.write(png_mob_bytes)
                print(f"Saved Mobile Hero screenshot: {mobile_path} ({len(png_mob_bytes)} bytes)")

            # 3. Lighthouse Mobile Performance Audit (4x CPU Slowdown + 4G Throttling)
            print("\n3. Measuring Mobile Performance under 4x CPU slowdown & 4G...")
            injected_js = """
            window.__metrics = { fcp: 0, lcp: 0, cls: 0, lcpElement: '', longTasks: [] };
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                    if (e.name === 'first-contentful-paint') window.__metrics.fcp = e.startTime;
                }
            }).observe({ type: 'paint', buffered: true });

            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                if (entries.length) {
                    const e = entries[entries.length - 1];
                    window.__metrics.lcp = e.startTime;
                    window.__metrics.lcpElement = e.element ? (e.element.tagName + '.' + e.element.className) : (e.id || 'img');
                }
            }).observe({ type: 'largest-contentful-paint', buffered: true });

            let cls = 0;
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                    if (!e.hadRecentInput) { cls += e.value; window.__metrics.cls = cls; }
                }
            }).observe({ type: 'layout-shift', buffered: true });

            try {
                new PerformanceObserver((list) => {
                    for (const e of list.getEntries()) {
                        window.__metrics.longTasks.push({ startTime: e.startTime, duration: e.duration });
                    }
                }).observe({ type: 'longtask', buffered: true });
            } catch(e) {}
            """
            await call_cdp("Page.addScriptToEvaluateOnNewDocument", {"source": injected_js})
            await call_cdp("Emulation.setCPUThrottlingRate", {"rate": 4})
            await call_cdp("Network.emulateNetworkConditions", {
                "offline": False,
                "latency": 150,
                "downloadThroughput": int(1.6 * 1024 * 1024 / 8),
                "uploadThroughput": int(750 * 1024 / 8)
            })

            await call_cdp("Page.navigate", {"url": f"http://127.0.0.1:{PORT}/"})
            await asyncio.sleep(4.5)

            eval_res = await call_cdp("Runtime.evaluate", {
                "expression": "JSON.stringify(window.__metrics)",
                "returnByValue": True
            })
            raw_metrics = json.loads(eval_res.get("value", "{}") or "{}")

            fcp = raw_metrics.get("fcp", 0)
            lcp = raw_metrics.get("lcp", 0)
            cls = raw_metrics.get("cls", 0)
            long_tasks = raw_metrics.get("longTasks", [])

            tbt = 0
            for task in long_tasks:
                duration = task.get("duration", 0)
                st = task.get("startTime", 0)
                if st >= fcp and duration > 50:
                    tbt += (duration - 50)

            speed_index = max(fcp, (fcp + lcp) / 2) if (fcp > 0 and lcp > 0) else fcp

            fcp_score = calculate_log_normal_score(fcp, METRICS_CURVES["FCP"]["p10"], METRICS_CURVES["FCP"]["median"])
            si_score = calculate_log_normal_score(speed_index, METRICS_CURVES["SI"]["p10"], METRICS_CURVES["SI"]["median"])
            lcp_score = calculate_log_normal_score(lcp, METRICS_CURVES["LCP"]["p10"], METRICS_CURVES["LCP"]["median"])
            tbt_score = calculate_log_normal_score(tbt, METRICS_CURVES["TBT"]["p10"], METRICS_CURVES["TBT"]["median"])
            cls_score = calculate_log_normal_score(cls, METRICS_CURVES["CLS"]["p10"], METRICS_CURVES["CLS"]["median"])

            total_perf_score = int(round((
                fcp_score * METRICS_CURVES["FCP"]["weight"] +
                si_score  * METRICS_CURVES["SI"]["weight"] +
                lcp_score * METRICS_CURVES["LCP"]["weight"] +
                tbt_score * METRICS_CURVES["TBT"]["weight"] +
                cls_score * METRICS_CURVES["CLS"]["weight"]
            ) * 100))

            print("\n" + "="*55)
            print("  AUDIT WITH LIVE 3D MODEL ACTIVE (4x CPU, 4G)")
            print("="*55)
            print(f"Overall Performance Score: {total_perf_score} / 100")
            print(f"- First Contentful Paint (FCP): {fcp:.1f} ms (Score: {int(fcp_score*100)})")
            print(f"- Largest Contentful Paint (LCP): {lcp:.1f} ms (Score: {int(lcp_score*100)})")
            print(f"- LCP Element: {raw_metrics.get('lcpElement', 'N/A')}")
            print(f"- Total Blocking Time (TBT): {tbt:.1f} ms (Score: {int(tbt_score*100)})")
            print(f"- Cumulative Layout Shift (CLS): {cls:.3f} (Score: {int(cls_score*100)})")
            print(f"- Speed Index (SI): {speed_index:.1f} ms (Score: {int(si_score*100)})")
            print("="*55 + "\n")

            listener_task.cancel()
    finally:
        chrome_proc.terminate()
        shutil.rmtree(temp_dir, ignore_errors=True)

if __name__ == "__main__":
    asyncio.run(main())
