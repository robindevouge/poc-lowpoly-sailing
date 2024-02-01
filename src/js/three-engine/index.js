import gsap from 'gsap';
import * as THREE from 'three';
import { config } from './config';
import Sizes from './utils/Sizes';
import GUI from './utils/GUI';
import AssetsManager from './utils/AssetsManager';
import Camera from './Camera';
import Renderer from './Renderer';
import World from './World';
import assets from './assets';

let instance = null;

export default class ThreeEngine {
	constructor(canvas) {
		// singleton
		if (instance) return instance;
		instance = this;

		// canvas
		this.canvas = canvas;

		// init clock
		this.ticker = gsap.ticker;
		this.ticker.fps(config.renderer.targetFps);

		// init sizes & resize trigger
		this.sizes = new Sizes();
		this.sizes.on('resize', () => {
			this.resize();
		});

		// init scene
		this.scene = new THREE.Scene();

		// init assets
		this.assetsManager = new AssetsManager(assets);

		// init camera
		this.camera = new Camera();

		// init renderer
		this.renderer = new Renderer();

		// init world
		this.world = new World();

		// init GUI
		if (config.debug.gui) {
			this.gui = new GUI();
		}
	}

	resize() {
		this.camera.resize();
		this.renderer.resize();
	}

	update() {
		try {
			if (this.gui) this.gui.update();
			this.camera.update();
			this.renderer.update();
			this.world.update(this.ticker.time);
		} catch (error) {
			console.error(error);
			this.ticker.remove(this.tick);
		}
	}

	// needed to be able to remove from ticker
	tick = () => {
		this.update();
	};

	start() {
		this.ticker.add(this.tick);
	}

	destroy() {
		this.sizes.off('resize');
		this.ticker.remove(this.tick);

		// Traverse the whole scene
		this.scene.traverse((child) => {
			// Test if it's a mesh
			if (child instanceof THREE.Mesh) {
				child.geometry.dispose();

				// Loop through the material properties
				for (const key in child.material) {
					const value = child.material[key];

					// Test if there is a dispose function
					if (value && typeof value.dispose === 'function') {
						value.dispose();
					}
				}
			}
		});

		// remove orbit if enabled
		if (this.camera.controls) this.camera.controls.dispose();

		// remove GUI if enabled
		if (this.gui) this.gui.instance.destroy();

		// remove renderer
		this.renderer.instance.clear();
		this.renderer.instance.dispose();
	}
}
