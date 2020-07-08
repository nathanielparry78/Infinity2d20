import {Attribute} from '../helpers/attributes';
import {Skill} from '../helpers/skills';

export class GeistAttribute {
    attribute: Attribute;
    value: number;

    constructor(attr: Attribute, val: number) {
        this.attribute = attr;
        this.value = val;
    }
}

export class GeistSkill {
    skill: Skill;
    expertise: number;
    focus: number;

    constructor(skill: Skill, expertise: number, focus: number) {
        this.skill = skill;
        this.expertise = expertise;
        this.focus = focus;
    }
}

export class Geist {
    attributes: GeistAttribute[] = [];
    skills: GeistSkill[] = [];
    firewallBonus: number = 0;
    moraleBonus: number = 0;

    constructor() {
        this.attributes.push(new GeistAttribute(Attribute.Agility, 4));
        this.attributes.push(new GeistAttribute(Attribute.Awareness, 4));
        this.attributes.push(new GeistAttribute(Attribute.Brawn, 4));
        this.attributes.push(new GeistAttribute(Attribute.Coordination, 4));
        this.attributes.push(new GeistAttribute(Attribute.Intelligence, 4));
        this.attributes.push(new GeistAttribute(Attribute.Personality, 4));
        this.attributes.push(new GeistAttribute(Attribute.Willpower, 4));

        for (var i = 0; i <= Skill.Thievery; i++) {
            this.skills.push(new GeistSkill(i, 0, 0));
        }
    }
}