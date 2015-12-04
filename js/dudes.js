var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var THREE = require('three');
var Dudes = (function () {
    function Dudes(viewContainer) {
        this.viewContainer = viewContainer;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000);
        this.renderer = new THREE.WebGLRenderer();
        this.init();
        this.animate();
    }
    Dudes.prototype.init = function () {
        var _this = this;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.setScene();
        this.camera.position.z = 1000;
        //document.querySelector('body').appendChild(this.renderer.domElement);
        this.viewContainer.element.nativeElement.appendChild(this.renderer.domElement);
        window.addEventListener('resize', function () { return _this.onWindowResize; }, false);
    };
    Dudes.prototype.setScene = function () {
        var _this = this;
        var lightOne, lightTwo;
        this.scene.fog = new THREE.Fog(0x000000, 1, 15000);
        this.scene.autoUpdate = false;
        lightOne = new THREE.PointLight(0xff2200);
        lightOne.position.set(0, 0, 0);
        this.scene.add(lightOne);
        lightTwo = new THREE.DirectionalLight(0xffffff);
        lightTwo.position.set(0, 0, 1).normalize();
        this.scene.add(lightTwo);
        this.createLODs().map(function (lod) { return _this.scene.add(lod); });
    };
    Dudes.prototype.createLODs = function () {
        var mesh, lods = [], geometry = [
            [new THREE.IcosahedronGeometry(100, 4), 50],
            [new THREE.IcosahedronGeometry(100, 3), 300],
            [new THREE.IcosahedronGeometry(100, 2), 1000],
            [new THREE.IcosahedronGeometry(100, 1), 2000],
            [new THREE.IcosahedronGeometry(100, 0), 8000]
        ], material = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            wireframe: true
        });
        for (var j = 0, i = void 0, lod = void 0; j < 1000; j++) {
            lod = new THREE.LOD();
            for (i = 0; i < geometry.length; i++) {
                mesh = new THREE.Mesh(geometry[i][0], material);
                mesh.scale.set(1.5, 1.5, 1.5);
                mesh.updateMatrix();
                mesh.matrixAutoUpdate = false;
                lod.addLevel(mesh, geometry[i][1]);
            }
            lod.position.x = 10000 * (0.5 - Math.random());
            lod.position.y = 7500 * (0.5 - Math.random());
            lod.position.z = 10000 * (0.5 - Math.random());
            lod.updateMatrix();
            lod.matrixAutoUpdate = false;
            lods.push(lod);
        }
        return lods;
    };
    Dudes.prototype.onWindowResize = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    };
    Dudes.prototype.animate = function () {
        var _this = this;
        requestAnimationFrame(function () { return _this.animate(); });
        this.render();
    };
    Dudes.prototype.render = function () {
        var _this = this;
        this.scene.updateMatrixWorld();
        this.scene.traverse(function (object) {
            if (object instanceof THREE.LOD) {
                object.update(_this.camera);
            }
        });
        this.renderer.render(this.scene, this.camera);
    };
    Dudes = __decorate([
        angular2_1.Directive({
            selector: 'dudes'
        }), 
        __metadata('design:paramtypes', [angular2_1.ViewContainerRef])
    ], Dudes);
    return Dudes;
})();
exports.Dudes = Dudes;
//# sourceMappingURL=dudes.js.map