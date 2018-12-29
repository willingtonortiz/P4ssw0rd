import { Component } from "@angular/core";
import { NavController, AlertController, Alert } from "ionic-angular";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { PinDAO } from "../../source/daos/PinDAO";

@Component({
	selector: "page-edit-pin",
	templateUrl: "edit-pin.html"
})
export class EditPinPage {
	private verified: boolean = false;
	private pin: string = "";
	private inputText: string = "Ingrese su pin";
	private buttonText: string = "Continuar";

	constructor(
		public navCtrl: NavController,
		private pinDao: PinDAO,
		private alertContreller: AlertController,
		private encryptorAccountProvider: EncryptorAccountProvider
	) {}

	private editPin(): void {
		if (!this.verified) {
			this.pinDao.verifyPin(this.pin).then((data: boolean) => {
				if (data) {
					this.inputText = "Ingrese el nuevo pin";
					this.buttonText = "Guardar nuevo pin";
					this.pin = "";
					this.verified = true;
				}
			});
		} else {
			// Se modifica el pin
			this.pinDao.setPin(this.pin);

			// Se le presenta la alerta al usuario
			let alert: Alert = this.alertContreller.create({
				message: "Su pin se modificó con exito"
			});
			alert.present();

			// Se elimina la alerta
			setTimeout(() => {
				alert.dismiss();
				alert = null;
			}, 2000);

			// Actualizar todas las cuentas
			this.encryptorAccountProvider.modifyAccounts(this.pin);

			// Seguir con la navegación
			this.navCtrl.pop();
		}
	}
}
