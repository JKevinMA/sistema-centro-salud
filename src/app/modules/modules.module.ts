import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPersonalMedicoComponent } from './registrar-personal-medico/registrar-personal-medico.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegistrarPacienteComponent } from './registrar-paciente/registrar-paciente.component';
import { GenerarHistoriaClinicaComponent } from './generar-historia-clinica/generar-historia-clinica.component';
import { RegistrarCitaMedicaComponent } from './registrar-cita-medica/registrar-cita-medica.component';


@NgModule({
  declarations: [
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent,
    GenerarHistoriaClinicaComponent,
    RegistrarCitaMedicaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  exports:[
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent,
    GenerarHistoriaClinicaComponent,
    RegistrarCitaMedicaComponent
  ]
})
export class ModulesModule { }
