import * as THREE from 'three';
import ThreeEngine from './index';
import { config } from './config';

const { antialias, transparent } = config.renderer;

export default class Renderer {
	constructor() {
		this.engine = new ThreeEngine();
		this.canvas = this.engine.canvas;
		this.sizes = this.engine.sizes;
		this.scene = this.engine.scene;
		this.camera = this.engine.camera;

		this.setInstance();
	}

	setInstance() {
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias,
			alpha: transparent,
		});
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);

		// this.instance.physicallyCorrectLights = true;
		// this.instance.outputEncoding = THREE.sRGBEncoding;
		// this.instance.toneMapping = THREE.CineonToneMapping;
		// this.instance.toneMappingExposure = 1.75;
		// this.instance.shadowMap.enabled = true;
		// this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	resize() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}

	update() {
		this.instance.render(this.scene, this.camera.instance);
	}
}
