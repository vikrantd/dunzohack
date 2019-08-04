import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchResultsComponent } from './components/search-results.component';
import { SearchResultsRoutingModule } from './search-results.routing.module';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SearchResultsRoutingModule
    ],
    declarations: [
        SearchResultsComponent   
    ],
    providers:[
       
    ]
})

export class SearchModule {}
