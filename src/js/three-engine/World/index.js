import * as THREE from 'three';
import ThreeEngine from '../index';
import ControlsManager from '@robindevouge/controls-manager';
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

			// init controls
			this.controlsManager = new ControlsManager({
				enabled: true,
				keyMaps: [
					{
						key: 'Space',
						actionDown: () => {
							this.boat.sailDeployed = !this.boat.sailDeployed;
						},
					},
					{
						key: 'ArrowLeft',
						actionDown: () => {
							this.boat.rotation = -1;
						},
						actionUp: () => {
							this.boat.rotation = 0;
						},
					},
					{
						key: 'ArrowRight',
						actionDown: () => {
							this.boat.rotation = 1;
						},
						actionUp: () => {
							this.boat.rotation = 0;
						},
					},
				],
			});
		});
	}

	update(time) {
		this.sea.update(time);
		this.boat.update(time);
	}
}
