import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { SpinnerComponent } from '../../components/spinner/spinner.component';
import { Dialog } from '@angular/cdk/dialog';
import { ModalComponent } from '../../components/modal/modal.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { SearchCardsComponent } from '../../components/search-cards/search-cards.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SpinnerComponent,
    FormsModule,
    SearchCardsComponent,
    NgClass
  ],
  templateUrl: './main.component.html'
})

export class MainComponent implements OnInit {
  
  loader = new Loader({
    apiKey: "AIzaSyCSJg8fjqvkQp1MSIxLCWz4JVRaThpDclk",
    version: "weekly",
  });
  isLoading: boolean = true;
  errorMessage: string = "Permite a este sitio el acceso a la ubicación, refresca el navegador y listo!"
  searchValue: string = '';
  getLat: number = 0;
  getLng: number = 0;
  searchItems: Array<any> = [];
  mapOptions: any;
  googleMap: any;

  constructor(
    private dialog: Dialog, 
    private searchService: SearchService,
    ) {}

  async initMap(){
    await this.loader.load();
    this.mapOptions = {
      center: {
        lat: this.getLat,
        lng: this.getLng
      },
      zoom: 13,
      scaleControl: false,
      fullscreenControl: false,
      rotateControl: false,
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM,
      },
    }
    this.googleMap = new google.maps.Map(document.getElementById("map") as HTMLElement, this.mapOptions);
    this.isLoading = false;
  }

  openDialog(title: string, message: string) {
    this.dialog.open( ModalComponent, {
      data: {
        title: title,
        message: message
      }
    });
  }

  contentInfo(data: any): string {
    const info = `
      <div>
        <div><strong>${data.name}</strong></div>
        <div>${data.street_address}</div>
      </div>
    `
    return info;
  }

  createMakers(data: Array<any>){
    
    const map = this.googleMap;

    for(let item of data){

      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.latitude, item.longitude),
        map,
      });

      const infowindow = new google.maps.InfoWindow({
        content: this.contentInfo(item),
        ariaLabel: item.name
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });

    }
  }

  onSubmit(f: NgForm) {
    if(f.valid) {
      this.isLoading = true;
      const searchResponse = this.searchService.search(f.value.searchValue, this.getLat, this.getLng);
      try {
        searchResponse
        .then(
          response => response.json()
        )
        .then(
          resp => {

            this.isLoading = false;
            
            if(resp.status !== "OK") {
              this.openDialog('Chanfle!', resp.message);
              return;
            }
            
            this.searchItems = resp.data;
            this.createMakers(this.searchItems);
          }
        )
      } catch( error:any ) {
        console.error(error);
      }
    }
  }
  
  ngOnInit(){

    navigator.geolocation.getCurrentPosition(
      position => {
        this.getLat = position.coords.latitude;
        this.getLng = position.coords.longitude;
        this.initMap();
      },
      error => {
        this.isLoading = false;
        this.openDialog('Esta app necesita tu ubicación :)', this.errorMessage);
        console.warn(error.message);
      }
    )

  }

}
