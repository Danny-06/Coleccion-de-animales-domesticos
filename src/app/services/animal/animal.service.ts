import { RequestService } from './../request/request.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from 'src/app/classes/animal/animal';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  constructor(private req: RequestService) {}

  animals: Animal[] = []

  async loadAnimals(): Promise<Animal[]> {
    return this.animals = await this.req.fetch('assets/animals.json', 'json') as Animal[]
  }

  getAnimals(): Animal[] {
    return this.animals
  }
}
