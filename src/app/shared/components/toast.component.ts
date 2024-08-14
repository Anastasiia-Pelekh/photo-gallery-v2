import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class ToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type: 'success' | 'error' | 'info' }
  ) {}

  public getIcon(): string {
    switch (this.data.type) {
      case 'success':
        return 'check_circle_outline';
      case 'error':
        return 'error_outline';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  }

  public getToastClass(): string {
    switch (this.data.type) {
      case 'success':
        return 'success-toast';
      case 'error':
        return 'error-toast';
      case 'info':
        return 'info-toast';
      default:
        return 'info-toast';
    }
  }

  public getIconClass(): string {
    switch (this.data.type) {
      case 'success':
        return 'icon-success';
      case 'error':
        return 'icon-error';
      case 'info':
        return 'icon-info';
      default:
        return 'icon-info';
    }
  }
}
