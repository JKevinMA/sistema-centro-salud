import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-paciente',
  templateUrl: './registrar-paciente.component.html',
  styleUrls: ['./registrar-paciente.component.css']
})
export class RegistrarPacienteComponent implements OnInit {
  model!: NgbDateStruct;
  persona: Persona = new Persona();
  paciente: Paciente = new Paciente();

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.persona.Sexo = "M";
    this.paciente.Persona = this.persona;
  }

  registrar(forma: NgForm) {
    
    
    Swal.fire({
      title: 'Confirmación',
      text: 'Esta seguro de registrar el paciente?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Registrar`,
      denyButtonText: `Cancelar`,
      allowOutsideClick: false,
      icon: 'info'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.persona.Fecha_Nacimiento = new Date(this.model.year, this.model.month - 1, this.model.day);
        let timeDiff = Math.abs(Date.now() - this.persona.Fecha_Nacimiento.getTime());
        this.persona.Edad = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Registrando paciente',
          text: 'Cargando...',
        });

        Swal.showLoading();

        this.api.registrarPaciente(this.paciente).subscribe(r => {
          if (r.status == "success") {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              title: 'Éxito',
              text: 'Se ha registrado correctamente!',
            }).then((result) => {
              this.paciente = new Paciente();
              window.location.reload();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: r.message,
              icon: 'error'
            });
          }
        }, err => {
          if (err.name == "HttpErrorResponse") {
            Swal.fire({
              allowOutsideClick: false,
              icon: 'error',
              title: 'Error al conectar',
              text: 'Error de comunicación con el servidor',
            });
            return;
          }
          Swal.fire({
            allowOutsideClick: false,
            icon: 'error',
            title: err.name,
            text: err.message,
          });
        });

      } else if (result.isDenied) {

      }
    });


  }

}
