import { Injectable } from '@angular/core';
import { supabase } from './supabase.client';
import { BehaviorSubject, Observable } from 'rxjs';
import type { User } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    // Cargar usuario actual al iniciar
    this.refreshUser();

    // Escuchar cambios de sesión y actualizar el user$
    supabase.auth.onAuthStateChange((_event, _session) => {
      this.refreshUser();
    });
  }

  // ---------- auth ----------
  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  }

  async signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  // ---------- user ----------
  /** Observable para suscribirse al usuario actual */
  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  /** Helper opcional: obtener email una sola vez */
  async getUserEmailOnce(): Promise<string | null> {
    const { data } = await supabase.auth.getUser();
    return data.user?.email ?? null;
  }

  // ---------- privados ----------
  private async refreshUser() {
    const { data } = await supabase.auth.getUser();
    this.userSubject.next(data.user ?? null);
  }

  // (Si querés mantenerlo) callback booleano de sesión
  onAuthStateChange(callback: (hasSession: boolean) => void) {
    return supabase.auth.onAuthStateChange(async () => {
      const session = await this.getSession();
      callback(!!session);
    });
  }
}
