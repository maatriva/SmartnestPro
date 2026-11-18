import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

const MODEL_PATH = "/3Dmodel-opt.glb?v=5.0";

const sanitizeColor = (color, fallback = "#D9825F") => {
  if (!color || typeof color !== "string") return fallback;
  const trimmed = color.trim();
  if (trimmed.startsWith("#") && trimmed.length === 9) {
    return trimmed.slice(0, 7);
  }
  return trimmed;
};

// Generate soft circular contact shadow texture
const createContactShadowTexture = () => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(128, 128, 10, 128, 128, 110);
  gradient.addColorStop(0, "rgba(58, 43, 43, 0.45)");
  gradient.addColorStop(0.4, "rgba(217, 130, 95, 0.18)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};

const ModelCursor = ({
  targetSize = 3.6,
  modelColor = "#F7F2EB", // Warm Pearl Bisque Ivory body
  frameColor = "#D9825F", // Terracotta Rose clay frame
  mattressColor = "#F7EFE6", // Warm Organic Cotton Bisque (Harmonious Ivory)
  rodColor = "#ECC880", // Champagne Honey Gold supporting rods
  metalColor = "#ECC880", // Honey gold hinges, pins & hardware
  tuskColor = "#FFFBF5", // Soft Ivory White tusks & accents
  eyeColor = "#2C1E21", // Deep Cocoa button eyes
  detailColor = "#20161C", // Cocoa OLED screen & details
  onLoaded,
}) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect low-end hardware / battery saver
    const hwConcurrency = navigator.hardwareConcurrency || 4;
    const isMobile = window.innerWidth < 768;
    const isWeakDevice = hwConcurrency <= 2 || (isMobile && hwConcurrency <= 4);
    setIsLowPower(isWeakDevice);

    const container = mountRef.current;
    const initialWidth = container.clientWidth || 360;
    const initialHeight = container.clientHeight || 360;

    const scene = new THREE.Scene();

    // Natural 46° FOV for product clay sculpture display
    const camera = new THREE.PerspectiveCamera(
      46,
      initialWidth / initialHeight,
      0.1,
      100
    );
    camera.position.set(2.2, 1.25, 2.9);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isWeakDevice,
        alpha: true,
        powerPreference: "high-performance",
        precision: isWeakDevice ? "mediump" : "highp",
      });
      renderer.setSize(initialWidth, initialHeight);
      // Cap devicePixelRatio at 1.5 to guarantee 60fps on retina / mobile devices
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isWeakDevice ? 1.0 : 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.08;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch (error) {
      console.error("WebGL initialization error:", error);
      setLoading(false);
      return;
    }

    // 💡 Environment Map for subtle ambient clay sheen
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // 💡 CELESTIAL CLAY STUDIO LIGHTING:
    // 1. Warm sunlight key light (top-right front)
    const keyLight = new THREE.DirectionalLight(0xfff5eb, 1.35);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    // 2. Soft rose clay fill light (#F2B8A8) for warm, natural clay shadow tones
    const roseFillLight = new THREE.DirectionalLight(0xf2b8a8, 0.85);
    roseFillLight.position.set(-5, 3, -2);
    scene.add(roseFillLight);

    // 3. Soft cream rim light (#FFF6EE) to create a gentle clay glowing rim
    const rimLight = new THREE.DirectionalLight(0xfff8f2, 1.1);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // 4. Subtle ambient hemisphere light (Dawn sky + Terracotta earth bounce)
    const hemiLight = new THREE.HemisphereLight(0xfff8f2, 0xd9825f, 0.6);
    scene.add(hemiLight);

    // 🌑 Soft Contact Shadow Plane underneath
    const shadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const shadowTex = createContactShadowTexture();
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.15;
    scene.add(shadowMesh);

    // OrbitControls for manual drag inspection
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.rotateSpeed = 0.75;
    controls.enableZoom = false; // Prevent page scroll hijack
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.9; // Smooth slow showcase spin
    controls.target.set(0, -0.05, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.1;
    controls.minPolarAngle = Math.PI / 5;

    let model = null;
    let animationId = null;

    // Colors
    const sModelColor = sanitizeColor(modelColor, "#D9825F");
    const sFrameColor = sanitizeColor(frameColor, "#F2B8A8");
    const sMattressColor = sanitizeColor(mattressColor, "#F7EFE6");
    const sRodColor = sanitizeColor(rodColor, sFrameColor);
    const sMetalColor = sanitizeColor(metalColor, "#F0C675");
    const sTuskColor = sanitizeColor(tuskColor, "#F0C675");
    const sEyeColor = sanitizeColor(eyeColor, "#3A2B2B");
    const sDetailColor = sanitizeColor(detailColor, "#3A2B2B");

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("/draco/gltf/");
    dracoLoader.preload();

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      MODEL_PATH,
      (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;

        // Apply Matte, Tactile Clay Materials
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            let meshMats = child.material;
            if (!meshMats) {
              meshMats = new THREE.MeshStandardMaterial();
              child.material = meshMats;
            }

            const materials = Array.isArray(meshMats) ? meshMats : [meshMats];

            const updatedMaterials = materials.map((origMat) => {
              const mat = origMat ? origMat.clone() : new THREE.MeshStandardMaterial();
              const meshName = (child.name || "").toLowerCase();
              const matName = (mat.name || "").toLowerCase();

              if (meshName.includes("eye") || matName.includes("eye")) {
                // Button eye: cocoa onyx
                mat.color.set(sEyeColor);
                mat.roughness = 0.2;
                mat.metalness = 0.08;
              } else if (meshName.includes("tusk") || meshName.includes("nail") || matName.includes("ivory")) {
                // Tusks: Honey gold ceramic clay
                mat.color.set(sTuskColor);
                mat.roughness = 0.45;
                mat.metalness = 0.12;
              } else if (meshName.startsWith("rod_") || meshName.includes("rod")) {
                // Supporting rods: Rose clay matte
                mat.color.set(sRodColor);
                mat.roughness = 0.65;
                mat.metalness = 0.08;
              } else if (
                meshName.includes("hinge") ||
                meshName.includes("pin") ||
                matName.includes("pin") ||
                meshName === "tail_2"
              ) {
                // Hardware pins: Honey gold accent
                mat.color.set(sMetalColor);
                mat.roughness = 0.4;
                mat.metalness = 0.2;
              } else if (meshName.includes("mattress") || matName.includes("mattress")) {
                // Mattress: Soft sage calming clay
                mat.color.set(sMattressColor);
                mat.roughness = 0.88;
                mat.metalness = 0.0;
              } else if (
                meshName.includes("bassinet") ||
                meshName.includes("frame") ||
                meshName === "screen_carrier" ||
                meshName === "tail_3" ||
                matName.includes("warmwhite")
              ) {
                // Frame: Rose clay
                mat.color.set(sFrameColor);
                mat.roughness = 0.72;
                mat.metalness = 0.05;
              } else if (meshName.includes("display") || meshName.includes("screen")) {
                // Screen: Cocoa OLED
                mat.color.set(sDetailColor);
                mat.roughness = 0.15;
                mat.metalness = 0.15;
              } else {
                // Main Elephant Body: Terracotta matte clay
                mat.color.set(sModelColor);
                mat.roughness = 0.82; // Matte clay texture
                mat.metalness = 0.03;
              }

              mat.side = THREE.DoubleSide;
              mat.needsUpdate = true;
              return mat;
            });

            child.material = Array.isArray(meshMats) ? updatedMaterials : updatedMaterials[0];
          }
        });

        const pivot = new THREE.Group();
        pivot.add(gltf.scene);

        const maxDim = Math.max(size.x, size.y, size.z);
        pivot.scale.setScalar(targetSize / maxDim);

        scene.add(pivot);
        model = pivot;
        setLoading(false);
        if (typeof onLoaded === "function") {
          onLoaded();
        }
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
        console.warn("Draco model load attempt failed, falling back to standard GLB...", error);
        const standardLoader = new GLTFLoader();
        standardLoader.load(
          "/3Dmodel.glb",
          (fallbackGltf) => {
            const box = new THREE.Box3().setFromObject(fallbackGltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());
            fallbackGltf.scene.position.x = -center.x;
            fallbackGltf.scene.position.y = -center.y;
            fallbackGltf.scene.position.z = -center.z;
            const pivot = new THREE.Group();
            pivot.add(fallbackGltf.scene);
            const maxDim = Math.max(size.x, size.y, size.z);
            pivot.scale.setScalar(targetSize / maxDim);
            scene.add(pivot);
            model = pivot;
            setLoading(false);
            if (typeof onLoaded === "function") onLoaded();
          },
          undefined,
          (err2) => {
            console.error("All 3D model loaders failed:", err2);
            setLoading(false);
          }
        );
      }
    );

    // Mouse tilt with smooth lerp damping
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotationY = x * 0.35;
      targetRotationX = y * 0.25;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // IntersectionObserver & Visibility API to pause rendering when off-screen or tab hidden
    let isVisible = true;
    let isTabVisible = !document.hidden;

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Scroll-linked rotation easing
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 60FPS RAF Render Loop (Only transforms, lerp, and paused when not visible)
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible || !isTabVisible) return;

      const time = Date.now() * 0.0015;

      if (model) {
        // Smooth idle bobbing float
        model.position.y = Math.sin(time) * 0.06;

        // Smooth mouse tilt lerp
        currentRotationX += (targetRotationX - currentRotationX) * 0.06;
        currentRotationY += (targetRotationY - currentRotationY) * 0.06;

        // Scroll easing tilt into next section
        const scrollFactor = Math.min(scrollY / 800, 1);
        model.rotation.x = currentRotationX + scrollFactor * 0.18;
        model.rotation.z = -currentRotationY * 0.5;

        // Eased scale into next section
        const baseScale = targetSize / 3.6;
        const targetScale = baseScale * (1 - scrollFactor * 0.08);
        model.scale.setScalar(targetScale);
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          renderer.setSize(width, height);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        }
      }
    });
    resizeObserver.observe(container);

    const onPointerDown = () => setHasInteracted(true);
    container.addEventListener("pointerdown", onPointerDown);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      container.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationId);
      controls.dispose();
      dracoLoader.dispose();
      pmremGenerator.dispose();
      if (envTexture) envTexture.dispose();
      shadowTex.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [targetSize, modelColor, frameColor, mattressColor, rodColor, tuskColor, metalColor, eyeColor, detailColor]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none relative z-10"
        aria-label="Interactive 3D model of Maatriva Smart Cradle in Celestial Clay"
      />

      {/* Subtle Loading Badge */}
      {loading && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full clay-badge text-[11px] font-bold text-(--primary) flex items-center gap-2 pointer-events-none z-20">
          <div className="w-3 h-3 border-2 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin" />
          <span>Setting up 3D view{loadProgress > 0 ? ` (${loadProgress}%)` : "..."}</span>
        </div>
      )}

      {/* Interactive Helper Badge */}
      {!loading && !hasInteracted && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full clay-badge text-[11px] font-bold text-(--primary) flex items-center gap-1.5 opacity-90 shadow-sm z-20">
          <span className="w-2 h-2 rounded-full bg-(--accent) animate-ping" />
          <span>Drag to inspect 3D cradle</span>
        </div>
      )}
    </div>
  );
};

export default ModelCursor;
