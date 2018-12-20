import { NgModule } from "@angular/core";
import { PassButtonComponent } from "./pass-button/pass-button";
import { CreateAccountComponent } from "./create-account/create-account";
import { VerifyPinComponent } from './verify-pin/verify-pin';
import { PinInputComponent } from './pin-input/pin-input';

@NgModule({
	declarations: [PassButtonComponent, CreateAccountComponent,
    VerifyPinComponent,
    PinInputComponent],
	imports: [],
	exports: [PassButtonComponent, CreateAccountComponent,
    VerifyPinComponent,
    PinInputComponent]
})
export class ComponentsModule {}
