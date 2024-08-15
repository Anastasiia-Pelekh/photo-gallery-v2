import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatIconModule],
  templateUrl: './public-layout-page.component.html',
  styleUrl: './public-layout-page.component.scss'
})
export class PublicPageLayoutComponent {

}
