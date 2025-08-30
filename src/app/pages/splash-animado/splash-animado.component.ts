import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-splash-animado',
  templateUrl: './splash-animado.component.html',
  styleUrls: ['./splash-animado.component.scss'],
  imports: [IonicModule, CommonModule],
})
export class SplashAnimadoComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => this.router.navigateByUrl('/login', { replaceUrl: true }), 3000);
  }
}
