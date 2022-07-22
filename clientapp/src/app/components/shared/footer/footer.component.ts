import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
  constructor() {}

  date: Date;
  icons = [
    {
      src: '../../../../assets/img/github.svg',
      route: 'https://github.com/JakeSiewJK64',
    },
  ];
  ngAfterViewInit(): void {
    this.date = new Date();
  }
}
