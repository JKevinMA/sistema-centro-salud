import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  User } from 'src/app/models/login.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inicio-page',
  templateUrl: './inicio-page.component.html',
  styleUrls: ['./inicio-page.component.css']
})
export class InicioPageComponent implements OnInit {

  user:User | undefined;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.obtenerUsuario();
  }

  obtenerUsuario(){
    var objectUser = localStorage.getItem('user');
    if(objectUser!=null){
      this.user = JSON.parse(objectUser);
    }
  }

  cerrarSesion(){
    this.api.logout();
    this.router.navigate(['login']);
  }

}
