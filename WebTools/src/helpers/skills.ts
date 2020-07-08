import {Attribute} from './attributes';

export enum Skill {
    Acrobatics,
    Analysis,
    Animal_Handling,
    Athletics,
    Ballistics,
    Close_Combat,
    Command,
    Discipline,
    Education,
    Extraplanetary,
    Hacking,
    Lifestyle,
    Medicine,
    Observation,
    Persuade,
    Pilot,
    Psychology,
    Resistance,
    Science,
    Spacecraft,
    Stealth,
    Survival,
    Tech,
    Thievery
}

class SkillModel {
    name: string;
    attribute: Attribute;

    constructor(name: string, attr: Attribute) {
        this.name = name;
        this.attribute = attr
    }
}

export class Skills {
    private _skills: { [id: number]: SkillModel } = {
        [Skill.Acrobatics]: new SkillModel("Acrobatics", Attribute.Agility),
        [Skill.Analysis]: new SkillModel("Analysis", Attribute.Awareness),
        [Skill.Animal_Handling]: new SkillModel("Animal Handling", Attribute.Personality),
        [Skill.Athletics]: new SkillModel("Athletics", Attribute.Brawn),
        [Skill.Ballistics]: new SkillModel("Ballistics", Attribute.Coordination),
        [Skill.Close_Combat]: new SkillModel("Close Combat", Attribute.Agility),
        [Skill.Command]: new SkillModel("Command", Attribute.Personality),
        [Skill.Discipline]: new SkillModel("Discipline", Attribute.Willpower),
        [Skill.Education]: new SkillModel("Education", Attribute.Intelligence),
        [Skill.Extraplanetary]: new SkillModel("Extraplanetary", Attribute.Awareness),
        [Skill.Hacking]: new SkillModel("Hacking", Attribute.Intelligence),
        [Skill.Lifestyle]: new SkillModel("Lifestyle", Attribute.Personality),
        [Skill.Medicine]: new SkillModel("Medicine", Attribute.Intelligence),
        [Skill.Observation]: new SkillModel("Observation", Attribute.Awareness),
        [Skill.Persuade]: new SkillModel("Persuade", Attribute.Personality),
        [Skill.Pilot]: new SkillModel("Pilot", Attribute.Coordination),
        [Skill.Psychology]: new SkillModel("Psychology", Attribute.Intelligence),
        [Skill.Resistance]: new SkillModel("Resistance", Attribute.Brawn),
        [Skill.Science]: new SkillModel("Science", Attribute.Intelligence),
        [Skill.Spacecraft]: new SkillModel("Spacecraft", Attribute.Coordination),
        [Skill.Stealth]: new SkillModel("Stealth", Attribute.Agility),
        [Skill.Survival]: new SkillModel("Survival", Attribute.Awareness),
        [Skill.Tech]: new SkillModel("Tech", Attribute.Intelligence),
        [Skill.Thievery]: new SkillModel("Thievery", Attribute.Awareness)
    };

    getSkills() {
        let skills: Skill[] = [];
        for (var s = 0; s <= Skill.Thievery; s++) {
            skills.push(s);
        }

        return skills;
    }

    getSkill(skill: Skill) {
        return this._skills[skill];
    }

    getSkillName(skill: Skill) {
        return this._skills[skill].name;
    }

    getSkillByName(name: string) {
        var n = 0;
        for (var skill in this._skills) {
            if (this._skills[skill].name === name) {
                return n;
            }

            n++;
        }

        return null;
    }

    getSkillsForAttribute(attr: Attribute) {
        var skills = [];

        for (var skill in this._skills) {
            var s = this._skills[skill];
            if (s.attribute === attr) {
                skills.push(skill);
            }
        }

        return skills;
    }

    getAttributeForSkill(skill: Skill) {
        return this._skills[skill].attribute;
    }

    toSkill(name: string) {
        for (var i = 0; i <= Skill.Thievery; i++) {
            if (this._skills[i] && this._skills[i].name === name) {
                return i as Skill;
            }
        }
    }
}

export const SkillsHelper = new Skills();