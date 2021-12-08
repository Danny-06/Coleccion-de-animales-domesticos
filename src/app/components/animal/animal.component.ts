import { AnimalService } from './../../services/animal/animal.service';
import { Animal } from 'src/app/classes/animal/animal';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss']
})
export class AnimalComponent implements OnInit {

  animal: Animal = new Animal()

  constructor(private activatedRoute: ActivatedRoute, private animalService: AnimalService) {}

  async ngOnInit() {
    const animals = await this.animalService.loadAnimals()

    animals.forEach(animal => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (!id) return console.log(`ID is ${id}`)

    this.animal = animals.filter(animal => animal.id === +id)[0]
  }

}
