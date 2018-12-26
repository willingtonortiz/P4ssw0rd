import { Component, ViewChild } from "@angular/core";

// Daos
import { PinDAO } from "../../source/daos/PinDAO";

// Dtos
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { ArrDTOAccount } from "../../providers/ArrDTOAccount";
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

	// Manejo de slides
	@ViewChild(Slides) private slides: Slides;

	// Para manejar las funcionalidades de las cuentas
	private errorText: string = "";
	private optionTaked: string = "";

	constructor(
		private navController: NavController,
		private pinDao: PinDAO,
		private arrDtoAccount: ArrDTOAccount,
		private accountManager: AccountManagerProvider
	) {
		this.accountType = arrDtoAccount.getActual().first;
		this.accounts = arrDtoAccount.getActual().second;
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
				if (pin) {
					this.accountManager.executeOption();
				}
				// El pin es incorrecto
				else {
					this.errorText = "Pin incorrecto";
				}
			});
		}
	}

	private revealAccountSelected(): void {
		this.optionTaked = "reveal";
		this.accountManager.setOption("reveal");
	}

	private editAccountSelected(): void {
		this.optionTaked = "edit";
		this.accountManager.setOption("edit");
	}

	private deleteAccountSelected(): void {
		this.optionTaked = "delete";
		this.accountManager.setOption("delete");
	}

	private goBack(): void {
		this.accountManager.restartService();
		this.navController.pop();
	}
}
