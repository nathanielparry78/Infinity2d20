import {character} from '../common/character';
import {EventModel} from '../common/eventModel';
import {Faction, FactionsHelper} from './factions';
import {YouthEventsHelper} from './youthEvents';
import {Career} from'./careers';
import {SocialClassesHelper} from './socialClasses';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {BirthPlacesHelper} from './birthPlaces';
import {AlienHost} from './alienHosts';
import {DiceRoller} from './diceRoller';
import {Source} from './sources';

export class CareerEventModel extends EventModel {
    onApply: () => void;

    constructor(base: EventModel, onApply?: () => void) {
        super(base.event, base.trait, base.effect, base.detailView);
        this.onApply = onApply;
    }
}

export class CareerEvents {
    generateEvent(): CareerEventModel {
        var event = null;
        var table = Math.floor(Math.random() * 6) + 1;
        var ev = Math.floor(Math.random() * 19) + 1;

        if (character.host === AlienHost.Antipode && character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            event = this.rollOnAntipodeTable(ev, character.isUnemployed());
            event.table = "Antipode";
            event.eventNumber = ev;
            return event;
        }

        if (character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            switch (table) {
                case 1:
                case 2:
                case 3:
                    if (character.isDogBlooded()) {
                        event = this.rollOnDogfaceAndWulverTable(ev, character.isUnemployed());
                        event.table = "Dog-Blooded";
                        event.eventNumber = ev;
                    }
                    else {
                        event = this.rollOnAriadnaTable(ev, character.isUnemployed());
                        event.table = "Ariadna";
                        event.eventNumber = ev;
                    }
                    break;
                case 4:
                    event = this.rollOnTableA(ev, character.isUnemployed());
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev, character.isUnemployed());
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev, character.isUnemployed());
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else if (character.faction === Faction.Haqqislam && character.hasSource(Source.Haqqislam)) {
            switch (table) {
                case 1:
                case 2:
                case 3:
                    event = this.rollOnHaqqislamTable(ev, character.isUnemployed());
                    event.table = "Haqqislam";
                    event.eventNumber = ev;
                    break;
                case 4:
                    event = this.rollOnTableA(ev, character.isUnemployed());
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev, character.isUnemployed());
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev, character.isUnemployed());
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else if (character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            switch (table) {
                case 1:
                case 2:
                case 3:
                    event = this.rollOnPanOceaniaTable(ev, character.isUnemployed());
                    event.table = "PanOceania";
                    event.eventNumber = ev;
                    break;
                case 4:
                    event = this.rollOnTableA(ev, character.isUnemployed());
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev, character.isUnemployed());
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev, character.isUnemployed());
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
                    if (character.isUplift()) {
                        event = this.rollOnUpliftTable(ev, character.isUnemployed());
                        event.table = "Uplift";
                        event.eventNumber = ev;
                    }
                    else {
                        event = this.rollOnNomadsTable(ev, character.isUnemployed());
                        event.table = "Nomads";
                        event.eventNumber = ev;
                    }
                    break;
                case 4:
                    event = this.rollOnTableA(ev, character.isUnemployed());
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 5:
                    event = this.rollOnTableB(ev, character.isUnemployed());
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 6:
                    event = this.rollOnTableC(ev, character.isUnemployed());
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }
        else {
            switch (table) {
                case 1:
                case 2:
                    event = this.rollOnTableA(ev, character.isUnemployed());
                    event.table = "A";
                    event.eventNumber = ev;
                    break;
                case 3:
                case 4:
                    event = this.rollOnTableB(ev, character.isUnemployed());
                    event.table = "B";
                    event.eventNumber = ev;
                    break;
                case 5:
                case 6:
                    event = this.rollOnTableC(ev, character.isUnemployed());
                    event.table = "C";
                    event.eventNumber = ev;
                    break;
            }
        }

        return event;
    }

    getEvents() {
        let events: { [category: string]: CareerEventModel[] } = {};

        if (character.host === AlienHost.Antipode && character.hasSource(Source.Ariadna)) {
            events["Antipode"] = [];

            for (var i = 1; i < 20; i++) {
                let ev = this.rollOnAntipodeTable(i, character.isUnemployed());
                ev.table = "Antipode";
                events["Antipode"].push(ev);
            }
        }
        else if (character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            if (character.isDogBlooded()) {
                events["Dog-Blooded"] = [];

                for (var i = 1; i < 20; i++) {
                    let ev = this.rollOnDogfaceAndWulverTable(i, character.isUnemployed());
                    ev.table = "Dog-Blooded";
                    events["Dog-Blooded"].push(ev);
                }
            }
            else {
                events["Ariadna"] = [];

                for (var i = 1; i < 20; i++) {
                    let ev = this.rollOnAriadnaTable(i, character.isUnemployed());
                    ev.table = "Ariadna";
                    events["Ariadna"].push(ev);
                }
            }
        }
        else if (character.faction === Faction.Haqqislam && character.hasSource(Source.Haqqislam)) {
            events["Haqqislam"] = [];

            for (var i = 1; i < 20; i++) {
                let ev = this.rollOnHaqqislamTable(i, character.isUnemployed());
                ev.table = "Haqqislam";
                events["Haqqislam"].push(ev);
            }
        }
        else if (character.faction === Faction.PanOceania && character.hasSource(Source.PanOceania)) {
            events["PanOceania"] = [];

            for (var i = 1; i < 20; i++) {
                let ev = this.rollOnPanOceaniaTable(i, character.isUnemployed());
                ev.table = "PanOceania";
                events["PanOceania"].push(ev);
            }
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            if (character.isUplift()) {
                events["Uplift"] = [];

                for (var i = 1; i < 20; i++) {
                    let ev = this.rollOnUpliftTable(i, character.isUnemployed());
                    ev.table = "Uplift";
                    events["Uplift"].push(ev);
                }
            }
            else {
                events["Nomads"] = [];

                for (var i = 1; i < 20; i++) {
                    let ev = this.rollOnNomadsTable(i, character.isUnemployed());
                    ev.table = "Nomads";
                    events["Nomads"].push(ev);
                }
            }
        }

        events["A"] = [];
        events["B"] = [];
        events["C"] = [];

        for (var i = 1; i < 20; i++) {
            let ev = this.rollOnTableA(i, character.isUnemployed());
            ev.table = "A";
            events["A"].push(ev);
        }

        for (var i = 1; i < 20; i++) {
            let ev = this.rollOnTableB(i, character.isUnemployed());
            ev.table = "B";
            events["B"].push(ev);
        }

        for (var i = 1; i < 20; i++) {
            let ev = this.rollOnTableC(i, character.isUnemployed());
            ev.table = "C";
            events["C"].push(ev);
        }

        return events;
    }

    private rollOnTableA(roll: number, isUnemployed: boolean) {
        switch (roll) {
            case 1: {
                const cost = 10 + DiceRoller.rollSpecial(5, 0).hits;

                return new CareerEventModel(new EventModel(
                    `You develop a rare genetic disorder or are afflicted by a genomic toxin. Your genetic order reduces your maximum Vigour by 1. The treatment required to cure your condition will cost ${cost} assets.`,
                    "",
                    `You develop a rare genetic disorder or are afflicted by a genomic toxin. Your genetic order reduces your maximum Vigour by 1. The treatment required to cure your condition will cost ${cost} assets.`),
                    () => {
                        character.vigourReduction++;
                    });
            }
            case 2:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "Both the authorities and organised crime are hunting for you. What do you know, or what have you got that they want? Gain both a criminal enemy and a police enemy. You must pass an Average(D1) hazard test for your current career or you are Fired.",
                    "",
                    "Both the authorities and organised crime are hunting for you. What do you know, or what have you got that they want? You have a criminal enemy and a police enemy.",
                    "HazardTestOrFired"));
            case 3:
                return new CareerEventModel(new EventModel(
                    "You are on the run. Who is after you, and why?",
                    "Hunted",
                    "You are on the run. Who is after you, and why?"));
            case 4:
                return new CareerEventModel(new EventModel(
                    "You’ve accrued the enmity of a powerful enemy. They might be a district authority, well-connected ex-lover, or a jealous colleague.",
                    "Persecuted",
                    "You’ve accrued the enmity of a powerful enemy. They might be a district authority, well-connected ex-lover, or a jealous colleague."));
            case 5:
                return new CareerEventModel(new EventModel(
                    "An old debt has caught up with you. Who is it to, and what will happen if you do not pay? Gain a conflict with an organization. You have a 20 asset debt that must be paid off with that organisation. Once it is paid, the conflict is removed. This debt does not prevent you from using earnings to make purchases.",
                    "Conflict with an Organization",
                    "An old debt has caught up with you. Who is it to, and what will happen if you do not pay? You have a conflict with an organization. You have a 20 asset debt that must be paid off with that organisation. Once it is paid, the conflict is removed. This debt does not prevent you from using earnings to make purchases."));
            case 6:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You’re involved in a serious crime. Guilty or not, you are sentenced to hard labour and lose your job. Add 1-6 years to your age. You are Fired and gain a Criminal Record.",
                    "",
                    "You’re involved in a serious crime. Guilty or not, you are sentenced to hard labour and lose your job. You are Fired and gain a Criminal Record.",
                    "CriminalRecord|Fired"),
                    () => {
                        character.age += Math.floor(Math.random() * 6) + 1;
                        character.hasCriminalRecord = true;
                    });
            case 7:
                return new CareerEventModel(new EventModel(
                    "You develop a fierce rivalry with someone in your organisation or faction. Gain a character trait describing your rivalry or its consequences.",
                    "Fierce Rivalry",
                    "You develop a fierce rivalry with someone in your organisation or faction. Gain a character trait describing your rivalry or its consequences."));
            case 8:
                {
                    var faction = FactionsHelper.generateFaction(false, true);
                    var factionName = FactionsHelper.getFaction(faction).name;

                    return new CareerEventModel(new EventModel(
                        "You have an affair with someone wealthy, but it ends poorly. Was it your fault? Gain an enemy in the " + factionName + " faction.",
                        "Wealthy Ex-Lover",
                        "You have an affair with someone wealthy, but it ends poorly. Was it your fault? You have an enemy in the " + factionName + " faction."));
                }
            case 9:
                {
                    var faction = FactionsHelper.generateFaction(false, true);
                    var factionName = FactionsHelper.getFaction(faction).name;
                    var debt = Math.floor(Math.random() * 6) + 1;

                    return new CareerEventModel(new EventModel(
                        "You are called in for questioning by the authorities. What do they want to know? They let you go, but on what condition? Gain a debt worth " + debt + " assets to the " + factionName + " faction.",
                        "",
                        "You are called in for questioning by the authorities. What do they want to know? They let you go, but on what condition? You have a debt worth " + debt + " assets to the " + factionName + " faction."));
                }
            case 10:
                return new CareerEventModel(new EventModel(
                    "You gain a criminal record. What happened? Are you guilty or innocent?",
                    "",
                    "You gain a criminal record. What happened? Are you guilty or innocent?",
                    "CriminalRecord"),
                    () => {
                        character.hasCriminalRecord = true;
                    });
            case 11: {
                var location = DiceRoller.rollHitLocation();

                return new CareerEventModel(new EventModel(
                    "You are injured in a shooting accident. What were you doing? Who shot you? You have a gunshot wound that has not healed well in your " + location + ".",
                    "Old Wound",
                    "You are injured in a shooting accident. What were you doing? Who shot you? You have a gunshot wound that has not healed well in your " + location + "."));
            }
            case 12:
                return new CareerEventModel(new EventModel(
                    "Someone has been keeping an eye on you. They always seem to be there when you look around. What do you think they are interested in? Who are they?",
                    "Under Surveillance",
                    "Someone has been keeping an eye on you. They always seem to be there when you look around. What do you think they are interested in? Who are they?"));
            case 13:
                return new CareerEventModel(new EventModel(
                    "You become tangled up in a plot being run by a rival faction. What do you do for them? Why do you do it? You must pass a Challenging (D2) hazard test for your current career or you gain a Criminal Record.",
                    "",
                    "You become tangled up in a plot being run by a rival faction. What do you do for them? Why do you do it?",
                    "HazardTestOrCriminalRecord"));
            case 14:
                return new CareerEventModel(new EventModel(
                    "They are on to you! Who are they and what have you done?",
                    "Paranoia",
                    "They are on to you! Who are they and what have you done?"));
            case 15:
                return new CareerEventModel(new EventModel(
                    "Someone you know is a criminal, but you cannot turn him or her in. What hold do they have over you?",
                    "Blackmailed",
                    "Someone you know is a criminal, but you cannot turn him or her in. What hold do they have over you?"));
            case 16:
                return new CareerEventModel(new EventModel(
                    "Whatever you did, and it was bad, you’ve paid for it now — but they will not give up. Gain a character trait describing your nemesis.",
                    "Nemesis",
                    "Whatever you did, and it was bad, you’ve paid for it now — but they will not give up."));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You volunteered to take part in a secret medical experiment which succeeded. Well, almost. You may roll an aging test to regain an Infinity Point once per session.",
                    "Curse of the Mayfly",
                    "You volunteered to take part in a secret medical experiment which succeeded. Well, almost. You may roll an aging test to regain an Infinity Point once per session."));
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You are Fired. What did you do?",
                    "",
                    "You are Fired. What did you do?",
                    "Fired"));
            case 19:
                return new CareerEventModel(new EventModel(
                    "While doing your job, you are killed. What happened? Your character died and was resurrected.",
                    "",
                    "While doing your job, you are killed. What happened? Your character died and was resurrected.",
                    "Resurrection"),
                    () => {
                        character.applyDeath();
                    });
            case 20:
                return new CareerEventModel(new EventModel(
                    "You are suffering from the Chinese Curse: May you live in interesting times! You gain three career events for this career phase.",
                    "",
                    "",
                    "ChineseCurse"));
        }

        return null;
    }

    private rollOnTableB(roll: number, isUnemployed: boolean) {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "You are dating a wealthy and generous person. Increase Earnings Rating by one (to a maximum of six) whilst they are still in love with you, but they are very demanding or vulnerable.",
                    "Vulnerable Lover",
                    "You are dating a wealthy and generous person. Increase Earnings Rating by one (to a maximum of six) whilst they are still in love with you, but they are very demanding or vulnerable."),
                    () => {
                        character.earnings = Math.min(character.earnings + 1, 6);
                    });
            case 2:
                return new CareerEventModel(new EventModel(
                    "You are forced to evacuate. What is the threat? Where do you have to go? Immediately spend 5 assets or gain the trait Homeless.",
                    "",
                    "You are forced to evacuate. What is the threat? Where do you have to go?",
                    "Homeless"));
            case 3: {
                var faction = FactionsHelper.generateFaction(false, true);
                while (faction === character.faction) {
                    faction = FactionsHelper.generateFaction(false, true);
                }

                var factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    "You foil some form of nefarious plot on your own (or with the help of your friends). Why didn’t you go to the authorities? Gain an enemy in the " + factionName + " faction. Gain 5 assets in ‘liberated’ equipment.",
                    "",
                    "You foil some form of nefarious plot on your own (or with the help of your friends). Why didn’t you go to the authorities? Gain an enemy in the " + factionName + " faction."),
                    () => {
                        character.addEquipment("5 assets worth of liberated equipment from the " + factionName + " faction.");
                    });
            }
            case 4:
                return new CareerEventModel(new EventModel(
                    "You survive a serious natural disaster.",
                    "Nightmares",
                    "You survive a serious natural disaster."));
            case 5:
                return new CareerEventModel(new EventModel(
                    "You are remembered in the will of a relative. Who died? What were your feelings for them? Gain 2 Assets.",
                    "",
                    "You are remembered in the will of a relative. Who died? What were your feelings for them?"),
                    () => {
                        character.assets += 2;
                    });
            case 6:
                return new CareerEventModel(new EventModel(
                    "You help solve a serious crime. Gain a favour with a senior figure in either law enforcement or the intelligence community in your faction.",
                    "",
                    "You help solve a serious crime. You have earned a favour from a senior figure in either law enforcement or the intelligence community in your faction."));
            case 7:
                return new CareerEventModel(new EventModel(
                    "You discover that you have a talent for something you’d never considered trying before. What happened? Why do you love it? Gain 1 rank of training in a skill you currently have no training in.",
                    "",
                    "You discover that you have a talent for something you’d never considered trying before. What happened? Why do you love it?",
                    "IncreaseUntrained"));
            case 8:
                return new CareerEventModel(new EventModel(
                    "You are scouted by an unexpected employer. If you hazard your next career, reduce the difficulty of the hazard test by two steps. If you stay in your current career or roll randomly, increase your Earnings Rating by one.",
                    "",
                    "You are scouted by an unexpected employer."),
                    () => {
                        character.hazardDecrease = 2;
                    });
            case 9:
                return new CareerEventModel(new EventModel(
                    "You discover that your friend is a traitor working for a rival faction. The authorities request your help in arresting them. If you cooperate with the authorities, gain 5 assets as a reward. If you help your friend, you gain a contact in a random faction but you must make an Average (D1) hazard test in your current career or gain a Criminal Record.",
                    "",
                    "You discover that your friend is a traitor working for a rival faction. The authorities request your help in arresting them.",
                    "HelpFriend"));
            case 10:
                return new CareerEventModel(new EventModel(
                    "You stumbled on a previously unknown alien ruin (possibly while on vacation). You found something before you got out. What was it? Gain an item worth 10 Assets.",
                    "",
                    "You stumbled on a previously unknown alien ruin (possibly while on vacation). You found something before you got out. What was it?"),
                    () => {
                        character.assets += 10;
                    });
            case 11:
                return new CareerEventModel(new EventModel(
                    "Your lucky day! Something paid off — a lottery ticket, a risky business venture, or a hard won contract. Gain 5 Assets.",
                    "",
                    "Your lucky day! Something paid off — a lottery ticket, a risky business venture, or a hard won contract."),
                    () => {
                        character.assets += 5;
                    });
            case 12: {
                var faction = FactionsHelper.generateFaction(false, true);
                var factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    "You save someone from a terrible accident. Gain an ally in the " + factionName + " faction.",
                    "",
                    "You save someone from a terrible accident. You have an ally in the " + factionName + " faction."));
            }
            case 13:
                return new CareerEventModel(new EventModel(
                    "You achieve notoriety or fame as a minor Maya star. You gain 1 bonus Momentum on successful Social tests, but all Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem.",
                    "",
                    "You achieve notoriety or fame as a minor Maya star. You gain 1 bonus Momentum on successful Social tests, but all Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem."));
            case 14:
                return new CareerEventModel(new EventModel(
                    "Your Cube experiences a malfunction in which its input is fed back into your brain. You’ll need a completely new Cube to solve the problem.",
                    "Cube Echoes",
                    "Your Cube experiences a malfunction in which its input is fed back into your brain. You’ll need a completely new Cube to solve the problem."));
            case 15:
                return new CareerEventModel(new EventModel(
                    "A pseudo-AI personality you’ve had since childhood begins to degrade, but you can’t bear to part with it. The pseudo-AI provides one momentum to Education tests, but the GM can use it as a trait when purchasing complications that are related to the outcome of the test.",
                    "Pseudo-AI",
                    "A pseudo-AI personality you’ve had since childhood begins to degrade, but you can’t bear to part with it. The pseudo-AI provides one momentum to Education tests, but the GM can use it as a trait when purchasing complications that are related to the outcome of the test."));
            case 16:
                return new CareerEventModel(new EventModel(
                    "You join a new religion. What prompted your conversion? What article of faith is most important to you in your new belief? Gain a character trait describing your religion or religious experience.",
                    "New Religion",
                    "You join a new religion. What prompted your conversion? What article of faith is most important to you in your new belief? Gain a character trait describing your religion or religious experience."));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You volunteered to take part in a secret medical experiment that succeeded. Well, almost. Gain a talent in a talent tree of your choice and describe how you can do this as a result of the experiment. However, sometimes you lose the plot or wake up in strange places.",
                    "Experimental Subject",
                    "You volunteered to take part in a secret medical experiment that succeeded. Well, almost. Gain a talent in a talent tree of your choice and describe how you can do this as a result of the experiment. However, sometimes you lose the plot or wake up in strange places.",
                    "SelectTalent"));
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "A co-worker frames you for something they did. You are Fired.",
                    "",
                    "A co-worker frames you for something they did. You are Fired.",
                    "Fired"));
            case 19:
                return new CareerEventModel(new EventModel(
                    "You are violently killed. What happened? Who killed you? Your character died and was resurrected.",
                    "",
                    " You are violently killed. What happened? Who killed you? Your character died and was resurrected.",
                    "Resurrection"),
                    () => {
                        character.applyDeath();
                    });
            case 20:
                return new CareerEventModel(new EventModel(
                    "You are suffering from the Chinese Curse: May you live in interesting times! You gain three career events for this career phase.",
                    "",
                    "",
                    "ChineseCurse"));
        }

        return null;
    }

    private rollOnTableC(roll: number, isUnemployed: boolean) {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "A family member tells you a dark family secret. What has been hidden from you for all these years? Gain a character trait related to your family’s secret.",
                    "Family Secret",
                    "A family member tells you a dark family secret. What has been hidden from you for all these years? Gain a character trait related to your family’s secret."));
            case 2:
                return new CareerEventModel(new EventModel(
                    "You receive exotic cosmetic surgery. What do you look like now? Do you have tapered ears? Lizard scales? A prehensile tail? Gain a character trait describing your new look. And 3 Assets worth of cosmetic biomodifications.",
                    "Exotic Cosmetic Surgery",
                    "You receive exotic cosmetic surgery. What do you look like now? Do you have tapered ears? Lizard scales? A prehensile tail? Gain a character trait describing your new look."),
                    () => {
                        character.equipment.push("3 Assets worth of cosmetic biomodifications");
                    });
            case 3:
                return new CareerEventModel(new EventModel(
                    "The building you call home burns down. You lose 5 Assets.",
                    "Homeless",
                    "The building you call home burns down."),
                    () => {
                        character.assets = Math.max(character.assets - 5, 0);
                    });
            case 4:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "Your employer hits a slump and is struggling to make ends meet. You can either agree to a pay cut (reduce your Earnings Rating by 1) or you can choose to make a Challenging (D2) hazard test for your current career. If you fail the test, you are Fired. But if you succeed, your Earnings Rating is unchanged as you swap to a new employer.",
                    "",
                    "Your employer hits a slump and is struggling to make ends meet.",
                    "HazardTestOrReduceEarnings"));
            case 5:
                return new CareerEventModel(new EventModel(
                    "You’re betrayed by someone you trust. Who was it? What did they do to you?",
                    "Untrusting",
                    "You’re betrayed by someone you trust. Who was it? What did they do to you?"));
            case 6:
                return new CareerEventModel(new EventModel(
                    "You have survived a Combined Army attack. Where were you? What form did the attack take?",
                    "Shell Shocked",
                    "You have survived a Combined Army attack. Where were you? What form did the attack take?"));
            case 7:
                return new CareerEventModel(new EventModel(
                    "You get enrolled in an advanced training program at your job (possibly experimental or cybernetic in nature). Gain 1 rank in the elective skill from your current career that you did NOT choose to advance during this career phase.",
                    "",
                    "You get enrolled in an advanced training program at your job (possibly experimental or cybernetic in nature).",
                    "IncreaseSkippedElective"));
            case 8: {
                let faction = FactionsHelper.generateFaction(true, true);
                let planet = BirthPlacesHelper.generateBirthPlace(faction);

                while (planet.name === character.birthPlace) {
                    faction = FactionsHelper.generateFaction(true, true);
                    planet = BirthPlacesHelper.generateBirthPlace(faction);
                }

                return new CareerEventModel(new EventModel(
                    "You are recruited or selected to travel to " + planet.name + " in order to continue your career.",
                    "Mudhopper",
                    "You are recruited or selected to travel to " + planet.name + " in order to continue your career."));
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "A family member is in desperate financial need and they come to you for help. How bad is it and how did they get into this situation? Gain a debt worth 10 Assets.",
                    "Disowned",
                    "A family member is in desperate financial need and they come to you for help. How bad is it and how did they get into this situation? You have a debt worth 10 Assets."));
            case 10: {
                let languages: string[] = [];
                const num = Math.floor(Math.random() * 6) + 1;
                for (var i = 0; i < num; i++) {
                    const lang = BirthPlacesHelper.generateRandomLanguage(character.faction, true, true)[0];
                    if (character.languages.indexOf(lang) > -1) {
                        i--;
                        continue;
                    }
                    else {
                        languages.push(lang);
                    }
                }

                return new CareerEventModel(new EventModel(
                    "You are sent out into the field as a roving specialist (either in person or through immersive VR). Where do you go? What do you experience? Gain " + num + " languages.",
                    "",
                    "You are sent out into the field as a roving specialist (either in person or through immersive VR). Where do you go? What do you experience?"),
                    () => {
                        languages.forEach(lang => {
                            character.addLanguage(lang);
                        });
                    });
            }
            case 11:
                return new CareerEventModel(new EventModel(
                    "A family member is murdered. Who was killed? Do you know who did it? And, if so, why?",
                    "Thirst for Vengeance",
                    "A family member is murdered. Who was killed? Do you know who did it? And, if so, why?"));
            case 12:
                return new CareerEventModel(new EventModel(
                    "You are one of the only survivors when a ship you were travelling on broke down or crashed, and rescue was a long time coming. Add one year to your age.",
                    "Space Sickness",
                    "You are one of the only survivors when a ship you were travelling on broke down or crashed, and rescue was a long time coming."),
                    () => {
                        character.age++;
                    });
            case 13:
                return new CareerEventModel(new EventModel(
                    "You earn a big promotion. Increase Earnings Rating by one.",
                    "",
                    "You earn a big promotion."),
                    () => {
                        character.earnings++;
                    });
            case 14: {
                const faction = FactionsHelper.generateFaction(false, true);
                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    "Your childhood friend moves back home. It’s great to see them again, but they’re acting strangely. Gain an ally from the " + factionName + " faction.",
                    "",
                    "Your childhood friend moves back home. It’s great to see them again, but they’re acting strangely. You have gained an ally from the " + factionName + " faction."));
            }
            case 15:
                return new CareerEventModel(new EventModel(
                    "You thought that you’d gotten away with the crime you committed ten years ago, but new evidence has been discovered. Gain a Criminal Record.",
                    "",
                    "You thought that you’d gotten away with the crime you committed ten years ago, but new evidence has been discovered. You gain a Criminal Record.",
                    "CriminalRecord"));
            case 16:
                return new CareerEventModel(new EventModel(
                    "Due to what’s claimed to be a clerical error, your stored personality back-up is placed in a Lhost. Your IQ-doppelganger disappears before the error can be corrected.",
                    "IQ-Doppleganger",
                    "Due to what’s claimed to be a clerical error, your stored personality back-up is placed in a Lhost. Your IQ-doppelganger disappears before the error can be corrected."));
            case 17: {
                const attribute = Math.floor(Math.random() * character.attributes.length);
                const attr = Attribute[attribute];

                return new CareerEventModel(new EventModel(
                    "You volunteered to take part in a secret medical experiment. It failed. Reduce " + attr + " by 1 point.",
                    "",
                    "You volunteered to take part in a secret medical experiment. It failed."),
                    () => {
                        character.attributes[attribute].value--;
                    });
            }
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You show up for work one day and your employer is gone. The office is empty. Nobody is there. What happened? You are Fired.",
                    "Surrounded by Conspiracy",
                    "You show up for work one day and your employer is gone. The office is empty. Nobody is there. What happened? You are Fired.",
                    "Fired"));
            case 19:
                return new CareerEventModel(new EventModel(
                    "Your death is a famous event. How did it happen? Why is it so well known? Your character died and was resurrected. You gain 1 bonus Momentum on successful Social tests, but all Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem.",
                    "",
                    "Your death is a famous event. How did it happen? Why is it so well known? Your character died and was resurrected. You gain 1 bonus Momentum on successful Social tests, but all Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem.",
                    "Resurrection"),
                    () => {
                        character.applyDeath();
                    });
            case 20:
                return new CareerEventModel(new EventModel(
                    "You are suffering from the Chinese Curse: May you live in interesting times! You gain three career events for this career phase.",
                    "",
                    "",
                    "ChineseCurse"));
        }

        return null;
    }

    private rollOnAriadnaTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "Your work carries you to a different Ariadnan nation. Why did that go as well — or as poorly — as it did? Choose a different homeland.",
                    "A Different Home",
                    "Your work carries you to a different Ariadnan nation. Why did that go as well — or as poorly — as it did?",
                    "SelectHomeland"
                ));
            case 2:
                return new CareerEventModel(new EventModel(
                    "Bureau Toth brings you in for questioning. What do they want to know? They let you go, but under what condition?",
                    "On the Watchlist",
                    "Bureau Toth brings you in for questioning. What do they want to know? They let you go, but under what condition?"
                ));
            case 3:
                return new CareerEventModel(new EventModel(
                    "An Antipode attack demolishes your place of business, leaving it in shambles. You may not repeat or extend this career unless you lose 1 Earnings.",
                    "Harried",
                    "An Antipode attack demolishes your place of business, leaving it in shambles.",
                    "PayToContinue"
                ));
            case 4:
                return new CareerEventModel(new EventModel(
                    "When everything went to hell, through sheer stubbornness, you somehow kept it together.",
                    "Ariadnan Grit",
                    "When everything went to hell, through sheer stubbornness, you somehow kept it together."
                ));
            case 5:
                return new CareerEventModel(new EventModel(
                    "While out hiking, you stumble on to some interesting ruins.",
                    "Amateur Archaeologist",
                    "While out hiking, you stumble on to some interesting ruins."
                ));
            case 6:
                return new CareerEventModel(new EventModel(
                    "Your employer is incredibly enthusiastic for an offworld technological solution. How does it end in disaster? And why does it leave you suspicious of advanced technology?",
                    "Luddite",
                    "Your employer is incredibly enthusiastic for an offworld technological solution. How does it end in disaster? And why does it leave you suspicious of advanced technology?"
                ));
            case 7:
                return new CareerEventModel(new EventModel(
                    "You are the 'lucky winner' of a transfer to the front line.",
                    "Unwanted Draft",
                    "You are the 'lucky winner' of a transfer to the front line."
                ));
            case 8: {
                const faction = FactionsHelper.generateFaction(false, true);
                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You save a tourist from a horrible fate. Gain an ally in the ${factionName} faction.`,
                    "",
                    `You save a tourist from a horrible fate. Gain an ally in the ${factionName} faction.`
                ));
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "You find yourself caught in between a Dog Nation protest, and police forces. Why do people think you put the protesters 'in their place'? And what did you actually mean to do? Your new reputation precedes you; gain an additional point of momentum on Leadership tests.",
                    "Wolfsbane",
                    "You find yourself caught in between a Dog Nation protest, and police forces. Why do people think you put the protesters 'in their place'? And what did you actually mean to do? Your new reputation precedes you; gain an additional point of momentum on Leadership tests."
                ));
            case 10:
                return new CareerEventModel(new EventModel(
                    "You agree to let some Nomad 'friends' Install a Cube for you  This goes shockingly well.",
                    "",
                    "You agree to let some Nomad 'friends' Install a Cube for you  This goes shockingly well."
                ));
            case 11:
                return new CareerEventModel(new EventModel(
                    "You agree to let some Nomad 'friends' Install a Cube for you Unsurprisingly, this ends poorly. All Infowar attacks deal you an extra 1[CD] damage.",
                    "",
                    "You agree to let some Nomad 'friends' Install a Cube for you Unsurprisingly, this ends poorly. All Infowar attacks deal you an extra 1[CD] damage."
                ));
            case 12:
                return new CareerEventModel(new EventModel(
                    "You grow close to a Dog-Bowl player. What's the nature of your relationship?",
                    "Dog-Blooded Relation",
                    "You grow close to a Dog-Bowl player. What's the nature of your relationship?"
                ));
            case 13:
                return new CareerEventModel(new EventModel(
                    "Somehow, you find yourself in a duel. What brought this on? And what did it cost to succeed?",
                    "Duelling Scars",
                    "Somehow, you find yourself in a duel. What brought this on? And what did it cost to succeed?"
                ));
            case 14: {
                const faction = FactionsHelper.generateFaction(false, true);
                var factionName = FactionsHelper.getFaction(faction).name;

                if (faction === Faction.Ariadna) {
                    const birthplace = BirthPlacesHelper.generateBirthPlace(faction);
                    const homeland = BirthPlacesHelper.generateHomeland(birthplace.name);

                    if (homeland) {
                        factionName += ` (${homeland.name})`;
                    }
                }

                return new CareerEventModel(new EventModel(
                    `Someone you were close to (${factionName}) dies in an attack. Who was behind it? And what do you plan to do about it?`,
                    "Lost Friend",
                    `Someone you were close to (${factionName}) dies in an attack. Who was behind it? And what do you plan to do about it?`
                ));
            }
            case 15:
                return new CareerEventModel(new EventModel(
                    "You foiled an act of Galactic sabotage. Increase your Earnings by one for your act of balance sheet-friendly heroism.",
                    "Patriotism",
                    "You foiled an act of Galactic sabotage."
                ),
                () => { character.earnings++; });
            case 16:
                return new CareerEventModel(new EventModel(
                    "A disaster occurs; you grit your teeth and keep going. You gain one Life Point.",
                    "True Grit",
                    "A disaster occurs; you grit your teeth and keep going."
                ),
                () => { character.lifePoints++; });
            case 17:
                return new CareerEventModel(new EventModel(
                    "You are scouted by an unlikely employer. You may hazard your next career, even if you don’t meet the Faction or Homeland prerequisite.",
                    "",
                    "You are scouted by an unlikely employer."
                ),
                () => { character.ignoreHazardRequirements = true; });
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You are fired. What did you do, and why was it worth it?",
                    "Fired Relief",
                    "You are fired. What did you do, and why was it worth it?",
                    "Fired"
                ));
            case 19:
                return new CareerEventModel(new EventModel(
                    "You were killed, fighting for offworld employers. At least, that's the official story — only you know what really happened.",
                    "Officially Dead",
                    "You were killed, fighting for offworld employers. At least, that's the official story — only you know what really happened.",
                    "Resurrection"
                ));
            case 20:
                return new CareerEventModel(new EventModel(
                    "You’ve got the Devil’s Own Luck. Interesting Times ahead. You gain three career events for this career phase.",
                    "",
                    "",
                    "ChineseCurse"
                ));
            }
    }

    private rollOnAntipodeTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "Your Trinary link is violently severed. While in Mind-Shock, you’re taken in by a group of humans who nurse you back to health, though their reasons are hardly benevolent. You must take Assault Pack Member as your next career.",
                    "",
                    "Your Trinary link is violently severed. While in Mind-Shock, you’re taken in by a group of humans who nurse you back to health, though their reasons are hardly benevolent."),
                    () => { character.firstCareer = Career.AssaultPackMember; });
            case 2: {
                var location = DiceRoller.rollHitLocation();

                return new CareerEventModel(new EventModel(
                    "You are injured in a shooting accident. What were you doing? Who shot you? You have a gunshot wound that has not healed well in your " + location + ".",
                    "Old Wound",
                    "You are injured in a shooting accident. What were you doing? Who shot you? You have a gunshot wound that has not healed well in your " + location + "."));
            }
            case 3:
                return new CareerEventModel(new EventModel(
                    "You’ve been singled out as a problem by a group intent on solving you.",
                    "Priority Target",
                    "You’ve been singled out as a problem by a group intent on solving you."));
            case 4:
                return new CareerEventModel(new EventModel(
                    "A Rodinan strike force deploys makeshift biological weapons at you. You survive, but it’s difficult to think straight. Reduce your Intelligence by 1.",
                    "",
                    "A Rodinan strike force deploys makeshift biological weapons at you. You survive, but it’s difficult to think straight."),
                    () => { character.attributes[Attribute.Intelligence].value--; });
            case 5:
                return new CareerEventModel(new EventModel(
                    "A USAriadnan strike force shells your den. You make it out alive, but your hearing is permanently damaged. Increase the difficulty of all Observation tests based on hearing by +1.",
                    "",
                    "A USAriadnan strike force shells your den. You make it out alive, but your hearing is permanently damaged. Increase the difficulty of all Observation tests based on hearing by +1."));
            case 6:
                return new CareerEventModel(new EventModel(
                    "A Merovingian strike force attacks with experimental tranquilizers. You survive, but you’re still a little drowsy. Increase the difficulty of Surprise tests by +1.",
                    "Sleepy",
                    "A Merovingian strike force attacks with experimental tranquilizers. You survive, but you’re still a little drowsy. Increase the difficulty of Surprise tests by +1."));
            case 7:
                return new CareerEventModel(new EventModel(
                    "A Caledonian strike force attacks; it’s a bloody mess.",
                    "Scarred",
                    "A Caledonian strike force attacks; it’s a bloody mess."));
            case 8:
                return new CareerEventModel(new EventModel(
                    "You accidentally save a tourist from a horrible fate. Little did you know, they were Mayacasting at the time.",
                    "Entirely Misunderstood",
                    "You accidentally save a tourist from a horrible fate. Little did you know, they were Mayacasting at the time."));
            case 9:
                return new CareerEventModel(new EventModel(
                    "You encounter another tribe’s shaman, and something just clicks. Do you convert? And what article of faith spoke to you?",
                    "Religious/Spiritual Experience",
                    "You encounter another tribe’s shaman, and something just clicks. Do you convert? And what article of faith spoke to you?"));
            case 10:
                return new CareerEventModel(new EventModel(
                    "Outside of your Trinary, no one knows what you did. What did you do?",
                    "Paranoid",
                    "Outside of your Trinary, no one knows what you did. What did you do?"));
            case 11:
                return new CareerEventModel(new EventModel(
                    "You encounter a Dogface in battle; they feel impossibly familiar.",
                    "Vengeful Progeny",
                    "You encounter a Dogface in battle; they feel impossibly familiar."));
            case 12:
                return new CareerEventModel(new EventModel(
                    "You solved a puzzle that stumped your peers. Gain the Analysis talent: Pattern Recognition or another Analysis talent you meet the prerequisites for.",
                    "",
                    "You solved a puzzle that stumped your peers.",
                    "SelectTalentAnalysis"));
            case 13:
                return new CareerEventModel(new EventModel(
                    "You survive a terrible accident, but you’re not quite the same afterwards. Reduce your Agility, Brawn, or Coordination by 1.",
                    "",
                    "You survive a terrible accident, but you’re not quite the same afterwards.",
                    "ReduceAttributeAgility|Brawn|Coordination"));
            case 14:
                return new CareerEventModel(new EventModel(
                    "They say you can’t teach an old dog new tricks; you learn one anyway. Gain 1 rank of training in a skill you currently have no training in.",
                    "",
                    "They say you can’t teach an old dog new tricks; you learn one anyway.",
                    "IncreaseUntrained"));
            case 15:
                return new CareerEventModel(new EventModel(
                    "You survive a terrible accident... barely. Reduce your Vigour by 2.",
                    "",
                    "You survive a terrible accident... barely."),
                    () => { character.vigourReduction += 2; });
            case 16:
                return new CareerEventModel(new EventModel(
                    "You easily survive a terrible accident; you feel invincible.",
                    "Overconfident",
                    "You easily survive a terrible accident; you feel invincible."));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You discover a human language that actually works for you.",
                    "",
                    "You discover a human language that actually works for you.",
                    "LearnLanguage"));
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "After what you did, your pack could no longer stomach the sight of you. You are fired.",
                    "Unfriended",
                    "After what you did, your pack could no longer stomach the sight of you.",
                    "Fired"));
            case 19:
                return new CareerEventModel(new EventModel(
                    "After what happened, the rest of the pack thinks you’re cursed; they might not be wrong. Reduce your Infinity Point refresh rate (min 0).",
                    "",
                    "After what happened, the rest of the pack thinks you’re cursed; they might not be wrong."),
                    () => { character.infinityPoints = Math.max(0, character.infinityPoints - 1); });
            case 20:
                return new CareerEventModel(new EventModel(
                    "It seems you’re Destined for Greatness; what comes next may not be pleasant, but it will at least be interesting.",
                    "",
                    "It seems you’re Destined for Greatness; what comes next may not be pleasant, but it will at least be interesting.",
                    "ChineseCurse"));
        }
    }

    private rollOnDogfaceAndWulverTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "Your work carries you to a different Ariadnan nation. Why did that go as well — or as poorly — as it did? Choose a nation besides your own.",
                    "Relation to Another Nation",
                    "Your work carries you to a different Ariadnan nation. Why did that go as well — or as poorly — as it did?",
                    "SelectHomeland"));
            case 2: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name;

                return new CareerEventModel(new EventModel(
                    `You and an offworlder discover a shared interest, and bond immediately. Gain an ally in the ${faction} faction.`,
                    "",
                    `You and an offworlder discover a shared interest, and bond immediately. Gain an ally in the ${faction} faction.`));
            }
            case 3:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You catch your superior embezzling. You are fired the next morning.",
                    "Relieved of Duty",
                    "You catch your superior embezzling. You are fired the next morning.",
                    "Fired"));
            case 4:
                return new CareerEventModel(new EventModel(
                    "Some people have good luck. Others have bad luck. You, it seems, have luck. Gain 1 Life Point, but increase your complication range by +1 on Action Scene skill tests.",
                    "",
                    "Increase your complication range by +1 on Action Scene skill tests."),
                    () => { character.lifePoints++; });
            case 5:
                return new CareerEventModel(new EventModel(
                    "Your co-workers routinely decide to dump their work on you. To their surprise, you handle it with ease. Gain 1 rank of training in the elective skill you didn’t select for this career.",
                    "",
                    "Your co-workers routinely decide to dump their work on you. To their surprise, you handle it with ease.",
                    "IncreaseSkippedElective"));
            case 6:
                return new CareerEventModel(new EventModel(
                    "Despite being cut-off for weeks, you endure whatever the storm throws at you. Gain the Resistance talent: Sturdy, or another Resistance talent you meet the prerequisites for.",
                    "",
                    "Despite being cut-off for weeks, you endure whatever the storm throws at you.",
                    "SelectTalentResistance"));
            case 7: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name;

                return new CareerEventModel(new EventModel(
                    `Your whirlwind romance turns out to be part of a Galactic spy’s mission. Gain a contact in the ${faction} faction.`,
                    "",
                    `Your whirlwind romance turns out to be part of a Galactic spy’s mission. Gain a contact in the ${faction} faction.`));
            }
            case 8:
                return new CareerEventModel(new EventModel(
                    "You save a tourist from a horrible fate. Little did you know, they were Mayacasting at the time.",
                    "Unlikely Hero",
                    "You save a tourist from a horrible fate. Little did you know, they were Mayacasting at the time."));
            case 9:
                return new CareerEventModel(new EventModel(
                    "You encounter a Galactic missionary, and something just clicks. Do you convert? And what article of faith spoke to you?",
                    "Religious/Spiritual Experience",
                    "You encounter a Galactic missionary, and something just clicks. Do you convert? And what article of faith spoke to you?"));
            case 10:
                return new CareerEventModel(new EventModel(
                    "A distant relative passes, bequeathing you their treasures — some of which are even interesting — and their debts. Gain 10 doses of painkillers, 2 tiny Pets, a USAriadnan Entrenching tool, 2 Assets worth of Teseum, and debts worth 5 Assets.",
                    "",
                    "A distant relative passes, bequeathing you their treasures — some of which are even interesting — and their debts. You have a 5 Asset debt."),
                    () => {
                        character.addEquipment("Painkillers (10 doses)");
                        character.addEquipment("2 tiny Pets");
                        character.addEquipment("USAriadnan Entrenching Tool");
                        character.assets += 2;
                    });
            case 11:
                return new CareerEventModel(new EventModel(
                    "Desperate to prove yourself, you turn to stimulants to help you keep the pace. It works — sort of — but the cost is real. You can reduce the difficulty of hazarding your next career by 1. Also, choose a drug — you begin play at that drug's addiction threshold.",
                    "",
                    "Desperate to prove yourself, you turn to stimulants to help you keep the pace. It works — sort of — but the cost is real.",
                    "Rockstar"),
                    () => { character.hazardDecrease++; });
            case 12:
                return new CareerEventModel(new EventModel(
                    "You come home one night, and your partner is gone, leaving no notice, but taking their belongings with them.",
                    "Abandoned By Love",
                    "You come home one night, and your partner is gone, leaving no notice, but taking their belongings with them."));
            case 13:
                return new CareerEventModel(new EventModel(
                    "You survive a terrible accident, but you can’t get it out of your head. Reduce your Resolve by 2.",
                    "",
                    "You survive a terrible accident, but you can’t get it out of your head."),
                    () => { character.resolveReduction += 2; });
            case 14:
                return new CareerEventModel(new EventModel(
                    "They say you can’t teach an old dog new tricks; you learn one anyway. Gain 1 rank of training in a skill you currently have no training in.",
                    "",
                    "They say you can’t teach an old dog new tricks; you learn one anyway.",
                    "IncreaseUntrained"));
            case 15:
                return new CareerEventModel(new EventModel(
                    "You survive a terrible accident... barely. Reduce your Vigour by 2.",
                    "",
                    "You survive a terrible accident... barely."),
                    () => { character.vigourReduction += 2; });
            case 16:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You are fired. What did you do?",
                    "",
                    "You are fired. What did you do?",
                    "Fired"));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You discover a language that’s far easier to speak.",
                    "",
                    "You discover a language that’s far easier to speak.",
                    "LearnLanguage"));
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You are fired for no apparent reason; local news coverage is surprisingly sympathetic. You are fired. You may reduce the difficulty of hazarding your next career by 1. ",
                    "Relieved of Duty",
                    "You are fired for no apparent reason; local news coverage is surprisingly sympathetic."),
                    () => { character.hazardDecrease++; });
            case 19:
                return new CareerEventModel(new EventModel(
                    "You survive a terrible accident, but you’re not quite the same afterwards. Reduce three attributes of your choice by 1 each.",
                    "",
                    "You survive a terrible accident, but you’re not quite the same afterwards.",
                    "ReduceAttributes3"));
            case 20:
                return new CareerEventModel(new EventModel(
                    "You’ve got the Devil’s Own Luck. Interesting Times ahead.",
                    "",
                    "You’ve got the Devil’s Own Luck. Interesting Times ahead.",
                    "ChineseCurse"));
        }
    }

    private rollOnHaqqislamTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "An old mentor puts in a good word for you. Were there strings attached? You may hazard your next career, even if you don't meet the faction or other prerequisites.",
                    "",
                    "An old mentor puts in a good word for you. Were there strings attached?"
                ),
                    () => { character.ignoreHazardRequirements = true; });
            case 2:
                return new CareerEventModel(new EventModel(
                    "Muhafiz Agents followed you home one night. What did they think you know? Do you?",
                    "On the Watchlist",
                    "Muhafiz Agents followed you home one night. What did they think you know? Do you?"
                ));
            case 3:
                return new CareerEventModel(new EventModel(
                    "You’re forced to choose between your ideals and keeping your job. Either become Fired or reduce your Status by 1.",
                    "Idealistic Choice",
                    "You’re forced to choose between your ideals and keeping your job.",
                    "PayStatusToContinue"
                ));
            case 4:
                return new CareerEventModel(new EventModel(
                    "You stepped in to mediate a conflict before it turned violent. Gain 1 rank in Psychology.",
                    "",
                    "You stepped in to mediate a conflict before it turned violent.",
                    "IncreasePsychology"
                ));
            case 5:
                return new CareerEventModel(new EventModel(
                    "During a midnight visit to Medina’s coffeehouses, you played a competitive game of dominoes with a kindly older man. As he leaves, the barista looks like they’ve seen a ghost. If you attempt to hazard the Hassassin Fiday or Exemplar careers, reduce the difficulty by 1. If you choose to stay in your current career, increase your Status by 1.",
                    "",
                    "During a midnight visit to Medina’s coffeehouses, you played a competitive game of dominoes with a kindly older man. As he leaves, the barista looks like they’ve seen a ghost."
                ),
                    () => {
                        character.hassassinEvent = true;
                    });
            case 6:
                return new CareerEventModel(new EventModel(
                    "You spend so much time on caravanserai it starts to feel like home. You may choose the Trader or Caravaner career as your next career without making a hazard test.",
                    "",
                    "You spend so much time on caravanserai it starts to feel like home."
                ),
                    () => {
                        character.freeCareers.push(Career.Trader);
                        character.freeCareers.push(Career.Caravaner);
                    });
            case 7:
                return new CareerEventModel(new EventModel(
                    "You develop a rivalry with another Haqqislamite. Is it friendly? Deadly serious? What does your rival want?",
                    "Rivalry",
                    "You develop a rivalry with another Haqqislamite. Is it friendly? Deadly serious? What does your rival want?"
                ));
            case 8: {
                const faction = FactionsHelper.generateFaction(false, true);
                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You save a health tourist from a costly, serpent-related mistake. Gain an ally in the ${factionName} faction.`,
                    "",
                    `You save a health tourist from a costly, serpent-related mistake. Gain an ally in the ${factionName} faction.`
                ));
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "You embrace the faith’s teachings wholeheartedly. Some would say a little too much. You may choose Hassassin Fiday or Exemplar as your next career without making a hazard test.",
                    "Zealot",
                    "You embrace the faith’s teachings wholeheartedly. Some would say a little too much."
                ),
                    () => {
                        character.freeCareers.push(Career.HassassinFidayHaqqislam);
                        character.freeCareers.push(Career.HassassinExemplar);
                    });
            case 10:
                return new CareerEventModel(new EventModel(
                    "While on a solitary desert pilgrimage, you happen across a prominent figure in a bad way; your quick thinking and natural knowledge saves their life. Gain 1 rank in Survival. You may select the Akbar Doctor career without making a hazard test.",
                    "",
                    "While on a solitary desert pilgrimage, you happen across a prominent figure in a bad way; your quick thinking and natural knowledge saves their life.",
                    "IncreaseSurvival"
                ),
                    () => { character.freeCareers.push(Career.AkbarDoctor); });
            case 11:
                return new CareerEventModel(new EventModel(
                    "You participate in the Ocean of Fire race. Gain 1 rank in either Animal Handling or Pilot.",
                    "",
                    "You participate in the Ocean of Fire race.",
                    "IncreaseAnimal Handling|Pilot"
                ));
            case 12:
                return new CareerEventModel(new EventModel(
                    "You’re caught in the middle of a three-way grey market espionage tangle; someone needs to take the fall. You must pass a hazard test or become Fired.",
                    "",
                    "You’re caught in the middle of a three-way grey market espionage tangle; someone needs to take the fall.",
                    "HazardTestOrFired"
                ));
            case 13:
                return new CareerEventModel(new EventModel(
                    "A Silk Lord bequeaths you a portion of their wealth. Are you related? If not, why have they chosen you? Gain 5 assets.",
                    "",
                    "A Silk Lord bequeaths you a portion of their wealth. Are you related? If not, why have they chosen you?"
                ),
                    () => { character.assets += 5; });
            case 14: {
                const assets = DiceRoller.rollSpecial(4, 0).hits;

                return new CareerEventModel(new EventModel(
                    `Travelling on the Silk Route maglev, your train is ambushed in the Azar Desert. The fighting is brief, but intense. Your Vigour is reduced by 1 while you recover. You gain ${assets} assets has hazard pay.`,
                    "",
                    `Travelling on the Silk Route maglev, your train is ambushed in the Azar Desert. The fighting is brief, but intense.`
                ),
                    () => {
                        character.vigourReduction++;
                        character.assets += assets;
                    });
            }
            case 15: {
                const faction = FactionsHelper.generateFaction(false, true);
                const factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `Walking through Khadijah’s Garden of Dreaming Pillars, you chance across a secret meeting. What was it? You gain a rival in the ${factionName} faction. Lose 3 assets as they extract a modicum of financial revenge on you.`,
                    "",
                    `Walking through Khadijah’s Garden of Dreaming Pillars, you chance across a secret meeting. What was it? You gain a rival in the ${factionName} faction.`
                ),
                    () => { character.assets = Math.max(0, character.assets - 3); });
            }
            case 16:
                return new CareerEventModel(new EventModel(
                    "You volunteered for experimental medical treatments. They went well. Increase your Vigour by 1.",
                    "",
                    "You volunteered for experimental medical treatments. They went well."
                ),
                    () => { character.vigourReduction--; });
            case 17:
                return new CareerEventModel(new EventModel(
                    "You volunteered for experimental medical treatments. They went badly. Decrease your Vigour by 1.",
                    "",
                    "You volunteered for experimental medical treatments. They went badly."
                ),
                    () => { character.vigourReduction++; });
            case 18:
                if (isUnemployed) {
                    return this.generateEvent();
                }
                return new CareerEventModel(new EventModel(
                    "You are fired. What did you do? Why did you feel you had to do it?",
                    "Fired",
                    "You are fired. What did you do? Why did you feel you had to do it?",
                    "Fired"
                ));
            case 19:
                if (character.isAlMustaslaha()) {
                    return new CareerEventModel(new EventModel(
                        "You were murdered, or so the perpetrator thought. On the brink of death you are returned to life. Who was blamed for this, and who do you hold responsible?",
                        "Murdered",
                        "You were murdered, or so the perpetrator thought. On the brink of death you are returned to life. Who was blamed for this, and who do you hold responsible?"
                    ),
                        () => {
                            character.vigourReduction += 2;
                            character.resolveReduction--;
                        });
                }
                else {
                    return new CareerEventModel(new EventModel(
                        "You are murdered. Who was blamed for this, and who do you hold responsible? Your character died and was Resurrected.",
                        "Murdered",
                        "You are murdered. Who was blamed for this, and who do you hold responsible?",
                        "Resurrection"
                    ));
                }
            case 20:
                return new CareerEventModel(new EventModel(
                    "If you see the Lion’s Teeth, don’t assume that it’s smiling. And right now, you’re seeing a lot of teeth.",
                    "",
                    "",
                    "ChineseCurse"
                ));
        }
    }

    private rollOnPanOceaniaTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "Some of your investments pay off. You get 4 Assets.",
                    "",
                    "Some of your investments paid off."),
                    () => { character.assets += 4; });
            case 2:
                return new CareerEventModel(new EventModel(
                    "Bureau Toth brings you in for questioning. What do they want to know? They let you go, but under what condition?",
                    "On the Watchlist",
                    "Bureau Toth brings you in for questioning. What do they want to know? They let you go, but under what condition?"));
            case 3:
                return new CareerEventModel(new EventModel(
                    "Your words are badly misconstrued in an interview. Increase the difficulty of hazarding your next career by +1.",
                    "Antisocial Media",
                    "Your words were badly misconstrued in an interview."),
                    () => { character.hazardDecrease--; });
            case 4: {
                let roll = DiceRoller.rollSpecial(4, 0);
                let assets = roll.hits;
                assets -= roll.special;

                if (assets < 0) assets = 0;

                return new CareerEventModel(new EventModel(
                    `You invest in some high-risk stocks. You gain ${assets} Assets.`,
                    "",
                    "You invested in some high-risk stocks."),
                    () => { character.assets += assets; });
            }
            case 5:
                return new CareerEventModel(new EventModel(
                    "An old Maya post of yours goes viral overnight.",
                    "Fringe Celebrity",
                    "An old Maya post of yours went viral overnight."));
            case 6:
                return new CareerEventModel(new EventModel(
                    "Pitting rival employers against each other costs you your job but opens some doors. You are Fired, but you can reduce the difficulty of hazarding careers by 1.",
                    "The Door Swings Both Ways",
                    "Pitting rival employers against each other cost you your job but opens some doors.",
                    "Fired"),
                    () => { character.hazardDecrease++; });
            case 7:
                return new CareerEventModel(new EventModel(
                    "You are the “lucky winner” of a transfer to Paradiso. You may take Croc Man or Special Forces as your next Career without making a hazard test. ",
                    "Trouble in Paradiso",
                    "You became the “lucky winner” of a transfer to Paradiso."),
                    () => { character.freeCareers.push(Career.CrocMan); });
            case 8: {
                let faction = FactionsHelper.generateFaction(false, true);
                let factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You save a tourist from a horrible fate. You gain an ally in the ${factionName} faction.`,
                    "",
                    `You save a tourist from a horrible fate. You gain an ally in the ${factionName} faction.`));
            }
            case 9:
                return new CareerEventModel(new EventModel(
                    "You embrace the Church’s teachings wholeheartedly.",
                    "Zealot",
                    "You embrace the Church’s teachings wholeheartedly."),
                    () => {
                        character.freeCareers.push(Career.Priest);
                        character.freeCareers.push(Career.OrderSergeant);
                        character.freeCareers.push(Career.Knight);
                    });
            case 10:
                return new CareerEventModel(new EventModel(
                    "Circumstances converge to put you at the helm of a ship. What brought this on? Gain 1 rank in Spacecraft. You may choose Pilot, Ship Crew or Fighter Pilot as your next career.",
                    "",
                    "Circumstances converge to put you at the helm of a ship. What brought this on?",
                    "IncreaseSpacecraft"),
                    () => {
                        character.freeCareers.push(Career.Pilot);
                        character.freeCareers.push(Career.ShipCrew);
                        character.freeCareers.push(Career.FighterPilot);
                    });
            case 11:
                return new CareerEventModel(new EventModel(
                    "You arrive for work to find nothing. It’s as though your employer never existed. You may not elect to extend or repeat your current career.",
                    "Left in the Dark",
                    "You arrive for work to find nothing. It’s as though your employer never existed."),
                    () => { character.canExtendCareer = false; });
            case 12:
                return new CareerEventModel(new EventModel(
                    "You developed an obsession with a professional sports team. As go their fortunes, so go your moods.",
                    "Sports Fanatic",
                    "You developed an obsession with a professional sports team. As go their fortunes, so go your moods."));
            case 13:
                return new CareerEventModel(new EventModel(
                    "A Hexahedron agent visits your employer. The next day, your employee access has been revoked. What happened? You are Fired. You may choose either Hexas Agent or Criminal as your next career.",
                    "Hexahedron Casualty",
                    "A Hexahedron agent visits your employer. The next day, your employee access has been revoked. What happened?",
                    "Fired"),
                    () => {
                        character.freeCareers.push(Career.HexasAgent);
                        character.freeCareers.push(Career.Criminal);
                    });
            case 14:
                return new CareerEventModel(new EventModel(
                    "Someone close to you is a criminal, but you can’t bring yourself to turn them in. Why not?",
                    "Dirty Little Secret",
                    "Someone close to you is a criminal, but you can’t bring yourself to turn them in. Why not?"));
            case 15:
                return new CareerEventModel(new EventModel(
                    "You foiled an act of espionage against your employer. Gain +1 Earnings for your act of balance-sheet-friendly heroism.",
                    "Dangerously Curious",
                    "You foiled an act of espionage against your employer."),
                    () => { character.earnings++; });
            case 16:
                return new CareerEventModel(new EventModel(
                    "You are fired. What did you do, and why was it worth it?",
                    "",
                    "You are fired. What did you do, and why was it worth it?",
                    "Fired"));
            case 17:
                return new CareerEventModel(new EventModel(
                    "You are scouted by an unlikely employer. You may hazard your next career, even if you don’t meet the faction prerequisite.",
                    "",
                    "You were scouted by an unlikely employer."),
                    () => { character.ignoreHazardRequirements = true; });
            case 18:
                return new CareerEventModel(new EventModel(
                    "Some old Maya posts of yours get the wrong kind of attention before you can delete them. You are Fired.",
                    "Old Sins",
                    "Some old Maya posts of yours got the wrong kind of attention before you could delete them.",
                    "Fired"));
            case 19:
                return new CareerEventModel(new EventModel(
                    "You are murdered. Who was blamed for this, and who do you think was actually responsible? Your character died and was Resurrected.",
                    "Murdered",
                    "You are murdered. Who was blamed for this, and who do you think was actually responsible? Your character died and was Resurrected.",
                    "Resurrection"));
            case 20:
                return new CareerEventModel(new EventModel(
                    "You pay the Price of Ambition: things are about to get interesting. ",
                    "",
                    ""));
        }
    }

    private rollOnNomadsTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "An old contact from Praxis gets you into an experimental program after the first test subjects found the risks. Most of them. Either increase an Attribute of your choice by 1, gaining a 10 Asset debt along the way, or gain a contact in Praxis’s Black Labs.",
                    "",
                    "An old contact from Praxis gets you into an experimental program after the first test subjects found the risks. Most of them.",
                    "Praxis"));
            case 2:
                return new CareerEventModel(new EventModel(
                    "While on assignment, a hypercorp purchases a controlling interest in your client, resulting in mass layoffs. You’re in the process of organising a noisy response when an executive approaches you with a juicy offer. If you take the offer, increase Earnings by 1. Otherwise you are Fired.",
                    "",
                    "While on assignment, a hypercorp purchases a controlling interest in your client, resulting in mass layoffs. You’re in the process of organising a noisy response when an executive approaches you with a juicy offer.",
                    "JuicyOffer"));
            case 3:
                return new CareerEventModel(new EventModel(
                    "Someone looking exactly like you crashes through a window, accuses you of stealing their identity, and opens fire. After they’re chased off, you receive a notice: the technician who does your Cube backups has disappeared.",
                    "Cube Doppleganger",
                    "Someone looking exactly like you crashes through a window, accuses you of stealing their identity, and opens fire. After they’re chased off, you receive a notice: the technician who does your Cube backups has disappeared."));
            case 4:
                return new CareerEventModel(new EventModel(
                    "Coming back from a job, your pilot has a medical emergency, and you get shoved into the cockpit. It was certainly a learning experience. Gain 1 rank in Spacecraft.",
                    "",
                    "Coming back from a job, your pilot has a medical emergency, and you get shoved into the cockpit. It was certainly a learning experience.",
                    "IncreaseSpacecraft"));
            case 5: {
                let faction = FactionsHelper.generateFaction(false, true);
                let factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `During some routine external repairs, a sudden impact knocked you and your fellows loose. Your quick thinking managed to save some but not all of the crew. How did you choose? You gain contacts in ${factionName}.`,
                    "",
                    `During some routine external repairs, a sudden impact knocked you and your fellows loose. Your quick thinking managed to save some but not all of the crew. How did you choose? You gain contacts in ${factionName}.`));
            }
            case 6:
                return new CareerEventModel(new EventModel(
                    "You’re involved in spreading a memetic virus through Maya. ALEPH thanks you for your contributions with a quantronic virus of its own. Reduce Firewall by 1.",
                    "",
                    "You’re involved in spreading a memetic virus through Maya. ALEPH thanks you for your contributions with a quantronic virus of its own."),
                    () => { character.firewallReduction++; });
            case 7:
                return new CareerEventModel(new EventModel(
                    "When your ship was damaged in transit, everyone looked to you to make the zero-G repairs. Gain 1 rank in Extraplanetary.",
                    "",
                    "When your ship was damaged in transit, everyone looked to you to make the zero-G repairs.",
                    "IncreaseExtraplanetary"));
            case 8:
                return new CareerEventModel(new EventModel(
                    "Tinkering with your geist’s personality emulator, you wind up with mixed results. Increase your geist's Personality by 1.",
                    "Quirky Geist",
                    "Tinkering with your geist’s personality emulator, you wind up with mixed results."),
                    () => { character.geist.attributes[Attribute.Personality].value++; });
            case 9:
                return new CareerEventModel(new EventModel(
                    "While working planetside, you get a rare taste of terrestrial weather when you’re stranded for a week. Did it rain? Snow? Something worse? Gain 1 rank in Survival but gain a 2 Asset debt to your eventual rescuers.",
                    "",
                    "While working planetside, you get a rare taste of terrestrial weather when you’re stranded for a week. Did it rain? Snow? Something worse? Gain a 2 Asset debt to your eventual rescuers.",
                    "IncreaseSurvival"));
            case 10:
                return new CareerEventModel(new EventModel(
                    "Whether in salvage, falling off the back of a truck, or other means, you find a perfectly good Tinbot just lying around. Gain a Tinbot Remote.",
                    "Tinbot with Issues",
                    "Whether in salvage, falling off the back of a truck, or other means, you find a perfectly good Tinbot just lying around. Gain a Tinbot Remote."));
            case 11:
                return new CareerEventModel(new EventModel(
                    "After a workplace accident leaves you hospitalised, you opt to get some structural reinforcement. Reduce Vigour by 1 but gain a Subdermal Graft Augmentation.",
                    "",
                    "After a workplace accident leaves you hospitalised, you opt to get some structural reinforcement. Gain a Subdermal Graft Augmentation."),
                    () => { character.vigourReduction++; });
            case 12:
                return new CareerEventModel(new EventModel(
                    "The good news is that experimental brain surgery managed to remove all the shrapnel. The bad news is that some of your synapses are firing a little slower. The worse news is that you had shrapnel in your brain; how’d it get there? Reduce Intelligence by 1.",
                    "",
                    "The good news is that experimental brain surgery managed to remove all the shrapnel. The bad news is that some of your synapses are firing a little slower. The worse news is that you had shrapnel in your brain; how’d it get there?"),
                    () => { character.attributes[Attribute.Intelligence].value--; });
            case 13: {
                let faction = FactionsHelper.generateFaction(false, true);
                let factionName = FactionsHelper.getFaction(faction).name;

                return new CareerEventModel(new EventModel(
                    `You met the love of your life. But over time, you’ve come to suspect that they’re an Aspect of ALEPH. Do you confront them? Gain an ally/rival/something else in ${factionName}.`,
                    "",
                    `You met the love of your life. But over time, you’ve come to suspect that they’re an Aspect of ALEPH. Do you confront them? Gain an ally/rival/something else in ${factionName}.`));
            }
            case 14:
                return new CareerEventModel(new EventModel(
                    "You become part of a truly esoteric subculture.",
                    "Strange Life",
                    "You become part of a truly esoteric subculture."));
            case 15:
                return new CareerEventModel(new EventModel(
                    "You find yourself caught up in a controversy. A Tunguskan lawyer can help, but it won’t be cheap. Either reduce Social Status by one step, or gain an Asset debt, as expensive legal trickery saves you.",
                    "",
                    "You find yourself caught up in a controversy. A Tunguskan lawyer can help, but it won’t be cheap.",
                    "SocialReductionOrDebt"));
            case 16:
                return new CareerEventModel(new EventModel(
                    "You come across a Tunguskan Elite in some serious hot water. They lean on you to help them out, while Bureau Aegis tries to warn you away. Either course will have benefits and consequences. What do you do? If you choose to help them you gain a Criminal Record and spent time in jail, but gain 10 Assets. If you refuse to help, reduce Social Status by 1 and gain a rank in Discipline.",
                    "",
                    "You come across a Tunguskan Elite in some serious hot water. They lean on you to help them out, while Bureau Aegis tries to warn you away. Either course will have benefits and consequences. What do you do?",
                    "TunguskanElite"));
            case 17:
                return new CareerEventModel(new EventModel(
                    "A hobby invention of yours becomes a brief fad. Gain 5 Assets.",
                    "",
                    "A hobby invention of yours becomes a brief fad."),
                    () => { character.assets += 5; });
            case 18:
                return new CareerEventModel(new EventModel(
                    "You strongly disagree with your supervisor, and in grand Nomad tradition, express this by punching them in the face. You are Fired.",
                    "Stick to Your Principles",
                    "You strongly disagree with your supervisor, and in grand Nomad tradition, express this by punching them in the face.",
                    "Fired"));
            case 19:
                return new CareerEventModel(new EventModel(
                    "Whether by accident, recklessness, or something more sinister, you found out exactly how well those airlocks work and what it’s like to experience the wonders of space without a suit. You died and was resurrected.",
                    "Void Breather",
                    "Whether by accident, recklessness, or something more sinister, you found out exactly how well those airlocks work and what it’s like to experience the wonders of space without a suit. You died and was resurrected.",
                    "Resurrection"));
            case 20:
                return new CareerEventModel(new EventModel(
                    "",
                    "",
                    ""));
        }
    }

    private rollOnUpliftTable(roll: number, isUnemployed: boolean): CareerEventModel {
        switch (roll) {
            case 1:
                return new CareerEventModel(new EventModel(
                    "During a routine checkup, the doctors discover an incompatibility in two of your artificial organs; at least one is going to need replaced. Increase either Awareness or Agility by 1. However, decrease the Attribute you didn’t select by 1.",
                    "",
                    "During a routine checkup, the doctors discover an incompatibility in two of your artificial organs; at least one is going to need replaced.",
                    "IncreaseOneAttribute"));
            case 2:
                return new CareerEventModel(new EventModel(
                    "An Arachne series runs a feature on you. It isn’t exactly flattering, but it gets your name out there. Increase Lifestyle by 1 rank, but all Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem.",
                    "",
                    "Stealth tests are increased in difficulty by one step in situations where being recognised would cause you a problem.",
                    "IncreaseLifestyle"));
            case 3:
                return new CareerEventModel(new EventModel(
                    "You spend some time in a VaudeVille amateur performance troupe. Gain 1 rank in Acrobatics.",
                    "",
                    "You spend some time in a VaudeVille amateur performance troupe.",
                    "IncreaseAcrobatics"));
            case 4:
                return new CareerEventModel(new EventModel(
                    "Your geist was acting up, so you got it examined by some Clockmakers. Bad news: the quantronic virus wreaked havoc on your network. Good news: your geist is running better than ever. Reduce Firewall by 1, but add 4 skill ranks to your geist.",
                    "",
                    "Your geist was acting up, so you got it examined by some Clockmakers. Bad news: the quantronic virus wreaked havoc on your network. Good news: your geist is running better than ever.",
                    "IncreaseGeistSkills"));
            case 5:
                return new CareerEventModel(new EventModel(
                    "Doctors discover a strange growth. It’s removed without complications, but your musculature atrophies from the treatments. Reduce Brawn by 1.",
                    "",
                    "Doctors discover a strange growth. It’s removed without complications, but your musculature atrophies from the treatments"),
                    () => { character.attributes[Attribute.Brawn].value--; });
            case 6: {
                const debt = DiceRoller.rollSpecial(4, 4).hits;

                return new CareerEventModel(new EventModel(
                    `You enter a high-stakes card game and lose, badly. You gain a ${debt} Asset debt.`,
                    "",
                    `You enter a high-stakes card game and lose, badly. You gain a ${debt} Asset debt.`));
            }
            case 7:
                return new CareerEventModel(new EventModel(
                    "When your shuttle pilot has an accident, everyone looks to you to take the helm. Gain 1 rank in Spacecraft.",
                    "",
                    "When your shuttle pilot has an accident, everyone looks to you to take the helm.",
                    "IncreaseSpacecraft"));
            case 8:
                return new CareerEventModel(new EventModel(
                    "Sick of being treated like a mascot, you express your displeasure in dramatic, public fashion. You are Fired.",
                    "Sick and Tired",
                    "Sick of being treated like a mascot, you express your displeasure in dramatic, public fashion.",
                    "Fired"));
            case 9:
                return new CareerEventModel(new EventModel(
                    "When some of your biografts start wearing out, you don’t repair or replace; you upgrade. Increase Brawn by 1 and gain  a 5 Asset debt.",
                    "",
                    "When some of your biografts start wearing out, you don’t repair or replace; you upgrade. You have a 5 Asset debt."),
                    () => { character.attributes[Attribute.Brawn].value++; });
            case 10:
                return new CareerEventModel(new EventModel(
                    "Most people are immune to animal-specific diseases, and vice versa. You, however, seem to have gotten the worst of both worlds. Reduce Vigour by 1.",
                    "Allergic to Everything",
                    "Most people are immune to animal-specific diseases, and vice versa. You, however, seem to have gotten the worst of both worlds."),
                    () => { character.vigourReduction++; });
            case 11:
                return new CareerEventModel(new EventModel(
                    "You overclock your personal area network; while your Comlog sometimes runs hot, the results speak for themselves. Increase Hacking by 1 rank.",
                    "Overclocked Network",
                    "You overclock your personal area network; while your Comlog sometimes runs hot, the results speak for themselves.",
                    "IncreaseHacking"));
            case 12:
                return new CareerEventModel(new EventModel(
                    "You spend some time on assignment with Corregidor . Did you make any friends? Enemies? Gain 1 rank in Extraplanetary and a contact on Corregidor.",
                    "",
                    "You spend some time on assignment with Corregidor . Did you make any friends? Enemies? You have a contact on Corregidor.",
                    "IncreaseExtraplanetary"));
            case 13: {
                const assets = DiceRoller.rollSpecial(4, 4).hits;

                return new CareerEventModel(new EventModel(
                    `You enter—and win—a high stakes card game though the Submondo running it are convinced you cheated. Did you? Gain ${assets} Assets and a Submondo rival.`,
                    "",
                    `You enter—and win—a high stakes card game though the Submondo running it are convinced you cheated. Did you? You have a Submondo rival.`),
                    () => { character.assets += assets; });
            }
            case 14:
                return new CareerEventModel(new EventModel(
                    "Caught in the same firefight, you’re saved by a Reverend Healer-Killer. After some tense discussion on whether or not Uplifts have a soul, you think you hit it off. Gain a contact in the Observance of Saint Mary the Knife.",
                    "",
                    "Caught in the same firefight, you’re saved by a Reverend Healer-Killer. After some tense discussion on whether or not Uplifts have a soul, you think you hit it off. Gain a contact in the Observance of Saint Mary the Knife."));
            case 15:
                return new CareerEventModel(new EventModel(
                    "As someone who underwent an Awakening, you can’t help but notice that your geist is asking increasingly self-aware questions. Your Geist's Awareness and Intelligence are increased by 2.",
                    "Rogue Geist",
                    "As someone who underwent an Awakening, you can’t help but notice that your geist is asking increasingly self-aware questions."),
                    () => {
                        character.attributes[Attribute.Awareness].value += 2;
                        character.attributes[Attribute.Intelligence].value += 2;
                    });
            case 16:
                return new CareerEventModel(new EventModel(
                    "Your supervisor puts you in charge of a charity petting zoo. Jokes aside, it goes well. Gain 1 ranki in Animal Handling.",
                    "",
                    "Your supervisor puts you in charge of a charity petting zoo. Jokes aside, it goes well",
                    "IncreaseAnimal Handling"));
            case 17:
                return new CareerEventModel(new EventModel(
                    "A minor celebrity freaks out when they see you at work, and their rant goes viral. You are Fired.",
                    "Subject of Discrimination",
                    " minor celebrity freaks out when they see you at work, and their rant goes viral. You were Fired.",
                    "Fired"));
            case 18: {
                const faction = FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true));

                return new CareerEventModel(new EventModel(
                    `Clandestine operatives abduct you, but Nomad Infiltrators puts a bullet in your head before the vivisection begins. Much to your surprise, you wake up in Praxis. You were dead and has become resurrected. You gain an enemy in ${faction.name}.`,
                    "",
                    `Clandestine operatives abduct you, but Nomad Infiltrators puts a bullet in your head before the vivisection begins. Much to your surprise, you wake up in Praxis. You were dead and has became resurrected. You gain an enemy in ${faction.name}.`,
                    "Resurrection"));
            }
            case 19:
            case 20:
                return new CareerEventModel(new EventModel(
                    "",
                    "",
                    ""));
        }
    }
}

export const CareerEventsHelper = new CareerEvents();