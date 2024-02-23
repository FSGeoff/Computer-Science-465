import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authentication } from '../auth/authentication';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };
  constructor(
    private router: Router,
    private authentication: Authentication
  ) { }
  ngOnInit() {}
  public onSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      79
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }
  private doLogin(): void {
    this.authentication.login(this.credentials)
      .then(() => this.router.navigateByUrl('#'))
      .catch((message) => this.formError = message);
  }
}
