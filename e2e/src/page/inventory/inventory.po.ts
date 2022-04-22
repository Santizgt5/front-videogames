import { by, element } from 'protractor';


export class InventoryPage {
    
    private linkOpenPopupVideogame = element(by.id('openAddVideogame'));
    private linkOpenPopupCompany = element(by.id('openAddCompany'));
    private table = element.all(by.css('tbody tr'));
    private stock = element.all(by.id('tableStock')).first();

    async clickOpenDialog() {
        await this.linkOpenPopupVideogame.click();
    }

    async clickOpenDialogCompany() {
        await this.linkOpenPopupCompany.click();
    }

    async countTableItems() {
        return this.table.count();
    }

    async clickItem() {
        await this.table.click();
    }

    async getStock() {
        return this.stock.getText();
    }


}