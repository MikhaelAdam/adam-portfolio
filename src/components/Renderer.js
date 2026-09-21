import * as THREE from "three";

export function Renderer() {
    const canvas = document.querySelector("canvas.game");
    if (!canvas) throw new Error("Canvas not found");

    const renderer = new THREE. WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    return renderer;
}