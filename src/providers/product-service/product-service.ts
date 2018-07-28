import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ProductServiceProvider Provider');
  }

  getProducts() {
    return this.http.get('assets/data/products.json')
      .map((response: Response) => response.json());
  }

}
