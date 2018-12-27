import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
	selector: "verify-pin",
	templateUrl: "verify-pin.html"
})
export class VerifyPinComponent {
	@Input("headerText") headerText: string;
	@Input("errorText") errorText: string;
	@Input("waitForPinConfirmation") waitForPinConfirmation:boolean;
	@Output("onWrittenEvent") onWrittenEvent: EventEmitter<
		string
	> = new EventEmitter<string>();


	constructor() {}

	private onWritten(text: string): void {
		this.onWrittenEvent.emit(text);

	}
}
