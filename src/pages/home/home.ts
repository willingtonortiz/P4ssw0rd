import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { MostrarCuentasPage } from "../mostrar-cuentas/mostrar-cuentas";

import { AccountClassifier } from "../../providers/AccountClassifier";
import { EditPinPage } from "../edit-pin/edit-pin";
import { Enigma } from "../../source/Encriptacion/Enigma/Enigma";
import { PinDAO } from "../../source/daos/PinDAO";
import { RotorPosicion } from "../../source/Encriptacion/Enigma/RotorPosicion";
import { AES } from "../../source/Encriptacion/AES/AES";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	public isCreateAccountShown: boolean = false;

	constructor(
		private navCtrl: NavController,
		private accountClassifier: AccountClassifier,
		private pinDao: PinDAO
	) {
		this.pinDao.getPin().then((pin: string) => {
			// RotorPosicion.setAumento(1);

			let numero1: number = RotorPosicion.transformar(pin);
			let numero2: number = RotorPosicion.transformar(pin);
			let numero3: number = RotorPosicion.transformar(pin);

			Enigma.getInstancia(numero1, numero2, numero3);
			AES.getInstancia(pin);
		});
	}

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
