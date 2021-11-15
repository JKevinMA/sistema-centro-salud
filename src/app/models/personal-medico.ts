import { Persona } from "./persona.model";

export class PersonalMedico{
    
    Persona!:Persona;
    
    FechaInicio!:Date;
    FechaFin!:Date;
    Correo!:string;
    Usuario!:string;
    Contrasena!:string;

    Horario_idHorario!:number;
    Rol_idRol!:number;
    
}