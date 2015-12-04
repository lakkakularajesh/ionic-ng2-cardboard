import {Directive, ViewContainerRef} from 'angular2/angular2';
import * as THREE from 'three';

@Directive({
    selector : 'dudes'
})
export class Dudes {

    viewContainer: ViewContainerRef;

    public scene: any;
    public camera: any;
    public renderer: any;

    constructor(viewContainer: ViewContainerRef) {

        this.viewContainer = viewContainer;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000);
        this.renderer = new THREE.WebGLRenderer();
        this.init();
        this.animate();
    }
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.setScene();
        this.camera.position.z = 1000;
        //document.querySelector('body').appendChild(this.renderer.domElement);
        this.viewContainer.element.nativeElement.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => this.onWindowResize, false);
    }
    setScene() {
        var lightOne, lightTwo;

        this.scene.fog = new THREE.Fog(0x000000, 1, 15000);
        this.scene.autoUpdate = false;

        lightOne = new THREE.PointLight(0xff2200);
        lightOne.position.set(0, 0, 0);
        this.scene.add(lightOne);

        lightTwo = new THREE.DirectionalLight(0xffffff);
        lightTwo.position.set(0, 0, 1).normalize();
        this.scene.add(lightTwo);

        this.createLODs().map((lod) => this.scene.add(lod));
    }
    createLODs() {
        var mesh,
            lods = [],
            geometry = [
                [ new THREE.IcosahedronGeometry(100, 4), 50 ],
                [ new THREE.IcosahedronGeometry(100, 3), 300 ],
                [ new THREE.IcosahedronGeometry(100, 2), 1000 ],
                [ new THREE.IcosahedronGeometry(100, 1), 2000 ],
                [ new THREE.IcosahedronGeometry(100, 0), 8000 ]
            ],
            material = new THREE.MeshLambertMaterial({
                color: 0xffffff, 
                wireframe: true 
            });

        for (let j = 0, i, lod; j < 1000; j ++) {
            lod = new THREE.LOD();

            for (i = 0; i < geometry.length; i ++) {
                mesh = new THREE.Mesh(geometry[ i ][ 0 ], material);
                mesh.scale.set(1.5, 1.5, 1.5);
                mesh.updateMatrix();
                mesh.matrixAutoUpdate = false;
                lod.addLevel(mesh, geometry[ i ][ 1 ]);
            }

            lod.position.x = 10000 * (0.5 - Math.random());
            lod.position.y = 7500 * (0.5 - Math.random());
            lod.position.z = 10000 * (0.5 - Math.random());
            lod.updateMatrix();
            lod.matrixAutoUpdate = false;
            lods.push(lod);
        }

        return lods;
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    animate() {
        requestAnimationFrame(() => this.animate());
        this.render();
    }
    render() {
        this.scene.updateMatrixWorld();
        this.scene.traverse((object) => {
            if (object instanceof THREE.LOD) {
                object.update(this.camera);
            }
        });
        this.renderer.render(this.scene, this.camera);
    }
}
