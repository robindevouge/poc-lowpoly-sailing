import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EventEmitter from './EventEmitter.js';

export default class AssetsManager extends EventEmitter {
	constructor(sources) {
		super();

		this.isReady = false;
		this.sources = sources;
		this.items = {};
		this.toLoad = this.sources.length;
		this.loaded = 0;

		if (this.toLoad === 0) {
			this.isReady = true;
			this.trigger('ready');
		}

		this.setLoaders();
		this.startLoading();
	}

	setLoaders() {
		this.loaders = {};
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
	}

	startLoading() {
		// Load each source
		for (const source of this.sources) {
			if (source.type === 'gltfModel') {
				this.loaders.gltfLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === 'texture') {
				this.loaders.textureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === 'cubeTexture') {
				this.loaders.cubeTextureLoader.load(source.path, (file) => {
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file;

		this.loaded += 1;

		if (this.loaded === this.toLoad) {
			this.isReady = true;
			this.trigger('ready');
		}
	}

	onReady(callback) {
		if (this.isReady) {
			callback();
		} else {
			this.on('ready', callback);
		}
	}
}
