import { Component } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { AgregarCuentaPage } from "../agregar-cuenta/agregar-cuenta";
import { CuentaDAO } from "../../daos/CuentaDAO";
import { DTOCuenta } from "../../dtos/DTOCuenta";
import { EditAccountPage } from "../edit-account/edit-account";
import { PinDAO } from "../../daos/PinDAO";

@Component({
	selector: "page-home",
	templateUrl: "home.html"
})
export class HomePage {
	private cuentas: Array<DTOCuenta>;
	public eventAdd = false;
	constructor(
		public navCtrl: NavController,
		private cuentaDao: CuentaDAO,
		private alertController: AlertController,
		private pinDao: PinDAO
	) {
		console.log("Estoy en home con tu gfa");
	}

	ionViewWillEnter(): void {
		this.actualizarCuentas();
	}

	private actualizarCuentas(): void {
		this.cuentaDao.getAll().then((data: Array<DTOCuenta>) => {
			this.cuentas = data;
		});
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

	private deleteAccount(item: DTOCuenta) {
		let promise = new Promise((resolve, reject) => {
			this.alertController
				.create({
					title: "Ingrese su pin",
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
								this.pinDao
									.verifyPin(data.pin)
									.then((data: boolean) => {
										if (data) {
											this.cuentaDao.delete(item);
											this.actualizarCuentas();
										}
									});
							}
						},
						{
							text: "Cancelar",
							handler: (data: any) => {}
						}
					]
				})
				.present();
		});
	}
}
