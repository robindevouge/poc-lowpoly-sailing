import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ThreeEngine from './index';
import { config } from './config';

const { defaultCam, global: globalCamConfig, boat: boatCamConfig } = config.camera;
const { defaultPosition: defaultBoatPosition } = config.boat;

export default class Camera {
	constructor() {
		this.engine = new ThreeEngine();
		this.sizes = this.engine.sizes;
		this.scene = this.engine.scene;
		this.canvas = this.engine.canvas;
		this.cameras = {};
		this.activeCamera = null;

		this.initCameras();

		if (config.debug.orbit) {
			this.initControls();
		}
	}

	initCameras() {
		const globalCam = new THREE.PerspectiveCamera(
			globalCamConfig.fov,
			this.sizes.width / this.sizes.height,
			globalCamConfig.near,
			globalCamConfig.far
		);
		globalCam.name = 'camera_global';
		globalCam.position.set(
			globalCamConfig.defaultPosition.x,
			globalCamConfig.defaultPosition.y,
			globalCamConfig.defaultPosition.z
		);
		globalCam.lookAt(
			new THREE.Vector3(
				globalCamConfig.defaultLookAt.x,
				globalCamConfig.defaultLookAt.y,
				globalCamConfig.defaultLookAt.z
			)
		);
		this.scene.add(globalCam);
		this.cameras.global = globalCam;

		const boatCam = new THREE.PerspectiveCamera(
			boatCamConfig.fov,
			this.sizes.width / this.sizes.height,
			boatCamConfig.near,
			boatCamConfig.far
		);
		boatCam.name = 'camera_boat';
		boatCam.position.set(
			defaultBoatPosition.x + boatCamConfig.offset.x,
			defaultBoatPosition.y + boatCamConfig.offset.y,
			defaultBoatPosition.z + boatCamConfig.offset.z
		);
		boatCam.lookAt(new THREE.Vector3(defaultBoatPosition.x, defaultBoatPosition.y, defaultBoatPosition.z));
		this.scene.add(boatCam);
		this.cameras.boat = boatCam;

		this.activeCamera = this.cameras[defaultCam];
	}

	initControls() {
		this.controls = new OrbitControls(this.cameras.global, this.canvas);
		this.controls.enableDamping = true;
		if (defaultCam === 'global') {
			this.controls.enabled = true;
		} else {
			this.controls.enabled = false;
		}
	}

	resize() {
		this.activeCamera.aspect = this.sizes.width / this.sizes.height;
		this.activeCamera.updateProjectionMatrix();
	}

	update() {
		if (this.controls) {
			this.controls.update();
		}
	}

	changeCamera(camera) {
		if (!this.cameras[camera]) {
			console.error(`Camera ${camera} does not exist`);
			return;
		}
		this.activeCamera = this.cameras[camera];
		if (camera === 'global') {
			this.controls.enabled = true;
		} else {
			this.controls.enabled = false;
		}
		this.resize();
	}
}
