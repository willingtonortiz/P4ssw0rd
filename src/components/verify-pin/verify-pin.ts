import { Component } from "@angular/core";

@Component({
	selector: "verify-pin",
	templateUrl: "verify-pin.html"
})
export class VerifyPinComponent {
	text: string;

	constructor() {
		console.log("Hello VerifyPinComponent Component");
		this.text = "Hello World";
	}
}
