import { Persona } from "./persona.model";

export class Paciente{
    
    Persona!:Persona;
    
    Peso!:number;
    Estatura!:number;
    Saturacion!:number;
    Pulso!:number;

    Alergeno!:string;
    Enfermedad!:string;
    Sintomas!:string;

}