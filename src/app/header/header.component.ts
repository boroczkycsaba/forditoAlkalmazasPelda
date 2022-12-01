import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logoUrl : string = 'assets/webfordito.jpg';
  user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUser();
  }


  loadUser() {
    this.user = this.userService.loadUser();
  }
}
