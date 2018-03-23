import {Component, Input, OnInit} from '@angular/core';
import moment = require('moment');
import {lang} from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
/*
  goToProfile = function () {
    this.router.navigateByUrl('/profile');
  };
*/
  languages = ['Deutsch', 'English'];
  default_lang = this.languages[0];

  constructor() { }

  ngOnInit() {
  }

}
