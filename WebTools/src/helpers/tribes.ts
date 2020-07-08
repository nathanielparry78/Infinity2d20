import {character} from '../common/character';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {Faction} from './factions';
import {BirthPlacesHelper} from './birthPlaces';

export enum Tribe {
    BitterLeaves,
    BringersOfPeace,
    GentleEmbrace,
    IceFangs,
    RiverTribe,
    WhiteKnives,
    MothTribe,
    BrokenPlains,
    DeathClaws,
    LongTalons
}

class TribeModel {
    name: string;
    languages: string[];
    rollSecondaryLanguage: boolean;
    attributes: Attribute[];
    skill: Skill;
    roll: number;

    constructor(name: string, attributes: Attribute[], skill: Skill, languages: string[], rollSecondaryLanguage: boolean, roll: number) {
        this.name = name;
        this.languages = languages;
        this.rollSecondaryLanguage = rollSecondaryLanguage;
        this.attributes = attributes;
        this.skill = skill;
        this.roll = roll;
    }
}

export class TribeViewModel extends TribeModel {
    id: Tribe;

    constructor(id: Tribe, base: TribeModel) {
        super(base.name, base.attributes, base.skill, base.languages, base.rollSecondaryLanguage, base.roll);
        this.id = id;
    }
}

class Tribes {
    private _tribes: { [id: number]: TribeModel } = {
        [Tribe.BitterLeaves]: new TribeModel(
            "Bitter Leaves",
            [Attribute.Personality, Attribute.Agility],
            Skill.Animal_Handling,
            ["Snarl"],
            true,
            2),
        [Tribe.BringersOfPeace]: new TribeModel(
            "Bringers-of-Peace",
            [Attribute.Brawn, Attribute.Agility],
            Skill.Close_Combat,
            ["Snarl", "Antipode Creole"],
            false,
            6),
        [Tribe.GentleEmbrace]: new TribeModel(
            "Gentle Embrace of the Sagacious Progenitors",
            [Attribute.Willpower, Attribute.Agility],
            Skill.Analysis,
            ["Snarl"],
            false,
            8),
        [Tribe.IceFangs]: new TribeModel(
            "Ice Fangs",
            [Attribute.Brawn, Attribute.Agility],
            Skill.Stealth,
            ["Snarl"],
            false,
            10),
        [Tribe.RiverTribe]: new TribeModel(
            "River Tribe",
            [Attribute.Brawn, Attribute.Agility],
            Skill.Observation,
            ["Snarl"],
            true,
            14),
        [Tribe.WhiteKnives]: new TribeModel(
            "White Knives",
            [Attribute.Willpower, Attribute.Agility],
            Skill.Stealth,
            ["Snarl"],
            false,
            16),
        [Tribe.MothTribe]: new TribeModel(
            "3-Winged Moth Tribe",
            [Attribute.Intelligence, Attribute.Agility],
            Skill.Analysis,
            ["Snarl"],
            true,
            17),
        [Tribe.BrokenPlains]: new TribeModel(
            "Broken Plains Tribe",
            [Attribute.Awareness, Attribute.Agility],
            Skill.Observation,
            ["Snarl", "Antipode Creole"],
            false,
            18),
        [Tribe.DeathClaws]: new TribeModel(
            "Death Claws",
            [Attribute.Brawn, Attribute.Agility],
            Skill.Resistance,
            ["Snarl"],
            false,
            19),
        [Tribe.LongTalons]: new TribeModel(
            "Long Talons",
            [Attribute.Brawn, Attribute.Agility],
            Skill.Survival,
            ["Snarl"],
            true,
            20),
    };

    getTribes() {
        var tribes: TribeViewModel[] = [];
        var n = 0;
        for (var tribe in this._tribes) {
            const tr = this._tribes[tribe];
            tribes.push(new TribeViewModel(n, tr));
            n++;
        }
        return tribes;
    }

    generateTribe() {
        var roll = Math.floor(Math.random() * 20) + 1;
        var tribe = 0;
        var n = 0;

        for (var t in this._tribes) {
            const tr = this._tribes[t];
            if (tr.roll <= roll) {
                tribe = n;
                break;
            }
            n++;
        }

        return tribe;
    }

    getTribe(tribe: Tribe) {
        return this._tribes[tribe];
    }

    applyTribe(tribe: Tribe) {
        const tr = this.getTribe(tribe);
        tr.attributes.forEach(attr => {
            character.attributes[attr].value++;
        });

        if (tr.rollSecondaryLanguage) {
            character.addLanguage(BirthPlacesHelper.generateSecondaryLanguage(Faction.Ariadna));
        }
    }
}

export const TribesHelper = new Tribes();