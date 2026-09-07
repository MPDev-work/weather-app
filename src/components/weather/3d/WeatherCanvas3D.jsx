import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createCloudsScene } from './CloudsScene';
import { createFogScene } from './FogScene';
import { createMoonScene } from './MoonScene';
import { createRainScene } from './RainScene';
import { createSnowScene } from './SnowScene';
import { createSunScene } from './SunScene';
import { createThunderstormScene } from './ThunderstormScene';

export function WeatherCanvas3D({ scene = 'sun', reducedMotion = false }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);

    const threeScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6.8;

    let currentSceneInstance = null;

    function loadScene(type) {
      if (currentSceneInstance) {
        threeScene.remove(currentSceneInstance.group);
        currentSceneInstance.dispose();
        currentSceneInstance = null;
      }

      switch (type) {
        case 'moon':
          currentSceneInstance = createMoonScene();
          break;
        case 'clouds':
          currentSceneInstance = createCloudsScene(false);
          break;
        case 'clouds-night':
          currentSceneInstance = createCloudsScene(true);
          break;
        case 'rain':
          currentSceneInstance = createRainScene();
          break;
        case 'thunderstorm':
          currentSceneInstance = createThunderstormScene();
          break;
        case 'snow':
          currentSceneInstance = createSnowScene();
          break;
        case 'fog':
          currentSceneInstance = createFogScene();
          break;
        case 'sun':
        default:
          currentSceneInstance = createSunScene();
          break;
      }

      if (currentSceneInstance) {
        threeScene.add(currentSceneInstance.group);
      }
    }

    loadScene(scene);

    const clock = new THREE.Clock();
    let animationFrameId = null;
    let isPaused = false;

    function animate() {
      if (!isPaused) {
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        if (currentSceneInstance && !reducedMotion) {
          currentSceneInstance.update(delta, time);
        }

        renderer.render(threeScene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    function handleVisibilityChange() {
      isPaused = document.hidden;
    }
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        const height = entry.contentRect.height;
        if (width > 0 && height > 0) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height);
        }
      }
    });
    resizeObserver.observe(container);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (currentSceneInstance) {
        threeScene.remove(currentSceneInstance.group);
        currentSceneInstance.dispose();
      }
      renderer.dispose();
    };
  }, [scene, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
