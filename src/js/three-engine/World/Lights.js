import * as THREE from 'three';
import ThreeEngine from '../index';

export class Lights {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		let light = new THREE.DirectionalLight(0xffffff, 1);
		light.position.setScalar(1);
		this.scene.add(light, new THREE.AmbientLight(0xffffff, 0.25));
	}
}
