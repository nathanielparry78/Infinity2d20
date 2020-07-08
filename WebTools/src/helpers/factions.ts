import {character} from '../common/character';
import {Skill} from './skills';
import {AlienHost} from  './alienHosts';

export enum Faction {
    Ariadna,
    Haqqislam,
    Nomads,
    PanOceania,
    YuJing,
    Corporation,
    Submondo,
    Mercenary,
    MinorNation,
    O12,
    Aleph,
    Defection
}

class FactionModel {
    name: string;
    skills: Skill[];
    needsHeritage: boolean;

    constructor(name: string, skills: Skill[], needsHeritage: boolean) {
        this.name = name;
        this.skills = skills;
        this.needsHeritage = needsHeritage;
    }
}

export class FactionViewModel extends FactionModel {
    id: Faction;

    constructor(id: Faction, base: FactionModel) {
        super(base.name, base.skills, base.needsHeritage);
        this.id = id;
    }
}

export class Factions {
    private _factions: { [id: number]: FactionModel } = {
        [Faction.Ariadna]: new FactionModel("Ariadna", [Skill.Survival, Skill.Medicine], false),
        [Faction.Haqqislam]: new FactionModel("Haqqislam", [Skill.Medicine, Skill.Education], false),
        [Faction.Nomads]: new FactionModel("Nomads", [Skill.Hacking, Skill.Extraplanetary], false),
        [Faction.PanOceania]: new FactionModel("PanOceania", [Skill.Tech, Skill.Lifestyle], false),
        [Faction.YuJing]: new FactionModel("Yu Jing", [Skill.Tech, Skill.Education], false),
        [Faction.Corporation]: new FactionModel("Corporation", [Skill.Lifestyle, Skill.Persuade], true),
        [Faction.Submondo]: new FactionModel("Submondo", [Skill.Observation, Skill.Thievery], true),
        [Faction.Mercenary]: new FactionModel("Mercenary", [Skill.Athletics, Skill.Survival], true),
        [Faction.MinorNation]: new FactionModel("Minor Nation", [Skill.Education, Skill.Pilot], false),
        [Faction.O12]: new FactionModel("O-12", [Skill.Education, Skill.Persuade], false),
        [Faction.Aleph]: new FactionModel("ALEPH", [Skill.Analysis, Skill.Education], false)
    };

    getFactions() {
        var factions: FactionViewModel[] = [];
        var n = 0;
        for (var faction in this._factions) {
            if (n === Faction.Defection) {
                continue;
            }

            var f = this._factions[faction];
            factions.push(new FactionViewModel(n, f));

            n++;
        }

        return factions;
    }

    getFaction(faction: Faction) {
        return this._factions[faction];
    }

    getFactionByName(name: string) {
        var n = 0;
        for (var faction in this._factions) {
            var f = this._factions[faction];
            if (f.name === name) {
                return n;
            }

            n++
        }

        return undefined;
    }

    generateFaction(hasDefected?: boolean, ignoreDefection?: boolean) {
        var roll = ignoreDefection ? Math.floor(Math.random() * 19) + 1 : Math.floor(Math.random() * 20) + 1;
        var faction: Faction = undefined;

        switch (roll) {
            case 1:
            case 2: faction = Faction.Ariadna; break;
            case 3:
            case 4: faction = Faction.Haqqislam; break;
            case 5:
            case 6: faction = Faction.Nomads; break;
            case 7:
            case 8: faction = Faction.YuJing; break;
            case 9:
            case 10: faction = Faction.PanOceania; break;
            case 11:
            case 12: faction = !hasDefected ? Faction.Corporation : this.generateFaction(hasDefected); break;
            case 13:
            case 14: faction = !hasDefected ? Faction.Submondo : this.generateFaction(hasDefected); break;
            case 15:
            case 16: faction = !hasDefected ? Faction.Mercenary : this.generateFaction(hasDefected); break;
            case 17: faction = Faction.MinorNation; break;
            case 18: faction = Faction.O12; break;
            case 19: faction = Faction.Aleph; break;
            case 20:
                if (!hasDefected) {
                    faction = Faction.Defection;
                }
                else {
                    faction = this.generateFaction(hasDefected);
                }
                break;
        }

        return faction;
    }

    generateHeritage() {
        var roll = Math.floor(Math.random() * 20) + 1;
        var faction: Faction = undefined;

        switch (roll) {
            case 1:
            case 2: faction = Faction.Ariadna; break;
            case 3:
            case 4: faction = Faction.Haqqislam; break;
            case 5:
            case 6: faction = Faction.Nomads; break;
            case 7:
            case 8: faction = Faction.YuJing; break;
            case 9:
            case 10: faction = Faction.PanOceania; break;
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
            case 17: faction = Faction.MinorNation; break;
            case 18: faction = Faction.O12; break;
            case 19: faction = Faction.Aleph; break;
            case 20: faction = this.generateHeritage(); break;
        }

        return faction;
    }

    getBirthPlaceType(faction: Faction) {
        if (character.isUplift()) {
            return "Uplift Lab";
        }

        switch (faction) {
            case Faction.Ariadna:
            case Faction.Haqqislam: return "Homeland";
            case Faction.Nomads: return "Mothership";
            case Faction.PanOceania:
            case Faction.YuJing: return "Homeworld";
            case Faction.MinorNation: return "Nation";
            case Faction.O12:
            case Faction.Aleph: return "Concilium";
        }

        return "";
    }

    applyFaction(faction: Faction) {
        var f = this.getFaction(faction);
        f.skills.forEach(s => {
            character.skills[s].expertise++;
        });

        if (faction === Faction.Aleph || character.heritage === Faction.Aleph) {
            character.hostName = "Standard Lhost";
        }
    }
}

export const FactionsHelper = new Factions();