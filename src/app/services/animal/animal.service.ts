import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Animal } from 'src/app/classes/animal/animal';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  constructor(private http: HttpClient) {}

  animals: Animal[] = []

  async loadAnimals(): Promise<Animal[]> {
    return this.animals = await this.http.get('assets/animals.json').toPromise() as Animal[]
  }

  getAnimals(): Animal[] {
    return this.animals
  }
}
