import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule],
  templateUrl: './private-layout-page.component.html',
  styleUrl: './private-layout-page.component.scss'
})
export class PrivatePageLayoutComponent {
  constructor(private authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }
}
