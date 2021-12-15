import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CitaMedica } from 'src/app/models/cita-medica.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reporte-cita-medica',
  templateUrl: './reporte-cita-medica.component.html',
  styleUrls: ['./reporte-cita-medica.component.css']
})
export class ReporteCitaMedicaComponent implements OnInit,OnDestroy {
  citasMedicas: CitaMedica[]=[];
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private api:ApiService) { }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive:true
    };
    this.api.obtenerCitasMedicas().subscribe(r=>{
      if(r.status="success"){
        console.log(r);
        this.parsearCM(r.res);
        this.dtTrigger.next();
        /* this.pacientes = r.res; */
      }
    })
  }
  parsearCM(res:any){
    
    res.forEach((r:any)=>{
      var cm = new CitaMedica();
      var persona = new Persona();
      cm.Persona  = persona;

      cm.Persona.idPersona = r["idPersona"];
      cm.Persona.DNI = r["DNI"];
      cm.Persona.Nombre = r["Nombre"];
      cm.Persona.Apellido_Materno = r["Apellido_Materno"];
      cm.Persona.Apellido_Paterno = r["Apellido_Paterno"];
      cm.Persona.Edad = r["Edad"];
      cm.Persona.Fecha_Nacimiento = r["Fecha_Nacimiento"];
      cm.Persona.Sexo = r["Sexo"];
      cm.Persona.Celular = r["Celular"];
      cm.Fecha = r["Fecha"];
      cm.Hora = r["Hora"];
      cm.Asistencia = r["Asistencia"];

      cm.estaVencido =  new Date(cm.Fecha) < new Date()?true:false;
      this.citasMedicas.push(cm);
    });
    
  }
}
