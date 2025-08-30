import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnDestroy {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  private sub?: { data: any; subscription: { unsubscribe: () => void } };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) {}

  async ionViewWillEnter() {
    // Si ya hay sesión, redirige a Tabs
    const session = await this.auth.getSession();
    if (session) this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async login() {
    if (this.form.invalid) {
      if (this.form.controls['password'].hasError('minlength')) {
        this.showToast('La contraseña debe tener al menos 6 caracteres');
      } else {
        this.showToast('Completá email y contraseña');
      }
      return;
    }

    const loading = await this.loading.create({ message: 'Ingresando...' });
    await loading.present();
    try {
      const { email, password } = this.form.value as any;
      await this.auth.signIn(email, password);
      await loading.dismiss();
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (e: any) {
      await loading.dismiss();

      let msg = e.message || 'Error al iniciar sesión';
      if (msg.includes('Invalid login credentials')) {
        msg = 'Correo o contraseña inválidos';
      }
      this.showToast(msg);
    }
  }



  async signup() {
    if (this.form.invalid) {
      this.showToast('Completá email y contraseña');
      return;
    }
    const loading = await this.loading.create({ message: 'Creando cuenta...' });
    await loading.present();
    try {
      const { email, password } = this.form.value as any;
      await this.auth.signUp(email, password);
      await loading.dismiss();
      this.showToast('Cuenta creada. Revisá tu correo si requiere verificación.');
    } catch (e: any) {
      await loading.dismiss();
      this.showToast(e.message || 'No se pudo crear la cuenta');
    }
  }

  async showToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2200 });
    t.present();
  }

  ngOnDestroy() {
    this.sub?.subscription?.unsubscribe?.();
  }
}
