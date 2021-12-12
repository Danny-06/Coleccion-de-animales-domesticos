import { UserService } from './../../services/user/user.service';
import { User } from './../../classes/user/user';
import { RequestService } from './../../services/request/request.service';
import { AppComponent } from './../../app.component';
import { Animal } from 'src/app/classes/animal/animal';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-favorite-animal',
  templateUrl: './add-favorite-animal.component.html',
  styleUrls: ['./add-favorite-animal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AddFavoriteAnimalComponent implements OnInit {

  // Drowpdown filter
  filterOptions: {name: string}[] = [
    {name: 'all'},
    {name: 'cat'},
    {name: 'dog'},
    {name: 'parrot'}
  ]

  @Input()
  filterSelected: any = this.filterOptions[0]

  filterAnimals(): any {
    const {name: type} = this.filterSelected
    if (type === 'all') return this.animals = this.animalService.getAnimals()

    this.animals = this.animalService.getAnimals().filter(animal => animal.type === type)
  }

  constructor(private animalService: AnimalService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private element: ElementRef, private req: RequestService) {}

  defaultCSSPath = AppComponent.defaultCSSPath
  root = this.element.nativeElement
  host = this.root.shadowRoot


  user: User = {id: -1, name: '', details: '', favoriteAnimals: []}

  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}


  async ngOnInit() {

    // const w: any = window
    // w._componentInstance = this

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!id) throw new Error(`Id couldn't be found`)

    this.user = await this.userService.getUserFromStorage(+id)


    const animals = await this.animalService.loadAnimals()

    animals.forEach(animal => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })

    this.animals = animals

  }


  toggleFavoriteAnimal(id: number) {
    const {favoriteAnimals} = this.user
    if (favoriteAnimals.includes(id)) this.user.favoriteAnimals = favoriteAnimals.filter(idA => idA !== id)
    else favoriteAnimals.push(id)

    this.userService.updateUserFromStorage(this.user)
  }

  isFavoriteAnimal(id: number): boolean {
    return this.user.favoriteAnimals.includes(id)
  }

}
