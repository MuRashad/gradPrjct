import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { PharmaciestComponent } from './pharmaciest/pharmaciest.component';
import { UsersComponent } from './users/users.component';
import { CardComponent } from './card/card.component';
import { SearchComponent } from './search/search.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MedicinesComponent } from './medicines/medicines.component';
import { MedicineDetailsComponent } from './medicine-details/medicine-details.component';
import { CategoryBoxesComponent } from './category-boxes/category-boxes.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselHolderComponent } from './carousel-holder/carousel-holder.component';
import { LocationPickerComponent } from './location-picker/location-picker.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ChatbotComponent,
    LoginComponent,
    SignupComponent,
    PharmaciestComponent,
    UsersComponent,
    CardComponent,
    SearchComponent,
    NotfoundComponent,
    FooterComponent,
    MedicinesComponent,
    MedicineDetailsComponent,
    CategoryBoxesComponent,
    ProfileComponent,
    CarouselHolderComponent,
    LocationPickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
