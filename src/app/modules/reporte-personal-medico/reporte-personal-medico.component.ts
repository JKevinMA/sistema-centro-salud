import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Persona } from 'src/app/models/persona.model';
import { PersonalMedico } from 'src/app/models/personal-medico';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reporte-personal-medico',
  templateUrl: './reporte-personal-medico.component.html',
  styleUrls: ['./reporte-personal-medico.component.css']
})
export class ReportePersonalMedicoComponent implements OnInit {

  personalmedico: PersonalMedico[]=[];
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
    this.api.obtenerPersonalMedico().subscribe(r=>{
      if(r.status="success"){
        console.log(r);
        this.parsearPM(r.res);
        this.dtTrigger.next();
        /* this.pacientes = r.res; */
      }
    })
  }
  parsearPM(res:any){
    
    res.forEach((r:any)=>{
      var pm = new PersonalMedico();
      var persona = new Persona();
      pm.Persona  = persona;

      pm.Persona.idPersona = r["idPersona"];
      pm.Persona.DNI = r["DNI"];
      pm.Persona.Nombre = r["Nombre"];
      pm.Persona.Apellido_Materno = r["Apellido_Materno"];
      pm.Persona.Apellido_Paterno = r["Apellido_Paterno"];
      pm.Persona.Edad = r["Edad"];
      pm.Persona.Fecha_Nacimiento = r["Fecha_Nacimiento"];
      pm.Persona.Sexo = r["Sexo"];
      pm.Persona.Celular = r["Celular"];
      pm.Correo = r["correo"];
      pm.Rol = r["rol"];
      pm.Usuario = r["usuario"];
      pm.Contrasena = r["contrasena"];
      this.personalmedico.push(pm);
    });
    
  }
}
