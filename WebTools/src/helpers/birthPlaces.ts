import {character} from '../common/character';
import {Faction} from './factions';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {Source} from './sources';
import { AlienHost } from './alienHosts';

class BirthPlaceModel {
    name: string;
    languages: string[];
    languageOptions: string[];
    attributes: Attribute[];
    skill: Skill;
    rollSecondaryLanguage: boolean;
    roll: number;
    rollHomeland: boolean;

    constructor(name: string, roll: number, languages: string[], languageOptions: string[], attributes: Attribute[], skill: Skill, rollSecondaryLanguage: boolean, rollHomeland = false) {
        this.name = name;
        this.languages = languages;
        this.languageOptions = languageOptions;
        this.attributes = attributes;
        this.skill = skill;
        this.rollSecondaryLanguage = rollSecondaryLanguage;
        this.roll = roll;
        this.rollHomeland = rollHomeland;
    }
}

class HomelandModel {
    name: string;
    languages: string[];
    rollSecondaryLanguage: boolean;
    roll: number;

    constructor(name: string, languages: string[], rollSecondaryLanguage: boolean, roll: number) {
        this.name = name;
        this.languages = languages;
        this.rollSecondaryLanguage = rollSecondaryLanguage;
        this.roll = roll;
    }
}

export class HeritageTraits {
    static Bakunian = "Bakunian";
    static Corregidoran = "Corregidoran";
    static Tunguskan = "Tunguskan";
    static Lub = "Lub";
    static Missionary = "Missionary";
    static Vagrant = "Vagrant";
}

export class BirthPlaces {
    private _birthPlaces: { [faction: number]: BirthPlaceModel[] } = {
        [Faction.Ariadna]: [] =
        [
            new BirthPlaceModel("Antipodean Wilds/Outlands", 1, [], null, [Attribute.Willpower, Attribute.Brawn], Skill.Animal_Handling, false, true),
            new BirthPlaceModel("Caledonia", 6, [], null, [Attribute.Agility, Attribute.Brawn], Skill.Resistance, false, true),
            new BirthPlaceModel("Merovingia", 10, [], null, [Attribute.Personality, Attribute.Brawn], Skill.Lifestyle, false, true),
            new BirthPlaceModel("Rodina/Tartar", 15, [], null, [Attribute.Agility, Attribute.Brawn], Skill.Discipline, false, true),
            new BirthPlaceModel("USAriadna", 20, [], null, [Attribute.Coordination, Attribute.Brawn], Skill.Survival, false, true)
        ],
        [Faction.Haqqislam]: [] =
        [
            new BirthPlaceModel("Bourak (Funduq Sultanate)", 3, ["Arabic", "Turkish"], null, [Attribute.Intelligence, Attribute.Willpower], Skill.Lifestyle, false),
            new BirthPlaceModel("Bourak (Iran Zhat al Amat Shanate)", 6, ["Arabic", "Farsi"], null, [Attribute.Awareness, Attribute.Willpower], Skill.Persuade, false),
            new BirthPlaceModel("Bourak (Gabqar)", 9, ["Arabic", "Kyrgyz"], null, [Attribute.Brawn, Attribute.Willpower], Skill.Survival, false),
            new BirthPlaceModel("Bourak (Al Medinat Caliphate)", 12, ["Arabic"], null, [Attribute.Personality, Attribute.Willpower], Skill.Science, true),
            new BirthPlaceModel("Bourak (Islands)", 14, ["Arabic"], null, [Attribute.Agility, Attribute.Willpower], Skill.Persuade, true),
            new BirthPlaceModel("Caravanserai", 16, ["Arabic"], null, [Attribute.Awareness, Attribute.Willpower], Skill.Extraplanetary, true),
            new BirthPlaceModel("Paradiso", 18, ["Arabic"], null, [Attribute.Agility, Attribute.Willpower], Skill.Survival, true),
            new BirthPlaceModel("Sol", 20, ["Random"], null, [Attribute.Coordination, Attribute.Willpower], Skill.Pilot, false),
        ],
        [Faction.Nomads]: [] =
        [
            new BirthPlaceModel("Bakunin", 5, ["German", "English"], null, [Attribute.Willpower, Attribute.Agility], Skill.Science, false),
            new BirthPlaceModel("Corregidor", 10, ["Corregidoran"], ["English", "Swahili"], [Attribute.Brawn, Attribute.Agility], Skill.Resistance, false),
            new BirthPlaceModel("Tunguska", 15, ["Russian", "English"], null, [Attribute.Intelligence, Attribute.Agility], Skill.Lifestyle, false),
            new BirthPlaceModel("Human Edge", 17, ["Random"], null, [Attribute.Willpower, Attribute.Agility], Skill.Tech, false),
            new BirthPlaceModel("Commercial Mission", 19, ["Random"], null, [Attribute.Intelligence, Attribute.Agility], Skill.Pilot, false),
            new BirthPlaceModel("Sol/Sol Orbitals", 20, ["Random"], null, [Attribute.Willpower, Attribute.Agility], Skill.Extraplanetary, false),
        ],
        [Faction.PanOceania]: [] =
        [
            new BirthPlaceModel("Acontecimento", 4, ["Spanish"], ["Hindi", "Punjabi", "Portuguese"], [Attribute.Willpower, Attribute.Intelligence], Skill.Animal_Handling, false, true),
            new BirthPlaceModel("Neoterra", 8, ["Spanish"], ["English", "Hindi", "Italian"], [Attribute.Awareness, Attribute.Intelligence], Skill.Lifestyle, false, true),
            new BirthPlaceModel("Varuna", 12, ["Spanish", "Malay"], null, [Attribute.Brawn, Attribute.Intelligence], Skill.Athletics, false, true),
            new BirthPlaceModel("Sol", 16, ["Random"], null, [Attribute.Willpower, Attribute.Intelligence], Skill.Extraplanetary, false),
            new BirthPlaceModel("Paradiso", 18, null, ["Spanish", "English"], [Attribute.Personality, Attribute.Intelligence], Skill.Survival, false, true),
            new BirthPlaceModel("Human Edge", 19, null, ["Spanish", "English"], [Attribute.Agility, Attribute.Intelligence], Skill.Tech, false, true),
            new BirthPlaceModel("Svalarheima", 20, ["SvalarNorse"], ["English", "German"], [Attribute.Willpower, Attribute.Intelligence], Skill.Survival, false, true),
        ],
        [Faction.YuJing]: [] =
        [
            new BirthPlaceModel("Shentang", 5, ["Yujingyu", "Random"], null, [Attribute.Intelligence, Attribute.Awareness], Skill.Lifestyle, false),
            new BirthPlaceModel("Yutang", 10, ["Yujingyu"], null, [Attribute.Intelligence, Attribute.Awareness], Skill.Lifestyle, false),
            new BirthPlaceModel("Sol (Chung Kuo)", 15, ["Yujingyu", "Random"], null, [Attribute.Willpower, Attribute.Awareness], Skill.Extraplanetary, false),
            new BirthPlaceModel("Paradiso", 17, ["Yujingyu", "Random"], null, [Attribute.Personality, Attribute.Awareness], Skill.Survival, false),
            new BirthPlaceModel("Svalarheima", 19, ["Yujingyu"], null, [Attribute.Willpower, Attribute.Awareness], Skill.Survival, false),
            new BirthPlaceModel("Human Edge", 20, ["Yujingyu"], null, [Attribute.Agility, Attribute.Awareness], Skill.Tech, false),
        ],
        [Faction.MinorNation]: [] =
        [
            new BirthPlaceModel("Earth", 4, ["Random", "Random"], null, [Attribute.Intelligence, Attribute.Awareness], Skill.Lifestyle, false),
            new BirthPlaceModel("Lunar Colonies", 7, ["Random", "Random"], null, [Attribute.Intelligence, Attribute.Awareness], Skill.Lifestyle, false),
            new BirthPlaceModel("Venusian Aerostats", 9, ["Random", "Random"], null, [Attribute.Willpower, Attribute.Awareness], Skill.Extraplanetary, false),
            new BirthPlaceModel("Mars", 13, ["Random", "Random"], null, [Attribute.Personality, Attribute.Awareness], Skill.Survival, false),
            new BirthPlaceModel("Jovian Colonies", 15, ["Random", "Random"], null, [Attribute.Willpower, Attribute.Awareness], Skill.Survival, false),
            new BirthPlaceModel("Orbitals", 18, ["Random", "Random"], null, [Attribute.Agility, Attribute.Awareness], Skill.Tech, false),
            new BirthPlaceModel("Human Edge", 20, ["Random", "Random"], null, [Attribute.Willpower, Attribute.Awareness], Skill.Survival, false),
        ],
        [Faction.O12]: [] =
        [
            new BirthPlaceModel("Concilium", 6, ["Spanish"], null, [Attribute.Intelligence, Attribute.Personality], Skill.Persuade, true),
            new BirthPlaceModel("Concilium", 12, ["English"], null, [Attribute.Intelligence, Attribute.Personality], Skill.Persuade, true),
            new BirthPlaceModel("Concilium", 18, ["German"], null, [Attribute.Intelligence, Attribute.Personality], Skill.Persuade, true),
            new BirthPlaceModel("Concilium", 20, ["Random"], null, [Attribute.Intelligence, Attribute.Personality], Skill.Persuade, true),
        ],
    };

    private _homelands: { [birthplace: string]: HomelandModel[] } = {
        ["Caledonia"]: [
            new HomelandModel("Cailleach", ["Russian (Kazak)|Antipode Creole (Snarl)", "English (Scots)"], false, 4),
            new HomelandModel("Calonack", ["English (Scots)"], true, 6),
            new HomelandModel("Coille Laith", ["English (Scots)"], true, 8),
            new HomelandModel("Dál Riada", ["English (Scots)"], true, 10),
            new HomelandModel("Inverloch", ["English (Scots)"], true, 12),
            new HomelandModel("Scone", ["Russian (Kazak)|French", "English (Scots)"], true, 16),
            new HomelandModel("Skara Brae", ["Russian (Kazak)", "English (Scots)"], false, 18),
            new HomelandModel("Tuathcruithne", ["Antipode Creole (Snarl)", "English (Scots)"], false, 20)
        ],
        ["Merovingia"]: [
            new HomelandModel("Auron", ["English (American)|Russian (Kazak)", "French"], true, 4),
            new HomelandModel("Le Douar", ["English (American)|Russian (Kazak)", "French"], true, 8),
            new HomelandModel("Mariannebourg", ["French"], true, 13),
            new HomelandModel("Poictesme", ["English (Scots)", "French"], false, 16),
            new HomelandModel("Lafayette", ["English", "French"], false, 18),
            new HomelandModel("Dauphin", ["French"], true, 20)
        ],
        ["Rodina/Tartar"]: [
            new HomelandModel("Dynamo", ["Russian (Kazak)"], true, 2),
            new HomelandModel("Gök-Burgo", ["Russian (Kazak)"], true, 4),
            new HomelandModel("Mat'", ["English|French", "Russian (Kazak)"], true, 7),
            new HomelandModel("Novocherkassk", ["Russian (Kazak)"], true, 9),
            new HomelandModel("Stanitsas", ["Russian (Kazak)"], false, 12),
            new HomelandModel("Castropol", ["Russian (Kazak)"], true, 14),
            new HomelandModel("Dalnîy", ["Russian (Kazak)"], true, 16),
            new HomelandModel("Ovsyanka", ["English|French|Yujingyu", "Russian (Kazak)"], true, 18),
            new HomelandModel("Tsitadel", ["Russian (Kazak)"], true, 20)
        ],
        ["USAriadna"]: [
            new HomelandModel("Mount Zion - The Wall", ["English (American)"], true, 2),
            new HomelandModel("Jackson", ["English (American)"], false, 5),
            new HomelandModel("Jefferson", ["Russian (Kazak)", "English (American)"], false, 8),
            new HomelandModel("Lincoln", ["French", "English (American)"], false, 11),
            new HomelandModel("Kennedy", ["English (American)"], true, 14),
            new HomelandModel("Roosevelt", ["English (American)"], true, 17),
            new HomelandModel("Washington", ["English (American)"], true, 20)
        ],
        ["Antipodean Wilds/Outlands"]: [
            new HomelandModel("Ariadna Exclusion Zone", ["English|French|Russian"], true, 7),
            new HomelandModel("The South Mirror", ["English|French|Russian"], true, 14),
            new HomelandModel("Tartary Outlands", ["Russian (Kazak)"], true, 19),
            new HomelandModel("Antipodean Wilds", ["English|French|Russian"], false, 20) // TODO: roll tribe
        ],
        ["Acontecimento"]: [
            new HomelandModel("Aryavarta", ["Hindi|Punjabi", "Portuguese", "English"], false, 4),
            new HomelandModel("Bomjesus", ["Portuguese|Spanish", "English"], true, 8),
            new HomelandModel("Camões", ["Portuguese", "Spanish", "English"], false, 11),
            new HomelandModel("Magalhães", ["Portuguese", "Spanish", "English"], false, 14),
            new HomelandModel("Vishwa", ["Hindi|Punjabi|Portuguese", "English"], false, 17),
            new HomelandModel("Minor Archipelagos", ["Hindi|Punjabi|Portuguese", "English"], false, 19),
            new HomelandModel("Descoberta System", ["Hindi|Punjabi|Portuguese", "Spanish", "English"], false, 20)
        ],
        ["Neoterra"]: [
            new HomelandModel("Aquila", ["German|Italian", "Spanish", "English"], false, 4),
            new HomelandModel("Gratia Archipelago", ["Hindi|Italian", "Spanish", "English"], false, 6),
            new HomelandModel("Lux", ["English", "Spanish"], false, 10),
            new HomelandModel("Pax", ["French|Greek|Italian|Portuguese", "Spanish", "English"], false, 15),
            new HomelandModel("Solitudo Island", ["Hindi|Italian", "Spanish", "English"], false, 16),
            new HomelandModel("Spes Archipelago", ["Italian|Portuguese|Tagalog|Spanish", "Hindi", "English"], false, 19),
            new HomelandModel("Tecendur System", ["Hindi|Italian", "Spanish", "English"], false, 20),
        ],
        ["Varuna"]: [
            new HomelandModel("Atlantea Archipelago", ["Spanish", "Malay", "English"], false, 6),
            new HomelandModel("Gurindam Archipelago", ["Tamil|Tagalog|Malay", "English"], true, 11),
            new HomelandModel("Hawaki Archipelago", ["Māori", "Malay", "English"], true, 15),
            new HomelandModel("Kamuri Kandam", ["Hindi|Malayalam", "Tamil", "English"], false, 18),
            new HomelandModel("Lemuria", ["Malay|Portuguese|Tamil", "English"], false, 19),
            new HomelandModel("Mitra System", ["Malay|Malayalam|Spanish", "Tagalog", "English"], false, 20),
        ],
        ["Paradiso"]: [
            new HomelandModel("Syldavia", ["Portuguese|Punjabi|Hindi", "Spanish", "English"], false, 8),
            new HomelandModel("Gāyatrī", ["Portuguese|Spanish|Punjabi", "Hindi", "English"], false, 16),
            new HomelandModel("Isles of Paradiso", ["Hindi|Spanish", "English"], true, 17),
            new HomelandModel("Paradiso System", ["Hindi|Spanish", "English"], true, 20),
        ],
        ["Human Edge"]: [
            new HomelandModel("Asteroid Belts", ["Spanish", "English"], true, 6),
            new HomelandModel("Trojans", ["Portugese|Hindi|Spanish", "English"], true, 14),
            new HomelandModel("Heraclitus", ["Portuguese|Punjabi|Hindi", "Spanish", "English"], false, 16),
            new HomelandModel("Livy", ["Portuguese|Tagalog|Hindi", "Spanish", "English"], false, 17),
            new HomelandModel("Socrates", ["Tagalog|Hindi|Spanish|Yujingyu", "English"], false, 20),
        ],
        ["Svalarheima"]: [
            new HomelandModel("Arkhangelsk", ["English", "German", "SvalarNorse"], false, 5),
            new HomelandModel("Nordkap", ["German|Spanish", "English", "SvalarNorse"], false, 8),
            new HomelandModel("Solokov", ["German|Spanish", "English", "SvalarNorse"], false, 16),
            new HomelandModel("Trollhättan", ["German|Spanish", "English", "SvalarNorse"], false, 19),
            new HomelandModel("Epsilon Eridani System Orbitals", ["German|Spanish|Tagalog", "English", "SvalarNorse"], false, 20),
        ],
    };

    private _sissoluWaters = [
        new HomelandModel("Atlantea Waters", ["Tetessom", "Spanish|English|Malay"], false, 5),
        new HomelandModel("Gurindam Waters", ["Tetessom", "Tamil|Malayalam|Malay"], true, 9),
        new HomelandModel("Hawaki Waters", ["Tetessom", "Maori|Malay"], true, 14),
        new HomelandModel("Kumari Kandam Waters", ["Tetessom", "Tamil"], false, 17),
        new HomelandModel("Lemurian Waters", ["Tetessom", "Malay|Spanish|English|Tamil"], false, 18),
        new HomelandModel("Katallpeac Lilypad", ["Tetessom"], true, 20),
    ];

    private _upliftLabs = [
        new BirthPlaceModel("Praxis Black Labs", 9, ["German, English"], null, [Attribute.Willpower, Attribute.Agility], Skill.Science, false),
        new BirthPlaceModel("Praxis Black Ships", 18, ["English"], null, [Attribute.Willpower, Attribute.Awareness], Skill.Extraplanetary, true),
        new BirthPlaceModel("Undocumented Orbital", 20, ["German"], null, [Attribute.Willpower, Attribute.Intelligence], Skill.Resistance, true)
    ];

    getBirthPlaces(faction: Faction) {
        if (faction === Faction.Aleph) {
            faction = Faction.O12;
        }

        if (character.hasSource(Source.PanOceania) &&
            character.host === AlienHost.Helot) {
            var homelands = this._birthPlaces[Faction.PanOceania];
            return homelands.filter(home => home.name === "Varuna");
        }
        else if (character.hasSource(Source.Nomads) &&
                 character.isUplift()) {
            return this._upliftLabs;
        }

        return this._birthPlaces[faction];
    }

    generateBirthPlace(faction: Faction, apply: boolean = false) {
        if (faction === Faction.Aleph) {
            faction = Faction.O12;
        }

        var roll = Math.floor(Math.random() * 20) + 1;
        var candidates = this._birthPlaces[faction];
        var birthPlace: BirthPlaceModel = null;

        if (character.hasSource(Source.Nomads) && character.isUplift()) {
            candidates = this._upliftLabs;
        }

        for (var i = 0; i < candidates.length; i++) {
            var home = candidates[i];
            if (roll <= home.roll) {
                birthPlace = home;
                break;
            }
        }

        if (apply) {
            if (birthPlace.languages) {
                var n = birthPlace.languages.indexOf("Random");
                while (n > -1) {
                    birthPlace.languages.splice(n, 1);
                    var lang = this.generateRandomLanguage(faction);
                    lang.forEach(l => {
                        character.addLanguage(l);
                    });

                    n = birthPlace.languages.indexOf("Random");
                }

                birthPlace.languages.forEach(l => {
                    character.addLanguage(l);
                });
            }

            if (birthPlace.rollSecondaryLanguage) {
                character.addLanguage(this.generateSecondaryLanguage(faction));
            }

            if (birthPlace.rollHomeland &&
                (character.hasSource(Source.Ariadna) ||
                 character.hasSource(Source.PanOceania))) {
                roll = Math.floor(Math.random() * 20) + 1;
                let homelands: HomelandModel[];

                if (character.host === AlienHost.Helot) {
                    homelands = this._sissoluWaters;
                }
                else {
                    homelands = this._homelands[birthPlace.name];
                }

                for (var homeland in homelands) {
                    const home = homelands[homeland];
                    if (roll <= home.roll) {
                        for (var language = 0; language < home.languages.length; language++) {
                            const l = home.languages[language];
                            if (l.indexOf('|') === -1) {
                                character.addLanguage(l);
                            }
                        }

                        if (home.rollSecondaryLanguage) {
                            character.addLanguage(this.generateSecondaryLanguage(faction));
                        }

                        character.homeland = home.name;
                        break;
                    }
                }
            }
        }

        return birthPlace;
    }

    getBirthPlace(faction: Faction, id: number): BirthPlaceModel {
        if (faction === Faction.Aleph) {
            faction = Faction.O12;
        }

        var places = this._birthPlaces[faction];
        var result: BirthPlaceModel = null;

        if (character.isUplift()) {
            places = this._upliftLabs;
        }

        places.forEach(home => {
            if (home.roll === id) {
                result = home;
            }
        });

        if (result) {
            const homelands = this._homelands[result.name];
            for (var homeland in homelands) {
                const home = homelands[homeland];
                if (home.name === character.homeland) {
                    for (var lang = 0; lang < home.languages.length; lang++) {
                        const language = home.languages[lang];
                        if (language.indexOf('|') > -1) {
                            if (!result.languageOptions) {
                                result.languageOptions = [];
                            }
                            result.languageOptions.push(...language.split('|'));
                        }
                    }
                    break;
                }
            }
        }

        if (result.languageOptions) {
            result.languageOptions = result.languageOptions.filter(function (lang, index, self) {
                return index === self.indexOf(lang) && !character.hasLanguage(lang);
            });
        }

        return result;
    }

    generateSissoluWaters() {
        const roll = Math.floor(Math.random() * 20) + 1;
        for (var sw in this._sissoluWaters) {
            const waters = this._sissoluWaters[sw];
            if (waters.roll >= roll) {
                return waters;
            }
        }
    }

    getSissoluWaters() {
        return this._sissoluWaters;
    }

    getSissoluWater(id: number) {
        return this._sissoluWaters.filter(w => w.roll === id)[0];
    }

    getHomelands(birthplace: string) {
        return this._homelands[birthplace];
    }

    generateHomeland(birthplace: string) {
        const roll = Math.floor(Math.random() * 20) + 1;
        this._homelands[birthplace].forEach((home, i) => {
            if (home.roll <= roll) {
                return home;
            }
        });

        return null;
    }

    applyBirthPlace(birthPlace: BirthPlaceModel) {
        birthPlace.attributes.forEach(attr => {
            character.attributes[attr].value++;
        });

        if (character.hasSource(Source.Nomads) && character.faction === Faction.Nomads && !character.isUplift()) {
            if (birthPlace.name === "Bakunin") {
                character.heritageTrait = HeritageTraits.Bakunian;
            }
            else if (birthPlace.name === "Corregidor") {
                character.heritageTrait = HeritageTraits.Corregidoran;
            }
            else if (birthPlace.name === "Tunguska") {
                character.heritageTrait = HeritageTraits.Tunguskan;
            }
            else if (birthPlace.name === "Commercial Mission") {
                character.heritageTrait = HeritageTraits.Missionary;
            }
            else if (birthPlace.name === "Human Edge" || birthPlace.name === "Sol/Sol Orbitals") {
                character.heritageTrait = HeritageTraits.Vagrant;
            }
        }

        if (character.homeland === null) {
            if (birthPlace.rollHomeland && character.hasSource(Source.Ariadna)) {
                const roll = Math.floor(Math.random() * 20) + 1;
                const homelands = this._homelands[birthPlace.name];
                for (var homeland in homelands) {
                    const home = homelands[homeland];
                    if (roll <= home.roll) {
                        for (var language = 0; language < home.languages.length; language++) {
                            const l = home.languages[language];
                            if (l.indexOf('|') === -1) {
                                character.addLanguage(l);
                            }
                        }

                        if (home.rollSecondaryLanguage) {
                            character.addLanguage(this.generateSecondaryLanguage(character.heritage));
                        }

                        character.homeland = home.name;
                        break;
                    }
                }
            }

            if (birthPlace.languages) {
                var n = birthPlace.languages.indexOf("Random");
                while (n > -1) {
                    birthPlace.languages.splice(n, 1);
                    var lang = this.generateRandomLanguage(character.faction, true);
                    lang.forEach(l => {
                        character.addLanguage(l);
                    });

                    n = birthPlace.languages.indexOf("Random");
                }
            }
        }
    }

    applySissoluWaters(id: number) {
        const waters = this._sissoluWaters.filter(w => w.roll === id)[0];

        character.addLanguage(waters.languages[0]);

        if (waters.rollSecondaryLanguage) {
            const secLang = this.generateSecondaryLanguage(Faction.PanOceania);
            if (!character.hasLanguage(secLang)) {
                character.addLanguage(secLang);
            }
        }
    }

    generateRandomLanguage(faction: Faction, randomLanguageTable?: boolean, ignoreDoubleRoll?: boolean) {
        var roll = Math.floor(Math.random() * 20) + 1;

        if (faction === Faction.Aleph) {
            faction = Faction.O12;
        }

        if (faction === Faction.Haqqislam || faction === Faction.Nomads || faction === Faction.MinorNation || faction === Faction.O12 || randomLanguageTable) {
            switch (roll) {
                case 1: return ["Yujingyu"];
                case 2: return ["Spanish"];
                case 3: return ["English"];
                case 4: return ["Hindi"];
                case 5: return ["Arabic"];
                case 6: return ["Portuguese"];
                case 7: return ["Russian"];
                case 8: return ["Japanese"];
                case 9: return ["Punjabi"];
                case 10: return ["German"];
                case 11: return ["Javanese"];
                case 12: return ["Malay"];
                case 13: return ["Vietnamese"];
                case 14: return ["Korean"];
                case 15: return ["French"];
                case 16: return ["Turkish"];
                case 17: return ["Italian"];
                case 18: return ["Thai"];
                case 19: return ["Farsi"];
                case 20:
                    if (!ignoreDoubleRoll) {
                        return [this.generateRandomLanguage(faction, false, true)[0], this.generateRandomLanguage(faction, false, true)[0]];
                    }
                    else {
                        return ["Spanish"];
                    }
            }
        }
        else if (faction === Faction.PanOceania) {
            switch (roll) {
                case 1:
                case 2: return ["Spanish"];
                case 3:
                case 4: return ["English"];
                case 5:
                case 6: return ["Portuguese"];
                case 7:
                case 8: return ["German"];
                case 9:
                case 10: return ["Italian"];
                case 11:
                case 12: return ["French"];
                case 13:
                case 14: return ["Filipino"];
                case 15:
                case 16: return ["Hindi"];
                case 17:
                case 18: return ["Malay"];
                case 19:
                case 20: return this.generateRandomLanguage(faction, true, true);
            }
        }
        else if (faction == Faction.YuJing) {
            switch (roll) {
                case 1: return this.generateRandomLanguage(faction, true, true);
                case 2:
                case 3:
                case 4:
                case 5:
                case 6: return ["Yu Jing"];
                case 7:
                case 8: return ["Korean"];
                case 9:
                case 10: return ["Laotian"];
                case 11:
                case 12: return ["Thai"];
                case 13:
                case 14: return ["Mongolian"];
                case 15:
                case 16: return ["Ulighur"];
                case 17:
                case 18: return ["Cantonese"];
                case 19:
                case 20:
                    if (!ignoreDoubleRoll) {
                        return [this.generateRandomLanguage(faction, false, true)[0], this.generateRandomLanguage(faction, false, true)[0]];
                    }
                    else {
                        return ["Yu Jing"];
                    }
            }
        }

        return [];
    }

    generateSecondaryLanguage(faction: Faction) {
        var roll = Math.floor(Math.random() * 20) + 1;
        var candidates = this._birthPlaces[faction];
        var birthPlace: BirthPlaceModel = null;

        for (var i = 0; i < candidates.length; i++) {
            var home = candidates[i];
            if (roll <= home.roll) {
                birthPlace = home;
                break;
            }
        }

        var n = birthPlace.languages.indexOf("Random");
        while (n > -1) {
            birthPlace.languages.splice(n, 1);
            n = birthPlace.languages.indexOf("Random");
        }

        var languages = birthPlace.languages;

        if (birthPlace.rollHomeland) {
            languages = [];
            roll = Math.floor(Math.random() * 20) + 1;
            const homelands = this._homelands[birthPlace.name];
            for (var homeland in homelands) {
                const home = homelands[homeland];
                if (roll <= home.roll) {
                    for (var language = 0; language < home.languages.length; language++) {
                        const l = home.languages[language];
                        if (l.indexOf('|') > -1) {
                            languages.push(...l.split('|'));
                        }
                        else {
                            languages.push(l);
                        }
                    }
                    break;
                }
            }
        }

        roll = Math.floor(Math.random() * languages.length);
        return languages[roll];
    }

    getCustomizationLanguages() {
        var languages = [
            "Arabic",
            "English",
            "Farsi",
            "Filipino",
            "French",
            "German",
            "Hindi",
            "Italian",
            "Japanese",
            "Javanese",
            "Korean",
            "Malay",
            "Portuguese",
            "Punjabi",
            "Russian",
            "Spanish",
            "Thai",
            "Turkish",
            "Vietnamese",
            "Yujungyu",
        ];

        character.languages.forEach(lang => {
            var n = languages.indexOf(lang);
            if (n > -1) {
                languages.splice(n, 1);
            }
        });

        return languages;
    }
}

export const BirthPlacesHelper = new BirthPlaces();