import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeViewComponent } from './components/home-view.component';
import { HomeRoutingModule } from './home.routing.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeViewComponent   
    ],
    providers:[
       
    ]
})

export class HomeModule {}
