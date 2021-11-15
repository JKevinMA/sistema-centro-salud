export interface ResultHorarios {
    status: string;
    res:    Horario[];
    message:string;
}

export interface Horario {
    idHorario: number;
    Turno:     string;
}
