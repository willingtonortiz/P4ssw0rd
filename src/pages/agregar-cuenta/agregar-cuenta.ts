import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CuentaDAO } from "../../daos/CuentaDAO";
import { DTOCuenta } from "../../dtos/DTOCuenta";

import { DTOTiposCuentas } from "../../dtos/DTOTipoCuenta"

@Component({
	selector: "page-agregar-cuenta",
	templateUrl: "agregar-cuenta.html"
})
export class AgregarCuentaPage {
	private user: string;
	private password: string;
	private type: string;
	private description: string;
	private categories: string;

	private tipos: DTOTiposCuentas;

	public constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private cuentaDAO: CuentaDAO
	) {
		this.categories = "";
	}

	private agregarCuenta2(): void {
		// En esta parte se podría validar con regex los correos

		if (this.user !== "" && this.password !== "" && this.type !== "") {
			this.cuentaDAO.insert(
				new DTOCuenta(
					undefined,
					this.user,
					this.password,
					this.description,
					this.type,
					this.categories.split(" ")
				)
			);
		}
		DTOTiposCuentas.getInstancia().agregarCuenta(new DTOCuenta(undefined, this.user, this.password, this.description, this.type, this.categories.split(" ")));
		//this.regresar();
		//como regreso a la principal?
	}

	private regresar(): void {
		this.navCtrl.pop();
	}
}
