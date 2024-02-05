export const config = {
	renderer: {
		targetFps: 30,
		pixelRatio: 4,
		antialias: false, // look into https://threejs.org/examples/webgl_postprocessing_fxaa
		transparent: false,
	},
	camera: {
		defaultCam: 'boat',
		global: {
			fov: 45,
			near: 0.1,
			far: 1000,
			defaultPosition: {
				x: 40,
				y: 30,
				z: 40,
			},
			defaultLookAt: {
				x: 0,
				y: 0,
				z: 0,
			},
		},
		boat: {
			fov: 45,
			near: 0.1,
			far: 1000,
			offset: {
				x: 15,
				y: 15,
				z: 15,
			},
		},
	},
	debug: {
		gui: true,
		orbit: true,
		testMesh: false,
	},
	boat: {
		defaultPosition: {
			x: 0,
			y: 0,
			z: 0,
		},
		baseHeave: 0,
		heaveAmplitude: 0.1,
		heaveFrequency: 1.8,
		rollAmplitude: 0.1,
		rollFrequency: 1.5,
		pitchAmplitude: 0.1,
		pitchFrequency: 1.2,
		maxSpeed: 0.2,
		accelerationTime: 1,
		rotationSpeed: 0.03,
		maxTurningRoll: 0.2,
		maxMovementPitch: 0.1,
	},
};
