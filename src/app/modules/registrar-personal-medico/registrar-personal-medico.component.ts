import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest } from 'rxjs';
import { Horario } from 'src/app/models/horario.model';
import { Persona } from 'src/app/models/persona.model';
import { PersonalMedico } from 'src/app/models/personal-medico';
import { Rol } from 'src/app/models/roles.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-registrar-personal-medico',
  templateUrl: './registrar-personal-medico.component.html',
  styleUrls: ['./registrar-personal-medico.component.css']
})
export class RegistrarPersonalMedicoComponent implements OnInit {

  model!: NgbDateStruct;
  persona:Persona =new Persona();
  personalMedico:PersonalMedico =new PersonalMedico();

  horarios:Horario[] | undefined;
  roles:Rol[] | undefined;

  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.personalMedico.Persona = this.persona;
    this.cargarCombos();
  }

  cargarCombos(){

    combineLatest([
     this.api.obtenerHorarios(),
     this.api.obtenerRoles()
    ]).subscribe(([res1,res2])=>{
      this.horarios = res1.res;
      this.roles = res2.res;
      this.personalMedico.Horario_idHorario = 0;
      this.personalMedico.Rol_idRol = 0;
    });

  }

  registrar(forma:NgForm){
    this.persona.Fecha_Nacimiento = new Date(this.model.year,this.model.month-1,this.model.day);
    let timeDiff = Math.abs(Date.now() - this.persona.Fecha_Nacimiento.getTime());
    this.persona.Edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

    Swal.fire({
      title: 'Confirmación',
      text:'Esta seguro de registrar el personal médico?',
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
          title:'Registrando personal médico',
          text:'Cargando...',
        });
    
        Swal.showLoading();

        this.api.registrarPersonalMedico(this.personalMedico).subscribe(r=>{
          if(r.status == "success"){
            Swal.fire({
              allowOutsideClick:false,
              icon: 'success',
              title:'Éxito',
              text:'Se ha registrado correctamente!',
            }).then((result) => {
              this.personalMedico= new PersonalMedico();
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
              title:'Error al ingresar',
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
}
