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


@NgModule({
  declarations: [
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent,
    GenerarHistoriaClinicaComponent,
    RegistrarCitaMedicaComponent,
    RegistrarAtencionMedicaComponent,
    IdentifTendenciaComponent
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
    IdentifTendenciaComponent
  ]
})
export class ModulesModule { }
