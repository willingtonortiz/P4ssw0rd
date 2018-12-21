import { ElementRef, Component, ViewChild } from "@angular/core";

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

	constructor() {}

	private focus2(ev: any) {
		if (ev.target.value !== " ") {
			if (ev.target.value.length === 1) {
				this.pinInput2.nativeElement.focus();
			}
		} else {
			ev.target.value = "";
		}
	}

	private focus3(ev: any) {
		if (ev.target.value !== " ") {
			if (ev.target.value.length === 1) {
				this.pinInput3.nativeElement.focus();
			}
		} else {
			ev.target.value = "";
		}
	}

	private focus4(ev: any) {
		if (ev.target.value !== " ") {
			if (ev.target.value.length === 1) {
				this.pinInput4.nativeElement.focus();
			}
		} else {
			ev.target.value = "";
		}
	}

	private focus5(ev: any) {
		if (ev.target.value !== " ") {
			if (ev.target.value.length === 1) {
				this.pinInput5.nativeElement.focus();
			}
		} else {
			ev.target.value = "";
		}
	}

	private focus6(ev: any) {
		if (ev.target.value !== " ") {
			if (ev.target.value.length === 1) {
				this.pinInput6.nativeElement.focus();
			}
		} else {
			ev.target.value = "";
		}
	}

	public getPin(): string {
		if (
			(<HTMLInputElement>this.pinInput1.nativeElement).value !== "" &&
			(<HTMLInputElement>this.pinInput1.nativeElement).value !== " " &&
			(<HTMLInputElement>this.pinInput2.nativeElement).value !== "" &&
			(<HTMLInputElement>this.pinInput2.nativeElement).value !== " " &&
			(<HTMLInputElement>this.pinInput3.nativeElement).value !== "" &&
			(<HTMLInputElement>this.pinInput3.nativeElement).value !== " " &&
			(<HTMLInputElement>this.pinInput4.nativeElement).value !== "" &&
			(<HTMLInputElement>this.pinInput4.nativeElement).value !== " " &&
			(<HTMLInputElement>this.pinInput5.nativeElement).value !== "" &&
			(<HTMLInputElement>this.pinInput5.nativeElement).value !== " " &&
			(<HTMLInputElement>this.pinInput6.nativeElement).value !== "" &&
			(<HTMLInputElement>this.pinInput6.nativeElement).value !== " "
		) {
			return (
				(<HTMLInputElement>this.pinInput1.nativeElement).value +
				(<HTMLInputElement>this.pinInput2.nativeElement).value +
				(<HTMLInputElement>this.pinInput3.nativeElement).value +
				(<HTMLInputElement>this.pinInput4.nativeElement).value +
				(<HTMLInputElement>this.pinInput5.nativeElement).value +
				(<HTMLInputElement>this.pinInput6.nativeElement).value
			);
		}
		return null;
	}
}
