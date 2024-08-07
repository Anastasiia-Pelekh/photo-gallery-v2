import { Component, OnInit, OnDestroy, signal, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import 'firebase/auth'; 
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  imports: [
    CommonModule,
    AuthFormComponent,
    RouterModule
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  public errorMessage = signal('');
  public isLoginForm = true;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.url.subscribe(urlSegments => {
        this.isLoginForm = urlSegments[0].path === 'login';
      })
    );
  }

  public signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  public signInWithFacebook() {
    this.authService.signInWithFacebook();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
