import EventEmitter from './EventEmitter';
import { config } from '../config';

export default class Sizes extends EventEmitter {
	constructor(canvasContainer = window) {
		super();

		if (canvasContainer === window) {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
		} else {
			this.width = canvasContainer.clientWidth;
			this.height = canvasContainer.clientHeight;
		}

		this.pixelRatio = config.renderer.pixelRatio;

		window.addEventListener('resize', () => {
			if (canvasContainer === window) {
				this.width = window.innerWidth;
				this.height = window.innerHeight;
			} else {
				this.width = canvasContainer.clientWidth;
				this.height = canvasContainer.clientHeight;
			}

			this.pixelRatio = config.renderer.pixelRatio;

			this.trigger('resize');
		});
	}
}
