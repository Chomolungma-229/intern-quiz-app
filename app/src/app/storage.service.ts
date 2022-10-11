import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getStorage(keyName: string) {
    return localStorage.getItem(keyName);
  }
}
