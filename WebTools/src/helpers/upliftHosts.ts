import { character } from "../common/character";
import { Attributes, Attribute } from "./attributes";
import { AlienHost } from "./alienHosts";

export enum UpliftHost {
    BiomorphSmall,
    BiomorphMedium,
    BiomorphLarge,
    AntiquatedLhost,
    StandardLhost,
    NabiaLhost,
    OrlandoLhost,
    SirenLhost,
    TitanLhost,
    RemoteSpecialist,
}

class UpliftHostModel {
    name: string;
    bonuses: number[];
    abilities: string[];
    cost: number;

    constructor(name: string, bonuses: number[], abilities: string[], cost: number) {
        this.name = name;
        this.bonuses = bonuses;
        this.abilities = abilities;
        this.cost = cost;
    }
}

export class UpliftHostViewModel extends UpliftHostModel {
    id: number;

    constructor(id: number, base: UpliftHostModel) {
        super(base.name, base.bonuses, base.abilities, base.cost);
        this.id = id;
    }
}

class UpliftHosts {
    private _hosts: { [id: number]: UpliftHostModel } = {
        [UpliftHost.BiomorphSmall]: new UpliftHostModel(
            "Custom Biomorph, Small",
            [1, 0, -2, 0, 1, 0, 0],
            [
                "Odd Fit",
                "Out of Sight, Out of Mind",
                "Small Target",
                "Tiny"
            ],
            0),
        [UpliftHost.BiomorphMedium]: new UpliftHostModel(
            "Custom Biomorph, Medium",
            [0, 0, 0, 0, 0, 0, 0],
            [
                "Custom MetaChemistry",
                "Uncanny Valley"
            ],
            1),
        [UpliftHost.BiomorphLarge]: new UpliftHostModel(
            "Custom Biomorph, Large",
            [0, 0, 0, 0, 0, 0, 0],
            [
                "Monstrous",
                "Odd Fit"
            ],
            3),
        [UpliftHost.AntiquatedLhost]: new UpliftHostModel(
            "Antiquated Lhost",
            [-1, -1, -1, -1, -1, -1, -1],
            [
                "Cubed",
                "Inured to Disease"
            ],
            0),
        [UpliftHost.StandardLhost]: new UpliftHostModel(
            "Standard Lhost",
            [0, 0, 0, 0, 0, 0, 0],
            [
                "Cubed",
                "Inured to Disease",
                "+1 Armor Soak"
            ],
            1),
        [UpliftHost.NabiaLhost]: new UpliftHostModel(
            "Nabia Lhost",
            [-1, 0, 1, -1, 0, 0, 0],
            [
                "Cubed",
                "Inured to Aquatic Pressure, Cold, Disease",
                "Amphibious",
                "+1 Armor Soak",
                "+1 BTS"
            ],
            3),
        [UpliftHost.OrlandoLhost]: new UpliftHostModel(
            "Orlando Lhost",
            [0, 0, 1, 1, 0, 0, -1],
            [
                "Cubed",
                "Inured to Disease",
                "Ballistics Expert System 1",
                "Close Combat Expert System 1"
            ],
            3),
        [UpliftHost.SirenLhost]: new UpliftHostModel(
            "Siren Lhost",
            [1, 0, 0, 0, 0, 1, 0],
            [
                "Cubed",
                "Inured to Disease",
                "Persuade Expert System 1",
                "+1 Morale"
            ],
            3),
        [UpliftHost.TitanLhost]: new UpliftHostModel(
            "Titan Lhost",
            [-1, 0, 2, -1, 0, -1, 0],
            [
                "Cubed",
                "Inured to Disease, Vacuum",
                "+2 Armor Soak",
                "+2 BTS"
            ],
            2),
        [UpliftHost.RemoteSpecialist]: new UpliftHostModel(
            "Remote Specialist",
            [0, 0, 0, 0, 0, 0, 0],
            [
                "Just Like the Real Thing",
                "Remote Presence Gear|Cube 2.0"
            ],
            2),
    };

    getHosts() {
        var hosts: UpliftHostViewModel[] = [];
        var n = 0;

        for (var id in this._hosts) {
            const host = this._hosts[id];
            hosts.push(new UpliftHostViewModel(n, new UpliftHostModel(host.name, host.bonuses, host.abilities, host.cost)));
            n++;
        }

        return hosts;
    }

    applyHost(host: UpliftHost) {
        const uhost = this._hosts[host];
        var a = 0;

        uhost.bonuses.forEach(b => {
            character.attributes[a].value += b;
            a++;
        });

        uhost.abilities.forEach(abil => {
            if (abil.indexOf("|") === -1) {
                character.hostAbilities.push(abil);
            }
        });

        switch (host) {
            case UpliftHost.BiomorphSmall:
                if (character.host === AlienHost.UpliftAvian) {
                    character.hostAbilities.push("Natural Flight");
                }
                else if (character.host === AlienHost.UpliftCanine) {
                    character.hostAbilities.push("Keen Senses (Scent)");
                }
                else if (character.host === AlienHost.UpliftCetacean ||
                         character.host === AlienHost.UpliftCephaplopod) {
                    character.hostAbilities.push("Aquatic");
                    character.hostAbilities.push("Inured to Cold");
                    character.addTalent("Strong Swimmer");
                }
                else if (character.host === AlienHost.UpliftFeline) {
                    character.addTalent("Catfall");
                }
                else if (character.host === AlienHost.UpliftSimian) {
                    character.addEquipment("Climbing Plus");
                    character.hostAbilities.push("Prehensile Tail");
                }
                break;
            case UpliftHost.BiomorphMedium:
            case UpliftHost.BiomorphLarge:
                if (character.host === AlienHost.UpliftCanine) {
                    character.hostAbilities.push("Keen Senses (Scent)");
                }
                else if (character.host === AlienHost.UpliftCetacean ||
                    character.host === AlienHost.UpliftCephaplopod) {
                    character.hostAbilities.push("Aquatic");
                    character.hostAbilities.push("Inured to Cold");
                    character.addTalent("Strong Swimmer");
                }
                else if (character.host === AlienHost.UpliftFeline) {
                    character.addTalent("Catfall");
                }
                else if (character.host === AlienHost.UpliftSimian) {
                    character.addEquipment("Climbing Plus");

                    if (host === UpliftHost.BiomorphMedium) {
                        character.hostAbilities.push("Prehensile Tail");
                    }
                }
                break;
        }
    }
}

export const UpliftHostsHelper = new UpliftHosts();