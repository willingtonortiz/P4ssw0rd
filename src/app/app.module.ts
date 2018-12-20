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
import { CreateAccountComponent } from "../components/create-account/create-account";
import { VerifyPinComponent } from "../components/verify-pin/verify-pin";
import { PinInputComponent } from "../components/pin-input/pin-input";

@NgModule({
	declarations: [
		MyApp,
		// Pages
		HomePage,
		PinPage,
		EditAccountPage,
		EditPinPage,
		MostrarCuentasPage,
		// Components
		PassButtonComponent,
		CreateAccountComponent,
		VerifyPinComponent,
		PinInputComponent
	],
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
		EditAccountPage,
		EditPinPage,
		MostrarCuentasPage
	],
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
