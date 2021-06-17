import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DesignService} from '../shared/services/design.service';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private userService: UserService,
    public designService: DesignService,
    private router: Router
  ) {
    this.authForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  onLogin(): void {
    if (this.authForm.valid) {
      this.userService.login(this.authForm.value).subscribe(
        (loggedData) => {
          if (loggedData.auth && loggedData.token) {
            console.log('Professor logged in');
            localStorage.setItem('token', loggedData.token);
            localStorage.setItem('isLogged', 'true');
            this.router.navigateByUrl('/').then(() => null);
          } else {
            this.designService.openSnackBar('warning', 'Une erreur s\'est produite, rééssayez plus tard', 'OK');
          }
        }
      );
    } else {
      this.designService.openSnackBar('warning', 'Veuillez bien renseigner les informations nécessaires', 'OK');
    }
  }

  onSignUp(): void {
    this.router.navigate(['/nouvel-utilisateur']).then(() => null);
  }
}
