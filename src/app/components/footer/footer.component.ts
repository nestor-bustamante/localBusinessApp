import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './footer.component.html'
})
export class FooterComponent {

}
