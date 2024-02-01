import gui from 'lil-gui';
import ThreeEngine from '../index';
import { config } from '../config';

export default class GUI {
	constructor() {
		this.engine = new ThreeEngine();
		this.camera = this.engine.camera;

		this.setInstance();
	}

	setInstance() {
		this.instance = new gui();

		const camPos = this.instance.addFolder('Camera position');
		camPos.add(this.camera.instance.position, 'x').step(0.01).name('x').min(-10).max(10);
		camPos.add(this.camera.instance.position, 'y').step(0.01).name('y').min(-10).max(10);
		camPos.add(this.camera.instance.position, 'z').step(0.01).name('z').min(-10).max(10);

		if (!config.debug.orbit) {
			const camLook = this.instance.addFolder('Camera look');
			camLook.add(this.camera.lookPoint, 'x').step(0.01).name('x').min(-10).max(10);
			camLook.add(this.camera.lookPoint, 'y').step(0.01).name('y').min(-10).max(10);
			camLook.add(this.camera.lookPoint, 'z').step(0.01).name('z').min(-10).max(10);
		}
	}

	update() {
		this.camera.instance.lookAt(this.camera.lookPoint);
	}
}
