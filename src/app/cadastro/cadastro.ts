import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { EnderecoService } from '../services/endereco.service';

@Component({
  selector: 'app-cadastro',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})

export class Cadastro {
  private enderecoService = inject(EnderecoService);
  
  passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

  form = new FormGroup({
    nome: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required, Validators.email]),
    senha: new FormControl('',[Validators.required, Validators.pattern(this.passwordRegex)]),
    cep: new FormControl(''),
    logradouro: new FormControl({value:'', disabled: true}),
    numero: new FormControl(''),
    complemento: new FormControl(''),
    uf: new FormControl({value:'', disabled: true}),
    bairro: new FormControl({value:'', disabled: true}),
    localidade: new FormControl({value:'', disabled: true})
});

onSubmit(){
  if(this.form.valid)
    console.log("Formulário Válido: ", this.form.value)
  else
    console.log("Formulário Inválido: ", this.form.value)
}

regraMinimoCaractere:boolean = false;
regraMaximoCaractere:boolean = false;
regraLetraMaiuscula:boolean = false;
regraCaractereEspecial:boolean = false;
regraLetraNumero:boolean = false;


validarSenha(senha: string): void{

  //Regex das regras
  const rxMin8 = /^.{8,}$/;
  const rxMax16 = /^.{0,16}$/;
  const rxMaiuscula = /[A-Z]/;
  const rxEspecial = /[^a-zA-z0-9]/;
  const rxNumero = /\d/;
  const rxLetra = /[A-Za-z]/;

  this.regraMinimoCaractere = rxMin8.test(senha);
  this.regraMaximoCaractere = rxMax16.test(senha);
  this.regraLetraMaiuscula = rxMaiuscula.test(senha);
  this.regraCaractereEspecial = rxEspecial.test(senha);
  this.regraLetraNumero = rxNumero.test(senha) && rxLetra.test(senha);
}

get buscarCep(){
  const cep = this.form.get('cep')?.value ?? ''
  this.enderecoService.getEndereco(cep).subscribe(endereco => {
    this.form.get('logradouro')?.setValue(endereco.logradouro);
    this.form.get('uf')?.setValue(endereco.uf);
    this.form.get('bairro')?.setValue(endereco.bairro);
    this.form.get('localidade')?.setValue(endereco.localidade);
  });
return true;
}
}

