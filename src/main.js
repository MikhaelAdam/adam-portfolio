import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { player } from "./components/Player";
import { StarField } from './components/StarField.js';
import "./style.css";

const scene = new THREE.Scene();
scene.background = new THREE.Color("rgb(37, 37, 37)");
scene.add(player);
player.position.y += 30;
player.position.x += 100;

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

const originalCameraPosition = camera.position.clone();
const originalCameraRotation = camera.rotation.clone();

const playerStartPosition = player.position.clone();

const originalZoom = camera.zoom;
const heroVisibilityThreshold = 100;

const renderer = Renderer();
renderer.render(scene, camera);

const clock = new THREE.Timer();


function handleScroll() {
    const scrollAmount = window.scrollY;
    document.querySelector('.hero').classList.toggle('hero-hidden', scrollAmount < heroVisibilityThreshold);
    // camera.position.x = originalCameraPosition.x + scrollAmount * 0.0002;
    // camera.position.z = originalCameraPosition.z + scrollAmount * 0.01;
    // camera.rotation.y = originalCameraRotation.y + scrollAmount * 0.0002;
    camera.zoom = originalZoom - scrollAmount * 0.0002;
    camera.updateProjectionMatrix();
}

document.body.onscroll = handleScroll;
handleScroll();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    if(window.scrollY == 0) player.rotation.y = 0;
    if(window.scrollY > 0) player.rotateY(.002);
    stars.update(delta);
    renderer.render(scene, camera);
}

animate();
