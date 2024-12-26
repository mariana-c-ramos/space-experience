/*
Good:
Manages transitions between scenes efficiently.

Suggestions:
Confirm cleanup logic for old scenes to avoid memory leaks.
Ensure extensibility for adding more scenes in the future.
*/

import { SpaceScene } from './SpaceScene.js';
import { CockpitScene } from './CockpitScene.js';

export class SceneManager {
    constructor(camera, renderer) {
        this.camera = camera;
        this.renderer = renderer;
        this.scenes = {
            space: new SpaceScene(),
            cockpit: new CockpitScene()
        };
        this.currentScene = this.scenes.space;
    }

    switchToScene(sceneName) {
        if (this.scenes[sceneName]) {
            this.currentScene = this.scenes[sceneName];
        }
    }

    update() {
        this.currentScene.update();
    }
}
