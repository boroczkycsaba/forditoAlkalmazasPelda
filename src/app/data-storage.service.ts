import { Injectable } from '@angular/core';

@Injectable()
export class DataStorageService {

  constructor() { }

  storeData(dataKey: string, dataToSave: any): void {
    const jsonConvertedData = JSON.stringify(dataToSave);
    localStorage.setItem(dataKey, jsonConvertedData);
  }

  loadData(dataKey: string): any {
    const loadedData = localStorage.getItem(dataKey);
    if (loadedData === null || loadedData === '') {
      return loadedData;
    }
    return JSON.parse(loadedData);
  }

  removeData(dataKey: string): void {
    localStorage.removeItem(dataKey);
  }
}
