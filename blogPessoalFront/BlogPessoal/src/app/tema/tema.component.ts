import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';


@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  //Instanciando o Tema e o Tema[]
  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(private router: Router,
    private temaService : TemaService  //importando e injetando a classe TemaService(que vem do tema.service.ts)
    ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas() // referente ao metodo abaixo
  }

  //Metodo que vai fazer a listagem, na tela do site, dos temas cadastrados. Colocar o metodo no ngOnInit dessa mesma aba, para que toda vez que entramos nela, seja exibida a lista de Temas. Além disso ,teremos alguns ajustes para fazer no tema.component.html, pois usaremos um ngFor para criar um laço de repetiçao
  findAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  //Metodo lincado com evento de click ao botao cadastrar do html do tema. Ele realiza o cadastro de um tema. A linha abaixo do tema possibilita que ao cadastrar um tema, o programa zere o campo de cadastro para que possa ser cadastrado um novo tema
  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp : Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    })
  }
}
