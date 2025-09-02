import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false,
})
export class TabsPage implements OnInit, OnDestroy {
  userEmail: string | null = null;
  private sub?: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
  ) {}

  ngOnInit() {
    this.sub = this.auth.getUser().subscribe(user => {
      this.userEmail = user?.email ?? null;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  async confirmLogout() {
    const toast = await this.toastCtrl.create({
      message: '¿Cerrar sesión?',
      position: 'middle',
      duration: 0,
      mode: 'md',              //  evita tarjeta blanca estilo iOS
      cssClass: 'logout-toast',
      buttons: [
        { text: 'CANCELAR', role: 'cancel' },
        { text: 'SALIR', role: 'destructive', handler: () => this.logout() },
      ],
    });
    await toast.present();
  }



  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
