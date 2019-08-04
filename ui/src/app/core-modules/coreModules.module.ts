import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AlertComponent } from './alert/alert.component';
import { HeaderNavBarComponent } from './header-nav-bar/header-nav-bar.component';
import { AppStoreModule } from './app-store';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AppStoreModule
    ],
    declarations: [
        AlertComponent,
        HeaderNavBarComponent,
        NavBarComponent   
    ],
    providers:[
       
    ],
    exports: [
        AlertComponent,
        HeaderNavBarComponent,
        NavBarComponent
    ]
})

export class CoreModulesModule {}
