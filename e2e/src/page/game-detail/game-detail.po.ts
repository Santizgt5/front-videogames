import { by, element } from 'protractor';


export class DetailGamePage {
    
    private inputQuantityVideogame = element(by.id('quantityInput'));
    private linkAddCart = element(by.id('addCart'));

    async inputQuantity(quantity) {
        await this.inputQuantityVideogame.sendKeys(quantity);
    }

    async clickAddCart() {
        await this.linkAddCart.click();
    }



}