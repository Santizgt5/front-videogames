import { by, element } from 'protractor';


export class NavBarPage {
    
    private linkOpenCart = element(by.id('linkCart'));

    async clickOpenCart() {
        await this.linkOpenCart.click();
    }
    
}