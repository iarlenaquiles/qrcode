import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { ProductServiceProvider } from '../../providers/product-service/product-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  products: any[] = [];
  selectedProduct: any;
  productFound: boolean = false;

  constructor(public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private toast: Toast,
    public produtoService: ProductServiceProvider) {
    this.produtoService.getProducts().subscribe(response => {
      this.products = response;
      console.log(this.products);
    });
  }

  scan() {
    this.selectedProduct = {};
    this.barcodeScanner.scan().then((barcodeData) => {
      this.selectedProduct = this.products.find(product => product.plu === barcodeData.text);
      if (this.selectedProduct !== undefined) {
        this.productFound = true;
      } else {
        this.productFound = false;
        this.toast.show('Product not found', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      }
    }, erro => {
      this.toast.show(erro, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      )
    });
  }

}
