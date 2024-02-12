import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  servicePath = 'https://local-business-data.p.rapidapi.com';
  headers = {
    'X-RapidAPI-Key': '53bababc8cmshb54317626a81a08p129ff6jsn0490ddec3911',
    'X-RapidAPI-Host': 'local-business-data.p.rapidapi.com'
  };
  searchSettings = {
    method: 'GET',
    headers: this.headers
  }

  constructor() { }

  search( query: string, lat: number, long: number){
    const params = `?query=${query}&limit=20&lat=${lat}&lng=${long}&zoom=13&region=cl&language=es-CL`;
    return fetch(`${this.servicePath}/search${params}`, this.searchSettings)
  }

}
