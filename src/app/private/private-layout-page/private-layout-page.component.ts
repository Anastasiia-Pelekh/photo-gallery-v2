import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AuthService } from '../../public/auth-page/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './private-layout-page.component.html',
  styleUrl: './private-layout-page.component.scss'
})
export class PrivatePageLayoutComponent {
  constructor(private authService: AuthService) {}

  public logout(): void {
    this.authService.logout();
  }
}