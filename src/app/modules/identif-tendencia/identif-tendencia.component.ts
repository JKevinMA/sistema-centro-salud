import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { PdfMakeWrapper, Txt } from 'pdfmake-wrapper';
import { Diagnostico } from 'src/app/models/diagnostico.model';
import { User } from 'src/app/models/login.model';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-identif-tendencia',
  templateUrl: './identif-tendencia.component.html',
  styleUrls: ['./identif-tendencia.component.css']
})
export class IdentifTendenciaComponent implements OnInit {
  // RADAR CHART
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Enfermedad', 'Saturacion', 'IMC', 'Alergeno', 'Tos Persistente', 'Presion en el pecho', 'Silbido en el pecho', 'Dificultad para respirar'];

  public radarChartData: ChartDataSets[] = [
  ];
  public radarChartType: ChartType = 'radar';

  // PIE CHART
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
  };
  public pieChartLabels: Label[] = ['Alto', 'Bajo'];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  dni!: number;
  user: User | undefined;
  persona: Persona = new Persona();
  paciente: Paciente = new Paciente();

  contadorAlto = 0;
  contadorBajo = 0;
  precision: number = 0;
  IPA: string = 'No';
  resultados: any[] = [];
  mensaje: string = "";
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.paciente.Persona = this.persona;
    var objectUser = localStorage.getItem('user');
    if (objectUser != null) {
      this.user = JSON.parse(objectUser);
    }
    if (this.user!.Rol = 'Paciente') {
      this.dni = this.user!.Dni;
      this.buscarDni();
    }
  }

  buscarDni() {
    this.api.obtenerPersona(this.dni).subscribe(r => {
      if (r.res.length > 0) {
        this.parsearPaciente(r);
      } else {
        this.persona = new Persona();
        this.paciente = new Paciente();
        this.paciente.Persona = this.persona;

        Swal.fire({
          title: 'Info',
          text: 'No existe paciente, ingrese otro valor ',
          allowOutsideClick: true,
          icon: 'info'
        });

      }

    });
  }

  predecir() {
    console.log(this.paciente);
    this.contadorAlto = 0;
    this.contadorBajo = 0;

    this.resultados = [];
    if (this.paciente.Enfermedad == '-') {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Enfermedad Hereditaria', valor: 0 });
    } else {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Enfermedad Hereditaria', valor: 1 });
    }

    if (this.paciente.Saturacion > 95) {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Saturacion', valor: 0 });
    } else {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Saturacion', valor: 1 });
    }

    var IMC = this.paciente.Peso / (this.paciente.Estatura * this.paciente.Estatura);
    if (IMC >= 25 && IMC <= 35) {
      this.contadorAlto++;
      this.resultados.push({ variable: 'IMC', valor: 1 });
    } else if (IMC >= 18.5 && IMC <= 24.9) {
      this.contadorBajo++;
      this.resultados.push({ variable: 'IMC', valor: 0 });
    }

    if (this.paciente.Alergeno == '-') {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Alérgeno', valor: 0 });
    } else {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Alérgeno', valor: 1 });
    }

    if (this.paciente.TosPersistente) {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Tos Persistente', valor: 1 });
    } else {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Tos Persistente', valor: 0 });
    }

    if (this.paciente.PresionPecho) {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Presion en el pecho', valor: 1 });
    } else {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Presion en el pecho', valor: 0 });
    }

    if (this.paciente.SilbidoPecho) {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Silbido en el pecho', valor: 1 });
    } else {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Silbido en el pecho', valor: 0 });
    }

    if (this.paciente.DificultadRespirar) {
      this.contadorAlto++;
      this.resultados.push({ variable: 'Dificultad para respirar', valor: 1 });
    } else {
      this.contadorBajo++;
      this.resultados.push({ variable: 'Dificultad para respirar', valor: 0 });
    }

    var probAlto = (this.contadorAlto / (this.contadorAlto + this.contadorBajo) * 100);
    var probBajo = (this.contadorBajo / (this.contadorAlto + this.contadorBajo) * 100);

    console.log('probAlto', probAlto);
    console.log('probBajo', probBajo);


    var icon: SweetAlertIcon = 'info';
    if (probBajo > probAlto) {
      this.IPA = 'No';
      this.mensaje = "Usted NO presenta riesgo de padecer asma";
      icon = 'info';
    } else if (probAlto > probBajo) {
      this.IPA = 'Si';
      this.mensaje = "Usted SI presenta riesgo de padecer asma";
      icon = 'warning';
    } else if (probAlto == probBajo) {
      this.mensaje = "Usted debe consultar a un especialista";
      icon = 'warning';
    }

    /* Usted debe consultar a un especialista */
    /* this.radarChartData = [
      { data: resultados, label: 'Valor' }
    ]; */

    this.pieChartLabels = ['Alto (' + probAlto + ' %)', 'Bajo (' + probBajo + ' %)'];
    this.pieChartData = [probAlto, probBajo];

    Swal.fire({ title: 'Resultado', icon: icon, text: this.mensaje })

  }

  registrar(forma: NgForm) {
    Swal.fire({
      title: 'Confirmación',
      text: 'Esta seguro de registrar la Identificación?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Registrar`,
      denyButtonText: `Cancelar`,
      allowOutsideClick: false,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          title: 'Registrando identificación de tendencia',
          text: 'Cargando...',
        });

        Swal.showLoading();



        var diag = new Diagnostico();
        diag.Indice_Predictivo = this.IPA;
        diag.Medico_idPersona = this.user!.Persona_idPersona;
        diag.Paciente_idPersona = this.paciente.Persona.idPersona;

        this.api.registrarDiagnostico(diag).subscribe(r => {
          if (r.status == "success") {

            Swal.fire({
              allowOutsideClick: false,
              icon: 'success',
              title: 'Éxito',
              text: 'Se ha registrado correctamente!',
            }).then((result) => {
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

  parsearPaciente(r: any) {
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
    this.paciente.PresionPecho = r.res[0]["PresionPecho"];
    this.paciente.DificultadRespirar = r.res[0]["DificultadRespirar"];
    this.paciente.TosPersistente = r.res[0]["TosPersistente"];
    this.paciente.SilbidoPecho = r.res[0]["SilbidoPecho"];
    console.log(this.paciente);
  }

  exportar() {
    const pdf = new PdfMakeWrapper();
    var fecha = new Date();
    pdf.header(fecha.getDate() + '/' + (fecha.getMonth() + 1) + '/' + fecha.getFullYear());
    pdf.add(
      new Txt('Paciente:').bold().fontSize(22).italics().end
    );
    pdf.add(
      new Txt(this.user!.Nombre+'\n\n').end
    );
    pdf.add(
      new Txt('Su resultado es:').bold().fontSize(22).italics().end
    );
    pdf.add(
      new Txt(this.mensaje+'\n\n').end
    );
    pdf.add(
      new Txt('Sus detalles:').bold().fontSize(22).italics().end
    );
    
    pdf.add(
      new Txt(this.resultados[0].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[0].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de enfermedad hereditaria por parte de los Padres.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[3].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[3].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de alergeno.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[1].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[1].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de su saturación de oxígeno.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[2].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[2].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de índice de masa corporal, se recomienda llevar un nutrición balanceada.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[4].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[4].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de tos persistente.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[5].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[5].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de Presión en el pecho.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[6].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[6].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de Silbido en el pecho.\n\n").end
    );

    pdf.add(
      new Txt(this.resultados[7].variable+':').bold().fontSize(14).end
    );
    var m = this.resultados[7].valor==1?'Alto':'Bajo';
    pdf.add(
      new Txt(m+": El paciente presenta un nivel "+m+" de Dificultad para respirar.\n\n").end
    );
    pdf.create().open();
  }

  salir() {
    Swal.fire({
      title: 'Salir',
      text: 'Si sale, se perderán los datos',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Salir`,
      denyButtonText: `Cancelar`,
      allowOutsideClick: false,
      icon: 'info'
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
      } else if (result.isDenied) {
      }
    });
  }

}
