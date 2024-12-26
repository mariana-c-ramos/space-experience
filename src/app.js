// Import necessary modules
import * as THREE from 'three';
import { SpaceScene } from './scenes/SpaceScene.js';
import { CockpitScene } from './scenes/CockpitScene.js';
import { SceneManager } from './scenes/SceneManager.js';

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Initialize camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

// Create scene manager
const sceneManager = new SceneManager(camera, renderer);

// Start animation loop
function animate() {
    requestAnimationFrame(animate);
    sceneManager.update();
    renderer.render(sceneManager.currentScene, camera);
}
animate();
