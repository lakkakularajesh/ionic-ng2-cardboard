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
var ionic_ng2_1 = require('./ionic_ng2');
var dudes_1 = require('./dudes');
var App = (function () {
    function App() {
    }
    App = __decorate([
        angular2_1.Component({
            selector: 'cardboard-gl'
        }),
        angular2_1.View({
            template: "\n        <ion-pane class=\"pane\">\n            <ion-header-bar class=\"bar-stable bar bar-header\">\n                <h1 class=\"title\">Cardboard</h1>\n                <div class=\"buttons\">\n                    <button class=\"button button-clear\"><i class=\"icon ion-gear-a\"></i></button>\n                </div>\n            </ion-header-bar>\n            <ion-content scroll=\"false\" padding=\"false\" class=\"scroll-content-false\">\n                <dudes></dudes>\n            </ion-content>\n        </ion-pane>\n        ",
            directives: [ionic_ng2_1.IonPane, dudes_1.Dudes]
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
/*class App {

    viewContainer: ViewContainerRef;
    protoViewRef: ProtoViewRef;
    view: View;

    constructor(viewContainer: ViewContainerRef, protoViewRef: ProtoViewRef) {
        this.viewContainer = viewContainer;
        this.protoViewRef = protoViewRef;
    }
}*/
angular2_1.bootstrap(App);
//# sourceMappingURL=app.js.map