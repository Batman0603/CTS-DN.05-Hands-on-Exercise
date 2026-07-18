import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // String Interpolation
  portalName = 'Student Course Portal';

  // Property Binding
  isPortalActive = false;

  // Event Binding
  message = '';

  /*
[property]
One-way binding from Component -> DOM.

[(ngModel)]
Two-way binding between Component <-> DOM.
Changes in the component update the view,
and user input updates the component automatically.
*/

  // Two-Way Binding
  searchTerm = '';

  onEnrollClick() {
    this.message = 'Enrollment opened!';
  }

}