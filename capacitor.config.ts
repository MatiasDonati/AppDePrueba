// import type { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   // appName: 'AppDePrueba',
//   appName: 'CarpinchApp',
//   webDir: 'www',
//   android: { backgroundColor: '#000000' }, // <- evita flash blanco

// };

// export default config;

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'CarpinchApp',
  webDir: 'www',
  android: { backgroundColor: '#000000' },
  plugins: {
    SplashScreen: {
      backgroundColor: '#000000',
      launchAutoHide: false,   // 👈 importante
      showSpinner: false,
      // launchShowDuration: 0   // 👈 importante
    }
  }
};
export default config;
