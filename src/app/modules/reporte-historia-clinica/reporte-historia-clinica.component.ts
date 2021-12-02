import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reporte-historia-clinica',
  templateUrl: './reporte-historia-clinica.component.html',
  styleUrls: ['./reporte-historia-clinica.component.css']
})
export class ReporteHistoriaClinicaComponent implements OnInit {

  
  pacientes: Paciente[]=[];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.api.obtenerPacientes().subscribe(r=>{
      if(r.status="success"){
        this.parsearPaciente(r.res);
        /* this.pacientes = r.res; */
      }
    })
  }
  parsearPaciente(res:any){
    
    res.forEach((r:any)=>{
      var paciente = new Paciente();
      var persona = new Persona();
      paciente.Persona  = persona;

      paciente.Persona.idPersona = r["idPersona"];
      paciente.Persona.DNI = r["DNI"];
      paciente.Persona.Nombre = r["Nombre"];
      paciente.Persona.Apellido_Materno = r["Apellido_Materno"];
      paciente.Persona.Apellido_Paterno = r["Apellido_Paterno"];
      paciente.Persona.Edad = r["Edad"];
      paciente.Persona.Fecha_Nacimiento = r["Fecha_Nacimiento"];
      paciente.Persona.Sexo = r["Sexo"];
      paciente.Persona.Celular = r["Celular"];
      paciente.Estatura = r["Estatura"];
      paciente.Peso = r["Peso"];
      paciente.Alergeno = r["Alergeno"];
      paciente.Enfermedad = r["Enfermedad"];
      paciente.Saturacion = r["Saturacion"];
      paciente.Pulso = r["Pulso"];
      paciente.Persona_idPersona = r["idPersona"];
      paciente.PresionPecho = r["PresionPecho"];
      paciente.DificultadRespirar = r["DificultadRespirar"];
      paciente.TosPersistente = r["TosPersistente"];
      paciente.SilbidoPecho = r["SilbidoPecho"];
      this.pacientes.push(paciente);
    });
    
  }
}
