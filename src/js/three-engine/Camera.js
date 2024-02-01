import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ThreeEngine from './index';
import { config } from './config';

const { fov, near, far, defaultPosition, defaultLookAt } = config.camera;

export default class Camera {
	lookPoint = new THREE.Vector3(defaultLookAt.x, defaultLookAt.y, defaultLookAt.z);

	constructor() {
		this.engine = new ThreeEngine();
		this.sizes = this.engine.sizes;
		this.scene = this.engine.scene;
		this.canvas = this.engine.canvas;

		this.setInstance();

		if (config.debug.orbit) {
			this.setControls();
		}
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(fov, this.sizes.width / this.sizes.height, near, far);
		this.instance.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z);
		this.instance.lookAt(this.lookPoint);
		this.scene.add(this.instance);
	}

	setControls() {
		this.controls = new OrbitControls(this.instance, this.canvas);
		this.controls.enableDamping = true;
	}

	resize() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}

	update() {
		if (this.controls) {
			this.controls.update();
		}
	}
}
