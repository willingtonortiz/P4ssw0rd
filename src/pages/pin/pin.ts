import { Component, ViewChild, ElementRef } from "@angular/core";
import {
	NavController,
	NavParams,
	AlertController,
	Alert
} from "ionic-angular";
import { HomePage } from "../home/home";
import { PinDAO } from "../../source/daos/PinDAO";
import { VerifyPinComponent } from "../../components/verify-pin/verify-pin";

@Component({
	selector: "page-pin",
	templateUrl: "pin.html"
})

/*
	UTILIZAR ANGULAR FORMS PARA OPTIMIZAR EL CÓDIGO
*/
export class PinPage {
	@ViewChild(VerifyPinComponent)
	private verifyPin: VerifyPinComponent;

	constructor(
		private pinDao: PinDAO,
		private navController: NavController,
		private alertController: AlertController
	) {}

	private registerPin(): void {
		let pin: string = this.verifyPin.getPin();
		if (pin !== null) {
			// Se guarda el pin en la base de datos
			this.pinDao.setPin(pin);
			// Se redirige al home de la aplicación
			this.navController.setRoot(HomePage);

			// this.pinInput1.nativeElement.focus();
		} else {
			const alert: Alert = this.alertController.create({
				message: "Debe completar todos los espacios"
			});
			alert.present();
			setTimeout(() => {
				alert.dismiss();
			}, 1500);
		}
	}
}
