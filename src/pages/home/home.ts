import { Component } from "@angular/core";
import {
	NavController,
	AlertController,
	LoadingController,
	Alert
} from "ionic-angular";
import { EditAccountPage } from "../edit-account/edit-account";
import { EncryptorAccountProvider } from "../../providers/encryptor-account/encryptor-account";
import { DTOCuenta } from "../../source/dtos/DTOCuenta";
import { CuentaDAO } from "../../source/daos/CuentaDAO";
import { PinDAO } from "../../source/daos/PinDAO";

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
		private loadingController: LoadingController,
		private pinDao: PinDAO,
		private encryptor: EncryptorAccountProvider
	) {}

	ionViewWillEnter(): void {
		this.actualizarCuentas();
	}

	private actualizarCuentas(): void {
		this.cuentaDao.getAll().then((data: Array<DTOCuenta>) => {
			this.cuentas = data;
		});
	}

	private agregarCuenta(): void {
		this.eventAdd = !this.eventAdd;
	}

	private revealAccount(item: DTOCuenta): void {
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
								this.pinDao
									.verifyPin(data.pin)
									.then((data: boolean) => {
										if (data) {
											item = this.encryptor.decryptAccount(
												item
											);
										} else {
											let alert: Alert = this.alertController.create(
												{
													message:
														"El pin es incorrecto"
												}
											);
											alert.present();
											setTimeout(() => {
												alert.dismiss();
												alert = null;
											}, 1000);
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

	private deleteAccount(item: DTOCuenta): void {
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
											this.loadingController
												.create({
													content:
														"Eliminando cuenta",
													duration: 2000
												})
												.present();
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
