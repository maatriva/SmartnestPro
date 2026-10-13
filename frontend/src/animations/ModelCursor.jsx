import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";

const MODEL_PATH = "/3Dmodel.glb?v=2.2";

const ModelCursor = ({ targetSize = 3.7 }) => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const initialWidth = container.clientWidth || 360;
    const initialHeight = container.clientHeight || 360;

    const scene = new THREE.Scene();

    // Natural 48° FOV (mimics standard ~50mm portrait lens for product design)
    const camera = new THREE.PerspectiveCamera(
      48,
      initialWidth / initialHeight,
      0.1,
      1000
    );

    // Initial 3/4 isometric beauty perspective (shows front trunk, interior cradle bed, and side silhouette)
    camera.position.set(2.4, 1.35, 3.1);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(initialWidth, initialHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch (error) {
      console.error("Error creating WebGL context:", error);
      setLoading(false);
      return;
    }

    // 💡 Environment Map for realistic PBR reflections on Stainless Steel, Boucle & Glass Screen
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // 💡 Studio Key, Fill & Contouring Lights
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcbe8ea, 1.6);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7b8ff8, 1.0);
    dirLight2.position.set(-5, 4, -4);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.7);
    dirLight3.position.set(0, -2, 4);
    scene.add(dirLight3);

    // OrbitControls for smooth drag-to-inspect interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.enableZoom = false; // Prevent scroll hijack on landing page
    controls.enablePan = false; // Keep model centered
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.3;
    controls.target.set(0, 0, 0);
    controls.maxPolarAngle = Math.PI / 2 + 0.15; // Prevent viewing from underneath

    let model = null;
    let animationId = null;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_PATH,
      (gltf) => {
        // Auto-center the model around its geometric bounding box center
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;

        // Enhance mesh materials
        gltf.scene.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.side = THREE.FrontSide;
          }
        });

        const pivot = new THREE.Group();
        pivot.add(gltf.scene);

        // Scale to comfortably fit viewport
        const maxDim = Math.max(size.x, size.y, size.z);
        pivot.scale.setScalar(targetSize / maxDim);

        scene.add(pivot);
        model = pivot;
        setLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadProgress(percent);
        }
      },
      (error) => {
        console.error("Model load error:", error);
        setLoading(false);
      }
    );

    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(container);

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return;

      if (model) {
        // Gentle breathing float animation
        model.position.y = Math.sin(Date.now() * 0.0012) * 0.08;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // ResizeObserver ensures exact canvas dimensions on all screen sizes & layout changes
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
      container.removeEventListener("pointerdown", onPointerDown);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      cancelAnimationFrame(animationId);
      controls.dispose();
      pmremGenerator.dispose();
      if (envTexture) envTexture.dispose();
      renderer.dispose();
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [targetSize]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
        aria-label="Interactive 3D model of Maatriva Smart Cradle"
      />

      {/* Loading Indicator */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl transition-opacity duration-300 z-20">
          <div className="w-10 h-10 border-3 border-(--primary)/20 border-t-(--primary) rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold text-(--primary) tracking-wide">
            Loading 3D Model{loadProgress > 0 ? ` (${loadProgress}%)` : "..."}
          </p>
        </div>
      )}

      {/* Interactive Helper Badge */}
      {!loading && !hasInteracted && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 pointer-events-none px-3.5 py-1 rounded-full bg-white/70 backdrop-blur-md border border-(--primary)/20 shadow-sm text-[11px] font-medium text-(--primary) flex items-center gap-1.5 opacity-80 animate-bounce">
          <span>✦</span>
          <span>Drag to rotate in 3D</span>
        </div>
      )}
    </div>
  );
};

export default ModelCursor;
