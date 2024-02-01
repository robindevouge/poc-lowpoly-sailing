import * as THREE from 'three';
import ThreeEngine from '../index';
import { config } from '../config';

export class Boat {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		// Add pointers to objects
		this.boat = this.engine.assetsManager.items.boat.scene.getObjectByName('Boat');
		this.hull = this.boat.getObjectByName('Hull');
		this.sail = this.boat.getObjectByName('Sail');

		// Create wrapper to differenciate bobbing and input movements
		this.wrapper = new THREE.Group();
		this.wrapper.add(this.boat);

		const hullMaterial = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0xff5555,
		});

		const sailMaterial = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0xffffff,
		});

		this.hull.material = hullMaterial;
		this.sail.material = sailMaterial;

		this.scene.add(this.wrapper);
	}

	// movements : space to deploy/undeploy sail (start/stop) | left/right to turn

	update(time) {
		const baseY = 0;
		const amplitude = 0.1;
		const frequency = 2;
		const { baseHeave, heaveAmplitude, heaveFrequency, rollAmplitude, rollFrequency, pitchAmplitude, pitchFrequency } =
			config.boat;
		// maybe introduce some random variance at some point but it's looking ok for now
		this.boat.position.y = baseHeave + heaveAmplitude * Math.sin(time * heaveFrequency);
		this.boat.rotation.z = rollAmplitude * Math.sin(time * rollFrequency);
		this.boat.rotation.x = pitchAmplitude * Math.sin(time * pitchFrequency);
	}
}
