import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { TriajeService } from './services/triaje/triaje.service'
import { InfectadoService } from './services/infectado/infectado.service'
import { LoginService } from './services/login/login.service'
import { InicioService } from './services/inicio/inicio.service'
import { ConsultaService } from './services/consulta/consulta.service'

import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TriajeComponent } from './components/triaje/triaje.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { InfectadoComponent } from './components/infectado/infectado.component';
import { ResponseComponent } from './components/response/response.component';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TriajeComponent,
    InicioComponent,
    FooterComponent,
    MessageComponent,
    LoginComponent,
    ConsultasComponent,
    InfectadoComponent,
    ResponseComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [TriajeService, LoginService, InfectadoService,InicioService,ConsultaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
