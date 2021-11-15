import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login, ResultLogin } from '../models/login.model';
import { PersonalMedico } from '../models/personal-medico';
import { ResultInsert } from '../models/result.model';
import { ResultHorarios } from '../models/horario.model';
import { ResultRoles } from '../models/roles.model';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  BASE_URL = environment.url_api;
  token:string | null="";
  constructor(private http:HttpClient) {
    this.leerToken();
  }

    //Metodos auxiliares
  leerToken() {
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
    }else{
      this.token = "";
    }
  }

  estaAutenticado(): boolean{
    this.leerToken();
    return this.token!.length>2;
  }

  login(usuario:Login){
    return this.http.post<any>(`${this.BASE_URL}login`,usuario)
    .pipe(
      map( (res:ResultLogin) =>{
        if(res!=null){
          this.guardarUsuario(res);
        }
        return res;
        }) 
      );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  guardarUsuario(r:ResultLogin){
    localStorage.setItem('token',"true");
    localStorage.setItem('user',JSON.stringify(r.res));
  }


  // Métodos Principales
  // Personal Medico
  registrarPersonalMedico(personalMedico:PersonalMedico){
    return this.http.post<ResultInsert>(`${this.BASE_URL}personal-medico`,personalMedico);
  }
  obtenerHorarios(){
    return this.http.get<ResultHorarios>(`${this.BASE_URL}horarios`);
  }
  obtenerRoles(){
    return this.http.get<ResultRoles>(`${this.BASE_URL}roles`);
  }
  // Pacientes
  registrarPaciente(paciente:Paciente){
    return this.http.post<ResultInsert>(`${this.BASE_URL}pacientes`,paciente);
  }
}
