import {
	Component,
	Input,
	Output,
	EventEmitter,
	ViewChild
} from "@angular/core";
import { PinInputComponent } from "../pin-input/pin-input";

@Component({
	selector: "verify-pin",
	templateUrl: "verify-pin.html"
})
export class VerifyPinComponent {
	@Input("headerText") headerText: string;
	@Input("errorText") errorText: string;
	@Input("waitForPinConfirmation") waitForPinConfirmation: boolean;
	@Output("onWrittenEvent") onWrittenEvent: EventEmitter<
		string
	> = new EventEmitter<string>();
	@ViewChild(PinInputComponent) private pinInput: PinInputComponent;

	constructor() {}

	private onWritten(text: string): void {
		this.onWrittenEvent.emit(text);
	}

	public cleanInputs(): void {
		this.pinInput.cleanInputs();
	}
}
