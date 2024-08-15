import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ToastComponent } from "../components/toast.component";

@Injectable({
  providedIn: 'root'
})
export class ToastService { 
  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  public showSuccessToast(message: string): void {
    this.matSnackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'success' },
      panelClass: 'success-toast',
      horizontalPosition: 'end',
      duration: 3500
    });
  }

  public showErrorToast(message: string): void {
    this.matSnackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'error' },
      panelClass: 'error-toast',
      horizontalPosition: 'end',
      duration: 3500
    });
  }

  public showInfoToast(message: string): void {
    this.matSnackBar.openFromComponent(ToastComponent, {
      data: { message, type: 'info' },
      panelClass: 'error-toast',
      horizontalPosition: 'end',
      duration: 3500
    });
  }
}
