import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { HttpClientModule } from '@angular/common/http';
import { AnimalComponent } from './components/animal/animal.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

// NgModel
import { FormsModule } from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';

// Dependency animation for some PrimeNg components
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Library to fix shadow dom issue with some PrimeNg components
// https://github.com/maitrungduc1410/primeng-shadowdom-directives
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { AddFavoriteAnimalComponent } from './components/add-favorite-animal/add-favorite-animal.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AnimalComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    UserDetailsComponent,
    AddFavoriteAnimalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // NgModule
    FormsModule,

    BrowserAnimationsModule,
    PrimeNGShadowDOMDirective,

    // PrimeNg Components
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
