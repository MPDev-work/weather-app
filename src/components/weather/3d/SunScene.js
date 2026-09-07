import * as THREE from 'three';

export function createSunScene() {
  const group = new THREE.Group();

  const sunGeo = new THREE.SphereGeometry(2.2, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({
    color: 0xfff2a3,
  });
  const sunMesh = new THREE.Mesh(sunGeo, sunMat);
  group.add(sunMesh);

  const coronaGeo = new THREE.SphereGeometry(2.6, 32, 32);
  const coronaMat = new THREE.MeshBasicMaterial({
    color: 0xffb347,
    transparent: true,
    opacity: 0.35,
    side: THREE.BackSide,
  });
  const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
  group.add(coronaMesh);

  const outerCoronaGeo = new THREE.SphereGeometry(3.3, 32, 32);
  const outerCoronaMat = new THREE.MeshBasicMaterial({
    color: 0xff8c00,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide,
  });
  const outerCoronaMesh = new THREE.Mesh(outerCoronaGeo, outerCoronaMat);
  group.add(outerCoronaMesh);

  const particleCount = 80;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const radius = 3 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    scales[i] = Math.random();
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xffea78,
    size: 0.15,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  group.add(particles);

  const light = new THREE.PointLight(0xfffae0, 2, 20);
  group.add(light);

  return {
    group,
    update: (_delta, time) => {
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      coronaMesh.scale.set(pulse, pulse, pulse);
      outerCoronaMesh.scale.set(
        1 + Math.cos(time * 1.5) * 0.08,
        1 + Math.cos(time * 1.5) * 0.08,
        1 + Math.cos(time * 1.5) * 0.08,
      );
      particles.rotation.y = time * 0.1;
      particles.rotation.z = time * 0.05;
    },
    dispose: () => {
      sunGeo.dispose();
      sunMat.dispose();
      coronaGeo.dispose();
      coronaMat.dispose();
      outerCoronaGeo.dispose();
      outerCoronaMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    },
  };
}
