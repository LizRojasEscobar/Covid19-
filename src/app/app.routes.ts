import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { TriajeComponent } from './components/triaje/triaje.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { ConsultasComponent } from './components/consultas/consultas.component';
import { InfectadoComponent } from './components/infectado/infectado.component';
import { ResponseComponent } from './components/response/response.component';
const APP_ROUTES: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'triaje', component: TriajeComponent },
  { path: 'message/:value/:message', component: MessageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'consultas', component: ConsultasComponent },
  { path: 'infectado/:idusuario/:nombreUsuario', component: InfectadoComponent },
  { path: 'response/:value/:message/:idusuario/:nombreUsuario', component: ResponseComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
