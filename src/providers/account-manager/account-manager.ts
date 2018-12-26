import { Injectable } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { EncryptorAccountProvider } from "../encryptor-account/encryptor-account";

@Injectable()
export class AccountManagerProvider {
	// Cuenta actual
	private currentAccount: DTOAccount;

	// Variables publicas
	public isPinShown: boolean = false;
	private isAccountRevealed: boolean = false;
	public isAccountShowing: boolean = true;
	public isAccountEditing: boolean = false;
	public isAccountDeleting: boolean = false;

	// Manejo de opciones (reveal, edit, delete)
	private currentOption: string = "nothing";

	constructor(private encryptorAccount: EncryptorAccountProvider) {}

	public restartService(): void {
		this.isAccountRevealed = false;
		this.isPinShown = false;
		this.currentAccount = null;

		// Estados iniciales de las cuentas
		this.isAccountShowing = true;
		this.isAccountDeleting = false;
		this.isAccountEditing = false;
		this.currentOption = "nothing";
	}

	// Muestra el verificador de pin
	public showPin(): void {
		this.isPinShown = true;
	}

	// Esconde el verificador de pin
	public hidePin(): void {
		this.isPinShown = false;
		// Si el pin está escondido, la opcion actual es "nothing"
		this.currentOption = "nothing";
	}

	// Maneja el mostrado del verificador de pin dependiendo de las opciones
	public setOption(option: string): void {
		this.isAccountEditing = false;
		switch (option) {
			case "reveal":
				{
					if (this.currentOption === "reveal") {
						this.hidePin();
					} else {
						this.currentOption = "reveal";
						this.showPin();
					}
				}
				break;
			case "edit":
				{
					if (this.currentOption === "edit") {
						this.hidePin();
					} else {
						this.currentOption = "edit";
						this.showPin();
					}
					this.checkRevealedAccount();
				}
				break;
			case "delete":
				{
					if (this.currentOption === "reveal") {
						this.hidePin();
					} else {
						this.currentOption = "reveal";
						this.showPin();
					}
					this.checkRevealedAccount();
				}
				break;
		}
	}

	private checkRevealedAccount(): void {
		// Si la cuenta actual estaba revelada
		if (this.isAccountRevealed) {
			// Se reencripta
			this.currentAccount = this.encryptorAccount.encryptAccount(
				this.currentAccount
			);

			// Se marca como no revelada
			this.isAccountRevealed = false;
		}
	}

	public setCurrentAccount(account: DTOAccount): void {
		this.checkRevealedAccount();

		// Se establece la nueva cuenta
		this.currentAccount = account;
	}

	public getCurrentAccount(): DTOAccount {
		return this.currentAccount;
	}

	// Maneja el muestreo de los elementos en pantalla
	public executeOption(): void {
		switch (this.currentOption) {
			case "reveal":
				{
					this.currentAccount = this.encryptorAccount.decryptAccount(
						this.currentAccount
					);
					this.isAccountRevealed = true;
				}
				break;
			case "edit":
				{
					// Mostrar el componente para editar cuenta
					this.isAccountEditing = true;

					this.isAccountRevealed = true;
				}
				break;
			case "delete":
				{
				}
				break;
		}
	}

	public deleteAccount(option: boolean): void {
		console.log("Estoy eliminando la cuenta");
	}
}
