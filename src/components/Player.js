import * as THREE from "three";

export const player = Player();

function Player() {
    const body = new THREE.Mesh(
    new THREE.BoxGeometry(25, 25, 25),
    new THREE.MeshLambertMaterial({
            color: "white",
            flatShading: true,
        })
    );

    body.position.z = 10;

    return body;
}