/*
Good:
Includes functionality for setting up the space environment (e.g., spaceship, cosmic dust).
Modular structure for updating the scene with animations.

Suggestions:
Ensure the starfield and planets are dynamic (e.g., use particle systems for stars and procedural placement for planets).
Add comments for clarity in areas involving object positioning or motion.
*/

import * as THREE from 'three';
import { Spaceship } from '../components/Spaceship.js';

export class SpaceScene extends THREE.Scene {
    constructor() {
        super();

        // Add grid helper
        const gridHelper = new THREE.GridHelper(50, 10, 0x00ff00, 0x808080);
        this.add(gridHelper);

        // Add the spaceship
        this.spaceship = new Spaceship();
        this.spaceship.position.set(0, 0, 0);
        this.add(this.spaceship);

        // Add a sphere
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        sphere.position.set(5, 2, -50);
        this.add(sphere);

        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        this.add(ambientLight);

        // Add directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(10, 10, -10);
        this.add(directionalLight);
    }

    update() {
        // Update spaceship (or any other dynamic objects in the scene)
        this.spaceship.update();
    }
}