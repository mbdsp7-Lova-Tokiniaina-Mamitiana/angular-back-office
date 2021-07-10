import { Component, OnInit } from '@angular/core';
import {Equipe} from '../../shared/models/equipe';
import {Match} from '../../shared/models/match';
import {Router} from '@angular/router';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  matchs: Match[] = [];

  constructor(private router: Router) {
    this.matchs.push(new Match ('',
      '10-13-2020',
      new Equipe('e1', 'Chelsea', 'https://logodownload.org/wp-content/uploads/2017/02/chelsea-fc-logo-1.png'),
      new Equipe('e2', 'Man City', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARu6vDD55MzDzZh6CaANLfVnNBt4x1Gu4Lwh3ZvIzkb8jGvFZCWtMXTS8nD2drq3nnfM&usqp=CAU'),
      'À venir',
      53.4834,
      -2.1995
    ));
  }

  ngOnInit(): void {
  }

  navigateToMatch(): void {
    this.router.navigate(['/home/match']).then(() => null);
  }
}
