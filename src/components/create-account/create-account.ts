import { Component, Output, EventEmitter } from "@angular/core";
import {
	NavController,
	NavParams,
	AlertController,
	LoadingController,
	Loading,
	Alert
} from "ionic-angular";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";

import { DTOAccount } from "../../source/dtos/DTOAccount";
import { AccountClassifier } from "../../providers/AccountClassifier";

@Component({
	selector: "create-account",
	templateUrl: "create-account.html"
})
export class CreateAccountComponent {
	private user: string;
	private password: string;
	private type: string;
	private description: string;
	private categories: string;
	@Output("onAccountCreated") private onAccountCreated: EventEmitter<
		void
	> = new EventEmitter<void>();

	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private loadingController: LoadingController,
		private alertController: AlertController,
		private encryptorAccountProvider: EncryptorAccountProvider,
		private AccountClassifier: AccountClassifier
	) {
		this.categories = "";
	}

	private insertAccount(): void {
		// En esta parte se podría validar con regex los correos

		if (this.user !== "" && this.password !== "" && this.type !== "") {
			// Se crea la nueva cuenta del usuario
			let newAccount: DTOAccount = new DTOAccount(
				undefined,
				this.user,
				this.password,
				this.description,
				this.type,
				this.categories.split(" ")
			);

			// Secuencia de proceso exitoso
			this.encryptionProcess(true).then(() => {
				// Se inserta la cuenta en la base de datos
				this.encryptorAccountProvider.insertAccount(newAccount);

				// Se agrega la cuenta al arreglo de cuentas
				this.AccountClassifier.agregarCuenta(newAccount);

				// Se le informa al padre que la cuenta fue añadida
				this.onAccountCreated.emit();
			});

			// Se limpia el formulario
			this.user = this.password = this.type = this.description = this.categories =
				"";

		} else {
			// Secuencia de proceso fallido
			this.encryptionProcess(false);
		}

		//this.regresar();
		//como regreso a la principal?
	}

	private encryptionProcess(result: boolean): Promise<void> {
		return new Promise<void>((resolve, reject) => {
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
					resolve();
				}, 1500);
			});
		});
	}

	private back(): void {
		this.navCtrl.pop();
	}
}
