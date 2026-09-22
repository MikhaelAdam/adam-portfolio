import * as THREE from 'three';
import { background_color } from '../constants';

export const plane = Plane();
export function Plane(){
    const geometry = new THREE.PlaneGeometry(window.innerWidth, window. innerHeight);
    const material = new THREE.MeshBasicMaterial({ 
        color: background_color, 
        side: THREE.DoubleSide 
    });
    const plane = new THREE.Mesh(geometry, material);

    plane.x -= 20;
    return plane;
}