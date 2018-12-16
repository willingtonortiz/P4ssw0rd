import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { AgregarCuentaPage } from "../agregar-cuenta/agregar-cuenta";
import { CuentaDAO } from "../../daos/CuentaDAO";
import { DTOCuenta } from "../../dtos/DTOCuenta";
import { EditAccountPage } from "../edit-account/edit-account";
import { PinDAO } from "../../daos/PinDAO";

import { DTOTiposCuentas } from "../../dtos/DTOTipoCuenta"
import { MostrarCuentasPage } from "../mostrar-cuentas/mostrar-cuentas"

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {

	private cuentas: Array<DTOCuenta>;
	public eventAdd = false;
	private tiposCuentas: DTOTiposCuentas;
	private buscando: boolean;

	constructor(
		public navCtrl: NavController,
		private cuentaDao: CuentaDAO,
		private alertController: AlertController,
		private pinDao: PinDAO
	) {
		console.log("Estoy en home");
		//this.tipoCuentas = new Map<string, Array<DTOCuenta>>();
		this.tiposCuentas = DTOTiposCuentas.getInstancia(cuentaDao);

	}

	ionViewWillEnter(): void {
	}

	private agregarCuenta(): void {
		// this.navCtrl.push(AgregarCuentaPage);
		this.eventAdd = !this.eventAdd;
	}

	private editAccount(item: DTOCuenta): void {
		let promise = new Promise((resolve, reject) => {
			this.alertController
				.create({
					title: "Ingrese el pin",
					inputs: [
						{
							name: "pin",
							placeholder: "Pin"
						}
					],
					buttons: [
						{
							text: "Aceptar",
							handler: (data: any) => {
								console.log("Entré aqui", data);
								this.pinDao
									.verifyPin(data.pin)
									.then((data: boolean) => {
										if (data) {
											this.navCtrl.push(
												EditAccountPage,
												item
											);
										}
									});
							}
						},
						{
							text: "Cancelar",
							handler: (data: string) => {}
						}
					]
				})
				.present();
		});
	}

	private mostrarCuentas(tipo: string): void {
		this.tiposCuentas.setActual(tipo);
		//this.tiposCuentas.buscarCategoria(tipo); esto es cuando se busca una categoria
		this.navCtrl.push(MostrarCuentasPage);
	}
}
