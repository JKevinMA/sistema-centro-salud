import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  
  user:Login = {usuario:'',contrasena:''};

  constructor(private api:ApiService,private router:Router) {
  }
  
  ngOnInit(): void {
  }

  login(forma:NgForm){
    
    if(forma.invalid) return;

    Swal.fire({
      allowOutsideClick:false,
      icon: 'info',
      title:'Login',
      text:'Ingresando...',
    });

    Swal.showLoading();

    this.api.login(this.user).subscribe(r=>{
      if(r.status == 'success' ){
        Swal.close();
        this.router.navigate(['inicio/reg-personal-medico']);
      }else if(r.status == 'error'){
        Swal.fire({
          allowOutsideClick:false,
          icon: 'error',
          title:'Error al ingresar',
          text:r.message,
        });
      }
    },(err=>{
      console.log(err);
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
    }));
  }

}
