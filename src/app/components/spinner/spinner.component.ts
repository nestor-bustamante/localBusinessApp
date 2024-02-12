import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [ MatProgressSpinnerModule ],
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent {

}
