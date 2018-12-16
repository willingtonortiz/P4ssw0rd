import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { DTOCuenta } from "../../source/dtos/DTOCuenta";
import { CuentaDAO } from "../../source/daos/CuentaDAO";

@Component({
	selector: "page-edit-account",
	templateUrl: "edit-account.html"
})
export class EditAccountPage {
	private account: DTOCuenta = null;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cuentaDAO: CuentaDAO
	) {
		let params: DTOCuenta = navParams.data;
		this.account = new DTOCuenta(
			params.idCuenta,
			params.email,
			params.password,
			params.description,
			params.type
		);
	}

	private ionViewDidLoad(): void {
		console.log("ionViewDidLoad EditAccountPage");
	}

	private editAccount(): void {
		this.cuentaDAO.update(this.account);
	}
}
