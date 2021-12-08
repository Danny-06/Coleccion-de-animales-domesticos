import { Animal } from 'src/app/classes/animal/animal';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  constructor(private animalService: AnimalService, private router: Router) {}

  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  async ngOnInit() {
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
