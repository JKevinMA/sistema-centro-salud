import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AtencionMedica } from 'src/app/models/atencion-medica.model';
import { User } from 'src/app/models/login.model';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-atencion-medica',
  templateUrl: './registrar-atencion-medica.component.html',
  styleUrls: ['./registrar-atencion-medica.component.css']
})
export class RegistrarAtencionMedicaComponent implements OnInit {

  dni!:number;
  persona:Persona =new Persona();
  paciente:Paciente =new Paciente();
  atencionMedica:AtencionMedica = new AtencionMedica();
  user:User | undefined;
  constructor(private api:ApiService) { 
  }

  ngOnInit(): void {
    this.paciente.Persona = this.persona;

    var objectUser = localStorage.getItem('user');
    if(objectUser!=null){
      this.user = JSON.parse(objectUser);
    }
    this.atencionMedica.idMedico = this.user!.Persona_idPersona;
  }

  buscarDni(){
    this.api.obtenerPersona(this.dni).subscribe(r=>{
      if(r.res.length>0){
        this.parsearPaciente(r);
      }else{
        this.persona =new Persona();
        this.paciente =new Paciente();
        this.paciente.Persona = this.persona;
        Swal.fire({
          title: 'Info',
          text:'No existe paciente, ingrese otro valor ',
          allowOutsideClick:true,
          icon:'info'
        });
      }

    });
  }
  registrar(forma:NgForm){
    Swal.fire({
      title: 'Confirmación',
      text:'Esta seguro de registrar la atención médica?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Registrar`,
      denyButtonText: `Cancelar`,
      allowOutsideClick:false,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick:false,
          icon: 'info',
          title:'Registrando atención médica',
          text:'Cargando...',
        });
    
        Swal.showLoading();

        this.api.registrarAtencionMedica(this.paciente).subscribe(r=>{
          if(r.status == "success"){
            this.atencionMedica.Fecha = new Date();
            this.atencionMedica.idPaciente = this.paciente.Persona.idPersona;
            this.api.registrarAtencionMedica_2(this.atencionMedica).subscribe(r=>{
              if(r.status == "success"){
                Swal.fire({
                  allowOutsideClick:false,
                  icon: 'success',
                  title:'Éxito',
                  text:'Se ha registrado correctamente!',
                }).then((result) => {
                  this.paciente= new Paciente();
                  window.location.reload();
                });
              }else{
                Swal.fire({
                  title:'Error',
                  text: r.message,
                  icon:'error'
                });
              }
            },err=>{
              if(err.name=="HttpErrorResponse"){
                Swal.fire({
                  allowOutsideClick:false,
                  icon: 'error',
                  title:'Error al conectar',
                  text:'Error de comunicación con el servidor',
                });
                return;
              }
              Swal.fire({
                allowOutsideClick:false,
                icon: 'error',
                title:err.name,
                text:err.message,
              });
            });
          }else{
            Swal.fire({
              title:'Error',
              text: r.message,
              icon:'error'
            });
          }
        },err=>{
          if(err.name=="HttpErrorResponse"){
            Swal.fire({
              allowOutsideClick:false,
              icon: 'error',
              title:'Error al conectar',
              text:'Error de comunicación con el servidor',
            });
            return;
          }
          Swal.fire({
            allowOutsideClick:false,
            icon: 'error',
            title:err.name,
            text:err.message,
          });
        });
      } else if (result.isDenied) {
      }
    });
  }

  parsearPaciente(r:any){
    this.paciente.Persona.idPersona = r.res[0]["idPersona"];
    this.paciente.Persona.DNI = r.res[0]["DNI"];
    this.paciente.Persona.Nombre = r.res[0]["Nombre"];
    this.paciente.Persona.Apellido_Materno = r.res[0]["Apellido_Materno"];
    this.paciente.Persona.Apellido_Paterno = r.res[0]["Apellido_Paterno"];
    this.paciente.Persona.Edad = r.res[0]["Edad"];
    this.paciente.Persona.Fecha_Nacimiento = r.res[0]["Fecha_Nacimiento"];
    this.paciente.Persona.Sexo = r.res[0]["Sexo"];
    this.paciente.Persona.Celular = r.res[0]["Celular"];
    this.paciente.Estatura = r.res[0]["Estatura"];
    this.paciente.Peso = r.res[0]["Peso"];
    this.paciente.Alergeno = r.res[0]["Alergeno"];
    this.paciente.Enfermedad = r.res[0]["Enfermedad"];
    this.paciente.Saturacion = r.res[0]["Saturacion"];
    this.paciente.Pulso = r.res[0]["Pulso"];
    this.paciente.Persona_idPersona = r.res[0]["idPersona"];
    this.paciente.PresionPecho = 0;
    this.paciente.DificultadRespirar = 0;
    this.paciente.TosPersistente = 0;
    this.paciente.SilbidoPecho = 0;
    console.log(this.paciente);
  }

  salir(){
    Swal.fire({
      title: 'Salir',
      text:'Si sale, se perderán los datos',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Salir`,
      denyButtonText: `Cancelar`,
      allowOutsideClick:false,
      icon:'info'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDenied) {
      }
    });
  }

}
