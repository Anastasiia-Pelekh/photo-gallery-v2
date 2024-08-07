import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule]
})
export class RegistrationPageComponent implements OnDestroy, OnInit {
  private readonly subscriptions!: Subscription;
  registrationForm!: FormGroup;
  username: string = '';
  email: string = '';

  constructor(
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  public onSubmit(): void {
    if (this.registrationForm.valid) {
      const { email, password } = this.registrationForm.value;
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // Registration successful
          console.log('Registration successful!', userCredential);
          // You can redirect or do whatever you need here
        })
        .catch(error => {
          console.error('Registration error:', error);
          // Handle errors here (show error messages, etc.)
        });
    }
  }

  ngOnDestroy(): void {
    
  }
}
