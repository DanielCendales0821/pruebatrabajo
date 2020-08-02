import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { EncryptService } from 'src/app/services/encrypt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;
  constructor(private readonly encryptService: EncryptService, private readonly router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = this.encryptService.getValue();
  }

  logout() {
    sessionStorage.clear();
    window.location.href = '';
  }

}
