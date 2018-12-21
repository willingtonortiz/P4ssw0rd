import { Component, Input, ViewChild } from "@angular/core";
import { PinDAO } from "../../source/daos/PinDAO";
import { NavController, AlertController, Alert } from "ionic-angular";
import { PinInputComponent } from "../pin-input/pin-input";

@Component({
	selector: "verify-pin",
	templateUrl: "verify-pin.html"
})
export class VerifyPinComponent {
	@Input("text") text: string;
	@ViewChild(PinInputComponent)
	private inputComponent: PinInputComponent;

	constructor(
		private pinDao: PinDAO,
		private navController: NavController,
		private alertController: AlertController
	) {}

	public getPin() {
		return this.inputComponent.getPin();
	}
}
