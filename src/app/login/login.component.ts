import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { 
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  ngOnInit(): void {
    if(this.loginService.isAlreadyLogin()) {
      this.loginService.sendToRoute('dashboard');
    };
  }

  onSubmit(loginData: any): void {
    this.loginService.login(loginData);
  }
}