import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player } from "./components/Player";
import { Orbit } from "./components/Orbit";
import { StarField } from './components/StarField.js';
import { updateCamera } from "./systems/updateCamera";
import "./style.css";
const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(37, 37, 37)");
scene.add(player) ;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const stars = new StarField({
  count: 2000,
  radius: 400,     // stars scattered on a sphere shell of this radius
  color: 0xffffff,
});
scene.add(stars.points);

const camera = Camera();
scene.add(camera);

const renderer = Renderer();
renderer.render(scene, camera);

const orbit = Orbit(camera, renderer.domElement);

const clock = new THREE.Timer();

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    stars.update(delta);
    updateCamera(orbit);
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    // 1. Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    
    // 2. Recalculate the projection matrix
    camera.updateProjectionMatrix();
    
    // 3. Update the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}
