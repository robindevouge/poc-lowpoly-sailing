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

		this.engine.assetsManager.onReady(() => {
			const cameraState = {
				activeCam: 'boat',
			};
			const camera = this.instance.addFolder('Camera');
			camera
				.add(cameraState, 'activeCam', ['global', 'boat'])
				.name('Active camera')
				.onChange((value) => {
					this.camera.changeCamera(value);
				});
		});
	}

	update() {}
}
