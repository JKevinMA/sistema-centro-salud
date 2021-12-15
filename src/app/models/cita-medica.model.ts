import { Persona } from "./persona.model";

export class CitaMedica{
    idCitaMedica!:number;
    Paciente_Persona_idPersona!:number;
    Fecha!:Date;
    Hora!:string;
    Asistencia!:string;

    estaVencido!:boolean;
    Persona!:Persona;
}