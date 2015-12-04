import {bootstrap, Component, View} from 'angular2/angular2';
import {IonPane} from './ionic_ng2';
import {Dudes} from './dudes';

@Component({
    selector : 'cardboard-gl'
})
@View({
    template: `
        <ion-pane class="pane">
            <ion-header-bar class="bar-stable bar bar-header">
                <h1 class="title">Cardboard</h1>
                <div class="buttons">
                    <button class="button button-clear"><i class="icon ion-gear-a"></i></button>
                </div>
            </ion-header-bar>
            <ion-content scroll="false" padding="false" class="scroll-content-false">
                <dudes></dudes>
            </ion-content>
        </ion-pane>
        `,
    directives: [IonPane, Dudes]
})
class App {
    constructor() {
    }
}
/*class App {

    viewContainer: ViewContainerRef;
    protoViewRef: ProtoViewRef;
    view: View;

    constructor(viewContainer: ViewContainerRef, protoViewRef: ProtoViewRef) {
        this.viewContainer = viewContainer;
        this.protoViewRef = protoViewRef;
    }
}*/

bootstrap(App);
