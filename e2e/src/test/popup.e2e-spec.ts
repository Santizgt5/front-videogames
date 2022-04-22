import { browser } from 'protractor';
import { AppPage } from '../app.po';
import { CartPage } from '../page/cart/cart-videogame.po';
import { DetailGamePage } from '../page/game-detail/game-detail.po';
import { InventoryPage } from '../page/inventory/inventory.po';
import { NavBarPage } from '../page/navbar/navbar.po';
import { PopupCompanyPage } from '../page/popup-company/popup-company.po';
import { PopupPage } from '../page/popup-videogame/popup.po';

describe('workspace-project Popup Videogame', () => {
    let page: AppPage;
    let popUpVideogame: PopupPage;
    let inventory: InventoryPage;
    let popUpCompany: PopupCompanyPage;
    let detailGame: DetailGamePage;
    let navBarPage: NavBarPage;
    let cart: CartPage

    beforeEach(() => {
        page = new AppPage();
        popUpVideogame = new PopupPage();
        inventory = new InventoryPage();
        popUpCompany = new PopupCompanyPage();
        detailGame = new DetailGamePage();
        navBarPage = new NavBarPage();
        cart = new CartPage();
    });

    it('Should be create videogame', () => {

        const NAME_COMPANY = 'Santa Monica';
        const DESCRIPTION_COMPANY = 'Esta es una descripciónn de ejemplo';
        const BORN_COMPANY = '2021-10-11'
        const NIT_COMPANY = '312311'

        const OPTION_COMPANY = 'Santa Monica';
        const NAME_VIDEOGAME = 'God of war';
        const STOCK_VIDEOGAME = 25;
        const RELEASE_DATE = '2022-03-17';
        const PLATFORM_VIDEOGAME = 'PS5';
        const PRICE_VIDEOGAME = 150000;

        page.navigateTo();
        inventory.clickOpenDialogCompany();
        popUpCompany.inputName(NAME_COMPANY);
        browser.waitForAngular();
        popUpCompany.inputDescription(DESCRIPTION_COMPANY);
        popUpCompany.inputBorn(BORN_COMPANY);
        popUpCompany.inputNit(NIT_COMPANY);
        popUpCompany.clickCreateCompany();
        inventory.clickOpenDialog()
        popUpVideogame.inputName(NAME_VIDEOGAME);
        popUpVideogame.inputStock(STOCK_VIDEOGAME);
        popUpVideogame.inputCompany(OPTION_COMPANY);
        popUpVideogame.inputReleaseDate(RELEASE_DATE);
        popUpVideogame.inputPlatform(PLATFORM_VIDEOGAME);
        popUpVideogame.inputPrice(PRICE_VIDEOGAME);

        popUpVideogame.clickCreateVideogame();

        expect(inventory.countTableItems()).toBe(1);
        // Adicionamos las validaciones despues de la creación
        // expect(<>).toEqual(<>);
    });

    it('Should add videogame to Cart', () => {
        const quantity = 2;

        inventory.clickItem();
        detailGame.inputQuantity(quantity);
        detailGame.clickAddCart();
        navBarPage.clickOpenCart();

        expect(cart.countListCards()).toBe('12');
    
    });

    it('Should buy the cart', () => {
        cart.clickBuyCart();
        expect(inventory.getStock()).toBe('13');
    });

});