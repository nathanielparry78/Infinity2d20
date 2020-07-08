import {DiceRoller} from './diceRoller';
import {Faction, FactionsHelper} from './factions';
import {SocialClassesHelper} from './socialClasses';
import {BirthPlacesHelper} from './birthPlaces';
import {AlienHost} from './alienHosts';
import {character} from '../common/character';

export class YouthEventModel {
    private _description: string;
    private _onApply: () => void;

    constructor(description: string, onApply?: () => void) {
        this._description = description;
        this._onApply = onApply;
    }

    get description() {
        return this._description;
    }

    set description(val: string) {
        this._description = val;
    }

    apply() {
        this._onApply();
    }
}

export class CompositeYouthEventModel extends YouthEventModel {
    private _event1: YouthEventModel;
    private _event2: YouthEventModel;

    constructor(event1: YouthEventModel, event2: YouthEventModel) {
        super("");
        this._event1 = event1;
        this._event2 = event2;
    }

    get description() {
        return this._event1.description + " & " + this._event2.description;
    }

    apply() {
        if (this._event1.apply) this._event1.apply();
        if (this._event2.apply) this._event2.apply();
    }
}

export class YouthEvents {
    generateEvent() {
        var type = Math.floor(Math.random() * 20) + 1;
        var roll = Math.floor(Math.random() * 6) + 1;
        var event = this.getEvent(type, roll);
        return event;
    }

    getEvent(type: number, roll: number): YouthEventModel {
        if (character.host === AlienHost.Dogface ||
            character.host === AlienHost.Wulver) {
            return this.getDogfaceOrWulverEvent(type, roll);
        }
        else if (character.host === AlienHost.Antipode) {
            return this.getAntipodeEvent(type, roll);
        }

        switch (type) {
            case 1:
            case 2:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Witnessed perjury", () => { });
                        case 2: return new YouthEventModel("Witnessed a murder", () => { });
                        case 3: return new YouthEventModel("Witnessed police corruption", () => { });
                        case 4: return new YouthEventModel("Witnessed assassination", () => { });
                        case 5: return new YouthEventModel("Witnessed high level corruption", () => { });
                        case 6: return new YouthEventModel("Witnessed a secret pregnancy", () => { });
                    }
                }
                break;
            case 3:
            case 4:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Witnessed embezzlement", () => { });
                        case 2: return new YouthEventModel("Witnessed a violent crime", () => { });
                        case 3: return new YouthEventModel("Witnessed long term abuse", () => { });
                        case 4: return new YouthEventModel("Witnessed cybercrime", () => { });
                        case 5: return new YouthEventModel("Witnessed backroom deals being made", () => { });
                        case 6: return new YouthEventModel("Witnessed political corruption", () => { });
                    }
                }
                break;
            case 5:
            case 6:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Involved in an accident", () => { });
                        case 2: return new YouthEventModel("Involved in a shooting", () => { });
                        case 3: return new YouthEventModel("Involved in a transit disaster", () => { });
                        case 4: return new YouthEventModel("Involved in police action", () => { });
                        case 5: return new YouthEventModel("Involved in a scandal", () => { });
                        case 6: return new YouthEventModel("Involved in mass arrests", () => { });
                    }
                }
                break;
            case 7:
            case 8:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Involved in a suicide", () => { });
                        case 2: return new YouthEventModel("Involved in narcotics sale", () => { });
                        case 3: return new YouthEventModel("Involved in Resurrection Lottery", () => { });
                        case 4: return new YouthEventModel("Involved in faking a suicide", () => { });
                        case 5: return new YouthEventModel("Involved in a cover up", () => { });
                        case 6: return new YouthEventModel("Involved in smuggling", () => { });
                    }
                }
                break;
            case 9:
            case 10:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Discovered your religion", () => { });
                        case 2: return new YouthEventModel("Discovered a suicide", () => { });
                        case 3: return new YouthEventModel("Discovered a fandom", () => { });
                        case 4: return new YouthEventModel("Discovered a secret", () => { });
                        case 5: return new YouthEventModel("Discovered an infiltration", () => { });
                        case 6: return new YouthEventModel("Discovered elite hypocrisy", () => { });
                    }
                }
                break;
            case 11:
            case 12:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Discovered a family secret", () => { });
                        case 2: return new YouthEventModel("Discovered a body", () => { });
                        case 3: return new YouthEventModel("Discovered a valuable secret", () => { });
                        case 4: return new YouthEventModel("Discovered sexual attraction", () => { });
                        case 5: return new YouthEventModel("Discovered personality tampering", () => { });
                        case 6: return new YouthEventModel("Discovered a scandal", () => { });
                    }
                }
                break;
            case 13:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Family Change: " + DiceRoller.rollSpecial(6, 1).hits + " Siblings", () => { });
                        case 2: return new YouthEventModel("Family Change: parents killed", () => { });
                        case 3: return new YouthEventModel("Family Change: parent walks out", () => { });
                        case 4: return new YouthEventModel("Family Change: kidnapped", () => { });
                        case 5: return new YouthEventModel("Family Change: family member resurrected", () => { });
                        case 6: return new YouthEventModel("Family Change: population relocation", () => { });
                    }
                }
                break;
            case 14:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Family Change: divorce", () => { });
                        case 2: return new YouthEventModel("Family Change: sibling killed at a young age", () => { });
                        case 3: return new YouthEventModel("Family Change: gained an extended family", () => { });
                        case 4: return new YouthEventModel("Family Change: parents incarcerated", () => { });
                        case 5: return new YouthEventModel("Family Change: family member's Cube corrupted", () => { });
                        case 6: return new YouthEventModel("Family Change: moved to a new planet", () => { });
                    }
                }
                break;
            case 15:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Media Fad: joined a popular movement", () => { });
                        case 2: return new YouthEventModel("Media Fad: joined a radical movement", () => { });
                        case 3: return new YouthEventModel("Media Fad: got involved in life-streaming", () => { });
                        case 4: return new YouthEventModel("Media Fad: established Arachne nodes", () => { });
                        case 5: return new YouthEventModel("Media Fad: Maya addiction", () => { });
                        case 6: return new YouthEventModel("Media Fad: appeared on a popular Maya broadcast", () => { });
                    }
                }
                break;
            case 16:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Succumbed to propaganda", () => { });
                        case 2: return new YouthEventModel("Succumbed to social exclusion", () => { });
                        case 3: return new YouthEventModel("Succumbed to a scam", () => { });
                        case 4: return new YouthEventModel("Succumbed to personality tampering", () => { });
                        case 5: return new YouthEventModel("Succumbed to boredom", () => { });
                        case 6: return new YouthEventModel("Succumbed to brainwashing", () => { });
                    }
                }
                break;
            case 17:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Social Contacts: escaped the neighbourhood", () => { });
                        case 2: return new YouthEventModel("Social Contacts: had brush with opposite social class", () => { });
                        case 3: return new YouthEventModel("Social Contacts: gained enemy (" + FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name + ")", () => { });
                        case 4: return new YouthEventModel("Social Contacts: gained contact (" + FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name + ")", () => { });
                        case 5: return new YouthEventModel("Social Contacts: gained mentor (" + FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name + ")", () => { });
                        case 6: return new YouthEventModel("Social Contacts: joined Submondo faction", () => { });
                    }
                }
                break;
            case 18:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Gained a one asset debt: You owe someone a debt worth one Asset", () => { });
                        case 2: return new YouthEventModel("Cube destruction: The Cube used to store your personality has been destroyed. You'll begin play without a Cube.", () => { });
                        case 3: return new YouthEventModel("Cube theft: Your Cube or the data on your Cube was stolen. Who took it? Do they still have it? What have they done with it?", () => { });
                        case 4: return new YouthEventModel("Changed social class: During your youth, your family experienced a shift in their economic status (" + SocialClassesHelper.getSocialClass(this.getNewSocialClass()).name + ")", () => { this.changeSocialClass() });
                        case 5: return new YouthEventModel("Gain one asset:  You've gained one additional Asset", () => { character.assets++; });
                        case 6: return new YouthEventModel("Defection! You've switched allegiance to a new faction (" + FactionsHelper.getFaction(this.getNewFaction()).name + ")", () => { this.defect(); });
                    }
                }
                break;
            case 19:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Learned a new language (" + this.getNewLanguage() + ")", () => { this.learnLanguage() });
                        case 2: return this.blackmailMaterial();
                        case 3: return new YouthEventModel("Biological/Chemical weapons: You were exposed to some form of biological weapon. Reduce one attribute of your choice by one point.", () => { });
                        case 4: return new YouthEventModel("Radical biomodification: You gain a Cosmetic Augmentation 3 (3 bonus Momentum on tests based on appearance or social interaction, but increase repercussion range by +3 outside of the target subculture. Describe how your body has been transformed.", () => { });
                        case 5: return this.seriousGeneticIllness();
                        case 6: return new YouthEventModel("Died! Your character died and was resurrected.", () => { character.applyDeath() });
                    }
                }
                break;
            case 20:
                {
                    var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    return new CompositeYouthEventModel(roll1, roll2);
                }
        }

        return null;
    }

    getDetailView(event: YouthEventModel) {
        return (
            event.description.indexOf("Biological/Chemical weapons") > -1 ||
            event.description.indexOf("Died!") > -1
        );
    }

    private getDogfaceOrWulverEvent(type: number, roll: number): YouthEventModel {
        switch (type) {
            case 1:
            case 2:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Survived an Antipode assault", () => { });
                        case 2: return new YouthEventModel("Survived a wild animal attack", () => { });
                        case 3: return new YouthEventModel("Survived getting stranded", () => { });
                        case 4: return new YouthEventModel("Survived a natural disaster", () => { });
                        case 5: return new YouthEventModel("Survived a border skirmish", () => { });
                        case 6: return new YouthEventModel("Survived severe drought/famine", () => { });
                    }
                }
                break;
            case 3:
            case 4:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Survived kidnapping", () => { });
                        case 2: return new YouthEventModel("Survived sabotage", () => { });
                        case 3: return new YouthEventModel("Survived violent riots", () => { });
                        case 4: return new YouthEventModel("Survived an accident", () => { });
                        case 5: return new YouthEventModel("Survived a shooting", () => { });
                        case 6: return new YouthEventModel("Survived a Submondo raid", () => { });
                    }
                }
                break;
            case 5:
            case 6:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Witnessed perjury", () => { });
                        case 2: return new YouthEventModel("Witnessed a murder", () => { });
                        case 3: return new YouthEventModel("Witnessed assassination", () => { });
                        case 4: return new YouthEventModel("Witnessed political corruption", () => { });
                        case 5: return new YouthEventModel("Witnessed a violent crime", () => { });
                        case 6: return new YouthEventModel("Witnessed a long-term abuse", () => { });
                    }
                }
                break;
            case 7:
            case 8:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Witnessed betrayal", () => { });
                        case 2: return new YouthEventModel("Witnessed bigotry", () => { });
                        case 3: return new YouthEventModel("Witnessed an Antipode attack", () => { });
                        case 4: return new YouthEventModel("Witnessed hypocrisy", () => { });
                        case 5: return new YouthEventModel("Witnessed selfless bravery", () => { });
                        case 6: return new YouthEventModel("Witnessed heroic sacrifice", () => { });
                    }
                }
                break;
            case 9:
            case 10:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Involved in a cover-up", () => { });
                        case 2: return new YouthEventModel("Involved in smuggling", () => { });
                        case 3: return new YouthEventModel("Involved in amateur Dog-Bowl", () => { });
                        case 4: return new YouthEventModel("Involved in Dog Nation protests", () => { });
                        case 5: return new YouthEventModel("Involved in charity work", () => { });
                        case 6: return new YouthEventModel("Involved in gang activity", () => { });
                    }
                }
                break;
            case 11:
            case 12:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Discovered religion", () => { });
                        case 2: return new YouthEventModel("Discovered scientific curiosity", () => { });
                        case 3: return new YouthEventModel("Discovered artistic talent", () => { });
                        case 4: return new YouthEventModel("Discovered sexual attraction", () => { });
                        case 5: return new YouthEventModel("Discovered a dead body", () => { });
                        case 6: return new YouthEventModel("Discovered archeological ruins", () => { });
                    }
                }
                break;
            case 13:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Family Change: parents (re)marries", () => { });
                        case 2: return new YouthEventModel("Family Change: parent(s) disappear", () => { });
                        case 3: return new YouthEventModel("Family Change: parent(s) killed", () => { });
                        case 4: return new YouthEventModel("Family Change: parent walks out", () => { });
                        case 5: return new YouthEventModel("Family Change: parents incarcerated", () => { });
                        case 6: return new YouthEventModel("Family Change: parent(s) sent to front", () => { });
                    }
                }
                break;
            case 14:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Family Change: Wulver sibling born", () => { });
                        case 2: return new YouthEventModel("Family Change: Dogface sibling born", () => { });
                        case 3: return new YouthEventModel("Family Change: adopted sibling", () => { });
                        case 4: return new YouthEventModel("Family Change: " + DiceRoller.rollSpecial(8, 1).hits + " new Siblings", () => { });
                        case 5: return new YouthEventModel("Family Change: divorce", () => { });
                        case 6: return new YouthEventModel("Family Change: moved to new nation", () => { });
                    }
                }
                break;
            case 15:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Succumbed to Galactic propaganda", () => { });
                        case 2: return new YouthEventModel("Succumbed to toxic nationalism", () => { });
                        case 3: return new YouthEventModel("Succumbed to despair", () => { });
                        case 4: return new YouthEventModel("Succumbed to mental illness", () => { });
                        case 5: return new YouthEventModel("Succumbed to peer pressure", () => { });
                        case 6: return new YouthEventModel("Succumbed to loneliness", () => { });
                    }
                }
                break;
            case 16:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Social Contacts: Made a friend in opposite social class", () => { });
                        case 2: return new YouthEventModel(`Social Contacts: Gained mentor (${BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false).name})`, () => { });
                        case 3: return new YouthEventModel(`Social Contacts: Gained contact (${BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false).name})`, () => { });
                        case 4: return new YouthEventModel(`Social Contacts: Galactic contact (${FactionsHelper.getFaction(FactionsHelper.generateFaction(false, true)).name})`, () => { });
                        case 5: return new YouthEventModel("Social Contacts: Submondo contact", () => { });
                        case 6: return new YouthEventModel("Social Contacts: Mercenary contact", () => { });
                    }
                }
                break;
            case 17:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Entrusted with an heirloom", () => { });
                        case 2: return new YouthEventModel("Entrusted with a commendation", () => { });
                        case 3: return new YouthEventModel("Entrusted with a task", () => { });
                        case 4: return new YouthEventModel("Entrusted with a legacy", () => { });
                        case 5: return new YouthEventModel("Entrusted with a secret", () => { });
                        case 6: return new YouthEventModel("Entrusted with a Cube", () => { });
                    }
                }
                break;
            case 18:
                {
                    switch (roll) {
                        case 1: 
                        case 2: return new YouthEventModel("Gained a 1 Asset debt", () => { });
                        case 3: return new YouthEventModel("Gained a Cube - no strings", () => { });
                        case 4: return new YouthEventModel("Gained a Cube - strings", () => { });
                        case 5: return new YouthEventModel(`Gained a ${DiceRoller.rollSpecial(3, 0).hits} Asset debt`, () => { });
                        case 6: return new YouthEventModel(`Gained a ${DiceRoller.rollSpecial(5, 0).hits} Asset debt`, () => { });
                    }
                }
                break;
            case 19:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel(`Learned a Galactic language (${this.getNewLanguage()})`, () => { this.learnLanguage(); });
                        case 2: return new YouthEventModel(`Learned an Ariadnan language (${this.learnFactionLanguage(Faction.Ariadna)})`, () => { this.learnLanguage(); });
                        case 3: return this.blackmailMaterial();
                        case 4: return this.blackmailAriadnan();
                        case 5: return this.seriousGeneticIllness();
                        case 6: return this.vigorPoison(5, 1);
                    }
                }
                break;
            case 20:
                {
                    var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    return new CompositeYouthEventModel(roll1, roll2);
                }
        }

        return null;
    }

    private getAntipodeEvent(type: number, roll: number): YouthEventModel {
        switch (type) {
            case 1:
            case 2:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Survived an Ariadnan assault", () => { });
                        case 2: return new YouthEventModel("Survived a wild animal attack", () => { });
                        case 3: return new YouthEventModel("Survived getting stranded", () => { });
                        case 4: return new YouthEventModel("Survived a natural disaster", () => { });
                        case 5: return new YouthEventModel("Survived a border skirmish", () => { });
                        case 6: return new YouthEventModel("Survived severe drought/famine", () => { });
                    }
                }
                break;
            case 3:
            case 4:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Survived infighting", () => { });
                        case 2: return new YouthEventModel("Survived Ariadnan sabotage", () => { });
                        case 3: return new YouthEventModel("Survived a Warlord coup", () => { });
                        case 4: return new YouthEventModel("Survived an accident", () => { });
                        case 5: return new YouthEventModel("Survived an excursion to Ariadna", () => { });
                        case 6: return new YouthEventModel("Survived Ariadnans fighting galactics", () => { });
                    }
                }
                break;
            case 5:
            case 6:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Witnessed a kidnapping", () => { });
                        case 2: return new YouthEventModel("Witnessed a murder", () => { });
                        case 3: return new YouthEventModel("Witnessed broken vows", () => { });
                        case 4: return new YouthEventModel("Witnessed Mind-Shock", () => { });
                        case 5: return new YouthEventModel("Witnessed despair", () => { });
                        case 6: return new YouthEventModel("Witnessed indescribable beauty", () => { });
                    }
                }
                break;
            case 7:
            case 8:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Witnessed betrayal", () => { });
                        case 2: return new YouthEventModel("Witnessed bigotry", () => { });
                        case 3: return new YouthEventModel("Witnessed a Galactic attack", () => { });
                        case 4: return new YouthEventModel("Witnessed hypocrisy", () => { });
                        case 5: return new YouthEventModel("Witnessed selfless bravery", () => { });
                        case 6: return new YouthEventModel("Witnessed heroic sacrifice", () => { });
                    }
                }
                break;
            case 9:
            case 10:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Involved in a raid", () => { });
                        case 2: return new YouthEventModel("Involved in an attack", () => { });
                        case 3: return new YouthEventModel("Involved in keeping a secret", () => { });
                        case 4: return new YouthEventModel("Involved in spying on Ariadnans", () => { });
                        case 5: return new YouthEventModel("Involved in religious rites", () => { });
                        case 6: return new YouthEventModel("Involved in a coup", () => { });
                    }
                }
                break;
            case 11:
            case 12:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Discovered religion", () => { });
                        case 2: return new YouthEventModel("Discovered a stray human", () => { });
                        case 3: return new YouthEventModel("Discovered artistic talent", () => { });
                        case 4: return new YouthEventModel("Discovered sexual attraction", () => { });
                        case 5: return new YouthEventModel("Discovered a body", () => { });
                        case 6: return new YouthEventModel("Discovered archeological ruins", () => { });
                    }
                }
                break;
            case 13:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Family Change: parental Trinary dissolves", () => { });
                        case 2: return new YouthEventModel("Family Change: parental Trinary abandons you", () => { });
                        case 3: return new YouthEventModel("Family Change: parental Trinary killed", () => { });
                        case 4: return new YouthEventModel("Family Change: parental Trinary suffers Mind-Shock", () => { });
                        case 5: return new YouthEventModel("Family Change: parental Trinary kidnapped", () => { });
                        case 6: return new YouthEventModel("Family Change: parental Trinary goes missing", () => { });
                    }
                }
                break;
            case 14:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Family Change: one parent sires a Dogface", () => { });
                        case 2: return new YouthEventModel("Family Change: parental Trinary sires new litter", () => { });
                        case 3: return new YouthEventModel("Family Change: littermate dies", () => { });
                        case 4: return new YouthEventModel("Family Change: littermate can't form Trinary", () => { });
                        case 5: return new YouthEventModel("Family Change: littermate kidnapped", () => { });
                        case 6: return new YouthEventModel("Family Change: littermate returns in Assault Pack", () => { });
                    }
                }
                break;
            case 15:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Succumbed to illness", () => { });
                        case 2: return new YouthEventModel("Succumbed to savage urges", () => { });
                        case 3: return new YouthEventModel("Succumbed to despair", () => { });
                        case 4: return new YouthEventModel("Succumbed to mental illness", () => { });
                        case 5: return new YouthEventModel("Succumbed to xenophobia", () => { });
                        case 6: return new YouthEventModel("Succumbed to loneliness", () => { });
                    }
                }
                break;
            case 16:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel(`Your First Trinary: made a friend in Ariadna (${BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false).name})`, () => { });
                        case 2: return new YouthEventModel(`Your First Trinary: distinguished itself during a hunt`, () => { });
                        case 3: return new YouthEventModel(`Your First Trinary: cannot agree on anything`, () => { });
                        case 4: return new YouthEventModel(`Your First Trinary: captured a human`, () => { });
                        case 5: return new YouthEventModel("Your First Trinary: created notable artwork", () => { });
                        case 6: return new YouthEventModel("Your First Trinary: was barely sapient", () => { });
                    }
                }
                break;
            case 17:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Your First Trinary: was paranoid", () => { });
                        case 2: return new YouthEventModel("Your First Trinary: longed for adventure", () => { });
                        case 3: return new YouthEventModel("Your First Trinary: fears change", () => { });
                        case 4: return new YouthEventModel("Your First Trinary: continues a great legacy", () => { });
                        case 5: return new YouthEventModel("Your First Trinary: bears a secret memory", () => { });
                        case 6: return new YouthEventModel("Your First Trinary: rejected you", () => { });
                    }
                }
                break;
            case 18:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel("Gained 2 Assets", () => { character.assets += 2; });
                        case 2: return new YouthEventModel("Gained 1 Asset", () => { character.assets++; });
                        case 3:
                        case 4: return this.vigorPoison(1, 0);
                        case 5: return new YouthEventModel(`You spent some time in the Nomad faction. You have a contact/enemy in that faction and learned a new language (${this.learnFactionLanguage(Faction.Nomads)})`, () => { this.learnLanguage(); });
                        case 6: return new YouthEventModel(`You spent some time in the Ariadna faction. You have a contact/enemy in that faction and learned a new language (${this.learnFactionLanguage(Faction.Ariadna)})`, () => { this.learnLanguage(); });
                    }
                }
                break;
            case 19:
                {
                    switch (roll) {
                        case 1: return new YouthEventModel(`Learned an Ariadnan language (${this.learnFactionLanguage(Faction.Ariadna)})`, () => { this.learnLanguage(); });
                        case 2: return new YouthEventModel(`Learned a Galactic language (${this.getNewLanguage()})`, () => { this.learnLanguage(); });
                        case 3: return this.vigorPoison(2, 0);
                        case 4: return this.blackmailAriadnan();
                        case 5: return this.seriousGeneticIllness();
                        case 6: return this.vigorPoison(4, 1);
                    }
                }
                break;
            case 20:
                {
                    var roll1 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    var roll2 = this.getEvent(Math.floor(Math.random() * 19) + 1, Math.floor(Math.random() * 6) + 1);
                    return new CompositeYouthEventModel(roll1, roll2);
                }
        }

        return null;
    }

    private changeSocialClass() {
        var event = character.youthEvent;
        var s = event.description.indexOf("(") + 1;
        var e = event.description.indexOf(")");
        var cls = event.description.substr(s, e - s);

        var soc = SocialClassesHelper.getSocialClassByName(cls);
        character.socialClass = soc;

        var socCls = SocialClassesHelper.getSocialClass(soc);
        character.earnings = socCls.earnings;
    }

    private getNewSocialClass() {
        var newSocialClass = SocialClassesHelper.generateSocialClass();

        while (character.socialClass === newSocialClass) {
            newSocialClass = SocialClassesHelper.generateSocialClass();
        }

        return newSocialClass;
    }

    private defect() {
        var event = character.youthEvent;
        var start = event.description.indexOf("(") + 1;
        var end = event.description.indexOf(")");
        var fac = event.description.substring(start, end);

        var faction = FactionsHelper.getFactionByName(fac);
        character.heritage = character.faction;
        character.faction = faction;
    }

    private getNewFaction() {
        var newFaction = character.faction;

        while (character.faction === newFaction) {
            newFaction = FactionsHelper.generateFaction(false, true);
        }

        return newFaction;
    }

    private learnLanguage() {
        var e = character.youthEvent;
        var start = e.description.indexOf("(") + 1;
        var end = e.description.indexOf(")");
        var lang = e.description.substr(start, end - start);

        character.addLanguage(lang);
    }

    private learnFactionLanguage(faction: Faction) {
        return BirthPlacesHelper.generateSecondaryLanguage(faction);
    }

    private getNewLanguage() {
        var newLanguage = BirthPlacesHelper.generateRandomLanguage(character.faction, true, true);

        while (character.hasLanguage(newLanguage[0])) {
            newLanguage = BirthPlacesHelper.generateRandomLanguage(character.faction, true, true);
        }

        return newLanguage[0];
    }

    private blackmailMaterial() {
        var faction1 = FactionsHelper.generateFaction(false, true);
        var faction2 = FactionsHelper.generateFaction(false, true);

        while (faction2 === faction1) {
            faction2 = FactionsHelper.generateFaction(false, true);
        }

        var faction1Name = FactionsHelper.getFaction(faction1).name;
        var faction2Name = FactionsHelper.getFaction(faction2).name;

        return new YouthEventModel(`Gained Blackmail Material: You have been given proof that the ${faction1Name} faction has committed misdeeds against the ${faction2Name} faction. Either party will grant a favour for the evidence.`, () => { });
    }

    private blackmailAriadnan() {
        var faction1 = BirthPlacesHelper.generateBirthPlace(Faction.Ariadna, false);
        var faction2 = FactionsHelper.generateFaction(false, true);

        return new YouthEventModel(`Gained Blackmail Material: You have been given proof that a party from ${faction1.name} has committed misdeeds against the ${FactionsHelper.getFaction(faction2).name} faction. Either party will grant a favour for the evidence.`, () => { });
    }

    private seriousGeneticIllness() {
        var cost = DiceRoller.rollSpecial(5, 5);
        var numAttributesToDecrease = 1 + cost.special;
        return new YouthEventModel(`Serious Genetic Illness: You suffer from some form of serious genetic illness. Reduce ${numAttributesToDecrease} attributes of your choice by one point. A cure may be possible, but it will cost ${cost.hits} Assets.`, () => { });
    }

    private vigorPoison(dice: number, bonus: number) {
        var cost = DiceRoller.rollSpecial(4, 4);
        return new YouthEventModel(`You were badly poisoned. You gain Fatigued. A cure exists, but it costs ${cost.hits} Assets.`, () => { this.applyVigorPoison(dice, bonus); });
    }

    private applyVigorPoison(dice: number, bonus: number) {
        var reduction = DiceRoller.rollSpecial(dice, bonus);
        var vigorReduction = Math.max(0, 6 - reduction.hits);

        character.vigourReduction -= vigorReduction;
        character.resolveReduction += reduction.special;
    }
}

export const YouthEventsHelper = new YouthEvents();