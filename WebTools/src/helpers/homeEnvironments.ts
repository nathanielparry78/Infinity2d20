import {character} from '../common/character';
import {Attribute} from './attributes';
import {Skill} from './skills';
import {AlienHost} from './alienHosts';
import {Faction} from './factions';
import {Source} from './sources';

export enum HomeEnvironment {
    // Core
    Happy_Home,
    Violent,
    Frontier_Life,
    Rebellious,
    Regimented,
    High_Society,

    // Antipodes
    HappyHomeAntipode,
    RebelliousAntipode,
    RegimentedAntipode,
    Border_Life,
    Shamanistic,

    // Nomads
    Bohemian,
    GarageRat,
    OldSchool,
    Underworld,
    Virtual,
    Clinical,
}

class HomeEnvironmentModel {
    name: string;
    attribute: Attribute;
    skill: Skill;

    constructor(name: string, attribute: Attribute, skill: Skill) {
        this.name = name;
        this.attribute = attribute;
        this.skill = skill;
    }
}

export class HomeEnvironmentViewModel extends HomeEnvironmentModel {
    id: HomeEnvironment;

    constructor(id: HomeEnvironment, base: HomeEnvironmentModel) {
        super(base.name, base.attribute, base.skill);
        this.id = id;
    }
}

export class HomeEnvironments {
    private _environments: { [id: number]: HomeEnvironmentModel } = {
        [HomeEnvironment.Happy_Home]: new HomeEnvironmentModel("Happy Home", Attribute.Personality, Skill.Education),
        [HomeEnvironment.Violent]: new HomeEnvironmentModel("Violent", Attribute.Brawn, Skill.Acrobatics),
        [HomeEnvironment.Frontier_Life]: new HomeEnvironmentModel("Frontier Life", Attribute.Brawn, Skill.Resistance),
        [HomeEnvironment.Rebellious]: new HomeEnvironmentModel("Rebellious", Attribute.Awareness, Skill.Pilot),
        [HomeEnvironment.Regimented]: new HomeEnvironmentModel("Regimented", Attribute.Coordination, Skill.Discipline),
        [HomeEnvironment.High_Society]: new HomeEnvironmentModel("High Society", Attribute.Willpower, Skill.Lifestyle),
        [HomeEnvironment.HappyHomeAntipode]: new HomeEnvironmentModel("Happy Home", Attribute.Personality, Skill.Animal_Handling),
        [HomeEnvironment.RebelliousAntipode]: new HomeEnvironmentModel("Rebellious", Attribute.Awareness, Skill.Stealth),
        [HomeEnvironment.RegimentedAntipode]: new HomeEnvironmentModel("Regimented", Attribute.Agility, Skill.Discipline),
        [HomeEnvironment.Border_Life]: new HomeEnvironmentModel("Border Life", Attribute.Brawn, Skill.Resistance),
        [HomeEnvironment.Shamanistic]: new HomeEnvironmentModel("Shamanistic", Attribute.Intelligence, Skill.Analysis),
        [HomeEnvironment.Bohemian]: new HomeEnvironmentModel("Bohemian", Attribute.Personality, Skill.Education),
        [HomeEnvironment.GarageRat]: new HomeEnvironmentModel("Garage Rat", Attribute.Awareness, Skill.Tech),
        [HomeEnvironment.OldSchool]: new HomeEnvironmentModel("Old-School", Attribute.Willpower, Skill.Pilot),
        [HomeEnvironment.Underworld]: new HomeEnvironmentModel("Underworld", Attribute.Brawn, Skill.Thievery),
        [HomeEnvironment.Virtual]: new HomeEnvironmentModel("Virtual", Attribute.Intelligence, Skill.Hacking),
        [HomeEnvironment.Clinical]: new HomeEnvironmentModel("Clinical", Attribute.Willpower, Skill.Resistance),
    };

    getHomeEnvironments() {
        var envs: HomeEnvironmentViewModel[] = [];

        if (character.host === AlienHost.Antipode && character.faction === Faction.Ariadna && character.hasSource(Source.Ariadna)) {
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.HappyHomeAntipode, this._environments[HomeEnvironment.HappyHomeAntipode]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Violent, this._environments[HomeEnvironment.Violent]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Border_Life, this._environments[HomeEnvironment.Border_Life]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.RebelliousAntipode, this._environments[HomeEnvironment.RebelliousAntipode]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.RegimentedAntipode, this._environments[HomeEnvironment.RegimentedAntipode]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Shamanistic, this._environments[HomeEnvironment.Shamanistic]));
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            if (character.isUplift()) {
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Underworld, this._environments[HomeEnvironment.Underworld]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Violent, this._environments[HomeEnvironment.Violent]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Virtual, this._environments[HomeEnvironment.Virtual]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Clinical, this._environments[HomeEnvironment.Clinical]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Regimented, this._environments[HomeEnvironment.Regimented]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.High_Society, this._environments[HomeEnvironment.High_Society]));
            }
            else {
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Bohemian, this._environments[HomeEnvironment.Bohemian]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Violent, this._environments[HomeEnvironment.Violent]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.GarageRat, this._environments[HomeEnvironment.GarageRat]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.OldSchool, this._environments[HomeEnvironment.OldSchool]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Regimented, this._environments[HomeEnvironment.Regimented]));
                envs.push(new HomeEnvironmentViewModel(HomeEnvironment.High_Society, this._environments[HomeEnvironment.High_Society]));
            }
        }
        else {
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Happy_Home, this._environments[HomeEnvironment.Happy_Home]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Violent, this._environments[HomeEnvironment.Violent]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Frontier_Life, this._environments[HomeEnvironment.Frontier_Life]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Rebellious, this._environments[HomeEnvironment.Rebellious]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.Regimented, this._environments[HomeEnvironment.Regimented]));
            envs.push(new HomeEnvironmentViewModel(HomeEnvironment.High_Society, this._environments[HomeEnvironment.High_Society]));
        }
        

        return envs;
    }

    getHomeEnvironment(env: HomeEnvironment) {
        return this._environments[env];
    }

    generateHomeEnvironment() {
        var roll = Math.floor(Math.random() * 6) + 1;
        var env: HomeEnvironment = undefined;

        if (character.host === AlienHost.Antipode && character.hasSource(Source.Ariadna)) {
            switch (roll) {
                case 1: env = HomeEnvironment.HappyHomeAntipode; break;
                case 2: env = HomeEnvironment.Violent; break;
                case 3: env = HomeEnvironment.Border_Life; break;
                case 4: env = HomeEnvironment.RebelliousAntipode; break;
                case 5: env = HomeEnvironment.RegimentedAntipode; break;
                case 6: env = HomeEnvironment.Shamanistic; break;
            }
        }
        else if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            if (character.isUplift()) {
                switch (roll) {
                    case 1: env = HomeEnvironment.Underworld; break;
                    case 2: env = HomeEnvironment.Violent; break;
                    case 3: env = HomeEnvironment.Virtual; break;
                    case 4: env = HomeEnvironment.Clinical; break;
                    case 5: env = HomeEnvironment.Regimented; break;
                    case 6: env = HomeEnvironment.High_Society; break;
                }
            }
            else {
                switch (roll) {
                    case 1: env = HomeEnvironment.Bohemian; break;
                    case 2: env = HomeEnvironment.Violent; break;
                    case 3: env = HomeEnvironment.GarageRat; break;
                    case 4: env = HomeEnvironment.OldSchool; break;
                    case 5: env = HomeEnvironment.Regimented; break;
                    case 6: env = HomeEnvironment.High_Society; break;
                }
            }
        }
        else {
            switch (roll) {
                case 1: env = HomeEnvironment.Happy_Home; break;
                case 2: env = HomeEnvironment.Violent; break;
                case 3: env = HomeEnvironment.Frontier_Life; break;
                case 4: env = HomeEnvironment.Rebellious; break;
                case 5: env = HomeEnvironment.Regimented; break;
                case 6: env = HomeEnvironment.High_Society; break;
            }
        }

        return env;
    }

    applyHomeEnvironment(env: HomeEnvironment) {
        var e = this.getHomeEnvironment(env);
        character.attributes[e.attribute].value++;
    }
}

export const HomeEnvironmentsHelper = new HomeEnvironments();