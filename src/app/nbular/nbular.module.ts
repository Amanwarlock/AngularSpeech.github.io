import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbListModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';



@NgModule({
  declarations: [],
  imports: [
    NbCardModule,
    NbButtonModule,
    NbListModule,
    CommonModule
  ],
  exports:[
    NbCardModule,
    NbButtonModule,
    NbListModule
  ]
})
export class NbularModule { }
