import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ModelCursor = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);

    mountRef.current.appendChild(renderer.domElement);

    // 💡 Light
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 2);
    scene.add(light);

    let model;

    const loader = new GLTFLoader();
    loader.load(
      "../../../dist/public/model.glb",
      (gltf) => {
        model = gltf.scene;

        // 🔥 Bigger model
        model.scale.set(2.8, 2.8, 2.8);

        scene.add(model);
      },
      undefined,
      (error) => {
        console.error("Model load error:", error);
      }
    );

    let mouseX = 0;
    let mouseY = 0;

    // ✅ Mouse inside div only
    const handleMouseMove = (event) => {
      const rect = mountRef.current.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    mountRef.current.addEventListener("mousemove", handleMouseMove);
    mountRef.current.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      requestAnimationFrame(animate);

      if (model) {
        // 🎯 Smooth rotation
        model.rotation.y += (mouseX * 1.5 - model.rotation.y) * 0.05;
        model.rotation.x += (mouseY * 1.0 - model.rotation.x) * 0.05;

        // 🔥 Limit tilt
        model.rotation.x = Math.max(-0.5, Math.min(0.5, model.rotation.x));

        // 🌊 Floating effect
        model.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    // ✅ Responsive resize
    const handleResize = () => {
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // 🧹 Cleanup
    return () => {
      mountRef.current.removeEventListener("mousemove", handleMouseMove);
      mountRef.current.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-full h-[400px] flex items-center justify-center"
    />
  );
};

export default ModelCursor;