import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPersonalMedicoComponent } from './registrar-personal-medico/registrar-personal-medico.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegistrarPacienteComponent } from './registrar-paciente/registrar-paciente.component';
import { GenerarHistoriaClinicaComponent } from './generar-historia-clinica/generar-historia-clinica.component';
import { RegistrarCitaMedicaComponent } from './registrar-cita-medica/registrar-cita-medica.component';
import { RegistrarAtencionMedicaComponent } from './registrar-atencion-medica/registrar-atencion-medica.component';
import { IdentifTendenciaComponent } from './identif-tendencia/identif-tendencia.component';
import { ChartsModule } from 'ng2-charts';
import { ReportePersonalMedicoComponent } from './reporte-personal-medico/reporte-personal-medico.component';
import { ReportePacienteComponent } from './reporte-paciente/reporte-paciente.component';
import { ReporteHistoriaClinicaComponent } from './reporte-historia-clinica/reporte-historia-clinica.component';
import { ReporteCitaMedicaComponent } from './reporte-cita-medica/reporte-cita-medica.component';
import { ReporteAtencionMedicaComponent } from './reporte-atencion-medica/reporte-atencion-medica.component';


@NgModule({
  declarations: [
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent,
    GenerarHistoriaClinicaComponent,
    RegistrarCitaMedicaComponent,
    RegistrarAtencionMedicaComponent,
    IdentifTendenciaComponent,
    ReportePersonalMedicoComponent,
    ReportePacienteComponent,
    ReporteHistoriaClinicaComponent,
    ReporteCitaMedicaComponent,
    ReporteAtencionMedicaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ChartsModule
  ],
  exports:[
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent,
    GenerarHistoriaClinicaComponent,
    RegistrarCitaMedicaComponent,
    RegistrarAtencionMedicaComponent,
    IdentifTendenciaComponent,
    ReportePersonalMedicoComponent,
    ReportePacienteComponent,
    ReporteHistoriaClinicaComponent,
    ReporteCitaMedicaComponent,
    ReporteAtencionMedicaComponent
  ]
})
export class ModulesModule { }
