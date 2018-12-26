import { Component, ViewChild, ElementRef } from "@angular/core";
import { NavController, LoadingController, Loading } from "ionic-angular";
import { HomePage } from "../home/home";
import { PinDAO } from "../../source/daos/PinDAO";
import { VerifyPinComponent } from "../../components/verify-pin/verify-pin";

@Component({
	selector: "page-pin",
	templateUrl: "pin.html"
})
export class PinPage {
	@ViewChild(VerifyPinComponent)
	private verifyPin: VerifyPinComponent;

	constructor(
		private pinDao: PinDAO,
		private navController: NavController,
		private loadingController: LoadingController
	) {}

	private registerPin(text: string): void {
		if (text !== null) {
			// Se guarda el pin en la base de datos
			this.pinDao.setPin(text);

			// Animacion de guardado de pin
			const loading: Loading = this.loadingController.create({
				content: "Guardando pin",
				duration: 1500
			});

			loading.present();
			loading.onDidDismiss(() => {
				// Se redirige al home de la aplicación
				this.navController.setRoot(HomePage);
			});
		}
	}
}
