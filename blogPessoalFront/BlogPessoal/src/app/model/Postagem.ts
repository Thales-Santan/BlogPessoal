import { Tema } from "./Tema"
import { User } from "./User" 

export class Postagem{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public usuario: User //referente ao relacionamento das tabelas 
    public tema: Tema
}