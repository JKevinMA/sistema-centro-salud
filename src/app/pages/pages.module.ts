import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioPageComponent } from './inicio-page/inicio-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { ModulesModule } from '../modules/modules.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    LoginPageComponent,
    InicioPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ModulesModule,
    HttpClientModule,
    NgbModule
  ],
  exports:[
    LoginPageComponent,
    InicioPageComponent
  ]
})
export class PagesModule { }
