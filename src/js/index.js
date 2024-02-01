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
let light = new THREE.DirectionalLight(0xffffff, 1);
light.position.setScalar(1);
scene.add(light, new THREE.AmbientLight(0xffffff, 0.25));

const planeMaterial = new THREE.MeshLambertMaterial({
	flatShading: true,
	color: 0x8888ff,
	// wireframe: true,
});
const planeGeometry = new THREE.PlaneGeometry(200, 200, 75, 75);
planeGeometry.rotateX(-Math.PI / 2);
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// https://jsfiddle.net/prisoner849/79z8jyLk/
let vertexData = [];
let v3 = new THREE.Vector3(); // for re-use
for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
	v3.fromBufferAttribute(planeGeometry.attributes.position, i);
	vertexData.push({
		initialY: v3.y,
		amplitude: THREE.MathUtils.randFloatSpread(1),
		phase: THREE.MathUtils.randFloat(0, Math.PI * 1),
	});
}

/**
 * Animate
 */

const tick = (time) => {
	try {
		// Update controls
		controls.update();

		// Update objects
		vertexData.forEach((data, i) => {
			let y = data.initialY + Math.sin(time + data.phase) * data.amplitude;
			planeGeometry.attributes.position.setY(i, y);
		});
		planeGeometry.attributes.position.needsUpdate = true;
		planeGeometry.computeVertexNormals();

		// Render
		renderer.render(scene, camera);
	} catch (error) {
		console.error(error);
		gsap.ticker.remove(tick);
	}
};

gsap.ticker.fps(30);
gsap.ticker.add(tick);
