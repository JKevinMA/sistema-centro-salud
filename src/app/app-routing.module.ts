import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GenerarHistoriaClinicaComponent } from './modules/generar-historia-clinica/generar-historia-clinica.component';
import { IdentifTendenciaComponent } from './modules/identif-tendencia/identif-tendencia.component';
import { RegistrarAtencionMedicaComponent } from './modules/registrar-atencion-medica/registrar-atencion-medica.component';
import { RegistrarCitaMedicaComponent } from './modules/registrar-cita-medica/registrar-cita-medica.component';
import { RegistrarPacienteComponent } from './modules/registrar-paciente/registrar-paciente.component';
import { RegistrarPersonalMedicoComponent } from './modules/registrar-personal-medico/registrar-personal-medico.component';
import { InicioPageComponent } from './pages/inicio-page/inicio-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    component: LoginPageComponent,
    path: 'login'
  },
  {
    component: InicioPageComponent,
    path: 'inicio',
    children:[
      {
        path:'reg-personal-medico',
        component: RegistrarPersonalMedicoComponent
      },
      {
        path:'reg-paciente',
        component: RegistrarPacienteComponent
      }
      ,
      {
        path:'gen-historia-clinica',
        component: GenerarHistoriaClinicaComponent
      },
      {
        path:'reg-cita-medica',
        component: RegistrarCitaMedicaComponent
      },
      {
        path:'reg-atencion-medica',
        component: RegistrarAtencionMedicaComponent
      },
      {
        path:'identificacion-tendencia',
        component: IdentifTendenciaComponent
      },
    ],
    canActivate:[AuthGuard]
  }
  ,
  {
    path: '**', redirectTo:'/login',pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
