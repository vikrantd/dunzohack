import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { user } from './state/user.reducer';
import { UserEffects } from './state/user.effects';
import { UserActions } from './state/user.actions';
import { UserService } from './state/user.services';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('user', user),
        EffectsModule.forFeature([UserEffects]),
        FormsModule,
        LoginRoutingModule,
        DirectivesModule
    ],
    declarations: [
        LoginComponent   
    ],
    providers:[
        UserActions,
        UserService
    ]
})

export class LoginModule {}
