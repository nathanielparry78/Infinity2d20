import {character} from '../common/character';

export enum Attribute {
    Agility,
    Awareness,
    Brawn,
    Coordination,
    Intelligence,
    Personality,
    Willpower
}

export class Attributes {
    getAttributeName(attr: Attribute) {
        return Attribute[attr];
    }

    getAttributeByName(attr: string) {
        if (attr === "Agility") return Attribute.Agility;
        else if (attr === "Awareness") return Attribute.Awareness;
        else if (attr === "Brawn") return Attribute.Brawn;
        else if (attr === "Coordination") return Attribute.Coordination;
        else if (attr === "Intelligence") return Attribute.Intelligence;
        else if (attr === "Personality") return Attribute.Personality;
        else if (attr === "Willpower") return Attribute.Willpower;
    }
}

export const AttributesHelper = new Attributes();