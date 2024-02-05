import * as THREE from 'three';
import ThreeEngine from '../index';
import { config } from '../config';
import gsap from 'gsap';

const {
	baseHeave,
	heaveAmplitude,
	heaveFrequency,
	rollAmplitude,
	rollFrequency,
	pitchAmplitude,
	pitchFrequency,
	maxSpeed,
	accelerationTime,
	rotationSpeed,
	maxTurningRoll,
	maxMovementPitch,
} = config.boat;

export class Boat {
	constructor() {
		this.engine = new ThreeEngine();
		this.scene = this.engine.scene;

		// Add pointers to objects
		this.boat = this.engine.assetsManager.items.boat.scene.getObjectByName('Boat');
		this.hull = this.boat.getObjectByName('Hull');
		this.sail = this.boat.getObjectByName('Sail');

		// Create wrapper to differenciate bobbing and input movements
		this.wrapper = new THREE.Group();
		this.wrapper.add(this.boat);

		const hullMaterial = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0xff5555,
		});

		const sailMaterial = new THREE.MeshLambertMaterial({
			flatShading: true,
			color: 0xffffff,
		});

		this.hull.material = hullMaterial;
		this.sail.material = sailMaterial;
		this.sail.scale.z = 0;

		this.scene.add(this.wrapper);

		// state
		this.state = {
			sailDeployed: false,
			speed: 0,
			rotation: 0,
			angle: 0,
			turningRoll: 0,
			movementPitch: 0,
		};
	}

	get sailDeployed() {
		return this.state.sailDeployed;
	}

	set sailDeployed(bool) {
		this.state.sailDeployed = bool;
		this.sail.scale.z = this.sailDeployed ? 1 : 0;
		gsap.to(this, {
			speed: this.sailDeployed ? maxSpeed : 0,
			movementPitch: this.sailDeployed ? maxMovementPitch : 0,
			duration: accelerationTime,
		});
	}

	get rotation() {
		return this.state.rotation;
	}

	set rotation(dir) {
		this.state.rotation = dir;
		if (!this.sailDeployed) return;
		gsap.to(this, { turningRoll: this.rotation * maxTurningRoll, duration: 0.5 });
	}

	get speed() {
		return this.state.speed;
	}

	set speed(speed) {
		this.state.speed = speed;
	}

	get angle() {
		return this.state.angle;
	}

	set angle(angle) {
		this.state.angle = angle;
	}

	get turningRoll() {
		return this.state.turningRoll;
	}

	set turningRoll(roll) {
		this.state.turningRoll = roll;
	}

	get movementPitch() {
		return this.state.movementPitch;
	}

	set movementPitch(pitch) {
		this.state.movementPitch = pitch;
	}

	updateFloat(time) {
		// maybe introduce some random variance at some point but it's looking ok for now
		this.boat.position.y = baseHeave + heaveAmplitude * Math.sin(time * heaveFrequency);
		this.boat.rotation.z = rollAmplitude * Math.sin(time * rollFrequency) + this.turningRoll;
		this.boat.rotation.x = pitchAmplitude * Math.sin(time * pitchFrequency) + this.movementPitch;
	}

	rotate() {
		if (!this.sailDeployed) return;
		this.angle -= this.rotation * rotationSpeed;
		this.wrapper.rotation.y = this.angle;
	}

	move() {
		this.wrapper.position.x += Math.sin(-this.angle) * this.speed;
		this.wrapper.position.z -= Math.cos(this.angle) * this.speed;
	}

	update(time) {
		this.updateFloat(time);
		this.move();
		this.rotate();
	}
}
