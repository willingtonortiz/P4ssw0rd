import { Component, ViewChild } from "@angular/core";

// Daos
import { AccountDAO } from "../../source/daos/AccountDAO";
import { PinDAO } from "../../source/daos/PinDAO";

// Dtos
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { ArrDTOAccount } from "../../providers/ArrDTOAccount";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { NavController, Slides } from "ionic-angular";

@Component({
	selector: "page-mostrar-cuentas",
	templateUrl: "mostrar-cuentas.html"
})
export class MostrarCuentasPage {
	// Para mostrar información de la cuenta
	private currentAccountIndex: number;
	private currentAccount: DTOAccount;
	private accounts: Array<DTOAccount>;
	private accountType: string;
	private accountNumber: number;

	// Manejo de slides
	@ViewChild(Slides) private slides: Slides;

	// Para manejar las funcionalidades de las cuentas
	private isPinShow: boolean = false;
	private option: string = "";
	private errorText: string = "";
	private isAccountEditted: boolean = false;

	constructor(
		private navController: NavController,
		private AccountDAO: AccountDAO,
		private pinDao: PinDAO,
		private encryptor: EncryptorAccountProvider,
		private arrDtoAccount: ArrDTOAccount
	) {
		this.accountType = arrDtoAccount.getActual().first;
		this.accounts = arrDtoAccount.getActual().second;
		this.accountNumber = this.accounts.length;
	}

	ionViewDidEnter() {
		this.currentAccountIndex = this.slides.getActiveIndex();
		this.currentAccount = this.accounts[this.currentAccountIndex];
	}

	private slideChanged() {
		this.currentAccountIndex = this.slides.getActiveIndex();
		this.currentAccount = this.accounts[this.currentAccountIndex];
	}

	private verifyPin(text: string, account: DTOAccount): void {
		if (text != null) {
			this.pinDao.verifyPin(text).then((pin: boolean) => {
				if (pin) {
					this.errorText = "";
					this.isAccountEditted = false;
					switch (this.option) {
						case "reveal":
							{
								account = this.encryptor.decryptAccount(
									account
								);
							}
							break;
						case "edit":
							{
								this.isAccountEditted = true;
							}
							break;
						case "delete":
							{
							}
							break;
					}
				} else {
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
	}

	private revealAccountSelected(item: DTOAccount): void {
		if (this.option !== "reveal") {
			this.option = "reveal";
			this.showPin();
		} else {
			this.togglePin();
		}
	}

	private editAccountSelected(item: DTOAccount): void {
		if (this.option !== "edit") {
			this.option = "edit";
			this.showPin();
		} else {
			this.togglePin();
		}
	}

	private deleteAccountSelected(item: DTOAccount): void {
		if (this.option !== "delete") {
			this.option = "delete";
			this.showPin();
		} else {
			this.togglePin();
		}
	}

	private goBack(): void {
		this.navController.pop();
	}
}
