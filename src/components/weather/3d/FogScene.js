import * as THREE from 'three';

export function createFogScene() {
  const group = new THREE.Group();

  const particleCount = 140;
  const fogGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const drift = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    drift[i] = 0.2 + Math.random() * 0.4;
  }

  fogGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const fogMat = new THREE.PointsMaterial({
    color: 0xcfd8dc,
    size: 0.8,
    transparent: true,
    opacity: 0.4,
    blending: THREE.NormalBlending,
  });
  const fogPoints = new THREE.Points(fogGeo, fogMat);
  group.add(fogPoints);

  const ambLight = new THREE.AmbientLight(0x90a4ae, 2);
  group.add(ambLight);

  return {
    group,
    update: (delta, time) => {
      const posAttr = fogGeo.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        arr[i * 3] += Math.sin(time * 0.5 + i) * 0.003;
        arr[i * 3 + 1] += Math.cos(time * 0.4 + i) * 0.002;
      }
      posAttr.needsUpdate = true;
    },
    dispose: () => {
      fogGeo.dispose();
      fogMat.dispose();
    },
  };
}
