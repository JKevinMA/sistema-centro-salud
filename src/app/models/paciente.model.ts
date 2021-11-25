import { Persona } from "./persona.model";

export class Paciente{
    Persona_idPersona!:number;
    Persona!:Persona;
    
    Peso!:number;
    Estatura!:number;
    Saturacion!:number;
    Pulso!:number;
    
    Alergeno!:string;
    Enfermedad!:string;

    TosPersistente!:number;
    PresionPecho!:number;
    DificultadRespirar!:number;
    SilbidoPecho!:number;
}