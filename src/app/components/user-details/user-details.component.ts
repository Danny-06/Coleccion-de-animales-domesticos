import { AnimalService } from './../../services/animal/animal.service';
import { User } from './../../classes/user/user';
import { UserService } from './../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserDetailsComponent implements OnInit {

  constructor(private userService: UserService, private animalService: AnimalService, private activatedRoute: ActivatedRoute, private router: Router) {}

  user: User = {id: -1, name: '', details: '', favoriteAnimals: []}

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}


  async ngOnInit() {

    // const w: any = window
    // w._componentInstance = this

    await this.animalService.loadAnimals()

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!id) throw new Error('User Id not found')

    const users = await this.userService.getUsersFromStorage();

    [this.user] = users.filter(u => u.id === +id)

    if (!this.user.details) this.user.details = 'User details is empty'

  }

  getUserAnimalCount() {
    const animals = this.animalService.getAnimals()
    const {favoriteAnimals} = this.user
    const userAnimals = favoriteAnimals.map(id => animals.filter(a => a.id === id)[0])

    const cats    = userAnimals.filter(a => a.type === 'cat').length
    const dogs    = userAnimals.filter(a => a.type === 'dog').length
    const parrots = userAnimals.filter(a => a.type === 'parrot').length
    
    return {cats, dogs, parrots}
  }

  goToAddFavoriteAnimal(id: number) {
    this.router.navigateByUrl(`/add-favorite-animal/${id}`)
  }

}
