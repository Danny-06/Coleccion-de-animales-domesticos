import { AppComponent } from './../../app.component';
import { RequestService } from './../../services/request/request.service';
import { AnimalService } from './../../services/animal/animal.service';
import { Animal } from 'src/app/classes/animal/animal';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AnimalComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  animal: Animal = new Animal()

  constructor(private activatedRoute: ActivatedRoute, private animalService: AnimalService, private element: ElementRef,  private req: RequestService) {}

  async ngOnInit() {

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.req.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)


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
