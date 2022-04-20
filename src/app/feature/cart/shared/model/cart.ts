import { VideogamePurchase } from '@core/modelo/videogamePurchase';


export interface Cart {
    id?:                  number;
    total:                number;
    cantidadTotal:        number;
    videogames:           VideogamePurchase[];
}
