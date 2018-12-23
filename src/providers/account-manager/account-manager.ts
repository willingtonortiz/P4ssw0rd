import { Injectable } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { EncryptorAccountProvider } from "../encryptor-account/encryptor-account";

@Injectable()
export class AccountManagerProvider {
	// Cuenta actual
	// private currentIndexAccount: number;
	private isRevealed: boolean = false;
	private currentAccount: DTOAccount;

	// Manejo de opciones (reveal, edit, delete)
	private currentOption: string = "nothing";

	constructor(private encryptorAccount: EncryptorAccountProvider) {}

	public setOption(option: string): void {
		switch (option) {
			case "reveal":
				{
				}
				break;
			case "edit":
				{
					this.checkRevealedAccount();
				}
				break;
			case "delete":
				{
					this.checkRevealedAccount();
				}
				break;
		}
		this.currentOption = option;
	}

	public getOption(): string {
		return this.currentOption;
	}

	private checkRevealedAccount(): void {
		// Si la cuenta actual estaba revelada
		if (this.isRevealed) {
			// Se reencripta
			this.currentAccount = this.encryptorAccount.encryptAccount(
				this.currentAccount
			);

			// Se marca como no revelada
			this.isRevealed = false;
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

	public executeOption(): void {
		switch (this.currentOption) {
			case "reveal":
				{
					this.currentAccount = this.encryptorAccount.decryptAccount(
						this.currentAccount
					);
					this.isRevealed = true;
				}
				break;
			case "edit":
				{
				}
				break;
			case "delete":
				{
				}
				break;
		}
	}
}
