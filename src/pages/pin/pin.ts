import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { PinDAO } from "../../daos/PinDAO";
import { HomePage } from "../home/home";

@Component({
	selector: "page-pin",
	templateUrl: "pin.html"
})
export class PinPage {
	private pin: string = "";

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private pinDao: PinDAO
	) {}

	private registrarPin(): void {
		// Se guarda el pin en la base de datos
		this.pinDao.setPin(this.pin);


		// Se redirige al home de la aplicación
		this.navCtrl.setRoot(HomePage);
	}
}
