import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-generar-historia-clinica',
  templateUrl: './generar-historia-clinica.component.html',
  styleUrls: ['./generar-historia-clinica.component.css']
})
export class GenerarHistoriaClinicaComponent implements OnInit {

  dni!:number;
  tieneEnfermedadH = 0;
  esAlergeno = 0;

  persona:Persona =new Persona();
  paciente:Paciente =new Paciente();

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.paciente.Persona = this.persona;
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
      text:'Esta seguro de registrar la historia clinica?',
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
          title:'Registrando historia clinica',
          text:'Cargando...',
        });
    
        Swal.showLoading();

        this.api.registrarHistoriaClinica(this.paciente).subscribe(r=>{
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
        
      } else if (result.isDenied) {}
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
