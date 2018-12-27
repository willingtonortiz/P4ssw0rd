import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { MostrarCuentasPage } from "../mostrar-cuentas/mostrar-cuentas";

import { AccountClassifier } from "../../providers/AccountClassifier";
import { EditPinPage } from "../edit-pin/edit-pin";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	public isCreateAccountShown: boolean = false;

	constructor(
		public navCtrl: NavController,
		private accountClassifier: AccountClassifier
	) {}

	private toggleCreateAccount(): void {
		this.isCreateAccountShown = !this.isCreateAccountShown;
	}

	private hideCreateAccount(): void {
		this.isCreateAccountShown = false;
	}

	private showAccounts(tipo: string): void {
		this.accountClassifier.setActual(tipo);
		//this.tiposCuentas.buscarCategoria(tipo); esto es cuando se busca una categoria
		this.navCtrl.push(MostrarCuentasPage);
	}

	private editPin(): void {
		this.navCtrl.push(EditPinPage);
	}
}
