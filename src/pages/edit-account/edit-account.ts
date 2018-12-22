import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DTOAccount } from "../../source/dtos/DTOAccount";
import { AccountDAO } from "../../source/daos/AccountDAO";

@Component({
	selector: "page-edit-account",
	templateUrl: "edit-account.html"
})
export class EditAccountPage {
	private account: DTOAccount = null;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private AccountDAO: AccountDAO
	) {
		let params: DTOAccount = navParams.data;
		this.account = new DTOAccount(
			params.idCuenta,
			params.email,
			params.password,
			params.description,
			params.type,
			params.categories
		);
	}

	private editAccount(): void {
		console.log(this.account);
		this.AccountDAO.update(this.account);
	}
}
