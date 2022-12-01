import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../registration.service";
import {User} from "../../user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  user: User = new User();

  constructor(private registrationService:RegistrationService,
              private router: Router,) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', Validators.required),
      accaptTheRules: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registrationForm.value.accaptTheRules) {
      this.user.name = this.registrationForm.value.name;
      this.user.email = this.registrationForm.value.email;
      this.user.phoneNumber = this.registrationForm.value.phoneNumber;
      if (this.user.name && this.user.email && this.user.phoneNumber) {
        this.registrationService.saveUser(this.user);
        this.router.navigate(['/translate']);
      } else {
        console.error("Hiba az adatokban");
      }
    } else {
      console.error("El kell fogadni a feltételeket!");
    }
  }
}
