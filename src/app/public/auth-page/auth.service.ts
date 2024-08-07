import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router';
import { FacebookAuthProvider, GoogleAuthProvider } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

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
        // Registration successful
        console.log('Registration successful!', userCredential);
        // You can redirect or do whatever you need here
      })
      .catch(error => {
        console.error('Registration error:', error);
        // Handle errors here (show error messages, etc.)
      });
  }

  public login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      this.router.navigate(['/pr'])
      console.log('Login successful!', userCredential);
      // You can redirect or perform additional actions here
    })
    .catch(error => {
      console.error('Login error:', error);
      // Handle errors (e.g., show error messages)
    });
  }

  public logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Logout successful!');
        this.router.navigate(['/home']); // Navigate to the login page or home page
      })
      .catch(error => {
        console.error('Logout error:', error);
        // Handle errors if needed
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
}
