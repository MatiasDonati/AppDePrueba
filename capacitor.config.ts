// import type { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   appName: 'CarpinchApp',
//   webDir: 'www',
//   android: { backgroundColor: '#000000' },
//   plugins: {
//     SplashScreen: {
//       backgroundColor: '#000000',
//       launchAutoHide: false,   // 👈 importante
//       showSpinner: false,
//       // launchShowDuration: 0   // 👈 importante
//     }
//   }
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
        launchShowDuration: 0,        // o 150–200 si querés un mínimo
        launchAutoHide: true,
        // launchFadeOutDuration: 120,   // Android (incluye Android 12+)
        backgroundColor: '#000000',
        splashFullScreen: true,       // opcional (Android <12)
        splashImmersive: true         // opcional (Android <12)
      },
    }
};

export default config;

