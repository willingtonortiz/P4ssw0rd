import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "pass-button",
	templateUrl: "pass-button.html"
})
export class PassButtonComponent {
	// Se le ingresará el texto del botón
	@Input("buttonText") buttonText: string = null;

	// Evento que se produce cuando se hace click
	@Output("onButtonClick") onButtonClick: EventEmitter<
		void
	> = new EventEmitter();

	constructor() {}

	private buttonClick(): void {
		this.onButtonClick.emit();
	}
}
