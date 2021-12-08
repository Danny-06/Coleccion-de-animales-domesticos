import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';

import { HttpClientModule } from '@angular/common/http';
import { AnimalComponent } from './components/animal/animal.component';
import { UserComponent } from './components/user/user.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AnimalComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
