import {
	ElementRef,
	Component,
	ViewChild,
	Output,
	EventEmitter
} from "@angular/core";

@Component({
	selector: "pin-input",
	templateUrl: "pin-input.html"
})
export class PinInputComponent {
	@ViewChild("pinref1") private pinInput1: ElementRef;
	@ViewChild("pinref2") private pinInput2: ElementRef;
	@ViewChild("pinref3") private pinInput3: ElementRef;
	@ViewChild("pinref4") private pinInput4: ElementRef;
	@ViewChild("pinref5") private pinInput5: ElementRef;
	@ViewChild("pinref6") private pinInput6: ElementRef;

	@Output("onWritten") private onWritten: EventEmitter<
		string
	> = new EventEmitter<string>();

	private inputs: any = {
		pinref1: "",
		pinref2: "",
		pinref3: "",
		pinref4: "",
		pinref5: "",
		pinref6: ""
	};

	constructor() {}

	private written1(ev: any) {
		if (this.inputs.pinref1 !== "") {
			this.pinInput2.nativeElement.focus();
		}
		this.emitPin();
	}

	private written2(ev: any) {
		if (this.inputs.pinref1 !== "") {
			this.pinInput3.nativeElement.focus();
		}
		this.emitPin();
	}

	private written3(ev: any) {
		if (this.inputs.pinref1 !== "") {
			this.pinInput4.nativeElement.focus();
		}
		this.emitPin();
	}

	private written4(ev: any) {
		if (this.inputs.pinref1 !== "") {
			this.pinInput5.nativeElement.focus();
		}
		this.emitPin();
	}

	private written5(ev: any) {
		if (this.inputs.pinref1 !== "") {
			this.pinInput6.nativeElement.focus();
		}
		this.emitPin();
	}

	private written6(ev: any) {
		// this.pinInput6.nativeElement.focus();
		this.emitPin();
	}

	private emitPin(): void {
		this.onWritten.emit(this.getPin());
	}

	private isValid(text: string): boolean {
		if (text !== "" && text !== " ") {
			return true;
		} else {
			return false;
		}
	}

	private isPinValid(): boolean {
		if (
			this.isValid(this.inputs.pinref1) &&
			this.isValid(this.inputs.pinref2) &&
			this.isValid(this.inputs.pinref3) &&
			this.isValid(this.inputs.pinref4) &&
			this.isValid(this.inputs.pinref5) &&
			this.isValid(this.inputs.pinref6)
		) {
			return true;
		} else {
			return false;
		}
	}

	private getString(): string {
		return (
			this.inputs.pinref1 +
			this.inputs.pinref2 +
			this.inputs.pinref3 +
			this.inputs.pinref4 +
			this.inputs.pinref5 +
			this.inputs.pinref6
		);
	}

	public getPin(): string {
		if (this.isPinValid()) {
			return this.getString();
		} else {
			return null;
		}
	}

	private cleanInputs(): void {
		this.inputs.pinref1 = "";
		this.inputs.pinref2 = "";
		this.inputs.pinref3 = "";
		this.inputs.pinref4 = "";
		this.inputs.pinref5 = "";
		this.inputs.pinref6 = "";
	}
}
