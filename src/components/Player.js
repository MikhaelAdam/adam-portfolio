import * as THREE from "three";
import adamTextureUrl from "../assets/languages/adam.png";

const textureLoader = new THREE.TextureLoader();

export const player = Player();

function Player() {
    const myTexture = textureLoader.load(adamTextureUrl);
    myTexture.magFilter = THREE.NearestFilter; 
    myTexture.minFilter = THREE.NearestFilter;
    const body = new THREE.Mesh(
    new THREE.BoxGeometry(200,200,200),
    new THREE.MeshPhongMaterial({
            map: myTexture,
            transparent: true
        })
    );

    body.position.z = 10;

    return body;
}