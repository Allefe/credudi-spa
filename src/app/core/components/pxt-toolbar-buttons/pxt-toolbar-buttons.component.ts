import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pxt-toolbar-buttons',
  templateUrl: './pxt-toolbar-buttons.component.html',
  styleUrls: ['./pxt-toolbar-buttons.component.scss'],
})
export class PxtToolbarButtonsComponent implements OnInit {

  @Input() stickyMode: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
