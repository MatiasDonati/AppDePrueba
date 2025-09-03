// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { IonicModule } from '@ionic/angular';
// import { CommonModule } from '@angular/common';

// @Component({
//   standalone: true,
//   selector: 'app-splash-animado',
//   templateUrl: './splash-animado.component.html',
//   styleUrls: ['./splash-animado.component.scss'],
//   imports: [IonicModule, CommonModule],
// })
// export class SplashAnimadoComponent implements OnInit {
//   constructor(private router: Router) {}
//   ngOnInit() {
//     setTimeout(() => this.router.navigateByUrl('/login', { replaceUrl: true }), 4000);
//   }

// }


import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen'; // 👈 import necesario

@Component({
  standalone: true,
  selector: 'app-splash-animado',
  templateUrl: './splash-animado.component.html',
  styleUrls: ['./splash-animado.component.scss'],
  imports: [CommonModule, IonContent],
})
export class SplashAnimadoComponent implements OnInit, AfterViewInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.router.navigateByUrl('/login', { replaceUrl: true }), 4200);
  }

  ngAfterViewInit() {
    requestAnimationFrame(() => SplashScreen.hide({ fadeOutDuration: 150 }));
  }
}

