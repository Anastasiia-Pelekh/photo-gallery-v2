import { Component, OnInit, OnDestroy, signal, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  imports: [
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule,
    MatButtonModule,
    CommonModule,
    MatInputModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent implements OnInit, OnDestroy {
  @Input() showLoginForm = true;

  private subscription = new Subscription();

  public loginForm!: FormGroup;
  public errorMessage = signal('');

  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    // Subscribe to value changes for dynamic error messages
    this.subscription.add(this.loginForm.get('email')?.valueChanges.subscribe(() => this.updateErrorMessage('email')));
    this.subscription.add(this.loginForm.get('password')?.valueChanges.subscribe(() => this.updateErrorMessage('password')));
  }

  private updateErrorMessage(controlName: string) {
    const control = this.loginForm.get(controlName);
    if (control) {
      if (control.hasError('required')) {
        this.errorMessage.set(`The ${controlName} field is required.`);
      } else if (control.hasError('email')) {
        this.errorMessage.set('Not a valid email address.');
      } else if (control.hasError('minlength')) {
        this.errorMessage.set(`The ${controlName} must be at least 6 characters long.`);
      } else {
        this.errorMessage.set('');
      }
    }
  }

  public register(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.register(email, password);
    }
  }


  public login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
