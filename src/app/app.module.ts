import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";

// Páginas
import { HomePage } from "../pages/home/home";
import { PinPage } from "../pages/pin/pin";

// Storage
import { IonicStorageModule } from "@ionic/storage";

// Providers
import { CuentaDAO } from "../daos/CuentaDAO";
import { PinDAO } from "../daos/PinDAO";
import { AgregarCuentaPage } from "../pages/agregar-cuenta/agregar-cuenta";

@NgModule({
	declarations: [MyApp, HomePage, PinPage, AgregarCuentaPage],

	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [MyApp, HomePage, PinPage, AgregarCuentaPage],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		CuentaDAO,
		PinDAO
	]
})
export class AppModule {}
