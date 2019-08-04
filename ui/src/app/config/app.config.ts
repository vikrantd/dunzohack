import { Inject, Injectable } from '@angular/core';
import { environment } from '../environment/environment';


@Injectable()
export class AppConfig {

    // To return API Url based on the current environment
    public serviceBase(){
        return environment.apiUrl;
    }
}
