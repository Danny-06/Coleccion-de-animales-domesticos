import { RequestService } from './../../services/request/request.service';
import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { User } from './../../classes/user/user';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class UserComponent implements OnInit {

  users: User[] = []

  constructor(private userService: UserService, private router: Router, private element: ElementRef,  private req: RequestService) {}

  root = this.element.nativeElement
  host = this.root.shadowRoot


  async ngOnInit() {

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

    const users = await this.userService.getUsersFromStorage()

    if (users.length === 0) this.users = await this.userService.loadDefaultUsersFromJSON()
    else this.users = users
  }

  async goToAddUser() {
    this.router.navigateByUrl('/add-user')
  }

  goToUser(id: number) {
    this.router.navigateByUrl(`/user/${id}`)
  }

  async editUser(id: number) {
    this.router.navigateByUrl(`/edit-user/${id}`)
  }

  async deleteUser(id: number) {
    await this.userService.deleteUserFromStorage(id)
    this.users = await this.userService.getUsersFromStorage()
  }

}
