import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  navItems = [
    {
      name: 'Inicio',
      id: 0,
      route: 'main'
    },
    {
      name: '404',
      id: 1,
      route: 'ruta-rota'
    }
  ]
}
