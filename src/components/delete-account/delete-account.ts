import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { AccountClassifier } from "../../providers/AccountClassifier";
import { NavController, Slides } from "ionic-angular";
import { AccountManagerProvider } from "../../providers/account-manager/account-manager";

@Component({
	selector: "delete-account",
	templateUrl: "delete-account.html"
})
export class DeleteAccountComponent {
	@Input("account") private account: DTOAccount;
	@Input("slide") private slides: Slides;

	constructor(
		private encryptorAccount: EncryptorAccountProvider,
		private accountClassifier: AccountClassifier,
		private navController: NavController,
		private accountManager: AccountManagerProvider
	) { }

	private deleteAccount(option: boolean): void {
		if (option) {

			this.encryptorAccount.deleteAccount(this.account);
			let ultimaCuenta: boolean = this.accountClassifier.deleteAccount(this.account);
			this.accountManager.restartService();
			if (ultimaCuenta)
				this.navController.pop();
			else
				if (this.slides.isEnd())
					this.slides.slideTo(this.slides.getActiveIndex() - 1);

		} else {
			// Se esconderá el componente
			this.accountManager.isAccountDeleting = false;
		}
	}
}
