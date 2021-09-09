import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(private http: HttpClient) { }

 //Isso traz o token para essa camada,já que no back foi especificado que era necessario o token para acessa esse caminho (que faz os gets e posts e tals do tema)
 token = {headers : new HttpHeaders().set('Authorization',environment.token)}

 //Aplicando os metodos http
 //Como o tema é do tipo array, foi necessario especificar isso usando o []. o $(environment.server) é o caminho do servidor (vide environment.prod) e o /tema o endpoint (relacionados ao back-end)
 getAllTema(): Observable<Tema[]>{
   return this.http.get<Tema[]>('http://localhost:8080/tema',this.token)
 }

 getByIdTema(id:number): Observable<Tema>{
   return this.http.get<Tema>(`http://localhost:8080/tema/${id}`,this.token)
 }

 //Aqui o tema a ser passado é somente um, por isso nao usamos como um array. Dentro do metodo é passado um objeto tema, pq na hora do post, precisamos que tenha um tema. Tbm passamos o token pois está relacionado com a camada de segurança do back-end , que o cobra
 postTema(tema:Tema): Observable<Tema>{
   return this.http.post<Tema>('http://localhost:8080/tema',tema,this.token)
 }//Agora vamos ao tema.component.ts realizar alguns ajustes


 putTema(tema:Tema): Observable<Tema>{
   return this.http.put<Tema>('http://localhost:8080/tema',tema,this.token)
 }
 //o ${id} serve para passar algum parametro no caminho
 deleteTema(id:number){
   return this.http.delete(`http://localhost:8080/tema/${id}`,this.token)
 }
}
