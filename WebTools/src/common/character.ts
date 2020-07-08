import {Attribute} from '../helpers/attributes';
import {Skill} from '../helpers/skills';
import {AlienHost} from '../helpers/alienHosts';
import {Faction} from '../helpers/factions';
import {AlephForm} from '../helpers/alephForms';
import {SocialClass}  from '../helpers/socialClasses';
import {HomeEnvironment} from '../helpers/homeEnvironments';
import {Career} from '../helpers/careers';
import {Education} from '../helpers/educations';
import {YouthEventModel} from '../helpers/youthEvents';
import {AdolescenceEventModel} from '../helpers/adolescenceEvents';
import {CareerEventModel} from '../helpers/careerEvents';
import {Source} from '../helpers/sources';
import {HassassinOrder} from '../helpers/hassassinOrders';
import {MilitaryOrder} from '../helpers/militaryOrders';
import {Geist} from './geist';
import {EventModel} from './eventModel';
import { CatSquad } from '../helpers/catSquads';
import { UpliftHost } from '../helpers/upliftHosts';

export enum Gender {
    Male,
    Female,
}

export class CharacterAttribute {
    attribute: Attribute;
    value: number;

    constructor(attr: Attribute, val: number) {
        this.attribute = attr;
        this.value = val;
    }
}

export class CharacterSkill {
    skill: Skill;
    expertise: number;
    focus: number;
    isSignature: boolean;

    constructor(skill: Skill, expertise: number, focus: number) {
        this.skill = skill;
        this.expertise = expertise;
        this.focus = focus;
    }
}

export class CharacterTalent {
    rank: number;

    constructor(rank: number) {
        this.rank = rank;
    }
}

export class CharacterCareer {
    career: Career;
    years: number;
    isExtended: boolean;

    constructor(career: Career, years: number) {
        this.career = career;
        this.years = years;
    }
}

class Step {
    page: number;
    character: Character;

    constructor(page: number, character: Character) {
        this.page = page;
        this.character = character;
    }
}

export class Character {
    private _attributeInitialValue: number = 7;
    private _steps: Step[];

    public sources: Source[];
    public attributes: CharacterAttribute[] = [];
    public modifiers: CharacterAttribute[] = [];
    public skills: CharacterSkill[] = [];
    public talents: { [name: string]: CharacterTalent } = {};
    public host: AlienHost;
    public hostAbilities: string[] = [];
    public hostName: string;
    public faction: Faction;
    public heritage: Faction;
    public hasDefected: boolean;
    public alephForm: AlephForm;
    public upliftHost: UpliftHost;
    public excludedElectiveSkills: Skill[] = [];
    public birthPlace: string;
    public homeland: string;
    public birthPlaceId: number;
    public socialClass: SocialClass;
    public homeEnvironment: HomeEnvironment;
    public education: Education;
    public careers: CharacterCareer[] = [];
    public freeCareers: Career[] = [];
    public prohibitedCareers: Career[] = [];
    public firstCareer: Career;
    public careerRerolls: number;
    public youthEvent: YouthEventModel;
    public adolescenceEvent: AdolescenceEventModel;
    public careerEvents: CareerEventModel[] = [];
    public pendingEvents: EventModel[] = [];
    public otherEvents: EventModel[] = [];
    public electiveSkills: { [skill: number]: number } = {};
    public languages: string[] = [];
    public name: string;
    public age: number;
    public gender: Gender = Gender.Male;
    public infinityPoints: number;
    public equipment: string[] = [];
    public resolve: number;
    public vigour: number;
    public firewall: number;
    public resolveReduction: number;
    public vigourReduction: number;
    public firewallReduction: number;
    public meleeBonus: number;
    public rangedBonus: number;
    public infowarBonus: number;
    public psywarBonus: number;
    public armorBonus: number;
    public morale: number = 0;
    public bts: number = 0;
    private _lifePoints: number = 0;
    public isOptional: boolean;
    public hasCriminalRecord: boolean;
    public ignoreFired: boolean;
    public eventRerolls: number;
    public freeFactionCareerRoll: number;
    public earnings: number;
    public assets: number;
    public hazardDecrease: number;
    public ignoreHazardRequirements: boolean;
    public geist: Geist;
    public description: string;
    public weight: string;
    public height: string;
    public hair: string;
    public eyes: string;
    public paidForFaction: boolean;
    public paidForSocialClass: boolean;
    public hassassinEvent: boolean;
    public hassassinOrder: HassassinOrder;
    public militaryOrder: MilitaryOrder;
    public catSquad: CatSquad;
    public canExtendCareer: boolean = true;
    public canSelectHumanEducation: boolean = false;
    public sissoluWaters: number;
    public heritageTrait: string;

    constructor() {
        this.attributes.push(new CharacterAttribute(Attribute.Agility, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Awareness, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Brawn, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Coordination, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Intelligence, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Personality, this._attributeInitialValue));
        this.attributes.push(new CharacterAttribute(Attribute.Willpower, this._attributeInitialValue));

        this.modifiers.push(new CharacterAttribute(Attribute.Agility, 0));
        this.modifiers.push(new CharacterAttribute(Attribute.Awareness, 0));
        this.modifiers.push(new CharacterAttribute(Attribute.Brawn, 0));
        this.modifiers.push(new CharacterAttribute(Attribute.Coordination, 0));
        this.modifiers.push(new CharacterAttribute(Attribute.Intelligence, 0));
        this.modifiers.push(new CharacterAttribute(Attribute.Personality, 0));
        this.modifiers.push(new CharacterAttribute(Attribute.Willpower, 0));

        for (var i = 0; i <= Skill.Thievery; i++) {
            this.skills.push(new CharacterSkill(i, 0, 0));
        }

        this.age = 18;
        this.infinityPoints = 2;
        this.earnings = 0;
        this.assets = 0;
        this.hazardDecrease = 0;
        this.paidForFaction = false;
        this.paidForSocialClass = false;
        this.freeFactionCareerRoll = 0;

        this.resolve = 0;
        this.resolveReduction = 0;
        this.vigour = 0;
        this.vigourReduction = 0;
        this.firewall = 0;
        this.firewallReduction = 0;

        this.meleeBonus = 0;
        this.rangedBonus = 0;
        this.psywarBonus = 0;
        this.infowarBonus = 0;
        this.armorBonus = 0;

        this.geist = new Geist();

        this.sources = [];
        this._steps = [];
    }

    getCareerPage(page: number) {
        return page + (Math.max(this.careers.length - 1, 0));
    }

    get steps() {
        return this._steps;
    }

    saveStep(page: number) {
        if (!this._steps.some(s => s.page === page)) {
            const copy = this.copy();
            this._steps.push(new Step(page, copy));
        }
    }

    goToStep(page: number) {
        for (var i = this._steps.length - 1; i >= 0; i--) {
            if (this._steps[i].page === page) {
                character = this._steps[i].character;
                character.saveStep(page);
                break;
            }
        }
    }

    addSource(source: Source) {
        this.sources.push(source);
    }

    removeSource(source: Source) {
        if (this.hasSource(source)) {
            this.sources.splice(this.sources.indexOf(source), 1);
        }
    }

    hasSource(source: Source) {
        return character.sources.indexOf(source) > -1 || source === Source.Core;
    }

    get lifePoints() {
        return this._lifePoints;
    }

    set lifePoints(val: number) {
        this._lifePoints = Math.max(0, val);

        var el = document.getElementById("lifepoints");
        if (el) {
            el.innerText = this._lifePoints.toString();
        }

        if (this._lifePoints === 0 && this.isOptional) {
            this.isOptional = false;
        }
    }

    calculateModifiers() {
        for (var i = 0; i < 7; i++) {
            this.modifiers[i].value = this.attributes[i].value - 7;
        }
    }

    get numberOfSignatureSkills() {
        var count = 0;
        for (var skill in this.skills) {
            var s = this.skills[skill];
            if (s.isSignature) {
                count++;
            }
        }

        return count;
    }

    addOtherEvent(effect: string, trait: string) {
        this.otherEvents.push(new EventModel("", trait, effect));
    }

    applyDeath() {
        this.attributes[Attribute.Agility].value -= this.modifiers[Attribute.Agility].value > 0 ? this.modifiers[Attribute.Agility].value : -this.modifiers[Attribute.Agility].value;
        this.attributes[Attribute.Awareness].value -= this.modifiers[Attribute.Awareness].value > 0 ? this.modifiers[Attribute.Awareness].value : -this.modifiers[Attribute.Awareness].value;
        this.attributes[Attribute.Brawn].value -= this.modifiers[Attribute.Brawn].value > 0 ? this.modifiers[Attribute.Brawn].value : -this.modifiers[Attribute.Brawn].value;
        this.attributes[Attribute.Coordination].value -= this.modifiers[Attribute.Coordination].value > 0 ? this.modifiers[Attribute.Coordination].value : -this.modifiers[Attribute.Coordination].value;
        this.attributes[Attribute.Intelligence].value -= this.modifiers[Attribute.Intelligence].value > 0 ? this.modifiers[Attribute.Intelligence].value : -this.modifiers[Attribute.Intelligence].value;
        this.attributes[Attribute.Personality].value -= this.modifiers[Attribute.Personality].value > 0 ? this.modifiers[Attribute.Personality].value : -this.modifiers[Attribute.Personality].value;
        this.attributes[Attribute.Willpower].value -= this.modifiers[Attribute.Willpower].value > 0 ? this.modifiers[Attribute.Willpower].value : -this.modifiers[Attribute.Willpower].value;

        this.hostAbilities = [];
    }

    addTalent(name: string) {
        var found = false;

        if (name.indexOf('[') > -1) {
            name = name.substr(0, name.indexOf('[') - 1);
        }
        else if (name.indexOf('(') > -1) {
            name = name.substr(0, name.indexOf('(') - 1);
        }

        for (var talent in this.talents) {
            var t = this.talents[talent];
            if (talent === name) {
                t.rank++;
                found = true;
                break;
            }
        }

        if (!found) {
            this.talents[name] = new CharacterTalent(1);
        }
    }

    hasTalent(name: string) {
        var found = false;

        for (var talent in this.talents) {
            var t = this.talents[talent];
            if (talent === name) {
                found = true;
                break;
            }
        }

        return found;
    }

    addLanguage(name: string) {
        if (name && this.languages.indexOf(name) === -1) {
            this.languages.push(name.replace(" ", ""));
        }
    }

    hasLanguage(name: string) {
        return this.languages.indexOf(name) > -1;
    }

    addEquipment(name: string) {
        if (name !== "undefined" && this.equipment.indexOf(name) === -1) {
            this.equipment.push(name);
        }
    }

    update() {
        this.vigour = this.attributes[Attribute.Brawn].value + this.skills[Skill.Resistance].expertise - this.vigourReduction;
        this.resolve = this.attributes[Attribute.Willpower].value + this.skills[Skill.Discipline].expertise - this.resolveReduction;
        this.firewall = this.attributes[Attribute.Intelligence].value + this.skills[Skill.Hacking].expertise - this.firewallReduction;

        this.meleeBonus = this.calculateBonus(this.attributes[Attribute.Brawn].value);
        this.rangedBonus = this.calculateBonus(this.attributes[Attribute.Awareness].value);
        this.infowarBonus = this.calculateBonus(this.attributes[Attribute.Intelligence].value);
        this.psywarBonus = this.calculateBonus(this.attributes[Attribute.Personality].value);
    }

    isDogBlooded() {
        return (this.host === AlienHost.Antipode ||
                this.host === AlienHost.Dogface || 
                this.host === AlienHost.Wulver) &&
                this.faction === Faction.Ariadna;
    }

    isAlMustaslaha() {
        return (this.socialClass === SocialClass.AlMustaslaha_Delivered ||
                this.socialClass === SocialClass.AlMustaslaha_Donated ||
                this.socialClass === SocialClass.AlMustaslaha_Orphaned) &&
                this.faction === Faction.Haqqislam;
    }

    isUplift() {
        return (this.host >= AlienHost.UpliftAvian && this.host <= AlienHost.UpliftSuidae);
    }

    isUnemployed() {
        const career = this.careers.length > 0 ? this.careers[0] : null;
        if (career != null) {
            return career.career === Career.Unemployed || career.career === Career.Scavenger;
        }

        return false;
    }

    hasGeist() {
        return (character.faction !== Faction.Ariadna ||
                character.hasDefected);
    }

    getEarnings() {
        var earnings = character.earnings;

        if (character.hasTalent("Investments")) {
            earnings += character.talents["Investments"].rank;
        }

        return earnings;
    }

    private copy(): Character {
        var character = new Character();
        this._steps.forEach(s => {
            character.steps.push(new Step(s.page, s.character));
        });
        this.sources.forEach(s => {
            character.sources.push(s);
        });
        this.attributes.forEach(a => {
            character.attributes[a.attribute].attribute = a.attribute;
            character.attributes[a.attribute].value = a.value;
        });
        this.modifiers.forEach(a => {
            character.modifiers[a.attribute].attribute = a.attribute;
            character.modifiers[a.attribute].value = a.value;
        });
        this.skills.forEach(s => {
            character.skills[s.skill].skill = s.skill;
            character.skills[s.skill].expertise = s.expertise;
            character.skills[s.skill].focus = s.focus;
            character.skills[s.skill].isSignature = s.isSignature;
        });
        for (var talent in this.talents) {
            const t = this.talents[talent];
            character.talents[talent] = new CharacterTalent(t.rank);
        }
        character.host = this.host;
        this.hostAbilities.forEach(a => {
            character.hostAbilities.push(a);
        });
        character.hostName = this.hostName;
        character.faction = this.faction;
        character.heritage = this.heritage;
        character.hasDefected = this.hasDefected;
        character.alephForm = this.alephForm;
        character.upliftHost = this.upliftHost;
        this.excludedElectiveSkills.forEach(s => {
            character.excludedElectiveSkills.push(s);
        });
        character.birthPlace = this.birthPlace;
        character.birthPlaceId = this.birthPlaceId;
        character.homeland = this.homeland;
        this.languages.forEach(lang => {
            character.addLanguage(lang);
        });
        character.socialClass = this.socialClass;
        character.homeEnvironment = this.homeEnvironment;
        character.education = this.education;
        this.careers.forEach(c => {
            character.careers.push(new CharacterCareer(c.career, c.years));
        });
        this.freeCareers.forEach(c => {
            character.freeCareers.push(c);
        });
        this.prohibitedCareers.forEach(c => {
            character.prohibitedCareers.push(c);
        });
        character.firstCareer = this.firstCareer;
        character.careerRerolls = this.careerRerolls;
        character.youthEvent = this.youthEvent ? new YouthEventModel(this.youthEvent.description) : null;
        character.adolescenceEvent = this.adolescenceEvent ? new AdolescenceEventModel(new EventModel(this.adolescenceEvent.event, this.adolescenceEvent.trait, this.adolescenceEvent.effect, this.adolescenceEvent.detailView)) : null;
        this.careerEvents.forEach(e => {
            character.careerEvents.push(new CareerEventModel(new EventModel(e.event, e.trait, e.effect, e.detailView)));
        });
        this.otherEvents.forEach(e => {
            character.otherEvents.push(new EventModel(e.event, e.trait, e.effect, e.detailView));
        });
        this.pendingEvents.forEach(e => {
            character.pendingEvents.push(new EventModel(e.event, e.trait, e.effect, e.detailView));
        });
        for (var skill in this.electiveSkills) {
            character.electiveSkills[skill] = this.electiveSkills[skill];
        }
        character.age = this.age;
        character.name = this.name;
        character.gender = this.gender;
        character.infinityPoints = this.infinityPoints;
        this.equipment.forEach(eq => {
            character.addEquipment(eq);
        });
        character.resolve = this.resolve;
        character.resolveReduction = this.resolveReduction;
        character.vigour = this.vigour;
        character.vigourReduction = this.vigourReduction;
        character.firewall = this.firewall;
        character.firewallReduction = this.firewallReduction;
        character.meleeBonus = this.meleeBonus;
        character.rangedBonus = this.rangedBonus;
        character.infowarBonus = this.infowarBonus;
        character.psywarBonus = this.psywarBonus;
        character.armorBonus = this.armorBonus;
        character.morale = this.morale;
        character.bts = this.bts;
        character.lifePoints = this.lifePoints;
        character.isOptional = this.isOptional;
        character.hasCriminalRecord = this.hasCriminalRecord;
        character.ignoreFired = this.ignoreFired;
        character.eventRerolls = this.eventRerolls;
        character.freeFactionCareerRoll = this.freeFactionCareerRoll;
        character.earnings = this.earnings;
        character.assets = this.assets;
        character.hazardDecrease = this.hazardDecrease;
        character.ignoreHazardRequirements = this.ignoreHazardRequirements;
        character.description = this.description;
        character.weight = this.weight;
        character.height = this.height;
        character.hair = this.hair;
        character.eyes = this.eyes;
        character.paidForFaction = this.paidForFaction;
        character.paidForSocialClass = this.paidForSocialClass;
        character.hassassinEvent = this.hassassinEvent;
        character.hassassinOrder = this.hassassinOrder;
        character.militaryOrder = this.militaryOrder;
        character.catSquad = this.catSquad;
        character.canExtendCareer = this.canExtendCareer;
        character.canSelectHumanEducation = this.canSelectHumanEducation;
        character.sissoluWaters = this.sissoluWaters;
        character.heritageTrait = this.heritageTrait;

        character.geist = new Geist();
        this.geist.attributes.forEach(a => {
            character.geist.attributes[a.attribute].value = a.value;
        });
        this.geist.skills.forEach(s => {
            character.geist.skills[s.skill].skill = s.skill;
            character.geist.skills[s.skill].expertise = s.expertise;
            character.geist.skills[s.skill].focus = s.focus;
        });

        return character;
    }

    private calculateBonus(sum: number) {
        if (sum >= 16) {
            return 5;
        }
        else if (sum >= 14) {
            return 4;
        }
        else if (sum >= 12) {
            return 3;
        }
        else if (sum >= 10) {
            return 2;
        }
        else if (sum > 8) {
            return 1;
        }

        return 0;
    }
}

export let character = new Character();