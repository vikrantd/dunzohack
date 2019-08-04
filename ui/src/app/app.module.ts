import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, BaseRequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { LoginModule } from './views/login/login.module';
import { AppConfig } from './config/app.config';
import { CoreModulesModule } from './core-modules/coreModules.module';
import { APPLICATION_SERVICES } from './config/app-module.config';
import { DirectivesModule } from './directives/directives.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    CoreModulesModule,
    DirectivesModule,
    routing
  ],
  providers: [
    AppConfig,
    BaseRequestOptions,
    ...APPLICATION_SERVICES
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
