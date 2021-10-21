import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthComponent} from "./auth/auth.component";
import { ProcessListComponent } from './process/process-list/process-list.component';
import {FormsModule} from "@angular/forms";
import {LoadingSpinnerComponent} from "./shared/loading-spinner/loading-spinner.component";
import {AuthService} from "./shared/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    ProcessListComponent,
    LoadingSpinnerComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
