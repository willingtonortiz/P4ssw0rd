import { Encryptor } from "./../../source/Encriptacion/Encryptor/Encryptor";
import { Component, Input, OnInit } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { AccountManagerProvider } from "../../providers/account-manager/account-manager";
import { LoadingController, Loading } from "ionic-angular";

@Component({
	selector: "edit-account",
	templateUrl: "edit-account.html"
})
export class EditAccountComponent implements OnInit {
	@Input("account") private realAccount: DTOAccount;
	private account: DTOAccount;

	constructor(
		private encryptorAccount: EncryptorAccountProvider,
		private accountManager: AccountManagerProvider,
		private loadingController: LoadingController
	) {}

	ngOnInit(): void {
		this.account = new DTOAccount(
			this.realAccount.idCuenta,
			this.realAccount.email,
			this.realAccount.password,
			this.realAccount.description,
			this.realAccount.type,
			this.realAccount.categories
		);
		let encryptor: Encryptor = new Encryptor();

		// Siempre revelará la cuenta al abrir el componente
		this.account = this.encryptorAccount.decryptAccount(this.account);
	}

	private confirmChanges(): void {
		// Actualiza la cuenta
		this.encryptorAccount
			.updateAccount(this.account)
			.then((data: boolean) => {
				if (data) {
					this.realAccount.email = this.account.email;
					this.realAccount.password = this.account.password;
					this.realAccount.password = this.account.password;
					this.realAccount.categories = this.account.categories;
					this.realAccount.description = this.account.description;
					this.realAccount.type = this.account.type;
				}
			});

		// Animación del loading
		let loading: Loading = this.loadingController.create({
			content: "Actualizando la cuenta",
			duration: 1500
		});
		loading.present();
		loading.onDidDismiss(() => {
			this.accountManager.setOption("edit");
		});
	}

	private cancelChanges(): void {
		this.accountManager.setOption("edit");
	}
}
