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
		this.currentOption = "nothing";
		this.isAccountShowing = true;
		this.isAccountDeleting = false;
		this.isAccountEditing = false;
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

	// Hace que solo se muestre el componente de "ShowAccount"
	private resetComponents(): void {
		this.isAccountShowing = true;
		this.isAccountEditing = false;
		this.isAccountDeleting = false;
	}

	// Maneja el mostrado del verificador de pin dependiendo de las opciones
	public setOption(option: string): void {
		// Siempre verificar que la cuenta esté encriptada
		this.checkRevealedAccount();

		//Siempre mostrar la cuenta encriptada
		this.resetComponents();
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
				}
				break;
			case "delete":
				{
					if (this.currentOption === "delete") {
						this.hidePin();
					} else {
						this.currentOption = "delete";
						this.showPin();
					}
				}
				break;
		}
	}

	// Verifica si había una cuenta desencriptada y la encripta en dicho caso
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
					// Revela la cuenta
					this.currentAccount = this.encryptorAccount.decryptAccount(
						this.currentAccount
					);
					this.isAccountRevealed = true;
					this.isAccountShowing = true;
				}
				break;
			case "edit":
				{
					this.isAccountShowing = false;
					// Mostrar el componente para editar cuenta
					this.isAccountEditing = true;
				}
				break;
			case "delete":
				{
					// No oculta la cuenta, por que se debe mostrar
					this.isAccountDeleting = true;
				}
				break;
		}

		// Cuando se haya seleccionado una opcion, siempre se esconderá el pin verifier
		// this.isPinShown = false;
		this.hidePin();
	}

	public nothingSelected(): void {
		this.isAccountShowing = true;
		this.isAccountDeleting = false;
		this.isAccountEditing = false;
	}
}
