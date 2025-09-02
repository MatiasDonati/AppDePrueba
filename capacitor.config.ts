import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  // appName: 'AppDePrueba',
  appName: 'CarpinchApp',
  webDir: 'www',
  android: { backgroundColor: '#000000' }, // <- evita flash blanco

};

export default config;


// import type { CapacitorConfig } from '@capacitor/cli';

// const config: CapacitorConfig = {
//   appId: 'io.ionic.starter',
//   appName: 'CarpinchApp',
//   webDir: 'www',
//   android: {
//     backgroundColor: '#000000', // evita flash blanco
//   },
//   plugins: {
//     SplashScreen: {
//       launchShowDuration: 0,      // ⬅️ NO muestra splash nativo
//       backgroundColor: '#000000', // opcional: color de fondo mientras arranca WebView
//       androidScaleType: 'CENTER_CROP', // se ignora si launchShowDuration=0, pero no molesta
//     },
//   },
// };

// export default config;
