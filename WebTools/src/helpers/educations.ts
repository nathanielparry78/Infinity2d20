import {Skill} from './skills';
import {Attribute} from './attributes';
import {character} from '../common/character';
import {AlienHost} from './alienHosts';
import {Faction} from './factions';
import {Source} from './sources';

export enum Education {
    // Core
    Grew_Up_On_The_Streets,
    Rural_ColonialEducation,
    Creative_Education,
    White_Collar_Education,
    Technical_Education,
    Scientific_Education,
    Military_Training,
    Orbital_Training,

    // Antipodes
    ScoutTraining,
    WarriorTraining,
    SpiritualTraining,
    BornWild,

    // Helots
    HelotScoutTraining,
    HunterWarriorTraining,
    UtilityTraining,
    WildPod,
}

class EducationModel {
    name: string;
    plus2: Attribute;
    plus1: Attribute;
    minus1: Attribute;
    mandatory: Skill[];
    elective: Skill[];
    equipment: string[];
    roll: number;

    constructor(name: string, roll: number, plus2: Attribute, plus1: Attribute, minus1: Attribute, mandatory: Skill[], elective: Skill[], equipment: string[]) {
        this.name = name;
        this.plus2 = plus2;
        this.plus1 = plus1;
        this.minus1 = minus1;
        this.mandatory = mandatory;
        this.elective = elective;
        this.equipment = equipment;
        this.roll = roll;
    }
}

export class EducationViewModel extends EducationModel {
    id: Education;

    constructor(id: Education, base: EducationModel) {
        super(base.name, base.roll, base.plus2, base.plus1, base.minus1, base.mandatory, base.elective, base.equipment);
        this.id = id;
    }
}

export class Educations {
    private _educations: { [id: number]: EducationModel } = {
        [Education.Grew_Up_On_The_Streets]: new EducationModel("Grew up on the streets", 1, Attribute.Agility, Attribute.Brawn, Attribute.Intelligence,
            [Skill.Discipline, Skill.Observation, Skill.Resistance, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.Close_Combat, Skill.Lifestyle],
            ["Fake ID 1", "Micro-Torch", "Knife"]
        ),
        [Education.Rural_ColonialEducation]: new EducationModel("Rural/Colonial Education", 3, Attribute.Awareness, Attribute.Brawn, Attribute.Personality,
            [Skill.Education, Skill.Pilot, Skill.Resistance, Skill.Survival, Skill.Tech],
            [Skill.Animal_Handling, Skill.Athletics, Skill.Observation],
            ["Survival Kit", "Survival Rations (x3)", "Nav Suite", "Knife"]
        ),
        [Education.Creative_Education]: new EducationModel("Creative Education", 5, Attribute.Personality, Attribute.Willpower, Attribute.Brawn,
            [Skill.Discipline, Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade],
            [Skill.Analysis, Skill.Pilot, Skill.Tech],
            ["AR Eye Implants|Cosmetics Kit", "Recorder"]
        ),
        [Education.White_Collar_Education]: new EducationModel("White Collar Education", 8, Attribute.Awareness, Attribute.Personality, Attribute.Brawn,
            [Skill.Education, Skill.Lifestyle, Skill.Observation, Skill.Persuade, Skill.Stealth],
            [Skill.Command, Skill.Stealth, Skill.Thievery],
            ["AR Eye Implants|Neural Comlog", "Stims"]
        ),
        [Education.Technical_Education]: new EducationModel("Technical Education", 11, Attribute.Awareness, Attribute.Intelligence, Attribute.Willpower,
            [Skill.Education, Skill.Observation, Skill.Pilot, Skill.Tech, Skill.Thievery],
            [Skill.Hacking, Skill.Lifestyle, Skill.Extraplanetary],
            ["Powered Multitool", "Repair Kit (with 5 Parts)"]
        ),
        [Education.Scientific_Education]: new EducationModel("Scientific Education", 14, Attribute.Intelligence, Attribute.Awareness, Attribute.Personality,
            [Skill.Education, Skill.Lifestyle, Skill.Medicine, Skill.Pilot, Skill.Tech],
            [Skill.Medicine, Skill.Science, Skill.Spacecraft],
            ["Analytical Kit (with 5 Reagents)", "Sensor Suite"]
        ),
        [Education.Military_Training]: new EducationModel("Military Training", 17, Attribute.Brawn, Attribute.Agility, Attribute.Intelligence,
            [Skill.Acrobatics, Skill.Athletics, Skill.Ballistics, Skill.Close_Combat, Skill.Observation],
            [Skill.Command, Skill.Education, Skill.Tech],
            ["Armoured Clothing", "Pistol"]
        ),
        [Education.Orbital_Training]: new EducationModel("Orbital Training", 20, Attribute.Intelligence, Attribute.Awareness, Attribute.Personality,
            [Skill.Discipline, Skill.Education, Skill.Pilot, Skill.Spacecraft, Skill.Extraplanetary],
            [Skill.Lifestyle, Skill.Resistance, Skill.Tech],
            ["Vac Suit", "Location beacon", "5 Oxygen loads"]
        ),
        [Education.ScoutTraining]: new EducationModel("Scout Training", 106, Attribute.Awareness, Attribute.Agility, Attribute.Personality,
            [Skill.Analysis, Skill.Athletics, Skill.Observation, Skill.Stealth, Skill.Survival],
            [Skill.Acrobatics, Skill.Ballistics, Skill.Stealth],
            []
        ),
        [Education.WarriorTraining]: new EducationModel("Warrior Training", 112, Attribute.Brawn, Attribute.Agility, Attribute.Intelligence,
            [Skill.Acrobatics, Skill.Athletics, Skill.Ballistics, Skill.Close_Combat, Skill.Resistance],
            [Skill.Close_Combat, Skill.Observation, Skill.Stealth],
            []
        ),
        [Education.SpiritualTraining]: new EducationModel("Spiritual Training", 118, Attribute.Willpower, Attribute.Personality, Attribute.Coordination,
            [Skill.Animal_Handling, Skill.Close_Combat, Skill.Command, Skill.Psychology, Skill.Persuade],
            [Skill.Analysis, Skill.Command, Skill.Survival],
            []
        ),
        [Education.BornWild]: new EducationModel("Born Wild", 120, Attribute.Agility, Attribute.Brawn, Attribute.Personality,
            [Skill.Athletics, Skill.Observation, Skill.Survival],
            [Skill.Stealth, Skill.Survival, Skill.Thievery],
            []
        ),
        [Education.HelotScoutTraining]: new EducationModel("Scout Training", 206, Attribute.Awareness, Attribute.Coordination, Attribute.Brawn,
            [Skill.Acrobatics, Skill.Athletics, Skill.Observation, Skill.Stealth, Skill.Survival],
            [Skill.Ballistics, Skill.Pilot, Skill.Thievery],
            []
        ),
        [Education.HunterWarriorTraining]: new EducationModel("Hunter/Warrior Training", 212, Attribute.Agility, Attribute.Personality, Attribute.Intelligence,
            [Skill.Acrobatics, Skill.Athletics, Skill.Ballistics, Skill.Close_Combat, Skill.Resistance],
            [Skill.Medicine, Skill.Observation, Skill.Stealth],
            []
        ),
        [Education.UtilityTraining]: new EducationModel("Utility Training", 218, Attribute.Personality, Attribute.Intelligence, Attribute.Brawn,
            [Skill.Animal_Handling, Skill.Education, Skill.Lifestyle, Skill.Psychology, Skill.Tech],
            [Skill.Analysis, Skill.Persuade, Skill.Science],
            []
        ),
        [Education.WildPod]: new EducationModel("Wild Pod", 219, Attribute.Brawn, Attribute.Agility, Attribute.Willpower,
            [Skill.Athletics, Skill.Observation, Skill.Resistance, Skill.Survival],
            [Skill.Stealth, Skill.Survival, Skill.Thievery],
            []
        ),
    };

    getEducations() {
        if (character.host === AlienHost.Antipode && character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            return [
                new EducationViewModel(Education.ScoutTraining, this._educations[Education.ScoutTraining]),
                new EducationViewModel(Education.WarriorTraining, this._educations[Education.WarriorTraining]),
                new EducationViewModel(Education.SpiritualTraining, this._educations[Education.SpiritualTraining]),
                new EducationViewModel(Education.BornWild, this._educations[Education.BornWild])
            ];
        }

        var educations: EducationViewModel[] = [];
        var n = 0;
        for (var edu in this._educations) {
            var education = this._educations[edu];

            if (n < Education.ScoutTraining) {
                educations.push(new EducationViewModel(n, education));
            }

            n++;
        }

        if (character.host === AlienHost.Helot && character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            var edus = [
                new EducationViewModel(Education.HelotScoutTraining, this._educations[Education.HelotScoutTraining]),
                new EducationViewModel(Education.HunterWarriorTraining, this._educations[Education.HunterWarriorTraining]),
                new EducationViewModel(Education.UtilityTraining, this._educations[Education.UtilityTraining]),
                new EducationViewModel(Education.WildPod, this._educations[Education.WildPod]),
            ];

            if (character.canSelectHumanEducation) {
                edus.push(...educations);
            }

            return edus;
        }

        return educations;
    }

    getEducation(education: Education) {
        return this._educations[education];
    }

    generateEducation() {
        var roll = Math.floor(Math.random() * 20) + 1;
        var n = 0;

        if (character.host === AlienHost.Antipode && character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            roll += 100;
        }
        else if (character.host === AlienHost.Helot && character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            roll += 200;

            if (roll === 220) {
                roll = Math.floor(Math.random() * 20) + 1;
            }
        }

        for (var edu in this._educations) {
            var e = this._educations[edu];
            if (e.roll >= roll) {
                return n;
            }

            n++;
        }
    }

    applyEducation(education: Education) {
        var edu = this.getEducation(education);

        character.attributes[edu.plus2].value += 2;
        character.attributes[edu.plus1].value += 1;
        character.attributes[edu.minus1].value -= 1;

        if (education === Education.Creative_Education ||
            education === Education.White_Collar_Education) {
            character.assets++;
        }
        else if (education === Education.ScoutTraining) {
            character.addTalent("Sharp Senses");
        }
        else if (education === Education.WarriorTraining) {
            character.addTalent("Sturdy");
        }
        else if (education === Education.SpiritualTraining) {
            character.addTalent("Counsellor");
        }
        else if (education === Education.HelotScoutTraining) {
            character.addTalent("Scout");
        }
        else if (education === Education.HunterWarriorTraining) {
            character.addTalent("Graceful");
        }
        else if (education === Education.UtilityTraining) {
            character.addTalent("Socialite");
        }
        else if (education === Education.BornWild ||
                 education === Education.WildPod) {
            character.lifePoints++;
        }

        edu.equipment.forEach((e, i) => {
            if (e.indexOf('|') === -1) {
                character.addEquipment(e);
            }
        });
    }
}

export const EducationsHelper = new Educations();