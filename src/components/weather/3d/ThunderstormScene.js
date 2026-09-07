import * as THREE from 'three';

export function createThunderstormScene() {
  const group = new THREE.Group();

  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0x1f232d,
    roughness: 0.95,
    metalness: 0.2,
    transparent: true,
    opacity: 0.9,
  });

  const cloudGeometries = [];
  const cloudGroup = new THREE.Group();
  cloudGroup.position.set(0, 2.2, 0);

  const cloudPuffs = [
    { x: 0, y: 0, z: 0, r: 1.2 },
    { x: 1.1, y: -0.1, z: 0.3, r: 0.95 },
    { x: -1.1, y: -0.1, z: -0.2, r: 0.95 },
    { x: 0.5, y: 0.35, z: 0.15, r: 0.8 },
    { x: -0.6, y: 0.25, z: -0.2, r: 0.85 },
  ];

  cloudPuffs.forEach((cfg) => {
    const geo = new THREE.SphereGeometry(cfg.r, 16, 16);
    cloudGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, cloudMat);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    cloudGroup.add(mesh);
  });
  group.add(cloudGroup);

  const dropCount = 360;
  const rainGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(dropCount * 6);
  const velocities = new Float32Array(dropCount);

  for (let i = 0; i < dropCount; i++) {
    const x = (Math.random() - 0.5) * 8;
    const y = -3 + Math.random() * 6;
    const z = (Math.random() - 0.5) * 4;
    const len = 0.4 + Math.random() * 0.3;

    positions[i * 6] = x;
    positions[i * 6 + 1] = y;
    positions[i * 6 + 2] = z;

    positions[i * 6 + 3] = x - 0.12;
    positions[i * 6 + 4] = y - len;
    positions[i * 6 + 5] = z;

    velocities[i] = 16 + Math.random() * 8;
  }

  rainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const rainMat = new THREE.LineBasicMaterial({
    color: 0x82b1ff,
    transparent: true,
    opacity: 0.7,
  });
  const rainLines = new THREE.LineSegments(rainGeo, rainMat);
  group.add(rainLines);

  const lightningLight = new THREE.PointLight(0xb4d5fe, 0, 30);
  lightningLight.position.set(0, 1.8, 1);
  group.add(lightningLight);

  const ambLight = new THREE.AmbientLight(0x111625, 1.2);
  group.add(ambLight);

  let nextFlashTime = 1.5 + Math.random() * 2.5;
  let flashDuration = 0;

  return {
    group,
    update: (delta, time) => {
      const posAttr = rainGeo.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < dropCount; i++) {
        const fall = velocities[i] * delta;
        arr[i * 6 + 1] -= fall;
        arr[i * 6 + 4] -= fall;
        arr[i * 6] -= fall * 0.2;
        arr[i * 6 + 3] -= fall * 0.2;

        if (arr[i * 6 + 1] < -3.5) {
          const resetX = (Math.random() - 0.5) * 8;
          const resetY = 2.5 + Math.random() * 1.5;
          const resetZ = (Math.random() - 0.5) * 4;
          const len = 0.4 + Math.random() * 0.3;

          arr[i * 6] = resetX;
          arr[i * 6 + 1] = resetY;
          arr[i * 6 + 2] = resetZ;

          arr[i * 6 + 3] = resetX - 0.12;
          arr[i * 6 + 4] = resetY - len;
          arr[i * 6 + 5] = resetZ;
        }
      }
      posAttr.needsUpdate = true;

      if (time > nextFlashTime) {
        flashDuration = 0.12 + Math.random() * 0.15;
        nextFlashTime = time + 2.5 + Math.random() * 4;
      }

      if (flashDuration > 0) {
        flashDuration -= delta;
        lightningLight.intensity = Math.random() > 0.3 ? 7 : 0;
        ambLight.intensity = 2.5;
      } else {
        lightningLight.intensity = 0;
        ambLight.intensity = 1.2;
      }
    },
    dispose: () => {
      cloudGeometries.forEach((g) => g.dispose());
      cloudMat.dispose();
      rainGeo.dispose();
      rainMat.dispose();
    },
  };
}
