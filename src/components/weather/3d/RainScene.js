import * as THREE from 'three';

export function createRainScene() {
  const group = new THREE.Group();

  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0x3b4252,
    roughness: 0.95,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85,
  });

  const cloudGeometries = [];
  const cloudGroup = new THREE.Group();
  cloudGroup.position.set(0, 2.2, 0);

  const cloudPuffs = [
    { x: 0, y: 0, z: 0, r: 1.1 },
    { x: 1, y: -0.1, z: 0.2, r: 0.9 },
    { x: -1, y: -0.1, z: -0.2, r: 0.9 },
    { x: 0.5, y: 0.3, z: 0.1, r: 0.75 },
    { x: -0.5, y: 0.2, z: -0.1, r: 0.8 },
  ];

  cloudPuffs.forEach((cfg) => {
    const geo = new THREE.SphereGeometry(cfg.r, 16, 16);
    cloudGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, cloudMat);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    cloudGroup.add(mesh);
  });
  group.add(cloudGroup);

  const dropCount = 280;
  const rainGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(dropCount * 6);
  const velocities = new Float32Array(dropCount);

  for (let i = 0; i < dropCount; i++) {
    const x = (Math.random() - 0.5) * 8;
    const y = -3 + Math.random() * 6;
    const z = (Math.random() - 0.5) * 4;
    const len = 0.35 + Math.random() * 0.25;

    positions[i * 6] = x;
    positions[i * 6 + 1] = y;
    positions[i * 6 + 2] = z;

    positions[i * 6 + 3] = x - 0.08;
    positions[i * 6 + 4] = y - len;
    positions[i * 6 + 5] = z;

    velocities[i] = 12 + Math.random() * 8;
  }

  rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const rainMat = new THREE.LineBasicMaterial({
    color: 0x7eb6ff,
    transparent: true,
    opacity: 0.65,
  });
  const rainLines = new THREE.LineSegments(rainGeo, rainMat);
  group.add(rainLines);

  const dirLight = new THREE.DirectionalLight(0x8fa8d6, 1.6);
  dirLight.position.set(2, 4, 3);
  group.add(dirLight);

  const ambLight = new THREE.AmbientLight(0x2d3748, 1.2);
  group.add(ambLight);

  return {
    group,
    update: (delta) => {
      const posAttr = rainGeo.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < dropCount; i++) {
        const fall = velocities[i] * delta;
        arr[i * 6 + 1] -= fall;
        arr[i * 6 + 4] -= fall;
        arr[i * 6] -= fall * 0.15;
        arr[i * 6 + 3] -= fall * 0.15;

        if (arr[i * 6 + 1] < -3.5) {
          const resetX = (Math.random() - 0.5) * 8;
          const resetY = 2.5 + Math.random() * 1.5;
          const resetZ = (Math.random() - 0.5) * 4;
          const len = 0.35 + Math.random() * 0.25;

          arr[i * 6] = resetX;
          arr[i * 6 + 1] = resetY;
          arr[i * 6 + 2] = resetZ;

          arr[i * 6 + 3] = resetX - 0.08;
          arr[i * 6 + 4] = resetY - len;
          arr[i * 6 + 5] = resetZ;
        }
      }
      posAttr.needsUpdate = true;
    },
    dispose: () => {
      cloudGeometries.forEach((g) => g.dispose());
      cloudMat.dispose();
      rainGeo.dispose();
      rainMat.dispose();
    },
  };
}
