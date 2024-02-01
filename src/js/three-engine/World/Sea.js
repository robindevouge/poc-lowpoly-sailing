import * as THREE from 'three';
import ThreeEngine from '../index';

export class Sea {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		const planeMaterial = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0x8888ff,
			// wireframe: true,
		});

		const planeGeometry = new THREE.PlaneGeometry(200, 200, 75, 75);
		planeGeometry.rotateX(-Math.PI / 2);

		this.mesh = new THREE.Mesh(planeGeometry, planeMaterial);
		this.scene.add(this.mesh);

		// https://jsfiddle.net/prisoner849/79z8jyLk/
		this.vertexData = [];
		let v3 = new THREE.Vector3(); // for re-use
		for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
			v3.fromBufferAttribute(planeGeometry.attributes.position, i);
			this.vertexData.push({
				initialY: v3.y,
				amplitude: THREE.MathUtils.randFloatSpread(1),
				phase: THREE.MathUtils.randFloat(0, Math.PI * 1),
			});
		}

		this.planeGeometry = planeGeometry;
	}

	update(time) {
		const planeGeometry = this.planeGeometry;

		this.vertexData.forEach((data, i) => {
			let y = data.initialY + Math.sin(time + data.phase) * data.amplitude;
			planeGeometry.attributes.position.setY(i, y);
		});
		planeGeometry.attributes.position.needsUpdate = true;
		planeGeometry.computeVertexNormals();
	}
}
