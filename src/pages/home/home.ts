import { Component } from "@angular/core";
import {
	NavController
	// AlertController,
	// LoadingController,
	// Alert
} from "ionic-angular";

// Pages
// import { EditAccountPage } from "../edit-account/edit-account";
import { MostrarCuentasPage } from "../mostrar-cuentas/mostrar-cuentas";

// Daos
// import { PinDAO } from "../../source/daos/PinDAO";

// Dtos
// import { DTOCuenta } from "../../source/dtos/DTOCuenta";

// Services
// import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
// import { CuentaDAO } from "../../source/daos/CuentaDAO";
import { ArrDTOAccount } from "../../providers/ArrDTOAccount";
// import { Pair } from "../../source/dataEstructure/Pair";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	// private accounts: Array<Pair> = null;
	public eventAdd: boolean = false;
	// private buscando: boolean;

	constructor(
		public navCtrl: NavController,
		private arrDtoAccount: ArrDTOAccount
	) {}

	private toggleCreateAccount(): void {
		this.eventAdd = !this.eventAdd;
	}

	private showAccounts(tipo: string): void {
		this.arrDtoAccount.setActual(tipo);
		//this.tiposCuentas.buscarCategoria(tipo); esto es cuando se busca una categoria
		this.navCtrl.push(MostrarCuentasPage);
	}
}
