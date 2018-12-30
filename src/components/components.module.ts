import { NgModule } from "@angular/core";
import { PassButtonComponent } from "./pass-button/pass-button";
import { CreateAccountComponent } from "./create-account/create-account";
import { VerifyPinComponent } from "./verify-pin/verify-pin";
import { PinInputComponent } from "./pin-input/pin-input";
import { FormsModule } from "@angular/forms";
import { EditAccountComponent } from "./edit-account/edit-account";
import { RevealAccountComponent } from "./reveal-account/reveal-account";
import { DeleteAccountComponent } from "./delete-account/delete-account";
import { ShowAccountComponent } from "./show-account/show-account";
import { IonicModule } from "ionic-angular";

@NgModule({
	declarations: [
		PassButtonComponent,
		CreateAccountComponent,
		VerifyPinComponent,
		PinInputComponent,
		EditAccountComponent,
		RevealAccountComponent,
		DeleteAccountComponent,
		ShowAccountComponent,
		DeleteAccountComponent
	],
	imports: [FormsModule, IonicModule],
	exports: [
		PassButtonComponent,
		CreateAccountComponent,
		VerifyPinComponent,
		PinInputComponent,
		EditAccountComponent,
		RevealAccountComponent,
		DeleteAccountComponent,
		ShowAccountComponent,
		DeleteAccountComponent
	]
})
export class ComponentsModule {}
