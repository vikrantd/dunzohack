import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import 'rxjs';

import { AnalyseViewService } from './state/analyse.service';
import { AnalyseViewActions } from './state/analyse.actions';
import { analyseView } from './state/analyse.reducer';
import { AnalyseViewEffects } from './state/analyse.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AnalyseListComponent } from './components/analyse-list/analyse-list-component';
import { AnalyseRoutingModule } from './analyse.routing.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forFeature('analyseView', analyseView),
        EffectsModule.forFeature([AnalyseViewEffects]),
        AnalyseRoutingModule
    ],
    declarations: [
        AnalyseListComponent
    ],
    providers: [
        AnalyseViewService,
        AnalyseViewActions
    ],
    exports: []
})

export class AnalyseViewModule {
}
