export interface ResultLogin {
    status: string;
    res:    User;
    message:string;
}

export interface User {
    Nombre: string;
    Rol:    string;
    Persona_idPersona:number;
    Dni:number;
}

export interface Login{
    usuario:string ;
    contrasena:string;
}


