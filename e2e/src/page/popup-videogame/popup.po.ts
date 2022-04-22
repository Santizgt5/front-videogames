import { by, element } from 'protractor';

export class PopupPage {

    private linkCreateVideogame = element(by.id('createVideogame'));
    private inputNameVideogame = element(by.id('idTitle'));
    private inputStockVideogame = element(by.id('idStock'));
    private inputCompanyName = element(by.id('idCompany'));
    private inputReleaseDateVideogame = element(by.id('idReleaseDate'));
    private inputPlatformVideogame = element(by.id('idPlatform'));
    private inputPriceVideogame = element(by.id('idPrice'));

    async clickCreateVideogame() {
        await this.linkCreateVideogame.click();
    }

    async inputName(name) {
        await this.inputNameVideogame.sendKeys(name);
    }

    async inputStock(stock) {
        await this.inputStockVideogame.sendKeys(stock);
    }

    async inputCompany(option) {
        await this.inputCompanyName.click();
        element(by.cssContainingText('mat-option .mat-option-text', option)).click();
    }

    async inputReleaseDate(releaseDate) {
        await this.inputReleaseDateVideogame.sendKeys(releaseDate);
    }

    async inputPlatform(platform) {
        await this.inputPlatformVideogame.sendKeys(platform);
    }

    async inputPrice(price) {
        await this.inputPriceVideogame.sendKeys(price);
    }

}