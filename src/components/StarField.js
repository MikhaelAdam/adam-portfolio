import * as THREE from 'three';

/**
 * StarField
 * A lightweight, shader-based twinkling star background for Three.js.
 *
 * Usage:
 *   import { StarField } from './components/StarField.js';
 *
 *   const stars = new StarField({
 *     count: 2000,
 *     radius: 400,   // stars are scattered on a sphere shell of this radius
 *   });
 *   scene.add(stars.points);
 *
 *   // in your render loop:
 *   stars.update(delta);
 */
export class StarField {
  constructor(options = {}) {
    const {
      count = 2000,
      radius = 400,
      minSize = 1.0,
      maxSize = 3.0,
      color = 0xffffff,
      twinkleSpeed = 1.0,
    } = options;

    this.time = 0;

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // distribute points evenly over a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.6 + Math.random() * 0.4); // some depth variation

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);

      sizes[i] = minSize + Math.random() * (maxSize - minSize);
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 1.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    geometry.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uTwinkleSpeed: { value: twinkleSpeed },
      },
      vertexShader: /* glsl */ `
        attribute float size;
        attribute float phase;
        attribute float speed;
        uniform float uTime;
        uniform float uTwinkleSpeed;
        varying float vAlpha;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          float twinkle = 0.5 + 0.5 * sin(uTime * uTwinkleSpeed * speed + phase);
          vAlpha = 0.4 + 0.6 * twinkle;
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        varying float vAlpha;

        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(geometry, material);
  }

  update(delta) {
    this.time += delta;
    this.points.material.uniforms.uTime.value = this.time;
  }

  dispose() {
    this.points.geometry.dispose();
    this.points.material.dispose();
  }
}