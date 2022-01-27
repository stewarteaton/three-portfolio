import './style.css'

import * as THREE from 'three'
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// const renderer = new THREE.WebGLRenderer({
//   canvas: document.querySelector('#bg'),
// })
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Torus GEOMETRY
const geometry = new THREE.TorusGeometry( 10, 1.8, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: (0,128,255), } );
const torus = new THREE.Mesh( geometry, material );
scene.add( torus );

// LIGHTING
  // Point Light
  // const pointLight = new THREE.PointLight( 0xffffff, 10, 100, 2 );
  const pointLight = new THREE.PointLight( 0xffffff );
  pointLight.position.set( 10, 10, 10 );
  scene.add( pointLight );
  // Light Helper 
  const sphereSize = 1;
  const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
  // Grid Helper
  const size = 100;
  const divisions = 10;
  const gridHelper = new THREE.GridHelper( size, divisions );
  scene.add( gridHelper, pointLightHelper );

  // const controls = new OrbitControls( camera, renderer.domElement );

  // Ambient Light
  const ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light 
  scene.add( ambientLight );


// Stars - populate space
  const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
  
function addStar() {
  let star = new THREE.Mesh(starGeometry, starMaterial);

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100) )
  star.position.set(x,y,z);
  scene.add(star)
}
Array(200).fill().forEach(addStar)


// Background
const backgroundTexture = new THREE.TextureLoader().load('earth.jpg');
scene.background = backgroundTexture

// Avatar
const stewTexture = new THREE.TextureLoader().load('stew.png')
const stew = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({ map: stewTexture })
)
stew.position.set(5,0,0)
scene.add(stew)

// --- Moon  ----
const moonTexture = new THREE.TextureLoader().load('moon.jpeg')
const normalTexture = new THREE.TextureLoader().load('normal.jpeg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry( 4, 32, 32 ),
  new THREE.MeshStandardMaterial({ map: moonTexture, normalMap: normalTexture})
)
moon.position.set(-5,0,0)
scene.add(moon)
moon.position.z = 30;
moon.position.x = -10;
// ----  End Moon ----


// Move Camera
document.body.onscroll = function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  stew.rotation.y += 0.01;
  stew.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
// document.body.onscroll = moveCamera;
// moveCamera();



// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();