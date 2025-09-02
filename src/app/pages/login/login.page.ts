import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  ValidatorFn,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { IonicModule, ToastController, LoadingController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

type QuickPreset = { key: string; label: string; email: string; password: string; img: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class LoginPage implements OnDestroy {
  // Modo actual: login o creación de cuenta
  isSignup = false;

  // Typed Forms: declaramos confirmPassword desde el inicio (deshabilitado)
  form = this.fb.nonNullable.group({
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: this.fb.nonNullable.control('') // sin validadores al inicio; se habilita en modo signup
  });

  // 🔒 Accesos rápidos (completá email y password a gusto)
  quickPresets: QuickPreset[] = [
    { key: 'yacare',  label: 'Yacaré', email: 'boferav665@skateru.com',  password: '123123', img: 'assets/Yacare.png' },
    { key: 'zorro',   label: 'Zorro',  email: 'nimofe9831@noidem.com',   password: '123123', img: 'assets/Zorro.png' },
    { key: 'ciervo',  label: 'Ciervo', email: 'pobof42124@noidem.com',  password: '123123', img: 'assets/Ciervo.png' },
  ];

  private sub?: { data: any; subscription: { unsubscribe: () => void } };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastController,
    private loading: LoadingController
  ) {
    // El campo de confirmación no se usa en login: se deshabilita
    this.form.get('confirmPassword')?.disable({ emitEvent: false });
  }

  async ionViewWillEnter() {
    // Si ya hay sesión, redirige a Tabs
    const session = await this.auth.getSession();
    if (session) this.router.navigateByUrl('/tabs', { replaceUrl: true });
  }

  // ---------- LOGIN ----------
  async login() {
    if (this.isSignup) return; // evitar submit de login cuando estás en modo signup

    if (this.form.invalid) {
      if (this.form.controls.password.hasError('minlength')) {
        this.showToast('La contraseña debe tener al menos 6 caracteres');
      } else {
        this.showToast('Completá email y contraseña');
      }
      return;
    }

    const loading = await this.loading.create({ message: 'Ingresando...' });
    await loading.present();
    try {
      const email = this.form.controls.email.value;
      const password = this.form.controls.password.value;

      await this.auth.signIn(email, password);
      await loading.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (e: any) {
      await loading.dismiss();
      let msg = e?.message || 'Error al iniciar sesión';
      if (msg.includes('Invalid login credentials')) msg = 'Correo o contraseña inválidos';
      this.showToast(msg);
    }
  }

  // ---------- CLICK EN "CREAR CUENTA" ----------
  async onSignupClick() {
    // 1) Primera vez: activar modo signup y habilitar confirmación
    if (!this.isSignup) {
      this.isSignup = true;
      this.enableSignupFields();
      this.showToast('Reingresá la contraseña para crear la cuenta');
      return;
    }

    // 2) Ya en modo signup: validar y crear
    if (this.form.invalid || this.form.hasError('passwordMismatch')) {
      if (this.form.hasError('passwordMismatch')) {
        this.showToast('Las contraseñas no coinciden');
      } else if (this.form.controls.password.hasError('minlength')) {
        this.showToast('La contraseña debe tener al menos 6 caracteres');
      } else {
        this.showToast('Completá email y ambas contraseñas');
      }
      return;
    }

    await this.signup();
  }

  // ---------- CANCELAR CREACIÓN ----------
  cancelSignup() {
    this.isSignup = false;
    this.disableSignupFields();
  }

  // ---------- SIGNUP REAL ----------
  private async signup() {
    const loading = await this.loading.create({ message: 'Creando cuenta...' });
    await loading.present();
    try {
      const { email, password } = this.form.getRawValue();

      // ⬇️ Usamos el valor de retorno del servicio
      const data = await this.auth.signUp(email, password);

      // ⬇️ Caso especial: no hay error pero user.identities está vacío => email ya registrado
      const identitiesLen = data?.user?.identities?.length ?? 0;
      if (identitiesLen === 0) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
      }

      await loading.dismiss();
      this.cancelSignup(); // volvemos a modo login
      this.showToast('Cuenta creada. Revisá tu correo si requiere verificación.');
    } catch (e: any) {
      await loading.dismiss();

      const msg = (e?.message || '').toLowerCase();
      const alreadyExists =
        e?.message === 'EMAIL_ALREADY_REGISTERED' ||
        e?.code === 'user_already_exists' ||
        e?.status === 400 ||
        msg.includes('already') ||
        msg.includes('exists') ||
        msg.includes('registr');

      this.showToast(
        alreadyExists
          ? 'Ese email ya está registrado. Probá iniciar sesión.'
          : (e?.message || 'No se pudo crear la cuenta')
      );
    }
  }

  // ---------- Acceso rápido ----------
  async quickLogin(key: string) {
    if (this.isSignup) return; // no usar accesos rápidos en modo creación
    const preset = this.quickPresets.find(p => p.key === key);
    if (!preset) return;

    const loading = await this.loading.create({ message: `Ingresando como ${preset.label}...` });
    await loading.present();
    try {
      await this.auth.signIn(preset.email, preset.password);
      await loading.dismiss();
      this.router.navigateByUrl('/tabs', { replaceUrl: true });
    } catch (e: any) {
      await loading.dismiss();
      let msg = e?.message || 'No se pudo iniciar sesión';
      if (msg.includes('Invalid login credentials')) msg = 'Credenciales inválidas';
      this.showToast(msg);
    }
  }

  // ---------- Helpers de modo signup ----------
  private enableSignupFields() {
    const cp = this.form.get('confirmPassword') as FormControl<string>;
    cp.setValidators([Validators.required, Validators.minLength(6)]);
    cp.enable({ emitEvent: false });

    this.form.setValidators(this.passwordsMatchValidator());
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private disableSignupFields() {
    const cp = this.form.get('confirmPassword') as FormControl<string>;
    cp.clearValidators();
    cp.setValue('', { emitEvent: false });
    cp.disable({ emitEvent: false });

    this.form.setValidators(null);
    this.form.updateValueAndValidity({ emitEvent: false });
  }

  private passwordsMatchValidator(): ValidatorFn {
    return (group: AbstractControl) => {
      const pass = group.get('password')?.value;
      const conf = group.get('confirmPassword')?.value;
      return pass && conf && pass !== conf ? { passwordMismatch: true } : null;
    };
  }

  // ---------- UI ----------
  async showToast(msg: string) {
    const t = await this.toast.create({ message: msg, duration: 2200 });
    t.present();
  }

  ngOnDestroy() {
    this.sub?.subscription?.unsubscribe?.();
  }
}
