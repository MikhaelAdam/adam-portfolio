import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player } from "./components/Player";
import { Orbit } from "./components/Orbit";
import { updateCamera } from "./systems/updateCamera";
import { setCameraPos } from "./systems/setCameraPos";

import "./style.css";

const scene = new THREE.Scene();
scene.add(player) ;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const camera = Camera();
scene.add(camera);

const renderer = Renderer();
renderer.render(scene, camera);

const orbit = Orbit(camera, renderer.domElement);

setCameraPos(camera, 100, 0, 120);

function animate() {
    requestAnimationFrame(animate);

    updateCamera(orbit);
    renderer.render(scene, camera);
}

animate();
