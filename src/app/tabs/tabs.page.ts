import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de usuario para mostrar el email
    this.sub = this.auth.getUser().subscribe(user => {
      this.userEmail = user?.email ?? null;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  // Confirmación con popup antes de cerrar sesión
  async confirmLogout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Seguro que querés cerrar sesión?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          role: 'destructive',
          handler: () => this.logout(),
        },
      ],
    });
    await alert.present();
  }

  // Logout real
  async logout() {
    await this.auth.signOut();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
