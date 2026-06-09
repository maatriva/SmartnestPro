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
      });
      renderer.setSize(width, height);
      mountRef.current.appendChild(renderer.domElement);
    } catch (error) {
      console.error("Error creating WebGL context:", error);
      // Clean up and exit early if WebGL is unsupported
      return;
    }

    // 💡 Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    scene.add(light);

    // ✅ OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.8;
    controls.enableZoom = false;
    controls.autoRotate = true; 
    controls.autoRotateSpeed = 2.0;

    let model;
    let animationId;

    const loader = new GLTFLoader();
    loader.load(
      "/3Dmodel.glb",
      (gltf) => {
        model = gltf.scene;
        model.scale.set(3.2, 3.2, 3.2);
        scene.add(model);
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
