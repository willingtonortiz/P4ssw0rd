import { Component } from "@angular/core";
import { Platform } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { HomePage } from "../pages/home/home";
import { PinPage } from "../pages/pin/pin";
//import { PinDAO } from "../daos/PinDAO";
import { PinDAO } from "../source/daos/PinDAO";
import { VerifyPinComponent } from "../components/verify-pin/verify-pin";

@Component({
	templateUrl: "app.html"
})
export class MyApp {
	rootPage: any = PinPage;

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private pinDao: PinDAO
	) {
		platform.ready().then(() => {
			pinDao.getPin().then((data: string) => {
				if (data) {
					this.rootPage = HomePage;
				} else {
					this.rootPage = PinPage;
				}
				statusBar.styleDefault();
				splashScreen.hide();
			});
		});
	}
}
