import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  // appName: 'AppDePrueba',
  appName: 'CarpinchApp',
  webDir: 'www',
  android: { backgroundColor: '#000000' }, // <- evita flash blanco

};

export default config;
