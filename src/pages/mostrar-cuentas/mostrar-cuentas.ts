import { Component, ViewChild } from "@angular/core";

// Daos
import { AccountDAO } from "../../source/daos/AccountDAO";
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
	private isAccountEditted: boolean = false;

	// Manejo de slides
	@ViewChild(Slides) private slides: Slides;

	// Para manejar las funcionalidades de las cuentas
	private isPinShow: boolean = false;
	private errorText: string = "";

	constructor(
		private navController: NavController,
		private AccountDAO: AccountDAO,
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

	private togglePin(): void {
		this.isPinShow = !this.isPinShow;
	}

	private showPin(): void {
		this.isPinShow = true;
	}

	private hidePin(): void {
		this.isPinShow = false;
		this.accountManager.setOption("nothing");
	}

	private revealAccountSelected(item: DTOAccount): void {
		if (this.accountManager.getOption() !== "reveal") {
			/* LÓGICA PARA CAMBIAR LA OPCIÓN SELECCIONADA VISUALMENTE */

			// Se selecciona la opción
			this.accountManager.setOption("reveal");

			// Si no estaba visible el pin, se mostrará
			this.showPin();
		} else {
			this.hidePin();
		}
	}

	private editAccountSelected(item: DTOAccount): void {
		if (this.accountManager.getOption() !== "edit") {
			/* LÓGICA PARA CAMBIAR LA OPCIÓN SELECCIONADA VISUALMENTE */

			// Se selecciona la opción
			this.accountManager.setOption("edit");

			// Si no estaba visible el pin, se mostrará
			this.showPin();
		} else {
			this.hidePin();
		}
	}

	private deleteAccountSelected(item: DTOAccount): void {
		if (this.accountManager.getOption() !== "delete") {
			/* LÓGICA PARA CAMBIAR LA OPCIÓN SELECCIONADA VISUALMENTE */

			// Se selecciona la opción
			this.accountManager.setOption("delete");

			// Si no estaba visible el pin, se mostrará
			this.showPin();
		} else {
			this.hidePin();
		}
	}

	private goBack(): void {
		this.navController.pop();
	}
}
