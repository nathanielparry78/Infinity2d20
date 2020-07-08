import { Skill } from './skills';

export enum CatSquad {
    Tomcats,
    Hellcats,
    Wildcats
}

class SquadModel {
    name: string;
    electiveSkills: Skill[];
    gear: string[];
    earnings: string;

    constructor(name: string, electiveSkills: Skill[], gear: string[], earnings: string) {
        this.name = name;
        this.electiveSkills = electiveSkills;
        this.gear = gear;
        this.earnings = earnings;
    }
}

class SquadViewModel extends SquadModel {
    id: CatSquad;

    constructor(id: CatSquad, base: SquadModel) {
        super(base.name, base.electiveSkills, base.gear, base.earnings);
        this.id = id;
    }
}

class CatSquads {
    private _squads: { [id: number]: SquadModel } = {
        [CatSquad.Hellcats]: new SquadModel(
            "Hellcats",
            [Skill.Athletics, Skill.Medicine, Skill.Pilot],
            ["Combat Jump Pack", "Spitfire|Assault Hacking Device", "Light Combat Armour"],
            "2+D1"),
        [CatSquad.Tomcats]: new SquadModel(
            "Tomcats",
            [Skill.Medicine, Skill.Spacecraft, Skill.Tech],
            ["MedKit|Powered Multitool", "Light Combat Armour", "Combi Rifle"],
            "2+D2"),
        [CatSquad.Wildcats]: new SquadModel(
            "Wildcats",
            [Skill.Discipline, Skill.Resistance, Skill.Thievery],
            ["Boarding Shotgun|Assault Hacking Device", "Medium Combat Armour"],
            "1+D2"),
    };

    getOrders() {
        var orders: SquadViewModel[] = [];
        var n = 0;

        for (var squad in this._squads) {
            var o = this._squads[squad];
            orders.push(new SquadViewModel(n, o));

            n++;
        }

        return orders;
    }

    getOrder(squad: CatSquad) {
        return this._squads[squad];
    }

    generateOrder() {
        switch (Math.floor(Math.random() * 20) + 1) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6: 
            case 7: return CatSquad.Tomcats;
            case 8:
            case 9: 
            case 10:
            case 11:
            case 12: return CatSquad.Hellcats;
            case 13:
            case 14:
            case 15: 
            case 16:
            case 17:
            case 18: 
            case 19:
            case 20: return CatSquad.Wildcats;
        }

        return null;
    }
}

export const CatSquadsHelper = new CatSquads();