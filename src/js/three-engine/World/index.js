import * as THREE from 'three';
import ThreeEngine from '../index';
import { config } from '../config';
import { Sea } from './Sea';
import { Lights } from './Lights';
import { Boat } from './Boat';

export default class World {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;
		this.assetsManager = this.engine.assetsManager;

		// Wait for assets
		this.assetsManager.onReady(() => {
			console.log('all assets loaded');

			// add world elements
			this.sea = new Sea();
			this.boat = new Boat();
			this.lights = new Lights();

			// debug mesh
			if (config.debug.testMesh) {
				const testMesh = new THREE.Mesh(
					new THREE.BoxGeometry(1, 1, 1),
					new THREE.MeshBasicMaterial({ wireframe: true })
				);
				this.scene.add(testMesh);
			}

			this.engine.start();
		});
	}

	update(time) {
		this.sea.update(time);
	}
}
