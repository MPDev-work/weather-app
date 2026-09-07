import * as THREE from 'three';

export function createCloudsScene(isNight = false) {
  const group = new THREE.Group();

  const cloudColor = isNight ? 0x4a5568 : 0xffffff;
  const cloudMat = new THREE.MeshStandardMaterial({
    color: cloudColor,
    roughness: 0.9,
    metalness: 0.05,
    transparent: true,
    opacity: 0.88,
  });

  const cloudGeometries = [];
  const cloudPuffs = [];

  function buildCloud(cx, cy, cz, scale = 1) {
    const cloudGroup = new THREE.Group();
    cloudGroup.position.set(cx, cy, cz);
    cloudGroup.scale.set(scale, scale, scale);

    const puffConfigs = [
      { x: 0, y: 0, z: 0, r: 1.2 },
      { x: 0.9, y: -0.2, z: 0.1, r: 0.9 },
      { x: -0.9, y: -0.2, z: -0.1, r: 0.9 },
      { x: 0.4, y: 0.4, z: 0.2, r: 0.8 },
      { x: -0.5, y: 0.3, z: -0.2, r: 0.85 },
      { x: 1.5, y: -0.35, z: 0, r: 0.65 },
      { x: -1.5, y: -0.35, z: 0, r: 0.65 },
    ];

    puffConfigs.forEach((cfg) => {
      const geo = new THREE.SphereGeometry(cfg.r, 20, 20);
      cloudGeometries.push(geo);
      const mesh = new THREE.Mesh(geo, cloudMat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      cloudGroup.add(mesh);
    });

    group.add(cloudGroup);
    cloudPuffs.push(cloudGroup);
  }

  buildCloud(0, 0, 0, 1.05);
  buildCloud(-1.7, -0.2, -0.6, 0.82);
  buildCloud(1.6, 0.1, -0.7, 0.78);
  group.scale.set(0.95, 0.95, 0.95);

  const light = new THREE.DirectionalLight(isNight ? 0x93b7ff : 0xfffaed, 2.2);
  light.position.set(3, 5, 4);
  group.add(light);

  const ambient = new THREE.AmbientLight(isNight ? 0x18233c : 0xbfdbfe, 1.5);
  group.add(ambient);

  return {
    group,
    update: (_delta, time) => {
      cloudPuffs.forEach((puff, idx) => {
        puff.position.y += Math.sin(time * 1.2 + idx * 2) * 0.003;
        puff.rotation.z = Math.cos(time * 0.8 + idx) * 0.02;
      });
    },
    dispose: () => {
      cloudGeometries.forEach((g) => g.dispose());
      cloudMat.dispose();
    },
  };
}
