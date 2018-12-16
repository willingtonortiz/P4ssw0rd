import { Component } from "@angular/core";
import {
	NavController,
	NavParams,
	AlertController,
	LoadingController,
	Loading,
	Alert
} from "ionic-angular";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { DTOCuenta } from "../../source/dtos/DTOCuenta";

@Component({
	selector: "page-agregar-cuenta",
	templateUrl: "agregar-cuenta.html"
})
export class AgregarCuentaPage {
	private user: string = "";
	private password: string = "";
	private type: string = "";
	private description: string = "";

	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private alertController: AlertController,
		private loadingController: LoadingController,
		private encryptorAccountProvider: EncryptorAccountProvider
	) {}

	private agregarCuenta(): void {
		// En esta parte se podría validar con regex los correos
		console.log(this.user, this.password, this.type, this.description);
		if (this.user !== "" && this.password !== "" && this.type !== "") {
			// console.log("Llegue aquí");
			this.encryptorAccountProvider.insertAccount(
				new DTOCuenta(
					undefined,
					this.user,
					this.password,
					this.description,
					this.type
				)
			);
			this.encryptionProcess(true);
		} else {
			this.encryptionProcess(false);
		}
	}

	private encryptionProcess(result: boolean): void {
		let loading: Loading = this.loadingController.create({
			content: "Encriptando cuenta",
			duration: 1000
		});
		loading.present();
		loading.onDidDismiss(() => {
			let message: string = "";
			if (result) {
				message = "La cuenta se encriptó con exito";
			} else {
				message = "No se pudo encriptar la cuenta";
			}
			let alert: Alert = this.alertController.create({
				message: message
			});
			alert.present();
			setTimeout(() => {
				alert.dismiss();
			}, 1500);
		});
	}

	private back(): void {
		this.navCtrl.pop();
	}
}
