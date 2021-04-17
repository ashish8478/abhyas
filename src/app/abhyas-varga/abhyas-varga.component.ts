import { Component, Input, OnInit } from '@angular/core';
import { AbhyasVarga } from '../services/firedb.model';

@Component({
  selector: 'app-abhyas-varga',
  templateUrl: './abhyas-varga.component.html',
  styleUrls: ['./abhyas-varga.component.scss']
})
export class AbhyasVargaComponent implements OnInit {

  @Input()
  abhyasVargaDetails: AbhyasVarga[] = [];

  constructor() { }

  ngOnInit() {
  }

}
