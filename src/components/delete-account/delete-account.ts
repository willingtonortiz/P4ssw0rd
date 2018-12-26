import { Component, Input } from "@angular/core";
import { DTOAccount } from "../../source/dtos/DTOAccount";

@Component({
	selector: "delete-account",
	templateUrl: "delete-account.html"
})
export class DeleteAccountComponent {
	@Input("account") private account: DTOAccount;

	constructor() {}

	private deleteAccount(option: boolean): void {
		console.log(option);
	}
}
