import * as THREE from 'three';

export function createMoonScene() {
  const group = new THREE.Group();

  const moonGeo = new THREE.SphereGeometry(2.1, 32, 32);
  const moonMat = new THREE.MeshStandardMaterial({
    color: 0xebf2fa,
    roughness: 0.8,
    metalness: 0.1,
  });
  const moonMesh = new THREE.Mesh(moonGeo, moonMat);
  group.add(moonMesh);

  const craterMat = new THREE.MeshStandardMaterial({
    color: 0xc4d1e0,
    roughness: 0.95,
  });
  const craterGeo = new THREE.SphereGeometry(0.35, 16, 16);

  const craterOffsets = [
    { x: -0.6, y: 0.5, z: 1.8, s: 1 },
    { x: 0.7, y: -0.4, z: 1.75, s: 1.3 },
    { x: 0.2, y: 0.7, z: 1.85, s: 0.8 },
    { x: -0.9, y: -0.8, z: 1.5, s: 1.1 },
  ];

  craterOffsets.forEach((c) => {
    const mesh = new THREE.Mesh(craterGeo, craterMat);
    mesh.position.set(c.x, c.y, c.z);
    mesh.scale.set(c.s, c.s, 0.2);
    mesh.lookAt(0, 0, 0);
    group.add(mesh);
  });

  const glowGeo = new THREE.SphereGeometry(2.6, 32, 32);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x8ab4f8,
    transparent: true,
    opacity: 0.2,
    side: THREE.BackSide,
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  group.add(glowMesh);

  const starCount = 120;
  const starGeo = new THREE.BufferGeometry();
  const starPos = new Float32Array(starCount * 3);

  for (let i = 0; i < starCount; i++) {
    starPos[i * 3] = (Math.random() - 0.5) * 20;
    starPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    starPos[i * 3 + 2] = -3 - Math.random() * 8;
  }

  starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.85,
  });
  const stars = new THREE.Points(starGeo, starMat);
  group.add(stars);

  const moonLight = new THREE.DirectionalLight(0xdce6f7, 2);
  moonLight.position.set(4, 3, 5);
  group.add(moonLight);

  const ambientLight = new THREE.AmbientLight(0x1a264a, 1.2);
  group.add(ambientLight);

  return {
    group,
    update: (_delta, time) => {
      moonMesh.rotation.y = time * 0.05;
      glowMesh.scale.setScalar(1 + Math.sin(time * 1.5) * 0.04);
      stars.rotation.z = time * 0.01;
    },
    dispose: () => {
      moonGeo.dispose();
      moonMat.dispose();
      craterGeo.dispose();
      craterMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      starGeo.dispose();
      starMat.dispose();
    },
  };
}
