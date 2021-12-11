import { ActivatedRoute, Router } from '@angular/router';
import { User } from './../../classes/user/user';
import { AppComponent } from './../../app.component';
import { RequestService } from './../../services/request/request.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditUserComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  users: User[] = []
  user: User = {id: 0, name: '', details: '', favoriteAnimals: []}

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private element: ElementRef,  private req: RequestService) {}

  async ngOnInit() {

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (!id) return console.log(`Id wasn't found`)

    this.users = await this.userService.getUsersFromStorage();
    [this.user] = this.users.filter(u => u.id === +id)

  }

  updateUser() {
    if (this.user.name === '') return
    this.userService.updateUserFromStorage(this.user)

    this.router.navigateByUrl('/user')
  }

}
