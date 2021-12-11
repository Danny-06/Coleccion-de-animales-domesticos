import { AppComponent } from './../../app.component';
import { RequestService } from './../../services/request/request.service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { User } from './../../classes/user/user';
import { Component, OnInit, ViewEncapsulation, ElementRef, Input } from '@angular/core';



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})



export class AddUserComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot


  user: User = {id: 0, name: '', details: '', favoriteAnimals: []}

  constructor(private userService: UserService, private router: Router, private element: ElementRef,  private req: RequestService) {}

  async ngOnInit(){

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

  }

  async addUser() {
    if (this.user.name === '') return

    this.user.id = await this.getMaxUserId() + 1

    await this.userService.addUserToStorage(this.user)

    this.router.navigateByUrl('/user')
  }

  async getMaxUserId(): Promise<number> {
    const users = await this.userService.getUsersFromStorage()

    if (users.length === 0) return -1

    const usersID = users.map(user => user.id)

    return Math.max(...usersID)
  }

}
