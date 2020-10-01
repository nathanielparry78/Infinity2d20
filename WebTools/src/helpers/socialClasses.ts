import { Attribute } from './attributes';
import { character } from '../common/character';
import { AlienHost } from './alienHosts';
import { Faction } from './factions';
import { Source } from './sources';
import { Career } from './careers';
import { EventModel } from '../common/eventModel';
import { CareerEventModel } from './careerEvents';
import { HeritageTraits } from './birthPlaces';

export enum SocialClass {
    // Core
    Underclass,
    Demogrant,
    Middle,
    Upper,
    Elite,
    Hyper_Elite,

    // Antipodes
    Scavengers,
    Members,
    Trusted,
    Valued,
    Favored,
    Warlords,

    // Haqqislam
    AlMustaslaha_Orphaned,
    AlMustaslaha_Donated,
    AlMustaslaha_Delivered,

    // PanOceania
    Atek,
    Underclass_Helot,
    Demogrant_Helot,
    Middle_Helot,

    // Nomads
    CriminalUnderclass,
    CriminalUpperClass,
    CriminalElite,
};

class SocialClassModel {
    name: string;
    description: string;
    attribute: Attribute;
    earnings: number;

    constructor(name: string, description: string, attribute: Attribute, earnings: number) {
        this.name = name;
        this.description = description;
        this.attribute = attribute;
        this.earnings = earnings;
    }
}

export class SocialClassViewModel extends SocialClassModel {
    id: SocialClass;

    constructor(id: SocialClass, base: SocialClassModel) {
        super(base.name, base.description, base.attribute, base.earnings);
        this.id = id;
    }
}

export class SocialClasses {
    private _socialClasses: { [id: number]: SocialClassModel } = {
        [SocialClass.Underclass]: new SocialClassModel(
            "Underclass",
            "Although it’s become incredibly difficult for true poverty to exist, there are some people who slip through the cracks. (PanOceanians will talk about the tragic conditions of backcountry Ariadnans, but Yu Jing would be quick to point to the Ateks in PanOceania’s backyard. Elsewhere there are minor nations and small habitats in places like Human Edge).",
            Attribute.Willpower,
            1),
        [SocialClass.Demogrant]: new SocialClassModel(
            "Demogrant",
            "The demogrant is a basic income guaranteed to every member of the major powers (and most of the minor powers, too). The immense manufacturing capacity of dedicated nanoassemblers combined with the rich resources available to an automated, interstellar civilization make it possible for all citizens to enjoy a more than comfortable standard of living.",
            Attribute.Personality,
            2),
        [SocialClass.Middle]: new SocialClassModel(
            "Middle",
            "Most of humanity is living in a golden age of luxury. It’s easy for people to be part of the middle class while working twenty hours a week or less. The large middle class is constantly seeking out activities both real and virtual to fill their idle hours.",
            Attribute.Willpower,
            3),
        [SocialClass.Upper]: new SocialClassModel(
            "Upper",
            "This is a life of utter affluence. For the rich of the Human Sphere, thought has become the equivalent of action and desire can be instantaneously met by reality. For the upper class, the physical world can trivially transform itself almost as easily the virtual playgrounds of the middle class.",
            Attribute.Agility,
            4),
        [SocialClass.Elite]: new SocialClassModel(
            "Elite",
            "The vast wealth of the elite creates specialist micro-cultures that cater to their needs, a market of ultra-luxury items and bespoke items that are casually created on demand, and a plethora of body modifications unheard of in previous ages. Their lives, swaddled in advanced domotics, are virtually effortless, like endless theme park rides that are malleable to their will.",
            Attribute.Personality,
            5),
        [SocialClass.Hyper_Elite]: new SocialClassModel(
            "Hyper-Elite",
            "The hyper-elite flit across interplanetary distances or rule over de facto fiefdoms rendered in their own image. Their control over their physical reality is almost unlimited, allowing them to realize their ultimate fantasies in flights of whimsy.",
            Attribute.Willpower,
            6),
        [SocialClass.Scavengers]: new SocialClassModel(
            "Scavengers",
            "",
            Attribute.Awareness,
            0),
        [SocialClass.Members]: new SocialClassModel(
            "Members",
            "",
            Attribute.Awareness,
            1),
        [SocialClass.Trusted]: new SocialClassModel(
            "Trusted",
            "",
            Attribute.Brawn,
            2),
        [SocialClass.Valued]: new SocialClassModel(
            "Valued",
            "",
            Attribute.Agility,
            2),
        [SocialClass.Favored]: new SocialClassModel(
            "Favored",
            "",
            Attribute.Personality,
            2),
        [SocialClass.Warlords]: new SocialClassModel(
            "Warlords",
            "",
            Attribute.Willpower,
            3),
        [SocialClass.AlMustaslaha_Orphaned]: new SocialClassModel(
            "Al-Mustaslaha (Orphaned)",
            "",
            Attribute.Willpower,
            2),
        [SocialClass.AlMustaslaha_Donated]: new SocialClassModel(
            "Al-Mustaslaha (Donated)",
            "",
            Attribute.Awareness,
            2),
        [SocialClass.AlMustaslaha_Delivered]: new SocialClassModel(
            "Al-Mustaslaha (Delivered)",
            "",
            Attribute.Brawn,
            2),
        [SocialClass.Atek]: new SocialClassModel(
            "Atek",
            "",
            Attribute.Willpower,
            1),
        [SocialClass.Underclass_Helot]: new SocialClassModel(
            "Underclass",
            "",
            Attribute.Agility,
            1),
        [SocialClass.Demogrant_Helot]: new SocialClassModel(
            "Demogrant",
            "",
            Attribute.Personality,
            1),
        [SocialClass.Middle_Helot]: new SocialClassModel(
            "Middle",
            "",
            Attribute.Willpower,
            3),
        [SocialClass.CriminalUnderclass]: new SocialClassModel(
            "Criminal Underclass",
            "",
            Attribute.Personality,
            2),
        [SocialClass.CriminalUpperClass]: new SocialClassModel(
            "Criminal Upper Class",
            "",
            Attribute.Personality,
            4),
        [SocialClass.CriminalElite]: new SocialClassModel(
            "Criminal Elite",
            "",
            Attribute.Brawn,
            5),
    };

    getSocialClasses() {
        var soc: SocialClassViewModel[] = [];

        if (character.host === AlienHost.Antipode && character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            soc.push(new SocialClassViewModel(SocialClass.Scavengers, this._socialClasses[SocialClass.Scavengers]));
            soc.push(new SocialClassViewModel(SocialClass.Members, this._socialClasses[SocialClass.Members]));
            soc.push(new SocialClassViewModel(SocialClass.Trusted, this._socialClasses[SocialClass.Trusted]));
            soc.push(new SocialClassViewModel(SocialClass.Valued, this._socialClasses[SocialClass.Valued]));
            soc.push(new SocialClassViewModel(SocialClass.Favored, this._socialClasses[SocialClass.Favored]));
            soc.push(new SocialClassViewModel(SocialClass.Warlords, this._socialClasses[SocialClass.Warlords]));
        }
        if (character.host === AlienHost.Helot && character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            soc.push(new SocialClassViewModel(SocialClass.Underclass_Helot, this._socialClasses[SocialClass.Underclass_Helot]));
            soc.push(new SocialClassViewModel(SocialClass.Demogrant_Helot, this._socialClasses[SocialClass.Demogrant_Helot]));
            soc.push(new SocialClassViewModel(SocialClass.Middle_Helot, this._socialClasses[SocialClass.Middle_Helot]));
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            if (character.isUplift()) {
                soc.push(new SocialClassViewModel(SocialClass.CriminalUnderclass, this._socialClasses[SocialClass.CriminalUnderclass]));
                soc.push(new SocialClassViewModel(SocialClass.Underclass, this._socialClasses[SocialClass.Underclass]));
                soc.push(new SocialClassViewModel(SocialClass.Middle, this._socialClasses[SocialClass.Middle]));
                soc.push(new SocialClassViewModel(SocialClass.Upper, this._socialClasses[SocialClass.Upper]));
                soc.push(new SocialClassViewModel(SocialClass.CriminalUpperClass, this._socialClasses[SocialClass.CriminalUpperClass]));
                soc.push(new SocialClassViewModel(SocialClass.CriminalElite, this._socialClasses[SocialClass.CriminalElite]));
            }
            else {
                let allowed: SocialClass[] = [];

                switch (character.heritageTrait) {
                    case HeritageTraits.Bakunian:
                        allowed = [SocialClass.Underclass, SocialClass.Demogrant, SocialClass.Middle, SocialClass.Upper, SocialClass.Elite, SocialClass.Hyper_Elite];
                        break;
                    case HeritageTraits.Corregidoran:
                    case HeritageTraits.Lub:
                    case HeritageTraits.Missionary:
                        allowed = [SocialClass.Underclass, SocialClass.Demogrant, SocialClass.Middle, SocialClass.Upper, SocialClass.Elite];
                        break;
                    case HeritageTraits.Tunguskan:
                        allowed = [SocialClass.Demogrant, SocialClass.Middle, SocialClass.Upper, SocialClass.Elite, SocialClass.Hyper_Elite];
                        break;
                    case HeritageTraits.Vagrant:
                        allowed = [SocialClass.Underclass, SocialClass.Demogrant, SocialClass.Middle, SocialClass.Upper];
                        break;
                }

                allowed.forEach(s => {
                    soc.push(new SocialClassViewModel(s, this._socialClasses[s]));
                });
            }
        }
        else {
            if (character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
                soc.push(new SocialClassViewModel(SocialClass.Atek, this._socialClasses[SocialClass.Atek]));
            }
            else {
                soc.push(new SocialClassViewModel(SocialClass.Underclass, this._socialClasses[SocialClass.Underclass]));
            }

            soc.push(new SocialClassViewModel(SocialClass.Demogrant, this._socialClasses[SocialClass.Demogrant]));

            if (character.faction === Faction.Haqqislam && character.hasSource(Source.Haqqislam)) {
                soc.push(new SocialClassViewModel(SocialClass.AlMustaslaha_Orphaned, this._socialClasses[SocialClass.AlMustaslaha_Orphaned]));
                soc.push(new SocialClassViewModel(SocialClass.AlMustaslaha_Donated, this._socialClasses[SocialClass.AlMustaslaha_Donated]));
                soc.push(new SocialClassViewModel(SocialClass.AlMustaslaha_Delivered, this._socialClasses[SocialClass.AlMustaslaha_Delivered]));
            }

            soc.push(new SocialClassViewModel(SocialClass.Middle, this._socialClasses[SocialClass.Middle]));
            soc.push(new SocialClassViewModel(SocialClass.Upper, this._socialClasses[SocialClass.Upper]));
            soc.push(new SocialClassViewModel(SocialClass.Elite, this._socialClasses[SocialClass.Elite]));
            soc.push(new SocialClassViewModel(SocialClass.Hyper_Elite, this._socialClasses[SocialClass.Hyper_Elite]));
        }

        return soc;
    }

    getSocialClass(cls: SocialClass) {
        return this._socialClasses[cls];
    }

    getSocialClassByName(name: string) {
        var n = 0;
        for (var cls in this._socialClasses) {
            var c = this._socialClasses[cls];
            if (c.name === name) {
                return n;
            }
            n++;
        }

        return undefined;
    }

    generateSocialClass() {
        var roll = Math.floor(Math.random() * 11) + 2;
        var cls: SocialClass = undefined;

        if (character.host === AlienHost.Antipode && character.hasSource(Source.Ariadna)) {
            switch (roll) {
                case 2: cls = SocialClass.Scavengers; break;
                case 3:
                case 4:
                case 5: cls = SocialClass.Members; break;
                case 6:
                case 7:
                case 8: cls = SocialClass.Trusted; break;
                case 9:
                case 10: cls = SocialClass.Valued; break;
                case 11: cls = SocialClass.Favored; break;
                case 12: cls = SocialClass.Warlords; break;
            }
        }
        if (character.host === AlienHost.Helot && character.hasSource(Source.PanOceania)) {
            switch (roll) {
                case 2:
                case 3:
                case 4: cls = SocialClass.Underclass_Helot;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10: cls = SocialClass.Demogrant_Helot;
                case 11:
                case 12: cls = SocialClass.Middle_Helot;
            }
        }
        else if (character.faction === Faction.Haqqislam && character.hasSource(Source.Haqqislam)) {
            switch (roll) {
                case 2: cls = SocialClass.Underclass; break;
                case 3:
                case 4: cls = SocialClass.Demogrant; break;
                case 5: {
                    const subroll = Math.floor(Math.random() * 20) + 1;
                    if (subroll <= 8) cls = SocialClass.AlMustaslaha_Orphaned;
                    else if (subroll <= 16) cls = SocialClass.AlMustaslaha_Donated;
                    else cls = SocialClass.AlMustaslaha_Delivered;
                }
                    break;
                case 6:
                case 7:
                case 8: cls = SocialClass.Middle; break;
                case 9:
                case 10: cls = SocialClass.Upper; break;
                case 11: cls = SocialClass.Elite; break;
                case 12: cls = SocialClass.Hyper_Elite; break;
            }
        }
        else if (character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            switch (roll) {
                case 2: cls = SocialClass.Atek; break;
                case 3: cls = SocialClass.Demogrant; break;
                case 4:
                case 5:
                case 6: cls = SocialClass.Middle; break;
                case 7:
                case 8: cls = SocialClass.Upper; break;
                case 9:
                case 10: cls = SocialClass.Elite; break;
                case 11:
                case 12: cls = SocialClass.Hyper_Elite; break;
            }
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            if (character.isUplift()) {
                switch (roll) {
                    case 2: cls = SocialClass.CriminalUnderclass; break;
                    case 3:
                    case 4:
                    case 5: cls = SocialClass.Underclass; break;
                    case 6:
                    case 7:
                    case 8: cls = SocialClass.Middle; break;
                    case 9:
                    case 10: cls = SocialClass.Upper; break;
                    case 11: cls = SocialClass.CriminalUpperClass; break;
                    case 12: cls = SocialClass.CriminalElite; break;
                }
            }
            else {
                switch (roll) {
                    case 2: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Lub:
                            case HeritageTraits.Missionary:
                            case HeritageTraits.Vagrant: cls = SocialClass.Underclass; break;
                            case HeritageTraits.Tunguskan: cls = SocialClass.Demogrant; break;
                        }
                        break;
                    }
                    case 3:
                    case 4: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Lub:
                            case HeritageTraits.Missionary:
                            case HeritageTraits.Tunguskan: cls = SocialClass.Demogrant; break;
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Vagrant: cls = SocialClass.Underclass; break;
                        }
                        break;
                    }
                    case 5:
                    case 6: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Missionary:
                            case HeritageTraits.Tunguskan: cls = SocialClass.Middle; break;
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Lub:
                            case HeritageTraits.Vagrant: cls = SocialClass.Demogrant; break;
                        }
                        break;
                    }
                    case 7:
                    case 8: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Lub:
                            case HeritageTraits.Missionary:
                            case HeritageTraits.Vagrant: cls = SocialClass.Middle; break;
                            case HeritageTraits.Tunguskan: cls = SocialClass.Upper; break;
                        }
                        break;
                    }
                    case 9:
                    case 10: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Tunguskan:
                            case HeritageTraits.Missionary: cls = SocialClass.Upper; break;
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Lub:
                            case HeritageTraits.Vagrant: cls = SocialClass.Middle; break;
                        }
                        break;
                    }
                    case 11: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Tunguskan:
                            case HeritageTraits.Missionary: cls = SocialClass.Elite; break;
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Lub: cls = SocialClass.Upper; break;
                            case HeritageTraits.Vagrant: cls = SocialClass.Middle; break;
                        }
                        break;
                    }
                    case 12: {
                        switch (character.heritageTrait) {
                            case HeritageTraits.Bakunian:
                            case HeritageTraits.Tunguskan: cls = SocialClass.Hyper_Elite; break;
                            case HeritageTraits.Missionary:
                            case HeritageTraits.Corregidoran:
                            case HeritageTraits.Lub: cls = SocialClass.Elite; break;
                            case HeritageTraits.Vagrant: cls = SocialClass.Upper; break;
                        }
                        break;
                    }
                }
            }
        }
        else {
            switch (roll) {
                case 2: cls = SocialClass.Underclass; break;
                case 3:
                case 4:
                case 5: cls = SocialClass.Demogrant; break;
                case 6:
                case 7:
                case 8: cls = SocialClass.Middle; break;
                case 9:
                case 10: cls = SocialClass.Upper; break;
                case 11: cls = SocialClass.Elite; break;
                case 12: cls = SocialClass.Hyper_Elite; break;
            }
        }

        return cls;
    }

    applySocialClass(cls: SocialClass) {
        var soc = this.getSocialClass(cls);
        character.attributes[soc.attribute].value++;
        character.earnings = soc.earnings;

        if (cls === SocialClass.AlMustaslaha_Delivered ||
            cls === SocialClass.AlMustaslaha_Donated ||
            cls === SocialClass.AlMustaslaha_Orphaned) {
            character.freeCareers.push(Career.AkbarDoctor);
            character.freeCareers.push(Career.Military);
            character.freeCareers.push(Career.SpecialForces);
        }
        else if (cls === SocialClass.Atek) {
            character.careerEvents.push(
                new CareerEventModel(
                    new EventModel("", "Quantronic Novice", "Ateks are unfamiliar with advanced technology and suffer +1 complication range when using Expert systems. This costs 50 XP to remove.")));
        }
        else if (cls === SocialClass.CriminalUnderclass ||
                 cls === SocialClass.CriminalUpperClass ||
                 cls === SocialClass.CriminalElite) {
            character.hasCriminalRecord = true;
        }
    }

    reduceSocialClass() {
        if (character.socialClass > SocialClass.Underclass) {
            character.socialClass--;
            character.earnings = Math.max(character.earnings - 1, 0);
        }
    }

    increaseSocialClass() {
        if (character.socialClass < SocialClass.Hyper_Elite) {
            character.socialClass++;
            character.earnings++;
        }
    }
}

export const SocialClassesHelper = new SocialClasses();