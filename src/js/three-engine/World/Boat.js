import * as THREE from 'three';
import ThreeEngine from '../index';

export class Boat {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		this.object = this.engine.assetsManager.items.boat.scene.getObjectByName('Boat');
		this.hull = this.object.getObjectByName('Hull');
		this.sail = this.object.getObjectByName('Sail');

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

		this.scene.add(this.object);
	}
}
