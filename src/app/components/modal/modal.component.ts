import { Component, Inject } from '@angular/core';
import { DIALOG_DATA, DialogModule, DialogRef } from '@angular/cdk/dialog';

export interface DialogData {
  title: 'Ups',
  message: 'Este es un mensaje'
}

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    DialogModule
  ],
  templateUrl: './modal.component.html'
})

export class ModalComponent {
  constructor(@Inject(DIALOG_DATA) public data: DialogData, public dialogRef: DialogRef) { }
}
