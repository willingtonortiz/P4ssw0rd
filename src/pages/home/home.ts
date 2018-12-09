import { Component } from "@angular/core";
import { NavController } from "ionic-angular";
import { CuentaDAO } from "../../daos/CuentaDAO";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	constructor(public navCtrl: NavController, private cuentas: CuentaDAO) {

	}
}
