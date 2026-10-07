import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ModelCursor = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.1;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mountRef.current.appendChild(renderer.domElement);
    } catch (error) {
      console.error("Error creating WebGL context:", error);
      // Clean up and exit early if WebGL is unsupported
      return;
    }

    // 💡 Studio Lighting Setup
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xcbe8ea, 1.8);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x7b8ff8, 1.2);
    dirLight2.position.set(-5, 4, -4);
    scene.add(dirLight2);

    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight3.position.set(0, -3, 4);
    scene.add(dirLight3);

    camera.position.set(0, 0.7, 3.8);

    // ✅ OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.enableZoom = false;
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 1.8;
    controls.target.set(0, 0, 0);

    let model;
    let animationId;

    const loader = new GLTFLoader();
    loader.load(
      "/3Dmodel.glb",
      (gltf) => {
        // Auto-center the model around its geometric bounding box center
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x = -center.x;
        gltf.scene.position.y = -center.y;
        gltf.scene.position.z = -center.z;

        const pivot = new THREE.Group();
        pivot.add(gltf.scene);

        // Scale to comfortably fit viewport
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 2.8;
        pivot.scale.setScalar(targetSize / maxDim);

        scene.add(pivot);
        model = pivot;
      },
      undefined,
      (error) => {
        console.error("Model load error:", error);
      }
    );

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (mountRef.current) {
      observer.observe(mountRef.current);
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip rendering if not visible

      if (model) {
        model.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
      controls.dispose();
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
};

export default ModelCursor;
