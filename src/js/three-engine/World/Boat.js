import * as THREE from 'three';
import ThreeEngine from '../index';

export class Boat {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		this.material = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0xff5555,
			wireframe: true,
		});

		this.geometry = new THREE.BoxGeometry(2, 2, 4);

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);
	}
}
