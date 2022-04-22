import { by, element } from 'protractor';

export class PopupCompanyPage {

    private linkCreateCompany = element(by.id('createCompany'));
    private inputNameCompany = element(by.id('idName'));
    private inputDescriptionCompany = element(by.id('idDescription'));
    private inputBornCompany = element(by.id('idBorn'));
    private inputNitCompany = element(by.id('idNit'));

    async clickCreateCompany() {
        await this.linkCreateCompany.click();
    }

    async inputName(name) {
        await this.inputNameCompany.sendKeys(name);
    }

    async inputDescription(description) {
        await this.inputDescriptionCompany.sendKeys(description);
    }

    async inputBorn(born) {
        await this.inputBornCompany.sendKeys(born);
    }

    async inputNit(nit) {
        await this.inputNitCompany.sendKeys(nit);
    }

}