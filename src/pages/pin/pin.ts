import { Component,ViewChild,ElementRef } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { PinDAO } from "../../source/daos/PinDAO";

@Component({
	selector: "page-pin",
	templateUrl: "pin.html"
})
export class PinPage {
	private pin: string = "";

	@ViewChild('pinref1') pinInput1:ElementRef;
	@ViewChild('pinref2') pinInput2:ElementRef;
	@ViewChild('pinref3') pinInput3:ElementRef;
	@ViewChild('pinref4') pinInput4:ElementRef;
	@ViewChild('pinref5') pinInput5:ElementRef;
	@ViewChild('pinref6') pinInput6:ElementRef;


	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private pinDao: PinDAO
	) {}

	private registrarPin(): void {
		// Se guarda el pin en la base de datos
		this.pinDao.setPin(this.pin);

		// Se redirige al home de la aplicación
		this.navCtrl.setRoot(HomePage);


		this.pinInput1.nativeElement.focus();
	}

	private focus2(ev) {
		if(ev.target.value.length ===1 ){
			this.pinInput2.nativeElement.focus();
		}

	}
	private focus3(ev) {
		if(ev.target.value.length ===1 ){
			this.pinInput3.nativeElement.focus();
		}

	}
	private focus4(ev) {
		if(ev.target.value.length ===1 ){
			this.pinInput4.nativeElement.focus();
		}

	}
	private focus5(ev) {
		if(ev.target.value.length ===1 ){
			this.pinInput5.nativeElement.focus();
		}

	}
	private focus6(ev) {
		if(ev.target.value.length ===1 ){
			this.pinInput6.nativeElement.focus();
		}

	}
}
