import { DTOAccount } from "./../../source/dtos/DTOAccount";
import { Component, Input } from "@angular/core";

@Component({
	selector: "show-account",
	templateUrl: "show-account.html"
})
export class ShowAccountComponent {
	@Input("account") private account: DTOAccount;

	constructor() {
	}
}
