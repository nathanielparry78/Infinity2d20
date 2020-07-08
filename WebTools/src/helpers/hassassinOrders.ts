import {Skill} from './skills';

export enum HassassinOrder {
    Barid,
    Govad,
    Lasiq,
    Muyib,
    Ragik,
    Ayyar
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
    id: HassassinOrder;

    constructor(id: HassassinOrder, base: OrderModel) {
        super(base.name, base.electiveSkills, base.gear);
        this.id = id;
    }
}

class HassassinOrders {
    private _orders: { [id: number]: OrderModel } = {
        [HassassinOrder.Barid]: new OrderModel(
            "Barid",
            [Skill.Hacking, Skill.Stealth, Skill.Tech],
            ["Killer Hacking Device", "SWORD-1 Samâ", "Stealth Repeater"]),
        [HassassinOrder.Govad]: new OrderModel(
            "Govad",
            [Skill.Acrobatics, Skill.Analysis, Skill.Ballistics],
            ["Breaker Pistol", "Grazeblade", "Recorder", "Light Combat Armour", "Djinncloak"]),
        [HassassinOrder.Lasiq]: new OrderModel(
            "Lasiq",
            [Skill.Ballistics, Skill.Lifestyle, Skill.Observation],
            ["Viral Sniper Rifle", "Light Combat Armour"]),
        [HassassinOrder.Muyib]: new OrderModel(
            "Muyib",
            [Skill.Athletics, Skill.Resistance, Skill.Tech],
            ["Medium Combat Armour", "2 D-Charges", "Light Grenade Launcher|Panzerfaust"]),
        [HassassinOrder.Ragik]: new OrderModel(
            "Ragik",
            [Skill.Ballistics, Skill.Education, Skill.Persuade],
            ["Combat Jump Pack", "Boarding Shotgun", "Medium Combat Armour"]),
        [HassassinOrder.Ayyar]: new OrderModel(
            "Áyyār",
            [Skill.Lifestyle, Skill.Persuade, Skill.Psychology],
            ["Djinn Kit", "Fake ID 3", "Cosmetics Kit", "Viral Pistol", "Viral Pistol", "Khafiin Microservo Armour"]),
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

    getOrder(order: HassassinOrder) {
        return this._orders[order];
    }

    generateOrder() {
        switch (Math.floor(Math.random() * 6) + 1) {
            case 1: return HassassinOrder.Barid;
            case 2: return HassassinOrder.Govad;
            case 3: return HassassinOrder.Lasiq;
            case 4: return HassassinOrder.Muyib;
            case 5: return HassassinOrder.Ragik;
            case 6: return HassassinOrder.Ayyar;
        }

        return null;
    }
}

export const HassassinOrdersHelper = new HassassinOrders();