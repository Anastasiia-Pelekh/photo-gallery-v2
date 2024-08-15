import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User | null>;

  constructor(
    private matSnackBar: MatSnackBar,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = afAuth.authState;
  }

  public register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
      })
      .catch(error => {
        console.error('Registration error:', error);
      });
  }

  public login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
    })
    .catch(error => {
      console.error('Login error:', error);
      // Handle errors (e.g., show error messages)
    });
  }

  public logout() {
    this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch(error => {
        console.error('Logout error:', error);
      });
  }

  signInWithGitHub() {
    const provider = new GithubAuthProvider();
    this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error during Github sign-in:', error);
      });
  }

  public signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Error during Facebook sign-in:', error);
      });
  }

  public signInWithFacebook() {
    const provider = new FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider)
      .then((result) => {
        console.log('User signed in with Facebook:', result.user);
      })
      .catch((error) => {
        console.error('Error during Facebook sign-in:', error);
      });
  }

  public isAuthenticated(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user)
    );
  }
}
