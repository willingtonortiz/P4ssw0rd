import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { AgregarCuentaPage } from "../agregar-cuenta/agregar-cuenta";
import { CuentaDAO } from "../../daos/CuentaDAO";
import { DTOCuenta } from "../../dtos/DTOCuenta";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	private cuentas: Array<DTOCuenta>;

	constructor(public navCtrl: NavController, private cuentaDao: CuentaDAO) {
		console.log("Estoy en home");
	}

	ionViewWillEnter(): void {
		this.cuentaDao.getAll().then((data: Array<DTOCuenta>) => {
			this.cuentas = data;
		});
	}

	private agregarCuenta(): void {
		this.navCtrl.push(AgregarCuentaPage);
	}
}
