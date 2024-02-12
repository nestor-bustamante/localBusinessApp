import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-search-cards',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './search-cards.component.html'
})
export class SearchCardsComponent {
  @Input() data: any;
  @Input() index: any;

  editar(index: number){}

  eliminar(index:number){}

}
