import { Component, Input } from "@angular/core";

@Component({
	selector: "reveal-account",
	templateUrl: "reveal-account.html"
})
export class RevealAccountComponent {
	@Input("account") private account: Account;

	constructor() {
		console.log(this.account);
	}
}
