import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasswordValidator } from './password.validator';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    PasswordValidator
  ],
  declarations: [
    PasswordValidator
  ],
  providers: []
})

export class DirectivesModule {}
