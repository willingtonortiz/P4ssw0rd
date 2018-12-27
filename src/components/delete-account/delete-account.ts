import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { AccountClassifier } from "../../providers/AccountClassifier";
import { NavController } from "ionic-angular";
import { AccountManagerProvider } from "../../providers/account-manager/account-manager";

@Component({
	selector: "delete-account",
	templateUrl: "delete-account.html"
})
export class DeleteAccountComponent {
	@Input("account") private account: DTOAccount;

	constructor(
		private encryptorAccount: EncryptorAccountProvider,
		private accountClassifier: AccountClassifier,
		private navController: NavController,
		private accountManager: AccountManagerProvider
	) {}

	private deleteAccount(option: boolean): void {
		if (option) {
			this.encryptorAccount.deleteAccount(this.account);
			this.accountClassifier.deleteAccount(this.account);
			this.accountManager.restartService();
			this.navController.pop();
		} else {
			// Se esconderá el componente
			this.accountManager.isAccountDeleting = false;
		}
	}
}
