import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AccountService } from './account.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'] 
})
export class AccountComponent implements OnInit {
  message: string;
  returnUrl: string;

  constructor(private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.returnUrl = params["returnurl"] || "products";
    });
  }

  loginUser(form: NgForm) {
    this.accountService.login(form.value.user, form.value.password).subscribe(t => {
      if (t) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.message = "Username or password is incorrect!";
      }
    });
  }

}
