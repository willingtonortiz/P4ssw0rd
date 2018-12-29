import { Component, ViewChild } from "@angular/core";

// Daos
import { PinDAO } from "../../source/daos/PinDAO";

// Dtos
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { AccountClassifier } from "../../providers/AccountClassifier";
import { NavController, Slides } from "ionic-angular";
import { AccountManagerProvider } from "../../providers/account-manager/account-manager";

@Component({
	selector: "page-mostrar-cuentas",
	templateUrl: "mostrar-cuentas.html"
})
export class MostrarCuentasPage {
	// Para mostrar información de la cuenta
	private accounts: Array<DTOAccount>;
	private accountType: string;
	private accountNumber: number;
	private waitForPinConfirmation: boolean = false;

	// Manejo de slides
	@ViewChild(Slides) private slides: Slides;

	// Para manejar las funcionalidades de las cuentas
	private errorText: string = "";
	private optionTaked: string = "";

	constructor(
		private navController: NavController,
		private pinDao: PinDAO,
		private accountClassifier: AccountClassifier,
		private accountManager: AccountManagerProvider
	) {
		this.accountType = accountClassifier.getActual().first;
		this.accounts = accountClassifier.getActual().second;
		this.accountNumber = this.accounts.length;
	}

	ionViewDidEnter() {
		this.accountManager.setCurrentAccount(
			this.accounts[this.slides.getActiveIndex()]
		);
	}

	private slideChanged() {
		this.accountManager.setCurrentAccount(
			this.accounts[this.slides.getActiveIndex()]
		);
	}

	private verifyPin(text: string, account: DTOAccount): void {
		// Si es un pin válido (no necesariamente correcto)
		if (text !== null) {
			// Se verifica que sea correcto
			this.pinDao.verifyPin(text).then((pin: boolean) => {
				// El pin es correcto
				this.waitForPinConfirmation = true;
				if (pin) {
					setTimeout(() => {
						this.waitForPinConfirmation = false;
						this.accountManager.executeOption();
					}, 1000);
				}
				// El pin es incorrecto
				else {
					this.waitForPinConfirmation = false;
					this.errorText = "Pin incorrecto";
				}
			});
		}
	}

	private revealAccountSelected(): void {
		if (this.accountManager.isPinShown) {
			this.optionTaked = "";
		} else if (this.accountManager.isPinShown === false) {
			this.optionTaked = "reveal";
		}

		this.accountManager.setOption("reveal");
	}

	private editAccountSelected(): void {
		if (this.accountManager.isPinShown) {
			this.optionTaked = "";
		} else if (this.accountManager.isPinShown === false) {
			this.optionTaked = "edit";
		}

		this.accountManager.setOption("edit");
	}

	private deleteAccountSelected(): void {
		if (this.accountManager.isPinShown) {
			this.optionTaked = "";
		} else if (this.accountManager.isPinShown === false) {
			this.optionTaked = "delete";
		}
		this.accountManager.setOption("delete");

	}

	private goBack(): void {
		this.accountManager.restartService();
		this.navController.pop();
	}
}
