import { Component } from "@angular/core";

@Component({
	selector: "pin-input",
	templateUrl: "pin-input.html"
})

export class PinInputComponent {
	text: string;

	constructor() {
		console.log("Hello PinInputComponent Component");
		this.text = "Hello World";
	}
}
