import {Skill} from './skills';

export enum MilitaryOrder {
    Calatrava,
    Dominican,
    Hospitaller,
    Montesa,
    Santiago,
    Teutonic,
    Sepulchre
}

class OrderModel {
    name: string;
    electiveSkills: Skill[];
    gear: string[];

    constructor(name: string, electiveSkills: Skill[], gear: string[]) {
        this.name = name;
        this.electiveSkills = electiveSkills;
        this.gear = gear;
    }
}

class OrderViewModel extends OrderModel {
    id: MilitaryOrder;

    constructor(id: MilitaryOrder, base: OrderModel) {
        super(base.name, base.electiveSkills, base.gear);
        this.id = id;
    }
}

class MilitaryOrders {
    private _orders: { [id: number]: OrderModel } = {
        [MilitaryOrder.Calatrava]: new OrderModel(
            "Calatrava",
            [Skill.Discipline, Skill.Education, Skill.Science],
            ["Blade of St. George", "Powered Combat Armour", "Heavy Pistol"]),
        [MilitaryOrder.Dominican]: new OrderModel(
            "Dominican",
            [Skill.Analysis, Skill.Psychology, Skill.Persuade],
            ["Blade of St. George", "Aletheia Kit", "Medium Combat Armour", "Nanopulser"]),
        [MilitaryOrder.Hospitaller]: new OrderModel(
            "Hospitaller",
            [Skill.Lifestyle, Skill.Medicine, Skill.Persuade],
            ["Blade of St. George", "Powered Combat Armour", "MediKit"]),
        [MilitaryOrder.Montesa]: new OrderModel(
            "Montesa",
            [Skill.Acrobatics, Skill.Close_Combat, Skill.Command],
            ["Blade of St. George", "Powered Combat Armour", "Breaker Pistol"]),
        [MilitaryOrder.Santiago]: new OrderModel(
            "Santiago",
            [Skill.Extraplanetary, Skill.Hacking, Skill.Tech],
            ["Blade of St. George", "Knight of Santiago Armour", "E/M Grenade"]),
        [MilitaryOrder.Teutonic]: new OrderModel(
            "Teutonic",
            [Skill.Extraplanetary, Skill.Resistance, Skill.Spacecraft],
            ["Blade of St. George", "Powered Combat Armour", "Panzerfaust"]),
        [MilitaryOrder.Sepulchre]: new OrderModel(
            "Sepulchre",
            [Skill.Close_Combat, Skill.Discipline, Skill.Observation],
            ["Blade of St. George", "Powered Combat Armour", "Spitfire"]),
    };

    getOrders() {
        var orders: OrderViewModel[] = [];
        var n = 0;

        for (var order in this._orders) {
            var o = this._orders[order];
            orders.push(new OrderViewModel(n, o));

            n++;
        }

        return orders;
    }

    getOrder(order: MilitaryOrder) {
        return this._orders[order];
    }

    generateOrder() {
        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2:
            case 3: return MilitaryOrder.Calatrava;
            case 4:
            case 5:
            case 6: return MilitaryOrder.Dominican;
            case 7:
            case 8:
            case 9: return MilitaryOrder.Hospitaller;
            case 10:
            case 11:
            case 12: return MilitaryOrder.Montesa;
            case 13:
            case 14:
            case 15: return MilitaryOrder.Santiago;
            case 16:
            case 17:
            case 18: return MilitaryOrder.Teutonic;
            case 19:
            case 20: return MilitaryOrder.Sepulchre;
        }

        return null;
    }
}

export const MilitaryOrdersHelper = new MilitaryOrders();