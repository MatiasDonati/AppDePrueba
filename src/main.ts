// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';

// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.log(err));


import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { SplashScreen } from '@capacitor/splash-screen';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(() => {
    // primer frame del WebView → ocultar YA el splash nativo
    requestAnimationFrame(() => SplashScreen.hide());
  })
  .catch(err => console.log(err));

