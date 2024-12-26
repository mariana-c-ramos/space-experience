import * as THREE from 'three';

export class Spaceship extends THREE.Group {
    constructor() {
        super();

        // Main body of the spaceship (a cube for now)
        const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
        const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.add(body);

        // Example: Adding additional parts (e.g., wings)
        const wingGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.5);
        const wingMaterial = new THREE.MeshStandardMaterial({ color: 0x008000 });
        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-0.8, 0, 0);
        this.add(leftWing);

        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(0.8, 0, 0);
        this.add(rightWing);

        // Add any other components or animations here
    }

    update() {}
}
