import * as THREE from 'three';
import ThreeEngine from '../index';

export class Sea {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		this.material = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0x8888ff,
			// wireframe: true,
		});

		this.geometry = new THREE.PlaneGeometry(200, 200, 75, 75);
		this.geometry.rotateX(-Math.PI / 2);

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.scene.add(this.mesh);

		// https://jsfiddle.net/prisoner849/79z8jyLk/
		this.vertexData = [];
		let v3 = new THREE.Vector3(); // for re-use
		for (let i = 0; i < this.geometry.attributes.position.count; i++) {
			v3.fromBufferAttribute(this.geometry.attributes.position, i);
			this.vertexData.push({
				initialY: v3.y,
				amplitude: THREE.MathUtils.randFloatSpread(1),
				phase: THREE.MathUtils.randFloat(0, Math.PI * 1),
			});
		}

		this.geometry = this.geometry;
	}

	update(time) {
		this.vertexData.forEach((data, i) => {
			let y = data.initialY + Math.sin(time + data.phase) * data.amplitude;
			this.geometry.attributes.position.setY(i, y);
		});
		this.geometry.attributes.position.needsUpdate = true;
		this.geometry.computeVertexNormals();
	}
}
