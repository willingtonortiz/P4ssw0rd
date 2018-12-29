import { Component, ViewChild } from "@angular/core";
import { NavController, LoadingController, Loading } from "ionic-angular";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { PinDAO } from "../../source/daos/PinDAO";
import { AccountClassifier } from "../../providers/AccountClassifier";
import { VerifyPinComponent } from "../../components/verify-pin/verify-pin";

@Component({
	selector: "page-edit-pin",
	templateUrl: "edit-pin.html"
})
export class EditPinPage {
	private headerText: string = "Ingrese su pin";
	private verified: boolean = false;
	private waitForPinConfirmation: boolean = false;
	@ViewChild(VerifyPinComponent) private verifyPin: VerifyPinComponent;

	constructor(
		private navCtrl: NavController,
		private pinDao: PinDAO,
		private loadingController: LoadingController,
		private encryptorAccountProvider: EncryptorAccountProvider,
		private accountClassifier: AccountClassifier
	) {}

	private onPinWritten(pin: string): void {
		// Si se escribió un pin correcto
		if (pin !== null) {
			// Si el pin no está verificado
			if (!this.verified) {
				// Si es el pin correcto
				this.pinDao.verifyPin(pin).then((data: boolean) => {
					// Animación de confirmación de pin
					this.waitForPinConfirmation = true;
					setTimeout(() => {
						// Quitar animación de pin
						this.waitForPinConfirmation = false;
					}, 1500);

					if (data) {
						// Está verificado
						this.verified = true;
						this.verifyPin.cleanInputs();
						this.headerText = "Ingrese el nuevo pin";
					}
				});
			} else {
				// Se modifica el pin
				this.pinDao.setPin(pin);

				// Actualizar todas las cuentas y la base de datos
				this.encryptorAccountProvider.modifyAccounts(pin).then(() => {
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

	private goBack(): void {
		this.navCtrl.pop();
	}
}
