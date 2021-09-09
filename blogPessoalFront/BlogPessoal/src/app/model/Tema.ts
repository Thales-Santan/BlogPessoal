import { Postagem } from "./Postagem"

export class Tema{
    public id: number
    public descricao: string
    public postagem: Postagem[] //Como o Postagem é um array, precisamos colocar o simbolo [] que define que um obj é array.
}