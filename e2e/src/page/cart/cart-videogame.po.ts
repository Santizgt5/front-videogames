import { by, element } from 'protractor';


export class CartPage {
    
    private listCard = element(by.id('quantityVideogame'));
    private linkBuyCart = element(by.id('idBuyCart'));

    async countListCards() {
        return this.listCard.getAttribute('value');
    }

    async clickBuyCart() {
        await this.linkBuyCart.click();
    }



}