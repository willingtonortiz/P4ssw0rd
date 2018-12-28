import { Component } from "@angular/core";
import { NavController, LoadingController, Loading } from "ionic-angular";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { PinDAO } from "../../source/daos/PinDAO";
import { AccountClassifier } from "../../providers/AccountClassifier";

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
		private navCtrl: NavController,
		private pinDao: PinDAO,
		private loadingController: LoadingController,
		private encryptorAccountProvider: EncryptorAccountProvider,
		private accountClassifier: AccountClassifier
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

			// Actualizar todas las cuentas y la base de datos
			this.encryptorAccountProvider.modifyAccounts(this.pin).then(() => {
				// Actualizar el arreglo actual de cuentas
				this.accountClassifier.getAccounts();
			});

			// Animación de modificación de pin
			const loading: Loading = this.loadingController.create({
				content: "Modificando pin",
				duration: 1500
			});
			loading.present();

			// Cuando termina la carga
			loading.onDidDismiss(() => {
				// Seguir con la navegación
				this.navCtrl.pop();
			});
		}
	}
}
