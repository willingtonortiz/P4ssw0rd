import { Component, Input } from "@angular/core";

@Component({
	selector: "delete-account",
	templateUrl: "delete-account.html"
})
export class DeleteAccountComponent {
	@Input("account") private account: Account;

	constructor() {
		console.log(this.account);
	}
}
