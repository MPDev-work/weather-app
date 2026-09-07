import * as THREE from 'three';

export function createSnowScene() {
  const group = new THREE.Group();

  const cloudMat = new THREE.MeshStandardMaterial({
    color: 0xd9e2ec,
    roughness: 0.9,
    metalness: 0.05,
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
  ];

  cloudPuffs.forEach((cfg) => {
    const geo = new THREE.SphereGeometry(cfg.r, 16, 16);
    cloudGeometries.push(geo);
    const mesh = new THREE.Mesh(geo, cloudMat);
    mesh.position.set(cfg.x, cfg.y, cfg.z);
    cloudGroup.add(mesh);
  });
  group.add(cloudGroup);

  const flakeCount = 200;
  const flakeGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(flakeCount * 3);
  const speeds = new Float32Array(flakeCount);
  const offsets = new Float32Array(flakeCount);

  for (let i = 0; i < flakeCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = -3 + Math.random() * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    speeds[i] = 1.2 + Math.random() * 1.5;
    offsets[i] = Math.random() * Math.PI * 2;
  }

  flakeGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const flakeMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.14,
    transparent: true,
    opacity: 0.9,
  });
  const flakePoints = new THREE.Points(flakeGeo, flakeMat);
  group.add(flakePoints);

  const dirLight = new THREE.DirectionalLight(0xe2e8f0, 2);
  dirLight.position.set(2, 4, 3);
  group.add(dirLight);

  const ambLight = new THREE.AmbientLight(0xb0c4de, 1.4);
  group.add(ambLight);

  return {
    group,
    update: (delta, time) => {
      const posAttr = flakeGeo.attributes.position;
      const arr = posAttr.array;

      for (let i = 0; i < flakeCount; i++) {
        arr[i * 3 + 1] -= speeds[i] * delta;
        arr[i * 3] += Math.sin(time * 2 + offsets[i]) * 0.008;

        if (arr[i * 3 + 1] < -3.5) {
          arr[i * 3] = (Math.random() - 0.5) * 8;
          arr[i * 3 + 1] = 2.8 + Math.random() * 0.5;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 4;
        }
      }
      posAttr.needsUpdate = true;
    },
    dispose: () => {
      cloudGeometries.forEach((g) => g.dispose());
      cloudMat.dispose();
      flakeGeo.dispose();
      flakeMat.dispose();
    },
  };
}
