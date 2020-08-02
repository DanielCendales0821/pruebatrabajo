import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { EncryptService } from 'src/app/services/encrypt.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public user: User;
  constructor(private readonly encryptService: EncryptService) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = this.encryptService.getValue();
  }

}
