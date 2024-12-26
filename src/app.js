// Import the Three.js library
import * as THREE from 'three';

// Create the scene
const scene = new THREE.Scene();

// Create the PerspectiveCamera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set the camera position for a top-down view
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0); // Look at the center of the grid

// Create the renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light for better visibility
const light = new THREE.AmbientLight(0xffffff, 0.8); // Soft white light
scene.add(light);

// Create a 2D grid using GridHelper
const gridSize = 50; // Size of the grid
const gridDivisions = 10; // Number of divisions
const gridHelper = new THREE.GridHelper(gridSize, gridDivisions, 0x00ff00, 0x808080); // Green lines for main axes, gray for subdivisions
scene.add(gridHelper);

// Create a cube to represent the spaceship
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const spaceship = new THREE.Mesh(cubeGeometry, cubeMaterial);
spaceship.position.set(0, 0, 0);
scene.add(spaceship);

// Create a sphere to represent an object in the distance
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(5, 2, -50);
scene.add(sphere);

// Animation loop function
function animate() {
    requestAnimationFrame(animate);

    // Render the scene
    renderer.render(scene, camera);
}

// Start the animation loop
animate();
