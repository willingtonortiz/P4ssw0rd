import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CuentaDAO } from "../../daos/CuentaDAO";
import { DTOCuenta } from "../../dtos/DTOCuenta";

@Component({
	selector: "page-agregar-cuenta",
	templateUrl: "agregar-cuenta.html"
})
export class AgregarCuentaPage {
	private user: string;
	private password: string;
	private type: string;
	private description: string;

	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cuentaDAO: CuentaDAO
	) {
		console.log("Estoy en agregarCuenta");
	}

	private agregarCuenta(): void {
		// En esta parte se podría validar con regex los correos

		if (this.user !== "" && this.password !== "" && this.type !== "") {
			this.cuentaDAO.insert(
				new DTOCuenta(
					undefined,
					this.user,
					this.password,
					this.description,
					this.type
				)
			);
		}
	}

	private regresar(): void {
		this.navCtrl.pop();
	}
}
