import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GenerarHistoriaClinicaComponent } from './modules/generar-historia-clinica/generar-historia-clinica.component';
import { IdentifTendenciaComponent } from './modules/identif-tendencia/identif-tendencia.component';
import { RegistrarAtencionMedicaComponent } from './modules/registrar-atencion-medica/registrar-atencion-medica.component';
import { RegistrarCitaMedicaComponent } from './modules/registrar-cita-medica/registrar-cita-medica.component';
import { RegistrarPacienteComponent } from './modules/registrar-paciente/registrar-paciente.component';
import { RegistrarPersonalMedicoComponent } from './modules/registrar-personal-medico/registrar-personal-medico.component';
import { ReporteAtencionMedicaComponent } from './modules/reporte-atencion-medica/reporte-atencion-medica.component';
import { ReporteCitaMedicaComponent } from './modules/reporte-cita-medica/reporte-cita-medica.component';
import { ReporteHistoriaClinicaComponent } from './modules/reporte-historia-clinica/reporte-historia-clinica.component';
import { ReportePacienteComponent } from './modules/reporte-paciente/reporte-paciente.component';
import { ReportePersonalMedicoComponent } from './modules/reporte-personal-medico/reporte-personal-medico.component';
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
        path:'reporte-personal-medico',
        component: ReportePersonalMedicoComponent
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
        path:'reporte-historia-clinica',
        component: ReporteHistoriaClinicaComponent
      },
      {
        path:'reporte-paciente',
        component: ReportePacienteComponent
      },
      {
        path:'reg-cita-medica',
        component: RegistrarCitaMedicaComponent
      },
      {
        path:'reporte-cita-medica',
        component: ReporteCitaMedicaComponent
      },
      {
        path:'reg-atencion-medica',
        component: RegistrarAtencionMedicaComponent
      },
      {
        path:'reporte-atencion-medica',
        component: ReporteAtencionMedicaComponent
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
