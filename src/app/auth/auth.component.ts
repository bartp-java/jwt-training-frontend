import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {AuthService} from '../shared/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.authService.login(email, password).subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/processes']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
