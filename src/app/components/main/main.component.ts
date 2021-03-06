import { RequestService } from './../../services/request/request.service';
import { AppComponent } from './../../app.component';
import { Animal } from 'src/app/classes/animal/animal';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class MainComponent implements OnInit {

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

  constructor(private animalService: AnimalService, private router: Router, private element: ElementRef, private req: RequestService) {}

  defaultCSSPath = AppComponent.defaultCSSPath
  root = this.element.nativeElement
  host = this.root.shadowRoot


  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}


  async ngOnInit() {

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)


    const animals = await this.animalService.loadAnimals()

    animals.forEach(animal => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })

    this.animals = animals
  }

  navigateToAnimal(id?: number) {
    this.router.navigateByUrl(`animal/${id}`)
  }

}
