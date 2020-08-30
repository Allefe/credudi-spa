import { SharedModule } from './../../../shared/shared.module';
import { PrimengCustomModule } from 'src/app/shared/modules/primeng-custom.module';
import { LoginComponent } from './login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [LoginComponent],
  exports: [LoginComponent],
  entryComponents: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    PrimengCustomModule
  ]
})
export class LoginModule { }
