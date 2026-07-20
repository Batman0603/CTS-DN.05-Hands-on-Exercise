import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  id = Math.random();

  constructor() {
    console.log("LoadingService ID =", this.id);
  }

  isLoading = signal(false);

  show() {
    console.log("SHOW ->", this.id);
    this.isLoading.set(true);
  }

  hide() {
    console.log("HIDE ->", this.id);
    this.isLoading.set(false);
  }

}