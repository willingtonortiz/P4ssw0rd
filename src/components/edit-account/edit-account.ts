import { Encryptor } from "./../../source/Encriptacion/Encryptor/Encryptor";
import { Component, Input, OnInit } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { AccountDAO } from "../../source/daos/AccountDAO";

@Component({
	selector: "edit-account",
	templateUrl: "edit-account.html"
})
export class EditAccountComponent implements OnInit {
	@Input("account") private realAccount: DTOAccount;
	private account: DTOAccount;

	constructor(private AccountDAO: AccountDAO) {}

	ngOnInit(): void {
		this.account = new DTOAccount(
			undefined,
			this.realAccount.email,
			this.realAccount.password,
			this.realAccount.description,
			this.realAccount.type,
			this.realAccount.categories
		);
		let encryptor: Encryptor = new Encryptor();
		this.account.email = encryptor.decrypt(this.account.email);
		this.account.password = encryptor.decrypt(this.account.password);
	}

	private editAccount(): void {
		console.log(this.account);
		this.AccountDAO.update(this.account);
	}
}
