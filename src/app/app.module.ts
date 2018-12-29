import { EditAccountComponent } from "./../components/edit-account/edit-account";
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
import { EditPinPage } from "../pages/edit-pin/edit-pin";
import { MostrarCuentasPage } from "../pages/mostrar-cuentas/mostrar-cuentas";

// Storage
import { IonicStorageModule } from "@ionic/storage";

// Providers
import { EncryptorAccountProvider } from "../providers/encryptor-account/encryptor-account";
import { AccountDAO } from "../source/daos/AccountDAO";
import { PinDAO } from "../source/daos/PinDAO";
import { AccountClassifier } from "../providers/AccountClassifier";
import { ArrAccountProvider } from "../providers/arr-account/arr-account";
import { AccountManagerProvider } from "../providers/account-manager/account-manager";

// Components
import { PassButtonComponent } from "../components/pass-button/pass-button";
import { CreateAccountComponent } from "../components/create-account/create-account";
import { VerifyPinComponent } from "../components/verify-pin/verify-pin";
import { PinInputComponent } from "../components/pin-input/pin-input";
import { ShowAccountComponent } from "../components/show-account/show-account";
import { DeleteAccountComponent } from "../components/delete-account/delete-account";

@NgModule({
	declarations: [
		MyApp,
		// Pages
		HomePage,
		PinPage,
		EditPinPage,
		MostrarCuentasPage,

		// Components
		PassButtonComponent,
		CreateAccountComponent,
		VerifyPinComponent,
		PinInputComponent,
		ShowAccountComponent,
		EditAccountComponent,
		DeleteAccountComponent
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
		EditPinPage,
		MostrarCuentasPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AccountDAO,
		PinDAO,
		EncryptorAccountProvider,
		AccountClassifier,
		AccountManagerProvider,
		ArrAccountProvider
	]
})
export class AppModule {}
