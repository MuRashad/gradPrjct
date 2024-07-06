import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';

@Component({
  selector: 'app-location-picker',
  templateUrl: './location-picker.component.html',
  styleUrls: ['./location-picker.component.css']
})
export class LocationPickerComponent implements OnInit {
  latitude: number;
  longitude: number;

  constructor() {
    this.latitude = 0;
    this.longitude = 0;
  }

  ngOnInit(): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([51.505, -0.09]).addTo(map);

    map.on('click', (e: any) => {
      const { lat, lng } = e.latlng;
      this.latitude = lat;
      this.longitude = lng;
      marker.setLatLng(e.latlng);
    });

    (L.Control as any).geocoder().addTo(map);

    // Get the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.latitude = latitude;
        this.longitude = longitude;

        map.setView([latitude, longitude], 13);
        marker.setLatLng([latitude, longitude]);
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
}
