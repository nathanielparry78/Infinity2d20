import {character} from '../common/character';
import {Faction} from './factions';
import {Source} from './sources';
import { Skill } from './skills';

export enum AlienHost {
    Human,
    Dogface,

    // Ariadna
    Antipode,
    Wulver,

    // PanOceania
    Helot,

    // Nomads
    UpliftAvian,
    UpliftCanine,
    UpliftCetacean,
    UpliftCephaplopod,
    UpliftFeline,
    UpliftSimian,
    UpliftSuidae,

    // Aleph
}

class AlienHostModel {
    name: string;
    faction: string;
    attributeBonuses: number[];
    attacks: string[];
    abilities: string[];
    cost: number;
    source: Source;

    constructor(name: string, faction: string, attributes: number[], attacks: string[], abilities: string[], cost: number, source: Source) {
        this.name = name;
        this.faction = faction;
        this.attributeBonuses = attributes;
        this.attacks = attacks;
        this.abilities = abilities;
        this.cost = cost;
        this.source = source;
    }
}

export class AlienHostViewModel extends AlienHostModel {
    id: AlienHost;

    constructor(id: AlienHost, base: AlienHostModel) {
        super(base.name, base.faction, base.attributeBonuses, base.attacks, base.abilities, base.cost, base.source);
        this.id = id;
    }
}

export class AlienHosts {
    private _hosts: { [id: number]: AlienHostModel } = {
        [AlienHost.Human]: new AlienHostModel(
            "Human",
            "",
            [0, 0, 0, 0, 0, 0, 0],
            [],
            [],
            0,
            Source.Core),
        [AlienHost.Dogface]: new AlienHostModel(
            "Dogface",
            "Ariadna",
            [0, 0, 0, 0, 0, 0, 0],
            [
                "Claws: Melee, 1+2[CD], Subtle 1, Vicious 1"
            ],
            [
                "Scent",
                "Transform"
            ],
            3,
            Source.Core),
        [AlienHost.Antipode]: new AlienHostModel(
            "Antipode",
            "Ariadna",
            [2, 1, 2, -1, -2, 0],
            [
                "Claws: Melee, 1+2[CD], Subtle 1, Vicious 1"
            ],
            [
                "Scent",
                "Thick-Skinned",
                "Monstrous",
                "Super-Jump",
                "Primal Technology",
                "Pack Mentality",
                "Trinary Mind",
                "Quantronically Inert"
            ],
            2,
            Source.Ariadna),
        [AlienHost.Wulver]: new AlienHostModel(
            "Wulver",
            "Ariadna",
            [1, 1, 1, -1, 0, -1, -1],
            [
                "Claws: Melee, 1+1[CD], Subtle 1, Vicious 1"
            ],
            [
                "Scent",
                "Naturally Tough",
                "Monstrous",
                "Furious",
                "Super-Jump",
                "Odd Fit"
            ],
            3,
            Source.Ariadna),
        [AlienHost.Helot]: new AlienHostModel(
            "Helot",
            "PanOceania",
            [0, 1, 0, 0, 0, 1, -1],
            [],
            [
                "Amphibious",
                "Inured to Cold",
                "Pressure Sensitive",
                "Pressure Modifications"
            ],
            2,
            Source.PanOceania),
        [AlienHost.UpliftAvian]: new AlienHostModel(
            "Uplift (Avian)",
            "Nomads",
            [0, 1, 0, 0, 0, 0, 0],
            [],
            [],
            2,
            Source.Nomads),
        [AlienHost.UpliftCanine]: new AlienHostModel(
            "Uplift (Canine)",
            "Nomads",
            [0, 0, 0, 0, 0, 0, 1],
            [],
            [],
            2,
            Source.Nomads),
        [AlienHost.UpliftCetacean]: new AlienHostModel(
            "Uplift (Cetacean)",
            "Nomads",
            [0, 0, 0, 0, 0, 1, 0],
            [],
            [],
            4,
            Source.Nomads),
        [AlienHost.UpliftCephaplopod]: new AlienHostModel(
            "Uplift (Cephalopod)",
            "Nomads",
            [0, 0, 0, 0, 1, 0, 0],
            [],
            [],
            3,
            Source.Nomads),
        [AlienHost.UpliftFeline]: new AlienHostModel(
            "Uplift (Feline)",
            "Nomads",
            [1, 0, 0, 0, 0, 0, 0],
            [],
            [],
            3,
            Source.Nomads),
        [AlienHost.UpliftSimian]: new AlienHostModel(
            "Uplift (Simian)",
            "Nomads",
            [0, 0, 0, 1, 0, 0, 0],
            [],
            [],
            2,
            Source.Nomads),
        [AlienHost.UpliftSuidae]: new AlienHostModel(
            "Uploft (Suidae)",
            "Nomads",
            [0, 0, 1, 0, 0, 0, 0],
            [],
            [],
            3,
            Source.Nomads),
    };

    getAlienHosts() {
        var hosts: AlienHostViewModel[] = [];
        var n = 0;
        for (var host in this._hosts) {
            var h = this._hosts[host];

            if (character.hasSource(h.source)) {
                hosts.push(new AlienHostViewModel(n, h));
            }
            
            n++;
        }

        return hosts;
    }

    getAlienHost(host: AlienHost) {
        return this._hosts[host];
    }

    applyAlienHost(host: AlienHost) {
        var h = this.getAlienHost(host);

        for (var i = 0; i < h.attributeBonuses.length; i++) {
            character.attributes[i].value += h.attributeBonuses[i];
            character.modifiers[i].value += h.attributeBonuses[i];
        }

        h.attacks.forEach(attack => {
            character.hostAbilities.push(attack);
        });

        h.abilities.forEach(ability => {
            character.hostAbilities.push(ability);
        });

        character.lifePoints -= h.cost;

        if (host === AlienHost.Human) {
            character.hostName = "Birth";
        }
        else {
            character.hostName = this._hosts[host].name;
        }

        switch (host) {
            case AlienHost.Human:
                break;
            case AlienHost.Dogface:
            case AlienHost.Antipode:
            case AlienHost.Wulver:
                character.faction = character.heritage = Faction.Ariadna;
                break;
            case AlienHost.Helot:
                character.addTalent("Strong Swimmer");
                character.faction = character.heritage = Faction.PanOceania;
                break;
            case AlienHost.UpliftAvian:
                character.addOtherEvent("", "Inquisitive");
                character.faction = character.heritage = Faction.Nomads;
                break;
            case AlienHost.UpliftCanine:
                character.skills[Skill.Athletics].expertise++;
                character.addOtherEvent("", "Loyal");
                character.faction = character.heritage = Faction.Nomads;
                break;
            case AlienHost.UpliftCetacean:
                character.addOtherEvent("", "Boundary Issues");
                character.addTalent("Space Ace");
                character.faction = character.heritage = Faction.Nomads;
                break;
            case AlienHost.UpliftCephaplopod:
                character.addOtherEvent("", "Antisocial");
                character.faction = character.heritage = Faction.Nomads;
                break;
            case AlienHost.UpliftFeline:
                character.skills[Skill.Acrobatics].expertise++;
                character.addOtherEvent("", "Sadistic");
                character.faction = character.heritage = Faction.Nomads;
                break;
            case AlienHost.UpliftSimian:
                character.skills[Skill.Athletics].expertise++;
                character.addOtherEvent("", "Foul-Tempered");
                character.faction = character.heritage = Faction.Nomads;
                break;
            case AlienHost.UpliftSuidae:
                character.morale += 2;
                character.addOtherEvent("", "Neurotically Hygienic");
                character.faction = character.heritage = Faction.Nomads;
                break;
        }
    }
}

export const AlienHostsHelper = new AlienHosts();