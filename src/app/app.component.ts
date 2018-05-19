import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  navLinks = [
    {path: '/month', label: 'Stundeneingabe'},
    {path: '/overview', label: 'Übersicht'},
    ];

}
