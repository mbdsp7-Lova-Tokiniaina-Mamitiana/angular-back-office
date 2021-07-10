import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() mapCenter = {
    lat: 0,
    lng: 0,
  };

  zoom = 15;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 300,
    minZoom: 8,
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize center
    if (this.mapCenter.lat === 0 && this.mapCenter.lng === 0) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.mapCenter = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    }
    // End: Initialize center
  }

  zoomIn(): void {
    if (this.options.maxZoom !== undefined && this.zoom < this.options.maxZoom) { this.zoom++; }
  }

  zoomOut(): void {
    if (this.options.minZoom !== undefined && this.zoom > this.options.minZoom) { this.zoom--; }
  }
}
