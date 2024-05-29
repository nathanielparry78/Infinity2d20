import {character} from '../common/character';
import {EventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {YouthEventsHelper} from './youthEvents';
import {Career} from'./careers';
import {SocialClassesHelper, SocialClass} from './socialClasses';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {DiceRoller} from './diceRoller';
import {AlienHost} from './alienHosts';
import {Source} from './sources';
import { HeritageTraits } from './birthPlaces';

export class AdolescenceEventModel extends EventModel {
    onApply: () => void;

    constructor(base: EventModel, onApply?: () => void) {
        super(base.event, base.trait, base.effect, base.detailView);
        this.onApply = onApply;
    }
}

export class AdolescenceEvents {
    generateEvent(): AdolescenceEventModel {
        var event: AdolescenceEventModel = null;
        var table = Math.floor(Math.random() * 6) + 1;
        var ev = Math.floor(Math.random() * 20) + 1;

        if (character.host === AlienHost.Antipode && character.hasSource(Source.Ariadna)) {
            event = this.rollOnAntipodeTable(ev);
            event.table = "Antipode";
            event.eventNumber = ev;
            return event;
        }

        if (character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            switch (table) {
                case 1:
                case 2:
                case 3:
                    if (character.host === AlienHost.Human) {
                        event = this.rollOnAriadnaTable(ev);
                        event.table = "Ariadna";
                        event.eventNumber = ev;
                    }
                    else {
                        event = this.rollOnDogfaceAndWulverTable(ev);
                        event.table = "Dog-Blooded";
                        event.eventNumber = ev;
                    }
                    break;
                case 4:
                    event = this.rollOnTableA(ev);
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev);
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev);
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else if (character.faction === Faction.Haqqislam && character.hasSource(Source.Haqqislam)) {
            switch (table) {
                case 1:
                    event = this.rollOnHaqqislamTable(ev); // says Heritage, but what is that?
                    event.table = "Haqqislam";
                    event.eventNumber = ev;
                    break;
                case 2:
                case 3:
                    event = this.rollOnHaqqislamTable(ev);
                    event.table = "Haqqislam";
                    event.eventNumber = ev;
                    break;
                case 4:
                    event = this.rollOnTableA(ev);
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev);
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev);
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else if (character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            switch (table) {
                case 1:
                    event = this.rollOnPanOceaniaTable(ev); // says Heritage, but what is that?
                    event.table = "PanOceania";
                    event.eventNumber = ev;
                    break;
                case 2:
                case 3:
                    event = this.rollOnPanOceaniaTable(ev);
                    event.table = "PanOceania";
                    event.eventNumber = ev;
                    break;
                case 4:
                    event = this.rollOnTableA(ev);
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev);
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev);
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            switch (table) {
                case 1:
                case 2:
                case 3:
                    event = this.rollOnNomadsTable(ev);
                    event.table = "Nomads";
                    event.eventNumber = ev;
                    break;
                case 4:
                    event = this.rollOnTableA(ev);
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev);
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev);
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else if (character.faction === Faction.Aleph && character.hasSource(Source.Aleph)) {
            switch (table) {
                case 1:
                case 2:
                case 3:
                    event = this.rollOnAlephTable(ev);
                    event.table = "ALEPH";
                    event.eventNumber = ev;
                    break;
                case 4:
                    event = this.rollOnTableA(ev);
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev);
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev);
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else {
            switch (table) {
                case 1:
                case 2:
                    event = this.rollOnTableA(ev);
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 3:
                case 4:
                    event = this.rollOnTableB(ev);
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 5:
                case 6:
                    event = this.rollOnTableC(ev);
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }

        return event;
    }

    getEvents() {
        let events: { [category: string]: AdolescenceEventModel[] } = {};

        if (character.host === AlienHost.Antipode && character.hasSource(Source.Ariadna)) {
            events["Antipode"] = [];

            for (var i = 1; i <= 20; i++) {
                let ev = this.rollOnAntipodeTable(i);
                ev.table = "Antipode";
                events["Antipode"].push(ev);
            }
        }
        else if (character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            if (character.isDogBlooded()) {
                events["Dog-Blooded"] = [];

                for (var i = 1; i <= 20; i++) {
                    let ev = this.rollOnDogfaceAndWulverTable(i);
                    ev.table = "Dog-Blooded";
                    events["Dog-Blooded"].push(ev);
                }
            }
            else {
                events["Ariadna"] = [];

                for (var i = 1; i <= 20; i++) {
                    let ev = this.rollOnAriadnaTable(i);
                    ev.table = "Ariadna";
                    events["Ariadna"].push(ev);
                }
            }
        }
        else if (character.faction === Faction.Haqqislam && character.hasSource(Source.Haqqislam)) {
            events["Haqqislam"] = [];

            for (var i = 1; i <= 20; i++) {
                let ev = this.rollOnHaqqislamTable(i);
                ev.table = "Haqqislam";
                events["Haqqislam"].push(ev);
            }
        }
        else if (character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            events["PanOceania"] = [];

            for (var i = 1; i <= 20; i++) {
                let ev = this.rollOnPanOceaniaTable(i);
                ev.table = "PanOceania";
                events["PanOceania"].push(ev);
            }
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            events["Nomads"] = [];

            for (var i = 1; i <= 20; i++) {
                let ev = this.rollOnNomadsTable(i);
                ev.table = "Nomads";
                events["Nomads"].push(ev);
            }
        }

        events["A"] = [];
        events["B"] = [];
        events["C"] = [];

        for (var i = 1; i <= 20; i++) {
            let ev = this.rollOnTableA(i);
            ev.table = "A";
            events["A"].push(ev);
        }

        for (var i = 1; i <= 20; i++) {
            let ev = this.rollOnTableB(i);
            ev.table = "B";
            events["B"].push(ev);
        }

        for (var i = 1; i <= 20; i++) {
            let ev = this.rollOnTableC(i);
            ev.table = "C";
            events["C"].push(ev);
        }

        return events;
    }

    private rollOnTableA(roll: number) {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "You contracted an alien disease, spore, or macrovirus. It has been forced into remission but only a constant regimen of medication keeps it tame. It doesn’t appear to be infectious (yet). You have a symbiotic organism attached to you that looks like a bad rash. It grants 1 bonus Momentum for Observation tests to determine whether there is anyone hidden within close range, but increases the difficulty of all social tests by 1 step",
                    "Alien Typhoid",
                    "You have a symbiotic organism attached to you that looks like a bad rash. It grants 1 bonus Momentum for Observation tests to determine whether there is anyone hidden within close range, but increases the difficulty of all social tests by 1 step"));
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "You were seriously injured and died on the operating table. You were resuscitated but your Cube had a manufacturer’s glitch and memories/episodes of a Maya ever-caster became merged with your own. Gain 1 asset in compensation and a new Youth Event. One of your Youth Events is a fake",
                    "Dual Identity",
                    "You were seriously injured and died on the operating table. You were resuscitated but your Cube had a manufacturer’s glitch and memories/episodes of a Maya ever-caster became merged with your own. One of your Youth Events is a fake."),
                    () => {
                        character.assets++;

                        var youthEvent = YouthEventsHelper.generateEvent();
                        while (youthEvent.description === character.youthEvent.description) {
                            youthEvent = YouthEventsHelper.generateEvent();
                        }

                        character.youthEvent.description += "; " + youthEvent.description;
                    });
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "While they were on a journey, your sibling vanished. No one has ever discovered what happened to them, but you’ve been obsessed with figuring it out. Gain 1 rank in Analysis.",
                    "Missing Sibling",
                    "While they were on a journey, your sibling vanished. No one has ever discovered what happened to them, but you’ve been obsessed with figuring it out.",
                    "IncreaseAnalysis"));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "A stranger visited your home and spoke in hushed tones with a family member. What did they talk about? Your family's surname is infamous amongst society’s elite. Your Social tests amongst them are increased in difficulty by 1 step.",
                    "Shady Past",
                    "Your family's surname is infamous amongst society’s elite. Your Social tests amongst them are increased in difficulty by 1 step."));
            case 5:
                if (character.faction === Faction.Aleph)
                    return this.generateEvent();

                return new AdolescenceEventModel(new EventModel(
                    "The personality of your geist radically shifts overnight. You gradually become aware that it has become an aspect of ALEPH. You may switch your faction to ALEPH at this time. You may also choose the Bureau Toth Agent career freely for any of your career phases.",
                    "Watched by the AI",
                    "The personality of your geist radically shifts overnight. You gradually become aware that it has become an aspect of ALEPH.",
                    "DefectionALEPH"),
                    () => {
                        character.freeCareers.push(Career.BureauTothAgent);
                    });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "You ran away from home. Reduce your Social Status by 1.",
                    "Low Self-Esteem",
                    "You ran away from home."),
                    () => {
                        SocialClassesHelper.reduceSocialClass();
                    });
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "You said \"yes\" and someone you cared about got hurt. Social tests against you receive one bonus Momentum, but your openness to adventure has paid off. Gain one asset.",
                    "Weak Willed",
                    "You said \"yes\" and someone you cared about got hurt. Social tests against you receive one bonus Momentum, but your openness to adventure has paid off."));
            case 8:
                if (character.faction === Faction.Submondo)
                    return this.generateEvent();

                return new AdolescenceEventModel(new EventModel(
                    "After someone close to you was murdered, your family confessed to you that they were deeply involved in a criminal conspiracy. You may switch to the Submondo faction at this time. You may also freely choose the Criminal career for any of your career phases. You are often a suspect in police enquiries and all social tests with security or police services are 1 difficulty rank greater.",
                    "Criminal Connections",
                    "After someone close to you was murdered, your family confessed to you that they were deeply involved in a criminal conspiracy. You are often a suspect in police enquiries and all social tests with security or police services are 1 difficulty rank greater.",
                    "DefectionSubmondo"),
                    () => {
                        character.freeCareers.push(Career.Criminal);
                    });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "You are a prodigy and excelled at a particular skill from a very young age. You could have been a talented musician or a math whiz. Regardless, your talent got a lot of attention in the media before you grew out of it. Gain 1 level of Social Status or 5 assets. Alternatively, gain a contact in media, academia, or the entertainment industry.",
                    "Bitter",
                    "You were a prodigy and excelled at a particular skill from a very young age. You could have been a talented musician or a math whiz. Regardless, your talent got a lot of attention in the media before you grew out of it.",
                    "Prodigy"));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "You suffered a traumatic head injury. Reduce Intelligence by 1, but gain 1 rank of training in Discipline.",
                    "Slow Thoughts",
                    "You suffered a traumatic head injury.",
                    "IncreaseDiscipline"),
                    () => {
                        character.attributes[Attribute.Intelligence].value--;
                    });
            case 11:
                if (character.faction === Faction.Submondo)
                    return this.generateEvent();

                return new AdolescenceEventModel(new EventModel(
                    "You got mixed up with the wrong people and were involved in a serious crime. Spend 1-6 years in jail before starting your first career. Gain a Criminal Record.",
                    "Criminal Record",
                    "You got mixed up with the wrong people and were involved in a serious crime.",
                    "DefectionSubmondo"),
                    () => {
                        character.age += Math.floor(Math.random() * 6 + 1);
                        character.hasCriminalRecord = true;
                    });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "Both your parents died in a mysterious accident. You were sent to an orphanage. Reduce Social Status by one. Gain 1-6 assets from an estate left for you.",
                    "Orphan",
                    "Both your parents died in a mysterious accident. You were sent to an orphanage."),
                    () => {
                        SocialClassesHelper.reduceSocialClass();
                        character.assets += Math.floor(Math.random() * 6 + 1);
                    });
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "You became friends with a powerful and important person. Is your relationship with them still solid? If you get a 'fired' result you can ignore it, but reduce your Earnings rating by one.",
                    "Silver Spoon",
                    "You became friends with a powerful and important person. Is your relationship with them still solid?"),
                    () => {
                        character.ignoreFired = true;
                    });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "At 4am in the morning you were taken from your home. You heard shots and never saw your family again. You have a mysterious benefactor who saved you, and you grew up with family friends. Decrease your Status by one, but gain a free re-roll on a Career Event.",
                    "Lost Family",
                    "At 4am in the morning you were taken from your home. You heard shots and never saw your family again. You have a mysterious benefactor who saved you, and you grew up with family friends."),
                    () => {
                        SocialClassesHelper.reduceSocialClass();
                        character.eventRerolls++;
                    });
            case 15:
                if (character.faction === Faction.Submondo)
                    return this.generateEvent();

                return new AdolescenceEventModel(new EventModel(
                    "You messed up and were arrested for a minor crime. Spend one year in jail before starting your first career. Gain Criminal Record.",
                    "Criminal Record",
                    "You messed up and were arrested for a minor crime.",
                    "DefectionSubmondo"),
                    () => {
                        character.age++;
                        character.hasCriminalRecord = true;
                    });
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You had a terrible childhood accident. All movement related skill tests are one difficulty harder, but you have gained a strong will. All Discipline tests are one difficulty lower (minimum 1).",
                    "Disabled",
                    "You had a terrible childhood accident. All movement related skill tests are one difficulty harder, but you have gained a strong will. All Discipline tests are one difficulty lower (minimum 1)."));
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You contracted colonial wasting disease. Reduce your Vigour by 1.",
                    "Feel Every Punch",
                    "You contracted colonial wasting disease, which reduces your Vigour by 1."),
                    () => {
                        character.vigourReduction++;
                    });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Your body is intolerant to chemical substances. All Resistance tests for artificial substances are increased by 1 level of difficulty. Serum provides no bonuses.",
                    "Allergies",
                    "Your body is intolerant to chemical substances. All Resistance tests for artificial substances are increased by 1 level of difficulty. Serum provides no bonuses."));
            case 19: {
                let faction = FactionsHelper.generateFaction(false, true);
                while (faction === character.faction) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                const factionName = FactionsHelper.getFaction(faction).name; 

                return new AdolescenceEventModel(new EventModel(
                    "A woman in a conservative suit approaches you one day and reveals what really happened to someone that you loved. Then she asks what you want to do about it. You defect to the " + factionName + " faction.",
                    "Traitor",
                    "A woman in a conservative suit approaches you one day and reveals what really happened to someone that you loved. Then she asks what you want to do about it. You defect to the " + factionName + " faction."),
                    () => {
                        character.heritage = character.faction;
                        character.hasDefected = true;
                        character.faction = faction;

                        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                            character.heritageTrait = HeritageTraits.Lub;
                        }
                    });
                }
            case 20:
                if (character.isAlMustaslaha()) {
                    return new AdolescenceEventModel(new EventModel(
                        "You nearly died but was brought to life at the last minute. It seems Allah is not finished with you yet.",
                        "Near-Death Experience",
                        "You nearly died."),
                        () => {
                            character.vigourReduction += 2;
                            character.resolveReduction--;
                        });
                }
                else {
                    return new AdolescenceEventModel(new EventModel(
                        "You died. Your character died and was resurrected.",
                        "Cube Weary",
                        "You died and was resurrected.",
                        "Resurrection"),
                        () => {
                            character.applyDeath();
                        });
                }
        }

        return null;
    }

    private rollOnTableB(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "While on a spacewalk, your tether snapped and you were knocked off-station. You cannot select Extraplanetary as an elective skill in any subsequent career phase. (You can still improve it normally through other means.)",
                    "Zero-G Terror",
                    "While on a spacewalk, your tether snapped and you were knocked off-station."),
                    () => {
                        character.excludedElectiveSkills.push(Skill.Extraplanetary);
                    });
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "Volunteering for “human tests” seemed like easy money. The physical scars healed, but you’ve never really learned to control your new “gift”. Gain a MetaChemistry, but you must pass a Difficult (D3) Willpower test in order to use it.",
                    "Rogue MetaChemistry",
                    "Volunteering for “human tests” seemed like easy money. The physical scars healed, but you’ve never really learned to control your new “gift”. Gain a MetaChemistry, but you must pass a Difficult (D3) Willpower test in order to use it."));
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "You were detained by national law enforcement. Although ultimately exonerated, your records are still notated from the incident. All tests with security forces are 1 difficulty rank greater. Attempts to access classified information expand your complication range by 1 point (most likely resulting in unwanted official attention).",
                    "Stained Record",
                    "You were detained by national law enforcement. Although ultimately exonerated, your records are still notated from the incident. All tests with security forces are 1 difficulty rank greater. Attempts to access classified information expand your complication range by 1 point (most likely resulting in unwanted official attention)."));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "You joined a Maya cluster and became obsessed with the infowarrior subculture. Gain 1 rank in Hacking.",
                    "Neophile",
                    "You joined a Maya cluster and became obsessed with the infowarrior subculture.",
                    "IncreaseHacking"));
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Your parents or guardians were unexpectedly fired by their corporate employers and blacklisted. Reduce Social Status and Earnings Rating by one (minimum 0).",
                    "Rage Against the Corporation",
                    "Your parents or guardians were unexpectedly fired by their corporate employers and blacklisted."),
                    () => {
                        SocialClassesHelper.reduceSocialClass();
                        character.earnings = Math.max(character.earnings - 1, 0);
                    });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Someone witnessed you do something terrible. They’ve kept your secret, but they’ve never let you forget it. Gain a debt worth 5 Assets.",
                    "Blackmailed",
                    "Someone witnessed you do something terrible. They’ve kept your secret, but they’ve never let you forget it. You have a debt worth 5 Assets."));
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "You had an imaginary friend. Nobody else could see them, but you went on grand Maya adventures. Now you see hints of your imaginary friend when you’re online. Pick a topic that your imaginary friend was enamoured with. You gain +1d20 when making research tests on Maya regarding that topic.",
                    "Quantronic Ally",
                    "You had an imaginary friend. Nobody else could see them, but you went on grand Maya adventures. Now you see hints of your imaginary friend when you’re online. Pick a topic that your imaginary friend was enamoured with. You gain +1d20 when making research tests on Maya regarding that topic."));
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "A rogue retrovirus rewrote your genetics, causing a shift in aggression and fight/flight reactions. You fly off the handle faster than people can react. You gain +1d20 to Surprise tests in Mexican stand-offs and similar situations.",
                    "Quick with a Fist",
                    "A rogue retrovirus rewrote your genetics, causing a shift in aggression and fight/flight reactions. You fly off the handle faster than people can react. You gain +1d20 to Surprise tests in Mexican stand-offs and similar situations."));
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "Your parents or guardians became radical converts to a religion. Was your time with their church a happy one? Gain 1 rank in either Psychology or Command.",
                    "Religious Upbringing",
                    "Your parents or guardians became radical converts to a religion. Was your time with their church a happy one?",
                    "IncreasePsychology|Command"));
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "A distant family member died and unexpectedly named you their executor. Their record keeping was atrocious, though, and their old debts keep coming back to haunt you. Gain 10 Assets and a debt worth 5 Assets.",
                    "Unexpected Obligations",
                    "A distant family member died and unexpectedly named you their executor. Their record keeping was atrocious, though, and their old debts keep coming back to haunt you. You have a debt worth 5 Assets."),
                    () => {
                        character.assets += 10;
                    });
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "When you first signed up for school a network glitch merged all of your quantronic records with someone else who shares your exact name. Your Maya footprints have never been fully untangled. Persuade tests made against remote targets expand your complication range by 1 point.",
                    "Confused Identity",
                    "When you first signed up for school a network glitch merged all of your quantronic records with someone else who shares your exact name. Your Maya footprints have never been fully untangled. Persuade tests made against remote targets expand your complication range by 1 point."));
            case 12:
                {
                    var faction = FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name;
                    return new AdolescenceEventModel(new EventModel(
                        "When your first love was forced to move across the Human Sphere by their parents, you both swore to find each other one day. Gain an ally in the " + faction + " faction.",
                        "Lost Love",
                        "When your first love was forced to move across the Human Sphere by their parents, you both swore to find each other one day. You have an ally in the " + faction + " faction."));
                }
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "There was a terrible accident on the orbital you were visiting and you were badly injured due to an equipment failure. Reduce Brawn by 1 point but gain 1 rank in Extraplanetary.",
                    "Safety First",
                    "There was a terrible accident on the orbital you were visiting and you were badly injured due to an equipment failure.",
                    "IncreaseExtraplanetary"),
                    () => {
                        character.attributes[Attribute.Brawn].value--;
                    });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "You spent most of your free time as an urban spelunker, exploring the ruins and hidden places. What was the most unusual place you went? Gain 1 rank in Stealth.",
                    "Killer Curiosity",
                    "You spent most of your free time as an urban spelunker, exploring the ruins and hidden places. What was the most unusual place you went?",
                    "IncreaseStealth"));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "After finding an injured animal, you nursed it back to health. Gain 1 rank in Animal Handling.",
                    "Bleeding Heart for Animals",
                    "After finding an injured animal, you nursed it back to health.",
                    "IncreaseAnimal Handling"));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You have a relative or godparent with connections. You may reroll your first career, but must accept the new career rolled.",
                    "Annoying Family",
                    "You have a relative or godparent with connections."),
                    () => {
                        character.careerRerolls++;
                    });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You fell in with a bad crowd. Who was your worst “friend” from those days? Gain 1 rank in Thievery.",
                    "Shady Past",
                    "You fell in with a bad crowd. Who was your worst “friend” from those days?",
                    "IncreaseThievery"));
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "You tried to upgrade your geist’s software… and failed badly. Reduce Firewall by 1.",
                    "Faulty Geist",
                    "You tried to upgrade your geist’s software… and failed badly."),
                    () => {
                        character.firewallReduction++;
                    });
            case 19: {
                let faction = FactionsHelper.generateFaction(false, true);
                while (faction === character.faction) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                const factionName = FactionsHelper.getFaction(faction).name; 

                return new AdolescenceEventModel(new EventModel(
                    "You are awoken in the middle of the night by your parents and told to quickly pack a suitcase. Two days later, you’re on a new planet. You defect to the " + factionName + " faction.",
                    "True Believer",
                    "You are awoken in the middle of the night by your parents and told to quickly pack a suitcase. Two days later, you’re on a new planet. You defect to the " + factionName + " faction."),
                    () => {
                        character.heritage = character.faction;
                        character.hasDefected = true;
                        character.faction = faction;

                        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                            character.heritageTrait = HeritageTraits.Lub;
                        }
                    });
                }
            case 20:
                if (character.isAlMustaslaha()) {
                    return new AdolescenceEventModel(new EventModel(
                        "You nearly died but was brought to life at the last minute. It seems Allah is not finished with you yet.",
                        "Near-Death Experience",
                        "You nearly died."),
                        () => {
                            character.vigourReduction += 2;
                            character.resolveReduction--;
                        });
                }
                else {
                    return new AdolescenceEventModel(new EventModel(
                        "You were murdered. Your character died and was resurrected.",
                        "Paranoid",
                        "You were murdered. Your character died and was resurrected.",
                        "Resurrection"),
                        () => {
                            character.applyDeath();
                        });
                }
        }

        return null;
    }

    private rollOnTableC(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "What your family did haunts you wherever you go. Difficulty to avoid attention is 1 step higher when your true identity is known.",
                    "Infamous",
                    "What your family did haunts you wherever you go. Difficulty to avoid attention is 1 step higher when your true identity is known."));
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "While visiting a petting zoo you were bitten by one of the animals. When making Animal Handling tests, expand your complication range by 1 point.",
                    "Animal Hatred",
                    "While visiting a petting zoo you were bitten by one of the animals. When making Animal Handling tests, expand your complication range by 1 point."));
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "You became a local champion in your sport of choice. There was talk about taking it to the next level. Did you? Or did something happen to cut your career short. Gain 1 rank in Acrobatics.",
                    "Nagging Injury",
                    "You became a local champion in your sport of choice. There was talk about taking it to the next level. Did you? Or did something happen to cut your career short.",
                    "IncreaseAcrobatics"));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "Your flight crashed out on the frontier. It was weeks before the rescue teams found you. Gain 1 rank in Survival.",
                    "Survivor's Guilt",
                    "Your flight crashed out on the frontier. It was weeks before the rescue teams found you.",
                    "IncreaseSurvival"));
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Either you or your partner became pregnant. Gain a debt worth 3 Assets.",
                    "Dependent",
                    "Either you or your partner became pregnant. You have a debt worth 3 Assets."));
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Once you were exposed to the writings of a political ideologue, you became obsessed with their vision of what the Human Sphere should be. Choose a new faction of your choice.",
                    "Disillusioned",
                    "Once you were exposed to the writings of a political ideologue, you became obsessed with their vision of what the Human Sphere should be.",
                    "DefectionChoice"));
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "You decided to pursue a second degree. Gain 1 rank in Education and add 1-6 years to your age.",
                    "Studious",
                    "You decided to pursue a second degree.",
                    "IncreaseEducation"),
                    () => {
                        character.age += Math.floor(Math.random() * 6) + 1;
                    });
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "An unexpected boon, random chance, or personal merit allowed you to transfer into an elite training academy. Increase your Social Status by 1.",
                    "Overconfident",
                    "An unexpected boon, random chance, or personal merit allowed you to transfer into an elite training academy."),
                    () => {
                        SocialClassesHelper.increaseSocialClass();
                    });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "It was just a minor invention, but it exploded in popularity. Did you sell out or did it just fade away as a seasonal fad? Gain 10 Assets.",
                    "Mad Tinkerer",
                    "It was just a minor invention, but it exploded in popularity. Did you sell out or did it just fade away as a seasonal fad?"),
                    () => {
                        character.assets += 10;
                    });
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Someone dear to you died in a hull breach. You couldn’t do anything to save them. Gain 1 rank in Extraplanetary.",
                    "Vacuum Phobia",
                    "Someone dear to you died in a hull breach. You couldn’t do anything to save them.",
                    "IncreaseExtraplanetary"));
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "You spent a summer painstakingly restoring a classic car (or other vehicle). Gain the 'Greasemonkey' talent from the Tech skill talent tree.",
                    "Nostalgia Freak",
                    "You spent a summer painstakingly restoring a classic car (or other vehicle)."),
                    () => {
                        character.addTalent("Greasemonkey");
                    });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "It can be argued that the accident wasn’t your fault, but the courts didn’t see it that way. Gain a debt worth 10 Assets.",
                    "Careless",
                    "It can be argued that the accident wasn’t your fault, but the courts didn’t see it that way. You have a debt worth 10 Assets."));
            case 13:
                if (character.faction === Faction.Submondo)
                    return this.generateEvent();

                return new AdolescenceEventModel(new EventModel(
                    "You were framed for a crime you didn’t commit. Who framed you? What did they do? Spend 1-6 years in jail before starting your first career. Gain a criminal record.",
                    "Criminal Record",
                    "You were framed for a crime you didn’t commit. Who framed you? What did they do? You have spent time in jail and have a criminal record.",
                    "DefectionSubmondo"),
                    () => {
                        character.age += Math.floor(Math.random() * 6) + 1;
                        character.hasCriminalRecord = true;
                    });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "It took two years, but you did the training and successfully completed one of the Planetary Ironmen competitions. Gain 1 rank in Athletics.",
                    "Tenacious",
                    "It took two years, but you did the training and successfully completed one of the Planetary Ironmen competitions",
                    "IncreaseAthletics"));
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "A stranger came to the house and left a package for you. What is so important about it? How will you know when to open it? You gain a package worth 5 assets that you must never lose. You do not know what is inside. Decide when you will know whether to open the package.",
                    "Unwanted Heritage",
                    "A stranger came to the house and left a package for you. What is so important about it? How will you know when to open it? You gain a package worth 5 assets that you must never lose. You do not know what is inside. Decide when you will know whether to open the package."));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You spent half a year on a field study. How far did you go? Who ran the study? Gain 1 rank in Science.",
                    "Neuroticism",
                    "You spent half a year on a field study. How far did you go? Who ran the study?",
                    "IncreaseScience"));
            case 17:
                if (character.faction === Faction.O12)
                    return this.generateEvent();

                return new AdolescenceEventModel(new EventModel(
                    "Your best friend joined the military. And then he was killed. You realized all this jingoism doesn’t make any sense. You may switch your faction to O-12 at this time.",
                    "Judicious",
                    "Your best friend joined the military. And then he was killed. You realized all this jingoism doesn’t make any sense.",
                    "DefectionO-12"));
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "You were kidnapped and tortured. Why? Reduce Resolve by 1.",
                    "Skittish",
                    "You were kidnapped and tortured. Why?"),
                    () => {
                        character.resolveReduction++;
                    });
            case 19: {
                let faction = FactionsHelper.generateFaction(false, true);
                while (faction === character.faction) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                const factionName = FactionsHelper.getFaction(faction).name; 

                return new AdolescenceEventModel(new EventModel(
                    "Your first real job took you to a new planet. It felt like home. You defect to the " + factionName + " faction. You may choose to roll on that faction's career table for your first career at no cost.",
                    "Laissez Faire",
                    "Your first real job took you to a new planet. It felt like home. You defect to the " + factionName + " faction."),
                    () => {
                        character.heritage = character.faction;
                        character.hasDefected = true;
                        character.faction = faction;
                        character.freeFactionCareerRoll++;

                        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                            character.heritageTrait = HeritageTraits.Lub;
                        }
                    });
                }
            case 20:
                if (character.isAlMustaslaha()) {
                    return new AdolescenceEventModel(new EventModel(
                        "You nearly died but was brought to life at the last minute. It seems Allah is not finished with you yet.",
                        "Near-Death Experience",
                        "You nearly died."),
                        () => {
                            character.vigourReduction += 2;
                            character.resolveReduction--;
                        });
                }
                else {
                    return new AdolescenceEventModel(new EventModel(
                        "You committed suicide. Your character died and was resurrected.",
                        "Suicidal",
                        "You committed suicide. Your character died and was resurrected.",
                        "Resurrection"),
                        () => {
                            character.applyDeath();
                        });
                }
        }

        return null;
    }

    private rollOnAriadnaTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "A surprise Antipode attack nearly claimed your life — until you picked up a weapon and fought back. Gain 1 rank in either Ballistics or Close Combat.",
                    "Survivor",
                    "A surprise Antipode attack nearly claimed your life — until you picked up a weapon and fought back.",
                    "IncreaseBallistics|Close Combat"),
                    () => {
                    });
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "You were stranded on the frontier with for a solid month with no aid. By the time they found you, you'd already identified which mushrooms were poisonous — the hard way. Gain 1 rank in Survival, but suffer +1 complication range on Resistance tests to resist poison.",
                    "Grizzled",
                    "You were stranded on the frontier with for a solid month with no aid. By the time they found you, you'd already identified which mushrooms were poisonous — the hard way. +1 complication range on Resistance tests to resist poison.",
                    "IncreaseSurvival"),
                    () => {
                    });
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "A dying soldier entrusted you with their unfinished business. Gain 1 rank in Discipline.",
                    "Weight of the World",
                    "A dying soldier entrusted you with their unfinished business.",
                    "IncreaseDiscipline"),
                    () => {
                    });
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "When the dust settled, you were the only one left alive. How? And why? Gain 1 rank in Survival, but reduce Earnings by 1 (minimum 0).",
                    "Sole Survivor",
                    "When the dust settled, you were the only one left alive. How? And why?",
                    "IncreaseSurvival"),
                    () => {
                        character.earnings = Math.max(0, character.earnings - 1);
                    });
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "You suffered a terrible childhood accident. All movement-related skill tests suffer +1 difficulty, but you have gained a strong will; reduce the difficulty of all Discipline tests by 1 (to a minimum of 1).",
                    "Disabled",
                    "All movement-related skill tests suffer +1 difficulty, but you have gained a strong will; reduce the difficulty of all Discipline tests by 1 (to a minimum of 1).",
                    ""),
                    () => {
                    });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "You got involved in underground fight clubs at an early age. Gain 1 rank in Close Combat, but gain a 1 Asset debt representing medical bills.",
                    "Street Fighter",
                    "You got involved in underground fight clubs at an early age. Gain a 1 Asset debt representing medical bills.",
                    "IncreaseClose Combat"),
                    () => {
                    });
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "You were stranded in the wilderness for an extended time. Gain 1 rank in either Animal Handling or Survival, but add +1 to the complication range on Personality-based tests.",
                    "Raised in a Barn",
                    "You were stranded in the wilderness for an extended time. Add +1 to the complication range on Personality-based tests.",
                    "IncreaseAnimal Handling|Survival"),
                    () => {
                    });
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    `Facing the consequences of crimes you most assuredly did commit, someone offered to make it all go away. Did you let them? If so, what was the cost? Either spend 1-6 years in jail before starting your first career, and gain a Criminal Record — or gain a debt of 1-10 Assets, and 1 rank of Thievery.`,
                    "It Takes One to Know One",
                    "Facing the consequences of crimes you most assuredly did commit, someone offered to make it all go away. Did you let them? If so, what was the cost?",
                    "JailOrDebt"),
                    () => {
                    });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "You found success as part of a Hiraeth Culture musical act. You handled the instant celebrity as well as can be expected — that is to say, poorly. You're often recognized in the street; not just in Ariadna, but across the Human Sphere. Choose a drug — you begin play at that drug's addiction threshold, and with 1-6 doses in your possession. Additionally, reduce the difficulty of all Lifestyle tests by 1 (to a minimum of 0).",
                    "Rockstar",
                    "You found success as part of a Hiraeth Culture musical act. You handled the instant celebrity as well as can be expected — that is to say, poorly. You're often recognized in the street; not just in Ariadna, but across the Human Sphere.",
                    "Rockstar"),
                    () => {
                    });
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "Trapped in a dire situation, you didn't see a way out — until the 112 rescued you. You've been enamored with them ever since. Gain +1 rank in Medicine, and you may choose 112 Emergency Responder as your first career.",
                    "Spirit of the 112",
                    "Trapped in a dire situation, you didn't see a way out — until the 112 rescued you. You've been enamored with them ever since.",
                    "IncreaseMedicine"),
                    () => {
                        character.freeCareers.push(Career.EmergencyResponder);
                    });
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "You spent some time in the Helios orbitals — it didn't suit you at all. Increase the complication range of Extraplanetary tests by 1.",
                    "Astrophobia",
                    "You spent some time in the Helios orbitals — it didn't suit you at all. Increase the complication range of Extraplanetary tests by 1.",
                    ""),
                    () => {
                    });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "An accident left you needing cybernetic replacements; but the local clinic had to make do with what was on hand. Your aug has some quirks, but you've learned how to squeeze the most out of it. You have a cybernetic arm or leg. Increase the Maintenance cost by +1, but add one bonus Momentum on successful tests made with the limb.",
                    "Cybered-Up",
                    "An accident left you needing cybernetic replacements; but the local clinic had to make do with what was on hand. Your aug has some quirks, but you've learned how to squeeze the most out of it. You have a cybernetic arm or leg. Increase the Maintenance cost by +1, but add one bonus Momentum on successful tests made with the limb.",
                    ""),
                    () => {
                    });
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "True or not, your family is believed to have betrayed Ariadna during the Commercial Conflicts. Now that you've come of age, that stigma is yours to bear. Social skill tests with fellow Ariadnans suffer a +2 complication range.",
                    "Infamous Lineage",
                    "True or not, your family is believed to have betrayed Ariadna during the Commercial Conflicts. Now that you've come of age, that stigma is yours to bear. Social skill tests with fellow Ariadnans suffer a +2 complication range.",
                    ""),
                    () => {
                    });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "By yourself, or as part of Dog Nation, Caledonian Independence, or something more sinister — you raged against the system. Gain +1 Morale Soak against authority figures.",
                    "Rebel",
                    "By yourself, or as part of Dog Nation, Caledonian Independence, or something more sinister — you raged against the system. Gain +1 Morale Soak against authority figures.",
                    ""),
                    () => {
                    });
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "You were entrusted with a weapon that's seen real use. It's seen better days, but you know you can rely on it. When using this weapon, you may roll an additional 1[CD], but you suffer +1 complication range.",
                    "Heirloom Weapon",
                    "You were entrusted with a weapon that's seen real use. It's seen better days, but you know you can rely on it. When using this weapon, you may roll an additional 1[CD], but you suffer +1 complication range.",
                    "HeirloomWeapon"),
                    () => {
                    });
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You got burned once. You vowed not to let it happen twice. Gain +1 rank in Discipline, but suffer +3 complication range on all social skill tests related to positive or pleasant interactions.",
                    "Sardonic",
                    "You got burned once. You vowed not to let it happen twice. Suffer +3 complication range on all social skill tests related to positive or pleasant interactions.",
                    "IncreaseDiscipline"),
                    () => {
                    });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You were fortunate enough to get a real, Ariadnan weapon at an early age; nothing else feels quite right in your hands. Acquire one of the following: Americolt Eagle, Ojotnik, or Teseum Hatchet. Suffer +1 complication range when using other weapons.",
                    "Brand Loyalist",
                    "You were fortunate enough to get a real, Ariadnan weapon at an early age; nothing else feels quite right in your hands. Suffer +1 complication range when using other weapons than your chosen weapon.",
                    "BrandLoyalist"),
                    () => {
                    });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "An early event left you with a taste for adventure. Add 1 to your Resolve Stress track.",
                    "Pioneer Spirit",
                    "An early event left you with a taste for adventure.",
                    ""),
                    () => {
                        character.resolveReduction--;
                    });
            case 19: {
                let faction = FactionsHelper.generateFaction(false, true);
                while (faction === character.faction) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                const factionName = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `You were awoken in the middle of the night and told to pack your things. Two days later, your old home was a scorch mark, and you were on a new planet. You defect to ${factionName}.`,
                    "Paranoid",
                    `You were awoken in the middle of the night and told to pack your things. Two days later, your old home was a scorch mark, and you were on a new planet. You defect to ${factionName}.`,
                    ""),
                    () => {
                        character.heritage = character.faction;
                        character.hasDefected = true;
                        character.faction = faction;
                        character.freeFactionCareerRoll++;

                        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                            character.heritageTrait = HeritageTraits.Lub;
                        }
                    });
            }
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "You should have died; but you didn’t. Plenty of Ariadnans don’t believe in luck. But maybe it believes in you. Gain +1 Infinity Point Refresh (maximum 4).",
                    "Lucky",
                    "You should have died; but you didn’t. Plenty of Ariadnans don’t believe in luck. But maybe it believes in you.",
                    ""),
                    () => {
                        character.infinityPoints++;
                    });
        }

        return null;
    }

    private rollOnAntipodeTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "You contracted a strange human disease. While it does nothing to Antipodes, you’re highly infectious to humans. When attacking a human target, your claws gain the Biotech quality.",
                    "Plague Rat",
                    "When attacking a human target, your claws gain the Biotech quality."));
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "Antipode mental structures are resistant to change, but yours proves especially stubborn. The XP cost of purchasing skills or talents you don’t already have a rank in is increased by +200 XP.",
                    "Traditionalist",
                    "The XP cost of purchasing skills or talents you don’t already have a rank in is increased by +200 XP."));
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Your Trinary coalesces well; warts and all. Double the XP cost of gaining or removing character traits.",
                    "Stubborn",
                    "Double the XP cost of gaining or removing character traits."));
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "You are kidnapped, and experimented on. While the process is unpleasant, your insides are downright Silken. You may ignore the cost increase for Silk Augmentations.",
                    "Test Subject",
                    "You may ignore the cost increase for Silk Augmentations."));
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Another member of your Trinary suffered a traumatic head injury. Reduce Personality by 1, but gain 1 rank of training in Discipline.",
                    "Fuzzy Link",
                    "Another member of your Trinary suffered a traumatic head injury.",
                    "IncreaseDiscipline"),
                    () => { character.attributes[Attribute.Personality].value--; });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "You suffered a traumatic head injury. Reduce Intelligence by 1, but gain 1 rank of training in Discipline.",
                    "Slow Thoughts",
                    "You suffered a traumatic head injury.",
                    "IncreaseDiscipline"),
                    () => { character.attributes[Attribute.Intelligence].value--; });
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "You contracted a strange human disease, wreaking havoc on your nervous system. It doesn’t seem to be infectious... yet. Reduce an Attribute of your choice by 1 rank.",
                    "Sickly",
                    "You contracted a strange human disease, wreaking havoc on your nervous system. It doesn’t seem to be infectious... yet.",
                    "ReduceAttribute"));
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "The rest of your Trinary is killed by Ariadnans. You were accepted into a new one, but you’ll always bear the scars of the old. Reduce Personality by 1, but gain 1 rank each in Close Combat and Survival.",
                    "Vengeful",
                    "The rest of your Trinary is killed by Ariadnans. You were accepted into a new one, but you’ll always bear the scars of the old.",
                    "IncreaseAllClose Combat|Survival"),
                    () => { character.attributes[Attribute.Personality].value--; });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "You have a violent reaction to some human chemicals; it seems like you’re allergic to everything. Resistance tests for substances are one difficulty higher.",
                    "Allergies",
                    "Resistance tests for substances are one difficulty higher."));
            case 10: {
                const damage = DiceRoller.rollSpecial(2, 1);

                return new AdolescenceEventModel(new EventModel(
                    `Your Trinary tried some human drugs. While no one died, valuable lessons were learned this day. Artificial stimulants inflict ${damage.hits} Vigour damage to you, but otherwise work normally.`,
                    "Bad Reactions",
                    "Your Trinary tried some human drugs. While no one died, valuable lessons were learned this day."),
                    () => { character.vigourReduction += damage.hits; });
            }
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "You fought alongside a legendary warlord. Increase your Vigour and Resolve by 1.",
                    "Warlike",
                    "You fought alongside a legendary warlord."),
                    () => {
                        character.vigourReduction--;
                        character.resolveReduction--;
                    });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "On a raid, your Trinary manages to infect a human woman with the Cuckoo virus; She’s after blood and so’s her family. Increase your resolve by 1.",
                    "Deadly Enemies",
                    "On a raid, your Trinary manages to infect a human woman with the Cuckoo virus; She’s after blood and so’s her family."),
                    () => { character.resolveReduction--; });
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "You spend most of your formative years hunting; sneaking up on you is difficult. You gain +2d20 to Surprise tests.",
                    "Hair-Trigger",
                    "You gain +2d20 to Surprise tests."));
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "One of your parents showed up at the head of an Ariadnan Assault Pack. Reduce your resolve by 1.",
                    "Traitor's Blood",
                    "One of your parents showed up at the head of an Ariadnan Assault Pack."),
                    () => { character.resolveReduction++; });
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "You get your hands on some human technology. After a lot of trial and error, you think you’ve got it figured out. Mostly. Choose one category of modern gear (vehicles, firearms, etc.). You do not suffer increased difficulty when using items of that type.",
                    "Dangerously Curious",
                    "",
                    "SelectItemType"));
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Deep into human territory, you evaded patrols for months at a time. Gain 1 rank in Stealth.",
                    "Overconfident",
                    "Deep into human territory, you evaded patrols for months at a time.",
                    "IncreaseStealth"));
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "Your Trinary cultivated a relationship with some typically-dangerous wildlife. Gain 1 rank in Animal Handling.",
                    "Overly Trusting",
                    "Your Trinary cultivated a relationship with some typically-dangerous wildlife.",
                    "IncreaseAnimal Handling"));
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "The humans never spotted you, but you weren’t there to hunt. Just... watch. Gain 1 rank in Psychology.",
                    "Easily Fascinated",
                    "The humans never spotted you, but you weren’t there to hunt. Just… watch.",
                    "IncreasePsychology"));
            case 19:
                return new AdolescenceEventModel(new EventModel(
                    "While out scouting, your pack was wiped out. Your Trinary is all that remains. Increase your Resolve by 3, and gain an Ariadnan enemy.",
                    "Sole Survivors",
                    "While out scouting, your pack was wiped out. Your Trinary is all that remains. Gain an Ariadnan enemy."),
                    () => { character.resolveReduction -= 3; });
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "Your Trinary link is violently severed. While in Mind-Shock, you’re taken in by a group of humans who nurse you back to health, though their reasons are hardly benevolent. You must take Assault Pack Member as your first career.",
                    "Slave",
                    "Your Trinary link is violently severed. While in Mind-Shock, you’re taken in by a group of humans who nurse you back to health, though their reasons are hardly benevolent."),
                    () => { character.firstCareer = Career.AssaultPackMember; });
        }

        return null;
    }

    private rollOnDogfaceAndWulverTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "Determined to show there’s no correlation between the Cuckoo virus and intelligence, a scientist takes you on as their intern. Gain 1 rank in Science.",
                    "Reckless Curiosity",
                    "Determined to show there’s no correlation between the Cuckoo virus and intelligence, a scientist takes you on as their intern.",
                    "IncreaseScience"));
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "You contracted an alien disease, but suffered no consequences yourself. The same cannot be said for your peers. You are considered Inured to Disease.",
                    "Alien Typhoid",
                    "You contracted an alien disease, but suffered no consequences yourself. The same cannot be said for your peers. You are considered Inured to Disease."));
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "You ran away, opting for frontier life. Reduce your Earnings by 1.",
                    "Lone Wolf",
                    "You ran away, opting for frontier life."),
                    () => { character.earnings = Math.max(0, character.earnings - 1); });
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "You were killed in the prime of your youth, bravely defending Ariadna from galactic antagonists. At least, that's the official story — you’re still very much alive. What happened? Why the ruse? Gain one level of Social Status, and a debt worth 5 Assets. You may change your faction to O-12 at this time.",
                    "Non-Entity",
                    "You were killed in the prime of your youth, bravely defending Ariadna from galactic antagonists. At least, that's the official story — you’re still very much alive. What happened? Why the ruse? You have a debt worth 5 Assets.",
                    "DefectionO-12"),
                    () => { SocialClassesHelper.increaseSocialClass(); });
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "You inadvertently destroyed a storefront. Gain a debt worth 7 Assets.",
                    "Bull in a China Shop",
                    "You inadvertently destroyed a storefront. Gain a debt worth 7 Assets."));
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "The Loup-Garou are hunting you. What do they think you did? And did you? Reduce Social Status by 1.",
                    "Hunted",
                    "The Loup-Garou are hunting you. What do they think you did? And did you?"),
                    () => { SocialClassesHelper.reduceSocialClass(); });
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Your transport wrecked, leaving you stranded on the frontier. If not for the timely intervention of a Forest Ranger, you surely would have died out there. Gain +1 rank in Survival, and you may choose Forest Ranger as your first career.",
                    "Snakebitten",
                    "Your transport wrecked, leaving you stranded on the frontier. If not for the timely intervention of a Forest Ranger, you surely would have died out there.",
                    "IncreaseSurvival"),
                    () => { character.freeCareers.push(Career.ForestRanger); });
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Your first Dog Nation rally ended in a riot, and with you spending the night in jail. Did you do what they said you did? And did you ever go back? Gain a debt worth 1 Asset, and you may choose Dog Nation Activist as your first Career.",
                    "Rabble-Rouser",
                    "Your first Dog Nation rally ended in a riot, and with you spending the night in jail. Did you do what they said you did? And did you ever go back? Gain a debt worth 1 Asset."),
                    () => { character.freeCareers.push(Career.DogNationActivist); });
            case 9:
                return new AdolescenceEventModel(new EventModel(
                    "You spent your summer working at a career fair for young Ariadnans. You got along better than anyone anticipated. You may hazard one career from the Ariadna Faction -1 difficulty.",
                    "Backroom Politicker",
                    "You spent your summer working at a career fair for young Ariadnans. You got along better than anyone anticipated."),
                    () => { character.hazardDecrease++; });
            case 10: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `You didn’t do it. But you saw who did. What did you wind up doing time for? And what became of the true culprit? Spend ${years} years in jail before starting your first career. Gain a Criminal Record.`,
                    "The Usual Suspect",
                    "You didn’t do it. But you saw who did. What did you wind up doing time for? And what became of the true culprit?"),
                    () => {
                        character.age += years;
                        character.hasCriminalRecord = true;
                    });
            }
            case 11: {
                const years = Math.floor(Math.random() * 11) + 2;

                return new AdolescenceEventModel(new EventModel(
                    `You killed someone. How did it happen, and why did you do it? And what caused you to be set free? Spend ${years} years in jail before starting your first career. Gain a Criminal Record. You may switch to the Submondo Faction at this time, if you so choose.`,
                    "Cold-Blooded Killer",
                    "You killed someone. How did it happen, and why did you do it? And what caused you to be set free?",
                    "DefectionSubmondo"),
                    () => {
                        character.age += years;
                        character.hasCriminalRecord = true;
                    });
            }
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "You went to space. It was... breathtaking. Gain 1 rank in Extraplanetary.",
                    "Restless",
                    "You went to space. It was... breathtaking.",
                    "IncreaseExtraplanetary"));
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "Even with the massive time handicap, you still won the Mat’ Triathlon. Gain 1 rank in Athletics.",
                    "Relentless",
                    "Even with the massive time handicap, you still won the Mat’ Triathlon.",
                    "IncreaseAthletics"));
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "An Antipode appeared outside your window one night. Before he was gunned down, you knew; he was your “father,” in a sense. Trying to kill you was his last action. Reduce your Resolve by 1.",
                    "Between Two Worlds",
                    "An Antipode appeared outside your window one night. Before he was gunned down, you knew; he was your “father,” in a sense. Trying to kill you was his last action."),
                    () => { character.resolveReduction++; });
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "You were a local Dog-Bowl legend; there was talk about going pro. Did you? Or did something happen to keep you out? Gain 1 rank in Acrobatics, and you may choose Dog-Bowl player as your first career.",
                    "Showboat",
                    "You were a local Dog-Bowl legend; there was talk about going pro. Did you? Or did something happen to keep you out?",
                    "IncreaseAcrobatics"),
                    () => { character.freeCareers.push(Career.DogBowlPlayer); });
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Your jaw grows in a little too well. You don’t look any more fearsome, but your speech is sometimes hard to understand. Increase the difficulty of all Personality-based tests that are not based on intimidation by 1.",
                    "Monstrous",
                    "Increase the difficulty of all Personality-based tests that are not based on intimidation by 1."));
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You experimented with some new drugs; this was an objectively terrible idea. The damage was permanent, but at least you made some new friends. Reduce Intelligence by 1. You may choose Volk as your first career.",
                    "Burnout",
                    "You experimented with some new drugs; this was an objectively terrible idea. The damage was permanent, but at least you made some new friends."),
                    () => {
                        character.attributes[Attribute.Intelligence].value--;
                        character.freeCareers.push(Career.Volk);
                    });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Fed up with life, society, and Ariadna itself, you walked into the Antipodean wilds. Why? And how did you survive? Gain 1 rank in Survival.",
                    "Savage",
                    "Fed up with life, society, and Ariadna itself, you walked into the Antipodean wilds. Why? And how did you survive?",
                    "IncreaseSurvival"));
            case 19: {
                var faction = FactionsHelper.generateFaction(false, true);
                while (faction === Faction.Ariadna) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                var factionName = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `During an Antipode attack, instead of protecting you, the local militia gunned you down without warning. You — and everyone else — assumed that you were dead. Instead, you woke up in a strange place. It was then that your family came clean. You defect to the ${factionName} faction. You may roll on your new faction’s career table for your first career at no cost.`,
                    "Turncoat",
                    "During an Antipode attack, instead of protecting you, the local militia gunned you down without warning. You — and everyone else — assumed that you were dead. Instead, you woke up in a strange place. It was then that your family came clean."),
                    () => {
                        character.heritage = character.faction;
                        character.faction = faction;
                        character.freeFactionCareerRoll++;
                    });
            }
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "You should have died; but you didn’t. Dog-Blooded usually have rotten luck. Maybe you’re the exception. Maybe not.",
                    "Strange Luck",
                    "You should have died; but you didn’t. Dog-Blooded usually have rotten luck. Maybe you’re the exception. Maybe not."),
                    () => { character.infinityPoints = Math.min(4, character.infinityPoints + 1); });
        }

        return null;
    }

    private rollOnHaqqislamTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1:
                return new AdolescenceEventModel(new EventModel(
                    "Even though it cost you most of your friends, you stood by your beliefs. Reduce Personality by 1 but increase Willpower by 1.",
                    "Stubborn",
                    "Even though it cost you most of your friends, you stood by your beliefs."),
                    () => {
                        character.attributes[Attribute.Personality].value--;
                        character.attributes[Attribute.Willpower].value++;
                    });
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "So what if there was a sandstorm? Your friend needed an antivenom, and you were determined to see that they got it. Increase Resolve by 1 rank.",
                    "Sãlik!",
                    "So what if there was a sandstorm? Your friend needed an antivenom, and you were determined to see that they got it."),
                    () => { character.resolveReduction--; });
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "The Mutazilite and Tasawwuf aren’t oppositional; even so, you found yourself strongly drawn to one over the other. Gain 1 rank in Analysis.",
                    "Unbalanced",
                    "The Mutazilite and Tasawwuf aren’t oppositional; even so, you found yourself strongly drawn to one over the other",
                    "IncreaseAnalysis"),
                    () => { });
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "You wake up to find your parents left in the middle of the night; you’re told they defected. Your Status becomes Al-Mustaslaha.",
                    "Divided Loyalties",
                    "You wake up to find your parents left in the middle of the night; you’re told they defected."),
                    () => { character.socialClass = SocialClass.AlMustaslaha_Orphaned; });
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    `Maybe you knew what you were getting into, maybe not; either way, you were caught helping a Silk smuggling ring, and the authorities were not amused. Either spend 1-6 years in jail and gain a Criminal Record, or gain a 10 Asset debt.`,
                    "It Takes One To Know One",
                    "Maybe you knew what you were getting into, maybe not; either way, you were caught helping a Silk smuggling ring, and the authorities were not amused.",
                    "JailOrDebtHaqqislam"),
                    () => { });
            case 6:
                return new AdolescenceEventModel(new EventModel(
                    "Your logical mind attracts a prominent Mutazilite mentor. Gain 1 rank in Education and your new mentor as a contact.",
                    "Bookworm",
                    "Your logical mind attracts a prominent Mutazilite mentor. You gain your new mentor as a contact.",
                    "IncreaseEducation"),
                    () => { });
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Trying to meet your mentor’s expectations, you wound up hospitalized for a year. What happened? Reduce Vigour by 1 but gain 1 rank in Discipline.",
                    "Crushing Expectations",
                    "Trying to meet your mentor’s expectations, you wound up hospitalized for a year. What happened?",
                    "IncreaseDiscipline"),
                    () => { character.vigourReduction++; });
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Flaunting conventional interpretations of taharah , you underwent radical body modification. Why did you do it? Gain Cosmetic Augmentation 2.",
                    "Rebel",
                    "Flaunting conventional interpretations of taharah , you underwent radical body modification. Why did you do it?"),
                    () => { character.addEquipment("Cosmetic Augmentation 2"); });
            case 9: {
                const cost = DiceRoller.rollSpecial(5, 5).hits;

                return new AdolescenceEventModel(new EventModel(
                    `A routine run-in with a Funduq Viper nearly proved fatal, but at least it highlighted your condition. Reduce Vigour by 1 and add +1 Momentum to all damage from Contagions. Bolstering your immune system is possible, but expensive; it will cost ${cost} Assets to reverse the effects.`,
                    "Weak Immune System",
                    `A routine run-in with a Funduq Viper nearly proved fatal, but at least it highlighted your condition. Add +1 Momentum to all damage from Contagions. Bolstering your immune system is possible, but expensive; it will cost ${cost} Assets to reverse the effects.`),
                    () => { character.vigourReduction++; });
            }
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "A school trip to the University of Medina captured your imagination. You may choose Academic as your first career.",
                    "Insatiably Curious",
                    "A school trip to the University of Medina captured your imagination."),
                    () => { character.freeCareers.push(Career.Academic); });
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "While at a caravanserai, you witnessed a serious hack. What happened? Who was responsible? Either gain 1 in Hacking or increase your geist's Firewall by 2.",
                    "Paranoid",
                    "While at a caravanserai, you witnessed a serious hack. What happened? Who was responsible?",
                    "ImproveHackingOrGeist"),
                    () => { });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "Your insightful nature attracts the attention of the Haqq Tasawwuf. Gain 1 rank in Analysis and your new mentor as contact.",
                    "Free Spirit",
                    "Your insightful nature attracts the attention of the Haqq Tasawwuf. You gain your new mentor as a contact.",
                    "IncreaseAnalysis"),
                    () => { });
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "You were stabbed in the back; possibly literally. Gain 1 rank in Psychology.",
                    "Trust Issues",
                    "You were stabbed in the back; possibly literally.",
                    "IncreasePsychology"),
                    () => { });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "One of your mentors is murdered. Their family suspects Hassassins, the Muhafiz are questioning PanOceania, and the Nomads blame ALEPH, though no one asked you. Only you know the truth. What is it? Increase Resolve by 1.",
                    "Vengeful",
                    "One of your mentors is murdered. Their family suspects Hassassins, the Muhafiz are questioning PanOceania, and the Nomads blame ALEPH, though no one asked you. Only you know the truth. What is it?"),
                    () => { character.resolveReduction--; });
            case 15: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `Chasing thrills, you snuck out to a Thronging. Turns out, drag races weren’t the worst they got up to. You spend ${years} years in jail and gain a Criminal Record. You may choose Kum Ganger as your first career.`,
                    "Friends in Low Places",
                    `Chasing thrills, you snuck out to a Thronging. Turns out, drag races weren’t the worst they got up to. You spend ${years} years in jail and gain a Criminal Record.`),
                    () => {
                        character.age += years;
                        character.freeCareers.push(Career.KumGanger);
                    });
            }
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "Disaster struck, but it missed you. You were saved by the most beautiful person you’d ever seen. Gain 1 rank in Observation. You may take Odalisque as your first career.",
                    "Wandering Eyes",
                    "Disaster struck, but it missed you. You were saved by the most beautiful person you’d ever seen.",
                    "IncreaseObservation"),
                    () => { character.freeCareers.push(Career.Odalisque); });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You’re chosen to represent your school at a competition between G-5 nations. Unfortunately, you freeze up. Your social skill tests suffer +2 complication range with members of the Haqqislam faction.",
                    "Freeze Response",
                    "Your social skill tests suffer +2 complication range with members of the Haqqislam faction."),
                    () => { });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "Your failing health is finally stabilized, but the drug cocktail interacts poorly with common treatments. Serum provides no bonuses, instead dealing 1+2[CD] damage if applied.",
                    "Myriad Medications",
                    "Your failing health is finally stabilized, but the drug cocktail interacts poorly with common treatments. Serum provides no bonuses, instead dealing 1+2[CD] damage if applied."),
                    () => { });
            case 19: {
                var newFaction = FactionsHelper.generateFaction(false, true);
                while (newFaction === character.faction) {
                    newFaction = FactionsHelper.generateFaction(false, true);
                }

                const newFactionName = FactionsHelper.getFaction(newFaction).name;

                return new AdolescenceEventModel(new EventModel(
                    `After months of debate in the Khaniqah, you finally ceded the argument. In that moment, you knew what you had to do. You defect to the ${newFactionName} faction.`,
                    "Ideologue",
                    `After months of debate in the Khaniqah, you finally ceded the argument. In that moment, you knew what you had to do. You defected to the ${newFactionName} faction.`),
                    () => {
                        character.faction = newFaction;
                        character.hasDefected = true;

                        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                            character.heritageTrait = HeritageTraits.Lub;
                        }
                    });
            }
            case 20:
                if (character.isAlMustaslaha()) {
                    return new AdolescenceEventModel(new EventModel(
                        "You sought enlightenment in Bourak’s deserts, but never returned from your pilgrimage. You were brought back from the brink of death. It seems that Allah is not done with you yet.",
                        "Blind Faith",
                        "You sought enlightenment in Bourak’s deserts, but never returned from your pilgrimage. You were brought back from the brink of death. It seems that Allah is not done with you yet."),
                        () => {
                            character.vigourReduction += 2;
                            character.resolveReduction--;
                        });
                }
                else {
                    return new AdolescenceEventModel(new EventModel(
                        "You sought enlightenment in Bourak’s deserts, but never returned from your pilgrimage. You died and was resurrected.",
                        "Blind Faith",
                        "You sought enlightenment in Bourak’s deserts, but never returned from your pilgrimage. You died and was resurrected.",
                        "Resurrection"),
                        () => { });
                }

        }

        return null;
    }

    private rollOnPanOceaniaTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1: {
                let cost = DiceRoller.rollSpecial(8, 10);

                return new AdolescenceEventModel(new EventModel(
                    `You were selected to be fitted with bleeding edge Mayacasting tech—with a few corporate strings attached. Gain Full-Sensorium Maya Integration, but your geist has become fond of advertisements. Increase your complication range by +1 due to untimely distractions. Removing the ads will cost ${cost.hits} Assets but will remove this penalty.`,
                    "Pop-Ups",
                    `Gain Full-Sensorium Maya Integration, but your geist has become fond of advertisements. Increase your complication range by +1 due to untimely distractions. Removing the ads will cost ${cost.hits} Assets but will remove this penalty.`),
                    () => { });
            }
            case 2:
                return new AdolescenceEventModel(new EventModel(
                    "You tried to modify your geist, with poor results. Reduce your geist’s Firewall by 1.",
                    "Faulty Geist",
                    "You tried to modify your geist, with poor results."),
                    () => { character.geist.firewallBonus--; });
            case 3:
                return new AdolescenceEventModel(new EventModel(
                    "Trying to meet your mentor’s expectations, you wound up hospitalized for a year. What happened? Reduce Vigour by 1 and gain 1 rank in Discipline.",
                    "Crushing Expectations",
                    "Trying to meet your mentor’s expectations, you wound up hospitalized for a year. What happened?",
                    "IncreaseDiscipline"),
                    () => { character.vigourReduction++; });
            case 4:
                return new AdolescenceEventModel(new EventModel(
                    "You tried to modify your geist, with mixed results. Reduce your geist’s Firewall by 1 but increase their Morale by 1.",
                    "Hyperactive Geist",
                    "You tried to modify your geist, with mixed results"),
                    () => {
                        character.geist.firewallBonus--;
                        character.geist.moraleBonus++;
                    });
            case 5:
                return new AdolescenceEventModel(new EventModel(
                    "Your family’s fortunes more than enabled your bad spending habits. Gain a 5 asset debt but gain 1 rank in Lifestyle.",
                    "Spendthrift",
                    "Your family’s fortunes more than enabled your bad spending habits. Gain a 5 asset debt.",
                    "IncreaseLifestyle"),
                    () => { });
            case 6: {
                let amount = DiceRoller.rollSpecial(4, 1);

                return new AdolescenceEventModel(new EventModel(
                    `You discovered an underground nightclub scene—and the party favours to go with it. You are addicted to Bounce. Begin play with ${amount.hits} doses.`,
                    "Bounce-Bunny",
                    `You have become addicted to Bounce.`),
                    () => { character.addEquipment(`Bounce (${amount.hits} Doses)`); });
            }
            case 7:
                return new AdolescenceEventModel(new EventModel(
                    "Although raised in a religious household, you began to question everything. How did this inform your beliefs? Gain 1 rank in Analysis.",
                    "Skeptic",
                    "Although raised in a religious household, you began to question everything. How did this inform your beliefs?",
                    "IncreaseAnalysis"),
                    () => { });
            case 8:
                return new AdolescenceEventModel(new EventModel(
                    "Facing the consequences of crimes you most assuredly did commit, someone offered to make it all go away. Did you let them? If so, what was the cost?",
                    "It Takes One To Know One",
                    "Facing the consequences of crimes you most assuredly did commit, someone offered to make it all go away. Did you let them? If so, what was the cost?",
                    "JailOrDebtPanO"),
                    () => { });
            case 9: {
                let debt = DiceRoller.rollSpecial(6, 1);

                return new AdolescenceEventModel(new EventModel(
                    `You tasted stardom as part of a popular children’s Maya broadcast. You handled the celebrity better than expected, but you never did learn financial restraint. People still recognize you on occasion. Gain a debt of ${debt.hits} Assets. Additionally, reduce the difficulty of all Lifestyle tests by 1 (to a minimum of 0) with individuals who recognize you.`,
                    "Former Child Star",
                    `Gain a debt of ${debt.hits} Assets. Additionally, reduce the difficulty of all Lifestyle tests by 1 (to a minimum of 0) with individuals who recognize you.`),
                    () => { });
            }
            case 10:
                return new AdolescenceEventModel(new EventModel(
                    "You had the misfortune of experiencing a Libertos attack first-hand. Separated from your family, it was hours before rescue services found you. Always looking for trouble, you may reroll 1d20 when making a surprise test but must accept the new result.",
                    "Suspicious",
                    "Always looking for trouble, you may reroll 1d20 when making a surprise test but must accept the new result."),
                    () => { });
            case 11:
                return new AdolescenceEventModel(new EventModel(
                    "You spent some time living in an orbital—it didn’t suit you at all. Increase the complication range of Extraplanetary tests by 1.",
                    "Astrophobia",
                    "You spent some time living in an orbital—it didn’t suit you at all. Increase the complication range of Extraplanetary tests by 1."),
                    () => { });
            case 12:
                return new AdolescenceEventModel(new EventModel(
                    "While traveling to orbit, your pilot suffered a heart attack. Turns out all those hours in sensorium flight sims paid off. Gain 1 rank in either Pilot or Spacecraft",
                    "Big Damn Hero",
                    "While traveling to orbit, your pilot suffered a heart attack. Turns out all those hours in sensorium flight sims paid off.",
                    "IncreasePilot|Spacecraft"),
                    () => { });
            case 13:
                return new AdolescenceEventModel(new EventModel(
                    "You became heavily involved in the Maya ARG scene. Gain 1 rank in Analysis.",
                    "Amateur Sleuth",
                    "You became heavily involved in the Maya ARG scene.",
                    "IncreaseAnalysis"),
                    () => { });
            case 14:
                return new AdolescenceEventModel(new EventModel(
                    "An accident left you needing cybernetic replacements. Luckily, you got some cutting-edge tech. Maintaining your aug is expensive, but it routinely outperforms the competition. You have a cybernetic arm or leg. Increase the Maintenance cost by 1 but add one bonus Momentum on successful tests made with the limb.",
                    "Aug Addict",
                    "An accident left you needing cybernetic replacements. Luckily, you got some cutting-edge tech. Maintaining your aug is expensive, but it routinely outperforms the competition.",
                    "CyberneticLegOrArm"),
                    () => { });
            case 15:
                return new AdolescenceEventModel(new EventModel(
                    "You got so involved in a Maya fandom that your health started to suffer for it. Reduce Vigour by 1.",
                    "Couch Potato",
                    "You got so involved in a Maya fandom that your health started to suffer for it."),
                    () => { character.vigourReduction++; });
            case 16:
                return new AdolescenceEventModel(new EventModel(
                    "You trusted someone, and they burned you—hard. You’re not going to let it happen again. Gain 1 rank in Discipline but suffer +1 complication range on all social skill tests where trust is a factor.",
                    "Won't Get Fooled Again",
                    "You trusted someone, and they burned you—hard. You’re not going to let it happen again. You suffer +1 complication range on all social skill tests where trust is a factor.",
                    "IncreaseDiscipline"),
                    () => { });
            case 17:
                return new AdolescenceEventModel(new EventModel(
                    "You know the difference between genuine, Made-in-PanOceania gear and the knock-offs. And you hate to settle for less. Gain +2[CD] Morale Soak when wearing exclusively PanOceanian Armour or clothing but increase your complication range by 1 when you’re not.",
                    "Brand Loyalist",
                    "Gain +2[CD] Morale Soak when wearing exclusively PanOceanian Armour or clothing but increase your complication range by 1 when you’re not."),
                    () => { });
            case 18:
                return new AdolescenceEventModel(new EventModel(
                    "The Church left a strongly favourable impression on you. Add 1 to your Resolve Stress track. You may choose Priest as your first career.",
                    "Pious",
                    "The Church left a strongly favourable impression on you."),
                    () => {
                        character.resolveReduction++;
                        character.freeCareers.push(Career.Priest);
                    });
            case 19: {
                let faction = FactionsHelper.generateFaction(false, true);
                while (faction === character.faction) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                let factionName = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `One of your most deeply-held beliefs about your home is turned on its head. What happened? Why did it lead to you leaving PanOceania? You defect to ${factionName}.`,
                    "Disillusioned",
                    `One of your most deeply-held beliefs about your home is turned on its head. What happened? Why did it lead to you leaving PanOceania?`),
                    () => {
                        character.heritage = character.faction;
                        character.faction = faction;
                        character.hasDefected = true;

                        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                            character.heritageTrait = HeritageTraits.Lub;
                        }
                    });
            }
            case 20:
                return new AdolescenceEventModel(new EventModel(
                    "The recall didn’t catch you in time, but the resulting scandal ensured you didn’t waste away inside a Resurrection queue. Your character died and was resurrected.",
                    "Bitter",
                    "The recall didn’t catch you in time, but the resulting scandal ensured you didn’t waste away inside a Resurrection queue. Your character died and was resurrected.",
                    "Resurrection"),
                    () => { character.applyDeath(); });
        }
    }

    private rollOnNomadsTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1: {
                return new AdolescenceEventModel(new EventModel(
                    "Dragnet caught you trying to hack into the Bank of Tunguska . But instead of throwing you in jail, they simply made some introductions. Increase Hacking by 1 rank. You may take Interventor as your first career.",
                    "Known Black Hat",
                    "Dragnet caught you trying to hack into the Bank of Tunguska . But instead of throwing you in jail, they simply made some introductions.",
                    "IncreaseHacking"),
                    () => {
                        character.freeCareers.push(Career.Interventor); 
                    });
            }
            case 2: {
                return new AdolescenceEventModel(new EventModel(
                    "You got spaced. You survived, thanks to your vacuum suit, but you screamed your throat bloody raw just the same. Decrease Morale by 1. Increase the complication range on Extraplanetary tests by 2.",
                    "Void Terror",
                    "You got spaced. You survived, thanks to your vacuum suit, but you screamed your throat bloody raw just the same. Increase the complication range on Extraplanetary tests by 2."),
                    () => {
                        character.morale++;
                    });
            }
            case 3: {
                return new AdolescenceEventModel(new EventModel(
                    "Tinkering with your geist, you attempted to overclock its processer. You succeeded, though the end result left you a little exposed. Increase your geist’s Intelligence by 1, but reduce your Firewall by 1.",
                    "Obsessive Tinkerer",
                    "Tinkering with your geist, you attempted to overclock its processer.You succeeded, though the end result left you a little exposed."),
                    () => {
                        character.geist.attributes[Attribute.Intelligence].value++;
                        character.firewallReduction++;
                    });
            }
            case 4: {
                let years = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `While doing a little zero-G vandalism, you wound up tagging a Bureau Noir agent’s ship. You spend ${years} years in prison, gain 1 rank in Extraplanetary and gain a contact or rival in Bureau Noir.`,
                    "Jinxed",
                    `While doing a little zero-G vandalism, you wound up tagging a Bureau Noir agent’s ship. You spent ${years} years in prison and have a contact or rival in Bureau Noir.`,
                    "IncreaseExtraplanetary"),
                    () => { });
            }
            case 5: {
                return new AdolescenceEventModel(new EventModel(
                    "You take an internship on one of Praxis’s Black Ships. Even better, you survive the process with most of your bits intact. Increase Science by 1 rank. You may take Praxis Scientist as your first career.",
                    "Insatiable Curiosity",
                    "You take an internship on one of Praxis’s Black Ships. Even better, you survive the process with most of your bits intact.",
                    "IncreaseScience"),
                    () => {
                        character.freeCareers.push(Career.PraxisScientist);
                    });
            }
            case 6: {
                return new AdolescenceEventModel(new EventModel(
                    "You volunteered for an experimental neural augmentation procedure. They say they’ll have the bugs worked out any day now. ",
                    "Glitchy Augs",
                    "You volunteered for an experimental neural augmentation procedure. They say they’ll have the bugs worked out any day now. Increase the complication range on Intelligence-based tests by 1."),
                    () => {
                        character.attributes[Attribute.Intelligence].value++;
                    });
            }
            case 7: {
                return new AdolescenceEventModel(new EventModel(
                    "Fed up with your home life, you stole a ship and went joyriding. Did they ever catch you? Increase Pilot by 1 rank.",
                    "Reckless",
                    "Fed up with your home life, you stole a ship and went joyriding. Did they ever catch you?",
                    "IncreasePilot"),
                    () => { });
            }
            case 8: {
                return new AdolescenceEventModel(new EventModel(
                    "You were beaten within an inch of your life, but they couldn’t make you stay down. Reduce Vigour by 1, but increase Morale by 1.",
                    "Stubborn",
                    "You were beaten within an inch of your life, but they couldn’t make you stay down."),
                    () => {
                        character.vigourReduction++;
                        character.morale--;
                    });
            }
            case 9: {
                return new AdolescenceEventModel(new EventModel(
                    "A nasty explosion leaves you badly burnt; your dermal replacements work a little too well. Reduce Brawn by 1.",
                    "Hyper-Sensitive Skin",
                    "A nasty explosion leaves you badly burnt; your dermal replacements work a little too well."),
                    () => {
                        character.attributes[Attribute.Brawn].value--;
                    });
            }
            case 10: {
                return new AdolescenceEventModel(new EventModel(
                    "You get accepted into the Tunguskan Outer University’s prestigious School of Law, an honour you can’t possibly afford. That is, until you’re made an offer you can’t refuse. Increase Education by 1, but gain a 10 Asset debt. Gain a contact at the university, and you may take Barrister Corps as your first career.",
                    "Mafia Connections",
                    "You get accepted into the Tunguskan Outer University’s prestigious School of Law, an honour you can’t possibly afford. That is, until you’re made an offer you can’t refuse. You have a 10 Asset debt and a contact at the university.",
                    "IncreaseEducation"),
                    () => {
                        character.freeCareers.push(Career.BarristerCorps);
                    });
            }
            case 11: {
                let cost = DiceRoller.rollSpecial(4, 4).hits;

                return new AdolescenceEventModel(new EventModel(
                    `They said that replacing your lymph nodes with neomaterials would boost your immune system. It’s certainly had an effect. Increase the complication range on Resistance tests by 2. Repairing this damage is possible, but the procedure will cost ${cost} (and you probably want a different clinic).`,
                    "Shredded Immune System",
                    `They said that replacing your lymph nodes with neomaterials would boost your immune system. It’s certainly had an effect. Increase the complication range on Resistance tests by 2. Repairing this damage is possible, but the procedure will cost ${cost} (and you probably want a different clinic).`),
                    () => { });
            }
            case 12: {
                return new AdolescenceEventModel(new EventModel(
                    "You got your first exotic augmentation. It felt better than good: it felt right. Gain Cosmetic Augmentation 2. You may take Chimera as your first career.",
                    "Inhuman Appearance",
                    "You got your first exotic augmentation. It felt better than good: it felt right. Gain Cosmetic Augmentation 2."),
                    () => {
                        character.freeCareers.push(Career.Chimera);
                    });
            }
            case 13: {
                return new AdolescenceEventModel(new EventModel(
                    "You fell in with a rough crowd, running with the maras gangs of Corregidor. Caught red-handed, you were offered a choice: prison or something exponentially tougher. Gain a Criminal Record. Either spend 1-6 years in prison before starting your first career or select Jaguar as your first career.",
                    "Trouble Magnet",
                    "You fell in with a rough crowd, running with the maras gangs of Corregidor. Caught red-handed, you were offered a choice: prison or something exponentially tougher. Gain a Criminal Record.",
                    "JailOrJaguar"), // TODO
                    () => {
                        character.hasCriminalRecord = true;
                    });
            }
            case 14: {
                return new AdolescenceEventModel(new EventModel(
                    "You get heavily involved in the protest art scene; footage of your numerous arrests goes viral. At least they got your good side. You gain 1 rank in Thievery, but all Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem.",
                    "The Usual Supect",
                    "All Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem",
                    "IncreaseThievery"),
                    () => { });
            }
            case 15: {
                return new AdolescenceEventModel(new EventModel(
                    "You fell ill, and the Praxis doctors were convinced that carbon nanotubes in your spleen were the solution. Regardless, it didn’t kill you; perhaps it made you stronger? Increase your complication range on Resistance tests by 2. Increase Vigour by 1.",
                    "Experimental Insides",
                    "You fell ill, and the Praxis doctors were convinced that carbon nanotubes in your spleen were the solution. Regardless, it didn’t kill you; perhaps it made you stronger? Increase your complication range on Resistance tests by 2."),
                    () => {
                        character.vigourReduction--;
                    });
            }
            case 16: {
                return new AdolescenceEventModel(new EventModel(
                    "You did it, you got caught, and earned yourself a year of mandatory labour. At least you learned a thing or two about starship maintenance. Gain a Criminal Record. Spend one year in prison before starting your first career, but gain 1 rank in Tech.",
                    "Bad Company",
                    "You did it, you got caught, and earned yourself a year of mandatory labour. At least you learned a thing or two about starship maintenance. You gained a Criminal Record and spent one year in prison.",
                    "IncreaseTech"),
                    () => {
                        character.hasCriminalRecord = true;
                        character.age++;
                    });
            }
            case 17: {
                return new AdolescenceEventModel(new EventModel(
                    "You fell in with a group of anarchist hackers, taking pot shots at Maya. An Aspect — or maybe ALEPH itself — found you and torched your friends. It saw you, but let you escape, declining to explain its actions. Gain 1 rank in Hacking.",
                    "Person of Interest",
                    "You fell in with a group of anarchist hackers, taking pot shots at Maya. An Aspect — or maybe ALEPH itself — found you and torched your friends. It saw you, but let you escape, declining to explain its actions.",
                    "IncreaseHacking"),
                    () => { });
            }
            case 18: {
                return new AdolescenceEventModel(new EventModel(
                    "You signed up for an experimental military enhancement program. It surpassed expectations. Increase Brawn by 1.",
                    "Early-Access Wetware",
                    "You signed up for an experimental military enhancement program. It surpassed expectations."),
                    () => {
                        character.attributes[Attribute.Brawn].value++;
                    });
            }
            case 19: {
                let faction = FactionsHelper.generateFaction(false, false);
                let doubleAgent = faction === Faction.Nomads || faction === Faction.Defection;
                while (faction === Faction.Nomads || faction === Faction.Defection) {
                    faction = FactionsHelper.generateFaction(true, true);
                }
                let factionName = FactionsHelper.getFaction(faction).name;

                if (doubleAgent) {
                    return new AdolescenceEventModel(new EventModel(
                        `You always wondered if the struggle was worth it. A better offer came, and you took it; what’s the harm in that? You are a double agent, working inside ${factionName}.`,
                        "Sellout",
                        `You always wondered if the struggle was worth it. A better offer came, and you took it; what’s the harm in that? You are a double agent, working inside ${factionName}.`),
                        () => {
                            character.hasDefected = true;
                            character.heritage = character.faction;
                            character.faction = faction;
                        });
                }
                else {
                    return new AdolescenceEventModel(new EventModel(
                        `You always wondered if the struggle was worth it. A better offer came, and you took it; what’s the harm in that? You defect to ${factionName}.`,
                        "Sellout",
                        `You always wondered if the struggle was worth it. A better offer came, and you took it; what’s the harm in that? You defect to ${factionName}.`),
                        () => {
                            character.hasDefected = true;
                            character.heritage = character.faction;
                            character.faction = faction;
                        });
                }
            }
            case 20: {
                return new AdolescenceEventModel(new EventModel(
                    "The Praxis doctors were convinced that they could make you immune to disease. They were correct, after a fashion. The dead don’t exactly catch cold. You died and was resurrected.",
                    "Cynical",
                    "The Praxis doctors were convinced that they could make you immune to disease. They were correct, after a fashion. The dead don’t exactly catch cold. You died and was resurrected.",
                    "Resurrection"),
                    () => { });
            }
        }
    }

    private rollOnAlephTable(roll: number): AdolescenceEventModel {
        switch (roll) {
            case 1: {
                const debt = DiceRoller.rollSpecial(7, 7).hits;
                const faction = FactionsHelper.generateFaction(false, false);
                const factionName = FactionsHelper.getFaction(faction).name;

                return new AdolescenceEventModel(new EventModel(
                    `You participated in faction-sponsored research. Increase one Attribute by +1 but gain a ${debt} Asset debt to the ${factionName} faction.`,
                    "Prototype",
                    `You participated in faction-sponsored research. You have a ${debt} Asset debt to the ${factionName} faction.`,
                    "IncreaseOneAttribute"),
                    () => {
                    });
            }
            case 2: {
                return new AdolescenceEventModel(new EventModel(
                    "You kept a secret with disastrous results. Gain 1 rank in Analysis.",
                    "Cryptophobia",
                    "You kept a secret with disastrous results.",
                    "IncreaseAnalysis"),
                    () => {
                    });
            }
            case 3: {
                return new AdolescenceEventModel(new EventModel(
                    "Trying to live up to your hero’s expectations, you wound up hospitalised for a year. What happened? Reduce Vigour by 1 but gain 1 rank in Discipline.",
                    "Crushing Expectations",
                    "Trying to live up to your hero’s expectations, you wound up hospitalised for a year. What happened?",
                    "IncreaseDiscipline"),
                    () => {
                        character.vigourReduction++;
                    });
            }
            case 4: {
                const debt = DiceRoller.rollSpecial(4, 0).hits;

                return new AdolescenceEventModel(new EventModel(
                    `Living in the shadow of the AI, your geist developed the appearance of crippling self-doubt. You did your best to console it with shiny new tech. Reduce your geist's Resolve by 2 but increase two of its attributes by +2 each. Gain a ${debt} Asset debt.`,
                    "'Insecure' Geist",
                    `Living in the shadow of the AI, your geist developed the appearance of crippling self-doubt. You did your best to console it with shiny new tech. You have a ${debt} Asset debt.`,
                    "IncreaseGeistAttributes2"), // TODO
                    () => {
                        character.geist.resolveBonus -= 2;
                    });
            }
            case 5: {
                return new AdolescenceEventModel(new EventModel(
                    "The personality of your geist radically shifted overnight. Eventually you realised that it was replaced by one of ALEPH’s Aspects.And it’s got its eye on you. Increase four of your geist's attributes by 1. You may choose Bureau Toth Agent as your first career.",
                    "Closely Monitored",
                    "The personality of your geist radically shifted overnight. Eventually you realised that it was replaced by one of ALEPH’s Aspects.And it’s got its eye on you.",
                    "IncreaseGeistAttributes4"), // TODO
                    () => {
                        character.freeCareers.push(Career.BureauTothAgent);
                    });
            }
            case 6: {
                return new AdolescenceEventModel(new EventModel(
                    "Confusing the Myrmidon Wars Mayaseries for reality, your geist “heroically” wrecked an expensive remote, leaving you with the bill. Gain a 10 Asset debt. Gain 1 rank in Tech as you learn a thing or two about repairs during this time.",
                    "Reckless Geist",
                    "Confusing the Myrmidon Wars Mayaseries for reality, your geist “heroically” wrecked an expensive remote, leaving you with the bill. You have a 10 Asset debt.",
                    "IncreaseTech"),
                    () => {
                    });
            }
            case 7: {
                return new AdolescenceEventModel(new EventModel(
                    "Through injury, illness, a targeted virus, or some other means, you lost your voice completely. While you’re still capable of real-time text communication, you’re dependent on technology or sign language. You are unable to speak, sing or otherwise make verbal sounds. A cure is possible, but it will cost 5 Assets, or require a new Lhost.",
                    "Mute",
                    "Through injury, illness, a targeted virus, or some other means, you lost your voice completely. While you’re still capable of real-time text communication, you’re dependent on technology or sign language. You are unable to speak, sing or otherwise make verbal sounds. A cure is possible, but it will cost 5 Assets, or require a new Lhost."),
                    () => { });
            }
            case 8: {
                return new AdolescenceEventModel(new EventModel(
                    "While training for different career paths, you destroyed a small mountain of gear. Gain an 8 Asset debt. At least you learned something: reduce the cost to hazard ALEPH careers by 1.",
                    "Bull in a China Shop",
                    "While training for different career paths, you destroyed a small mountain of gear. Gain an 8 Asset debt."),
                    () => {
                        character.hazardDecrease++;
                    });
            }
            case 9: {
                return new AdolescenceEventModel(new EventModel(
                    "You were betrayed by someone close to you in dramatic fashion. Reduce Resolve by 1 but gain 1 rank in Psychology.",
                    "Trust Issues",
                    "You were betrayed by someone close to you in dramatic fashion.",
                    "IncreasePsychology"),
                    () => {
                        character.resolveReduction++;
                    });
            }
            case 10: {
                return new AdolescenceEventModel(new EventModel(
                    "ALEPH singles you out as someone with potential. Increase your Social Status by 1.",
                    "Vainglorious",
                    "ALEPH singles you out as someone with potential."),
                    () => {
                        SocialClassesHelper.increaseSocialClass();
                    });
            }
            case 11: {
                return new AdolescenceEventModel(new EventModel(
                    "Whether through faulty psychogenesis, emotional trauma, or other means, you develop a second personality. Choose a talent tree you have no ranks in and gain the first talent. Your alter ego can use this talent, but you cannot. Your social skill tests suffer a +2 difficulty increase due to your unpredictable nature.",
                    "Split Personality",
                    "Whether through faulty psychogenesis, emotional trauma, or other means, you develop a second personality. Your alter ego can use this talent, but you cannot. Your social skill tests suffer a +2 difficulty increase due to your unpredictable nature.",
                    "AlterEgo"),
                    () => { });
            }
            case 12: {
                return new AdolescenceEventModel(new EventModel(
                    "In the middle of the night, the AI contacts you directly, asking seemingly random questions about morality, philosophy, and ethics. Departing as suddenly as it arrived, it never acknowledges the event again. Gain the Counselour talent for Psychology.",
                    "Sympathetic Ear",
                    "In the middle of the night, the AI contacts you directly, asking seemingly random questions about morality, philosophy, and ethics. Departing as suddenly as it arrived, it never acknowledges the event again."),
                    () => {
                        if (!character.hasTalent("Counselour")) {
                            character.addTalent("Counselour");
                        }
                    });
            }
            case 13: {
                return new AdolescenceEventModel(new EventModel(
                    "Early in your development, you were deemed a failure and all but discarded. Until ALEPH directly intervened on your behalf, that is. Reduce your status by 1. You may roll an ALEPH faction career for free as your first career.",
                    "Diehard Loyalist",
                    "Early in your development, you were deemed a failure and all but discarded. Until ALEPH directly intervened on your behalf, that is."),
                    () => {
                        character.freeFactionCareerRoll++;
                    });
            }
            case 14: {
                return new AdolescenceEventModel(new EventModel(
                    "One of your mentors disappears without warning, leaving you an encrypted message. What will trigger its activation? Increase your Resolve by 1.",
                    "Vengeful",
                    "One of your mentors disappears without warning, leaving you an encrypted message. What will trigger its activation?"),
                    () => {
                        character.resolveReduction--;
                    });
            }
            case 15: {
                const years = Math.floor(Math.random() * 6) + 1;

                return new AdolescenceEventModel(new EventModel(
                    `Your thrill-seeking ways eventually caught up to you, about the same time that the cops did. Spend ${years} in jail and gain a criminal record.`,
                    "Adrenaline Junkie",
                    `Your thrill-seeking ways eventually caught up to you, about the same time that the cops did. You spent ${years} in jail.`),
                    () => {
                        character.hasCriminalRecord = true;
                        character.age += years;
                    });
            }
            case 16: {
                return new AdolescenceEventModel(new EventModel(
                    "Disaster struck, but it narrowly missed you as a Sophotect dragged you to safety. Gain +1 Resolve. You may take Sophotect as your first career.",
                    "Hero Worship",
                    "Disaster struck, but it narrowly missed you as a Sophotect dragged you to safety."),
                    () => {
                        character.resolveReduction--;
                        character.freeCareers.push(Career.Sophotect);
                    });
            }
            case 17: {
                return new AdolescenceEventModel(new EventModel(
                    "You were chosen to represent ALEPH in a competition, but were disqualified for cheating. What was the charge? Was it fair? Your social skills suffer a +1 complication range with members of the ALEPH faction.",
                    "Shortcut-Prone",
                    "You were chosen to represent ALEPH in a competition, but were disqualified for cheating. What was the charge? Was it fair? Your social skills suffer a +1 complication range with members of the ALEPH faction."),
                    () => { });
            }
            case 18: {
                return new AdolescenceEventModel(new EventModel(
                    "You were the target of a nanovirus. It was contained, if barely, but your system still bears the scars. Increase your Firewall by 1. However, add +1 complication range to all your actions for every Breach you currently have.",
                    "Digital Scar",
                    "You were the target of a nanovirus. It was contained, if barely, but your system still bears the scars. Add +1 complication range to all your actions for every Breach you currently have."),
                    () => {
                        character.firewallReduction--;
                    });
            }
            case 19: {
                let faction = FactionsHelper.generateFaction(false, false);
                let doubleAgent = faction === Faction.Defection;
                while (faction === Faction.Aleph || faction === Faction.Defection) {
                    faction = FactionsHelper.generateFaction(true, true);
                }
                let factionName = FactionsHelper.getFaction(faction).name;

                if (doubleAgent) {
                    return new AdolescenceEventModel(new EventModel(
                        `Your entire existence, you never truly questioned the AI’s motives. A mysterious stranger challenged you to do just that; your answers surprised you. You are a double agent, working inside ${factionName}.`,
                        "Rogue Asset",
                        `Your entire existence, you never truly questioned the AI’s motives. A mysterious stranger challenged you to do just that; your answers surprised you. You are a double agent, working inside ${factionName}.`),
                        () => {
                            character.hasDefected = true;
                            character.heritage = character.faction;
                            character.faction = faction;
                        });
                }
                else {
                    return new AdolescenceEventModel(new EventModel(
                        `Your entire existence, you never truly questioned the AI’s motives. A mysterious stranger challenged you to do just that; your answers surprised you. You defect to ${factionName}.`,
                        "Rogue Asset",
                        `Your entire existence, you never truly questioned the AI’s motives. A mysterious stranger challenged you to do just that; your answers surprised you. You defect to ${factionName}.`),
                        () => {
                            character.hasDefected = true;
                            character.heritage = character.faction;
                            character.faction = faction;
                        });
                }
            }
            case 20: {
                return new AdolescenceEventModel(new EventModel(
                    "A Psychosanitary Risk Evaluator declares you unstable, ordering a Cube wipe and memory rollback. But when you wake up in your new Lhost, you remember everything.",
                    "Glitchy Cube",
                    "A Psychosanitary Risk Evaluator declares you unstable, ordering a Cube wipe and memory rollback. But when you wake up in your new Lhost, you remember everything.",
                    "Resurrection"),
                    () => { });
            }
        }
    }
}

export const AdolescenceEventsHelper = new AdolescenceEvents();