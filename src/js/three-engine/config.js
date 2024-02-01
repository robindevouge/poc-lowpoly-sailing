export const config = {
	renderer: {
		targetFps: 30,
		pixelRatio: 4,
		antialias: false, // look into https://threejs.org/examples/webgl_postprocessing_fxaa
		transparent: false,
	},
	camera: {
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
	debug: {
		gui: true,
		orbit: true,
		testMesh: false,
	},
	boat: {
		baseHeave: 0,
		heaveAmplitude: 0.1,
		heaveFrequency: 1.8,
		rollAmplitude: 0.1,
		rollFrequency: 1.5,
		pitchAmplitude: 0.1,
		pitchFrequency: 1.2,
	},
};
