import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import config from './config';

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Global objects
 */

const gui = new GUI();
const centerVect = new THREE.Vector3(0, 0, 0);

/**
 * Sizes
 */

window.addEventListener('resize', () => {
	// Update sizes
	config.renderSize.width = window.innerWidth;
	config.renderSize.height = window.innerHeight;

	// Update camera
	camera.aspect = config.renderSize.width / config.renderSize.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(config.renderSize.width, config.renderSize.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */

// Base camera
const { fov, x, y, z, near, far } = config.defaultCamera;
const camera = new THREE.PerspectiveCamera(fov, config.renderSize.width / config.renderSize.height, near, far);
camera.position.set(x, y, z);
camera.lookAt(centerVect);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(config.renderSize.width, config.renderSize.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, config.maxPixelRatio));

/**
 * Objects
 */

const cubeMaterial = new THREE.MeshNormalMaterial();
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

/**
 * Animate
 */

const speed = 0.1;

const tick = (time) => {
	try {
		// Update controls
		controls.update();

		// Update objects
		cube.rotation.y = time * speed;
		// Render
		renderer.render(scene, camera);
	} catch (error) {
		console.error(error);
		gsap.ticker.remove(tick);
	}
};

gsap.ticker.fps(30);
gsap.ticker.add(tick);
