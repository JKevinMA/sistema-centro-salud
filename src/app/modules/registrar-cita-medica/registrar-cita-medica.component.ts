import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CitaMedica } from 'src/app/models/cita-medica.model';
import { User } from 'src/app/models/login.model';
import { Medico } from 'src/app/models/medico.model';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-cita-medica',
  templateUrl: './registrar-cita-medica.component.html',
  styleUrls: ['./registrar-cita-medica.component.css']
})
export class RegistrarCitaMedicaComponent implements OnInit {
  model!: NgbDateStruct;
  dni!:number;
  constructor(private api:ApiService) { }

  persona:Persona =new Persona();
  paciente:Paciente =new Paciente();
  citamedica:CitaMedica = new CitaMedica();

  user:User | undefined;

  ngOnInit(): void {
    this.paciente.Persona = this.persona;
    this.citamedica.Hora='0';
    this.obtenerUsuario();
    if(this.user?.Rol=="Paciente"){
      this.dni = this.user.Dni;
      this.buscarDni();
    }
  }

  obtenerUsuario(){
    var objectUser = localStorage.getItem('user');
    if(objectUser!=null){
      this.user = JSON.parse(objectUser);
    }
  }

  buscarDni(){
    this.api.obtenerPersona(this.dni).subscribe(r=>{
      if(r.res.length>0){
        this.paciente.Persona = r.res[0];
      }else{
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
      text:'Esta seguro de registrar la cita médica?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Registrar`,
      denyButtonText: `Cancelar`,
      allowOutsideClick:false,
      icon:'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.citamedica.Fecha = new Date(this.model.year,this.model.month-1,this.model.day);
        this.citamedica.Paciente_Persona_idPersona = this.paciente.Persona.idPersona;
        Swal.fire({
          allowOutsideClick:false,
          icon: 'info',
          title:'Registrando cita médica',
          text:'Cargando...',
        });
    
        Swal.showLoading();

        this.api.registrarCitaMedica(this.citamedica).subscribe(r=>{
          if(r.status == "success"){
            Swal.fire({
              allowOutsideClick:false,
              icon: 'success',
              title:'Éxito',
              text:'Se ha registrado correctamente!',
            }).then((result) => {
              this.citamedica= new CitaMedica();
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
      } else if (result.isDenied) {
      }
    });
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
