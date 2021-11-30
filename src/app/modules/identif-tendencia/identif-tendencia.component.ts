import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { User } from 'src/app/models/login.model';
import { Paciente } from 'src/app/models/paciente.model';
import { Persona } from 'src/app/models/persona.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

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

  dni!:number;
  user:User | undefined;
  persona:Persona =new Persona();
  paciente:Paciente =new Paciente();

  contadorAlto=0;
  contadorBajo=0;
  precision:number=0;
  IPA:string='No';
  resultados:any[]=[];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.paciente.Persona = this.persona;
    var objectUser = localStorage.getItem('user');
    if(objectUser!=null){
      this.user = JSON.parse(objectUser);
    }
  }

  buscarDni(){
    this.api.obtenerPersona(this.dni).subscribe(r=>{
      if(r.res.length>0){
        this.parsearPaciente(r);
      }else{
        this.persona =new Persona();
        this.paciente =new Paciente();
        this.paciente.Persona = this.persona;
      }

    });
  }

  predecir(){
    console.log(this.paciente);
    this.contadorAlto=0;
    this.contadorBajo=0; 
    
    this.resultados=[];
    if(this.paciente.Enfermedad=='-'){
      this.contadorBajo++;
      this.resultados.push({variable:'Enfermedad Hereditaria',valor:0});
    }else{
      this.contadorAlto++;
      this.resultados.push({variable:'Enfermedad Hereditaria',valor:1});
    }
    
    if(this.paciente.Saturacion>95){
      this.contadorBajo++;
      this.resultados.push({variable:'Saturacion',valor:0});
    }else{
      this.contadorAlto++;
      this.resultados.push({variable:'Saturacion',valor:1});
    }

    var IMC =this.paciente.Peso / (this.paciente.Estatura*this.paciente.Estatura);
    if(IMC>=25 && IMC<=35){
      this.contadorAlto++;
      this.resultados.push({variable:'IMC',valor:1});
    }else if(IMC>=18.5 && IMC<=24.9){
      this.contadorBajo++;
      this.resultados.push({variable:'IMC',valor:0});
    }

    if(this.paciente.Alergeno=='-'){
      this.contadorBajo++;
      this.resultados.push({variable:'Alérgeno',valor:0});
    }else{
      this.contadorAlto++;
      this.resultados.push({variable:'Alérgeno',valor:1});
    }

    if(this.paciente.TosPersistente){
      this.contadorAlto++;
      this.resultados.push({variable:'Tos Persistente',valor:1});
    }else{
      this.contadorBajo++;
      this.resultados.push({variable:'Tos Persistente',valor:0});
    }

    if(this.paciente.PresionPecho){
      this.contadorAlto++;
      this.resultados.push({variable:'Presion en el pecho',valor:1});
    }else{
      this.contadorBajo++;
      this.resultados.push({variable:'Presion en el pecho',valor:0});
    }

    if(this.paciente.SilbidoPecho){
      this.contadorAlto++;
      this.resultados.push({variable:'Silbido en el pecho',valor:1});
    }else{
      this.contadorBajo++;
      this.resultados.push({variable:'Silbido en el pecho',valor:0});
    }

    if(this.paciente.DificultadRespirar){
      this.contadorAlto++;
      this.resultados.push({variable:'Dificultad para respirar',valor:1});
    }else{
      this.contadorBajo++;
      this.resultados.push({variable:'Dificultad para respirar',valor:0});
    }

    var probAlto = (this.contadorAlto/(this.contadorAlto + this.contadorBajo)*100);
    var probBajo = (this.contadorBajo/(this.contadorAlto + this.contadorBajo)*100);
    
    console.log('probAlto',probAlto);
    console.log('probBajo',probBajo);

    if(probBajo>probAlto){
      this.IPA = 'No';
      console.log();
    }else if(probAlto>probBajo){
      this.IPA = 'Sí';
      console.log();
    }

    /* this.radarChartData = [
      { data: resultados, label: 'Valor' }
    ]; */

    this.pieChartLabels= ['Alto ('+probAlto+' %)', 'Bajo ('+probBajo+' %)'];
    this.pieChartData = [probAlto,probBajo];


  }

  registrar(forma:NgForm){
    /* Swal.fire({
      title: 'Confirmación',
      text:'Esta seguro de registrar la atención médica?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Registrar`,
      denyButtonText: `Cancelar`,
      allowOutsideClick:false,
      icon:'info'
    }).then((result) => {
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
    }); */
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
    this.paciente.PresionPecho = r.res[0]["PresionPecho"];
    this.paciente.DificultadRespirar = r.res[0]["DificultadRespirar"];
    this.paciente.TosPersistente = r.res[0]["TosPersistente"];
    this.paciente.SilbidoPecho = r.res[0]["SilbidoPecho"];
    console.log(this.paciente);
  }

  imprimir(){
    window.print();
  }

}
