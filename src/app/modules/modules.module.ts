import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarPersonalMedicoComponent } from './registrar-personal-medico/registrar-personal-medico.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RegistrarPacienteComponent } from './registrar-paciente/registrar-paciente.component';


@NgModule({
  declarations: [
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
  ],
  exports:[
    RegistrarPersonalMedicoComponent,
    RegistrarPacienteComponent
  ]
})
export class ModulesModule { }
