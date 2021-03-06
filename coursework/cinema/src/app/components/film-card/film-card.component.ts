import { Component, OnInit, Input } from '@angular/core';
import { Film } from 'src/app/models/film';

@Component({
  selector: 'app-film-card',
  templateUrl: './film-card.component.html',
  styleUrls: ['./film-card.component.scss']
})
export class FilmCardComponent implements OnInit {

  constructor() { }

  @Input() film: Film;
  @Input() width: number = 250;
  @Input() flip: boolean = true;

  public get currentDate(): number {
    return Date.now();
  }

  ngOnInit() {
  }

}
