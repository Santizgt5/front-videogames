import { Company } from './company';

export interface Videogame {
    id?:             number;
    title:          string;
    stock:          number;
    companyId:      number;
    company?:       Company;
    releaseDate:    string;
    platform:       string;
    price:          number;
    priceWithDiscountMonth?: number;
}
