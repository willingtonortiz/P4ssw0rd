import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

// App component
import { MyApp } from "./app.component";

// Pages
import { HomePage } from "../pages/home/home";
import { PinPage } from "../pages/pin/pin";
import { AgregarCuentaPage } from "../pages/agregar-cuenta/agregar-cuenta";
import { EditAccountPage } from "../pages/edit-account/edit-account";
import { EditPinPage } from "../pages/edit-pin/edit-pin";
import { MostrarCuentasPage } from "../pages/mostrar-cuentas/mostrar-cuentas";

// Storage
import { IonicStorageModule } from "@ionic/storage";

// Providers
import { EncryptorAccountProvider } from "../providers/encryptor-account/encryptor-account";
import { CuentaDAO } from "../source/daos/CuentaDAO";
import { PinDAO } from "../source/daos/PinDAO";
import { ArrDTOAccount } from "../providers/ArrDTOAccount";

// Components
import { PassButtonComponent } from "../components/pass-button/pass-button";

@NgModule({
	declarations: [
		MyApp,
		// Pages
		HomePage,
		PinPage,
		AgregarCuentaPage,
		EditAccountPage,
		EditPinPage,
		MostrarCuentasPage,
		// Components
		PassButtonComponent
	],
	// declarations: [MyApp, HomePage, PinPage, AgregarCuentaPage,MostrarCuentasPage],

	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		IonicStorageModule.forRoot()
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		PinPage,
		AgregarCuentaPage,
		EditAccountPage,
		EditPinPage,
		MostrarCuentasPage
	],
	// entryComponents: [MyApp, HomePage, PinPage, AgregarCuentaPage,MostrarCuentasPage],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		CuentaDAO,
		PinDAO,
		EncryptorAccountProvider,
		ArrDTOAccount
	]
})
export class AppModule {}
