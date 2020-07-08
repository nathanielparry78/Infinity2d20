import {character} from '../common/character';
import {Skill, SkillsHelper} from './skills';
import {Faction} from './factions';
import {DiceRoller} from './diceRoller';
import {SocialClassesHelper} from './socialClasses';
import {AlienHost} from './alienHosts';
import {Education} from './educations';
import {Source} from './sources';
import { EquipmentHelper } from './equipment';
import { HeritageTraits } from './birthPlaces';

export enum Career {
    // Core
    Unemployed,
    Academic,
    AssaultPackController,
    Bodyguard,
    Bosozoku,
    BountyHunter,
    BureauTothAgent,
    CelestialGuard,
    Corporate,
    CorporateExecutive,
    Corsair,
    Criminal,
    Diplomat,
    FieldScientist,
    Frontiersman,
    Hacker,
    Hassassin,
    HeavyIndustry,
    IntelligenceOperative,
    InvestigativeJournalist,
    Lobbyist,
    MayaPersonality,
    Media,
    Medical,
    Military,
    Paratrooper,
    Pilot,
    Police,
    Politician,
    RemoteOperator,
    ReverendAgent,
    ShipCrew,
    Smuggler,
    SpecialForces,
    SportsPersonality,
    TagPilot,
    Technician,
    TerraformingScientist,
    Trader,

    // Ariadna
    EmergencyResponder,
    BratvaGangster,
    CaledonianNoble,
    ClaymoreDuellist,
    FreeMiner,
    FrontierDoctor,
    Hardcase,
    IrmandinhosSmuggler,
    LoupGarou,
    MerovingianCommercialAgent,
    MilitiaMember,
    Spetsnaz,
    Scavenger,
    AntipodeWarlord,
    AssaultPackMember,
    DogBloodedIrregular,
    Cameronian,
    KazakDogWarrior,
    DevilDogsMarines,
    DogBowlPlayer,
    DogNationActivist,
    ForestRanger,
    Raider,
    Volk,
    WulverShockTroop,

    // Haqqislam
    HassassinFidayHaqqislam, // replacement
    Khawarij,
    DiwanFunctionary,
    GreyMarketSpy,
    HassassinExemplar,
    MagharibaGuard,
    KumGanger,
    MedicalResearcher,
    MuhafizAgent,
    Odalisque,
    Caravaner,
    AkbarDoctor,
    Hafza,

    // PanOceania
    Fusilier,
    MayacastSupportStaff,
    SensoriumMayacaster,
    Explorer,
    FighterPilot,
    NeoterranSpecialOfficer,
    HexasAgent,
    Priest,
    OrderSergeant,
    Knight,
    CrocMan,
    AquaticFirstResponder,
    Bartender,
    DeepSeaExplorer,
    HelotMilitia,
    Labourer,
    LibertosMember,
    OmnStoryteller,
    ScuballPlayer,
    Starfish,
    VarunanGuide,

    // Nomads
    CatSquadMember,
    BarristerCorps,
    Chimera,
    Clockmaker,
    Infiltrator,
    Interventor,
    Jaguar,
    MothershipSecurityCorps,
    Negotiator,
    PraxisScientist,
    Provocateur,
    TestSubject,
    BouboutiqueClerk,
    DieMorlockGroup,
    Entertainer,
    Starswimmer,
    Tinkerer,
    UpliftedMuscle,
    Wrench,

    Any
}

class CareerModel {
    name: string;
    description: string;
    attributes: number[];
    mandatory: Skill[];
    elective: Skill[];
    equipment: string[];
    earnings: string;
    factions: Faction[];
    source: Source;
    canBeHazarded: () => boolean;
    isCriminal: boolean;

    constructor(name: string, description: string, attributes: number[], mandatory: Skill[], elective: Skill[], equipment: string[], earnings: string, factions: Faction[], source: Source, canBeHazarded?: () => boolean, isCriminal?: boolean) {
        this.name = name;
        this.description = description;
        this.attributes = attributes;
        this.mandatory = mandatory;
        this.elective = elective;
        this.equipment = equipment;
        this.earnings = earnings;
        this.factions = factions;
        this.source = source;
        this.canBeHazarded = canBeHazarded ? canBeHazarded : () => { return false };
        this.isCriminal = isCriminal;
    }
}

export class CareerViewModel extends CareerModel {
    id: Career;

    constructor(id: Career, base: CareerModel) {
        super(base.name, base.description, base.attributes, base.mandatory, base.elective, base.equipment, base.earnings, base.factions, base.source, base.canBeHazarded, base.isCriminal);
        this.id = id;
    }
}

export class Careers {
    private _careers: { [career: number]: CareerModel } = {
        [Career.Unemployed]: new CareerModel(
            "Unemployed",
            "Tens of billions live scattered throughout the Human Sphere and the unemployed number in the hundreds of millions. Robust demogrants, well-funded support networks, and abundant resources, however, mean that the unemployed generally live comfortably while Maya makes a seemingly infi nite variety of entertainment and experiences available to them.",
            [2, 1, 2, 1, 2, 0, 2],
            [Skill.Survival],
            SkillsHelper.getSkills(),
            [],
            "0+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return false }
        ),
        [Career.Academic]: new CareerModel(
            "Academic",
            "Bright minds across the Human Sphere develop and implement the latest technology, direct expansion efforts, and guide humanity in all its endeavours. The Academic can be a brilliant but introverted scientist creating miracles in the lab, or she could be a weathered biologist out working in the fi eld. Historians study the past to glean clues about humanity’s future. Roboticists and engineers devise the tools that build the high-tech cities gleaming upon countless worlds. An Academic applies theory, study, and experimentation to solve the problems of the Human Sphere. Knowledge in a wide variety of fi elds makes the Academic career desirable on every world. Brilliant minds are in perpetual demand, especially in troubled times.",
            [1, 2, 0, 1, 3, 1, 2],
            [Skill.Education, Skill.Medicine, Skill.Science],
            [Skill.Discipline, Skill.Education, Skill.Tech],
            ["Laboratory (3 month lease)"],
            "2+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.AssaultPackController]: new CareerModel(
            "Assault Pack Controller",
            "Assault Pack Controllers guide mind-controlled Antipodes into battle. The fi erce lupine natives of Ariadna possess heightened senses and ferocious strength. A Controller must lead these creatures, biochemically manipulated to be pliable and obedient, with equally fi erce determination. Assault Pack Controllers use their bestial troops to break through enemy lines and shatter their resolve. Life as a Controller means harsh training and rigorous discipline to carry the strength and presence of an alpha. Controllers face danger every day that they lead their packs, from the savagery of the Antipodes themselves to the missions that require an Assault Pack. Because a Controller must be strong, ruthless, and driven, few forces are more feared on the battlefi eld than an Assault Pack. Many Controllers form close bonds with their Antipodes.",
            [1, 2, 0, 2, 2, 2, 1],
            [Skill.Athletics, Skill.Animal_Handling, Skill.Stealth],
            [Skill.Close_Combat, Skill.Survival, Skill.Ballistics],
            ["Antipode Control Device", "Teseum Chopper", "Pheromone Dispenser"],
            "2+D1",
            [Faction.Ariadna],
            Source.Core,
            () => { return character.faction === Faction.Ariadna; }
        ),
        [Career.Bodyguard]: new CareerModel(
            "Bodyguard",
            "Bodyguards come in high demand for the rich and important people of the Human Sphere. A Bodyguard might serve as protection for a high-ranking political leader, a controversial Maya personality, or the elite guards of a religious fi gurehead. A Bodyguard must be quick-witted, tough, and skilled in both offensive and defensive techniques. Bodyguards are usually well-armed and willing to take a bullet for their charges. Consequently, a Bodyguard is well paid, at least if the employer wants any sense of loyalty. The best Bodyguards are prized for their attention to discipline and skill at arms, often heading security details guarding convoys, foreign dignitaries, and important frontier missions. Most Bodyguards also display a variety of other skills picked up during their assignments.",
            [2, 2, 2, 1, 2, 0, 1],
            [Skill.Observation, Skill.Close_Combat, Skill.Ballistics],
            [Skill.Lifestyle, Skill.Pilot, Skill.Discipline],
            ["High-Fashion Clothing", "Ballistic Vest", "Multispectral Visor 1", "Heavy Pistol", "3 Standard Reloads"],
            "1+D2",
            [Faction.Haqqislam, Faction.Submondo],
            Source.Core,
            () => { return true }
        ),
        [Career.Bosozoku]: new CareerModel(
            "Bōsōzoku",
            "Bōsōzoku is an illegal form of street racing originating in Yu Jing. It is a cutthroat competition often involving the use of violence in a no-holds barred race. The Bōsōzoku racers are incredibly skilled and daring. They lead a lifestyle steeped in underground fame, danger, and hot-blooded pursuit of victory set amid the backdrop of blazing neon cities. A Bōsōzoku racer must be tough and fast to survive, even outside the races, often forming connections with other underworld elements. Bōsōzoku gangs kill for one another, and a racer often adopts an “us against the world” mentality. With such a risky yet lucrative occupation, most Bōsōzoku racers approach life with a “live fast, die young” outlook.",
            [2, 2, 2, 0, 2, 1, 1],
            [Skill.Pilot, Skill.Thievery, Skill.Stealth],
            [Skill.Pilot, Skill.Tech, Skill.Hacking],
            ["Motorcycle", "Armoured Clothing", "AP Pistol", "2 AP Reloads"],
            "0+D2",
            [Faction.YuJing],
            Source.Core,
            () => { return true },
            true
        ),
        [Career.BountyHunter]: new CareerModel(
            "Bounty Hunter",
            "As spread out as humanity is among the stars, criminals inevitably escape. Outlaws build up power bases away from the centres of law enforcement, pirates retreat to dens of scum after raiding merchant vessels, and unscrupulous executives fl ee persecution to other countries or other worlds. Bounty Hunters act where traditional law enforcement cannot. The bounties commanded by high-profi le criminals are tremendous. Hunters go where others won’t in order to bring back their quarry, or maybe just a piece of them. Skilled in tracking, battle, and guerrilla tactics, Bounty Hunters are the basis of countless romanticized legends and thrilling Maya programs.",
            [0, 2, 2, 1, 1, 2, 2],
            [Skill.Athletics, Skill.Observation, Skill.Stealth],
            [Skill.Ballistics, Skill.Pilot, Skill.Tech],
            ["SecurCuffs", "Heavy Pistol", "4 Standard Reloads", "Light Combat Armour"],
            "1+D2",
            [Faction.Mercenary],
            Source.Core,
            () => { return true }
        ),
        [Career.BureauTothAgent]: new CareerModel(
            "Bureau Toth Agent",
            "Agents of Bureau Toth have a specific and demanding duty: Watch over ALEPH. Tasked by O-12 with this most important duty, Bureau Toth Agents serve as one part law enforcement and one part hacker Maya cluster. They fend off foreign attempts on ALEPH's stability, help maintain ALEPH's operations, and supervise its actions on behalf of the O-12. The Bureau's means and resources are hidden from all but the organization itself, including ALEPH. Agents work to make sure that ALEPH remains functional, unimpeded, and most of all benign.",
            [1, 2, 0, 1, 2, 2, 2],
            [Skill.Analysis, Skill.Hacking, Skill.Tech],
            [Skill.Ballistics, Skill.Education, Skill.Persuade],
            ["Assault Hacking Device|Defensive Hacking device", "Heavy Pistol", "4 Standard Reloads", "E/M grenade"],
            "3+D1",
            [Faction.O12],
            Source.Core,
            () => { return character.faction === Faction.O12 || character.faction === Faction.Aleph; }
        ),
        [Career.CelestialGuard]: new CareerModel(
            "Celestial Guard",
            "The famed Yu Jing Celestial Guard protect the Imperial Palace and the Celestial Emperor. Their duty even extends to the whole of the Forbidden City. These crack troops specialize in urban warfare, each soldier highly experienced and impeccably disciplined. Only the most loyal and proven members of the Yu Jing military can ascend to the ranks of Celestial Guard. The Guard acts on direct orders from the Emperor, and function as a police unit with vast authority and resources. The Celestial Guard are known to bend or break laws that bind other police units in their pursuit of Imperial justice. Guard soldiers are brutal and decisive, trained to bring a swift end to any threat Yu Jing faces.",
            [1, 2, 2, 1, 2, 0, 2],
            [Skill.Athletics, Skill.Acrobatics, Skill.Observation],
            [Skill.Close_Combat, Skill.Ballistics, Skill.Analysis],
            ["Light Combat Armour", "Combi Rifle", "Recorder"],
            "2+D1",
            [Faction.YuJing],
            Source.Core,
            () => { return character.faction === Faction.YuJing; }
        ),
        [Career.Corporate]: new CareerModel(
            "Corporate",
            "Corporate workers labour at all levels to keep the megacorps and hypercorps of the Human Sphere running. Managers ply their people skills to keep stressed and overworked staffers productive. Accountants and actuaries calculate risk and determine investments. Working a Corporate career, whether in a small start-up on the frontier or as part of a massive conglomerate, means being perceptive, wary, and opportunistic — always ready to adapt to a changing corporate environment or the fast-paced demands of interplanetary business.",
            [0, 2, 1, 2, 2, 2, 1],
            [Skill.Lifestyle, Skill.Observation, Skill.Stealth],
            [Skill.Lifestyle, Skill.Discipline, Skill.Education],
            ["AR Eye Implants|Implanted Knife|Bioimmunity Organ", "Cosmetics Kit"],
            "2+D2",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.CorporateExecutive]: new CareerModel(
            "Corporate Executive",
            "Executives in the most infl uential hypercorps wield more power than many sovereign rulers among the minor nations. With the trade of currency and favours, an Executive alters the course of political development, positions their company to benefi t fi rst and foremost from government contracts, and helps shape the Human Sphere. A Corporate Executive swims in shark-infested waters, vying with competitors for the best deals. An Executive is responsible for their company’s interests, which often means meeting and negotiating with the most high-powered individuals in human space. They must adapt to constantly changing situations with a quick wit and keen eye for opportunity.",
            [0, 1, 1, 2, 2, 3, 1],
            [Skill.Persuade, Skill.Lifestyle, Skill.Command],
            [Skill.Education, Skill.Lifestyle, Skill.Discipline],
            ["High-Fashion Clothing (with locational beacon)", "Tonfa Bangles|AP Pistol", "Neural Comlog|AR Eye Implant", "1 dose of a recreational drug"],
            "3+D3",
            [Faction.PanOceania],
            Source.Core,
            () => { return true }
        ),
        [Career.Corsair]: new CareerModel(
            "Corsair",
            "Every major nation employs corsairs, privateers commissioned to capture military and merchant ships of enemy nations. Some corsairs hunt other corsairs, but most make a living pursuing less suspecting prey. Authorized to keep part of the loot, corsairs make a profit by targeting the least-protected vessels and keeping more than their contracted allotment of bounty. A Corsair lives a dangerous lifestyle, considered by law to be an enemy combatant but without the honour or respect due the military. Despite their reputation as lawless dogs, most Corsairs stick to a strict code among their own people. Corsairs can be charming and sly in turns, skilled negotiators and dangerous in a fight. Their experience traveling human space is second to none.",
            [2, 2, 2, 1, 2, 1, 0],
            [Skill.Spacecraft, Skill.Extraplanetary, Skill.Thievery],
            [Skill.Close_Combat, Skill.Acrobatics, Skill.Ballistics],
            ["Vac Suit", "3 Oxygen Loads", "Surge (x2)", "Boarding Shotgun", "4 Standard Shell Reloads", "1 AP Shell Reload"],
            "0+D3",
            [Faction.Haqqislam, Faction.Submondo],
            Source.Core,
            () => { return true },
            true
        ),
        [Career.Criminal]: new CareerModel(
            "Criminal",
            "Perhaps the one profession most common across all factions is that of criminal. Smugglers sneak contraband into and out of system borders. Thieves test the security systems of ships, banks, and corporate business records, looking to steal identities, leverage, access codes — anything that lets them tap into their targets’ wealth. Lawless gangs haunt the fringes of civilized society, like the destitute underclass that lurks in the bowels of gleaming mega-cities, or the pirates that attack shipping lanes. Ecoterrorists and those with an axe to grind against the massive economic power players strike out to disrupt the status quo, or take revenge on the ones who took away their livelihoods. It’s also possible that one could find themselves trapped in a Criminal life for reasons beyond their control, such as fleeing wrongful persecution or crossing the wrong bureaucrat.",
            [2, 2, 2, 2, 0, 1, 1],
            [Skill.Thievery, Skill.Observation, Skill.Stealth],
            [Skill.Close_Combat, Skill.Ballistics, Skill.Tech],
            ["Cosmetics Kit", "Heavy Pistol", "3 Standard Reloads", "Fake ID 2"],
            "0+D2",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true },
            true
        ),
        [Career.Diplomat]: new CareerModel(
            "Diplomat",
            "Diplomacy is a fine art in the Human Sphere, especially with a Code Infinity looming over everyone’s heads. Diplomats work to smooth over relations between rival nations, force alliances of convenience or sometimes shared ideology, and keep disparate countries connected by more than just trade. A good Diplomat exhibits great personal charm and integrity, conducting business on foreign soil with the utmost of respect and care. Diplomats travel to foreign countries, distant worlds, meeting with envoys of sovereign nations, corporate rule, and new settlements. They broker trade agreements and peace treaties, negotiate political alliances, and defuse tense situations. The life of a Diplomat is one of constant engagement with many different representatives in locales all across the Human Sphere.",
            [1, 2, 0, 2, 2, 2, 1],
            [Skill.Persuade, Skill.Education, Skill.Discipline],
            [Skill.Psychology, Skill.Pilot, Skill.Education],
            ["Cosmetics Kit|AR Eye Implant", "Negotation Suite (3 days rental credit)"],
            "2+D2",
            [Faction.O12],
            Source.Core,
            () => { return true }
        ),
        [Career.FieldScientist]: new CareerModel(
            "Field Scientist",
            "The Field Scientists that work for more advanced nations seek out natural mysteries. They experiment with (or upon) local wildlife and vegetation, they test out new wetware implants or high-tech devices, and their laboratories are often little more than camps set up to brave the elements. Field Scientists aren’t afraid to get their hands dirty in order to discover new chemicals or capture promising flora and fauna, and the true field scientist is a renaissance specialist. They study a mixture of biology, chemistry, geology, and the like by immersing themselves in it, rather than isolating it in a lab.",
            [1, 2, 1, 2, 3, 1, 0],
            [Skill.Science, Skill.Education, Skill.Survival],
            [Skill.Observation, Skill.Tech, Skill.Athletics],
            ["Analytics Kit", "Survival Kit", "Sensor Suite (x3)"],
            "2+D1",
            [Faction.Corporation],
            Source.Core,
            () => { return true }
        ),
        [Career.Frontiersman]: new CareerModel(
            "Frontiersman",
            "The men and women of the frontier explore the little-known regions of human space. They are the first to expand the maps, eager to set foot on new ground and stake a claim in humanity’s interstellar expansion. These rugged folk brave environmental dangers, unknown flora and fauna, and set up trading posts in seldom-travelled regions. A frontiersman is skilled at hunting, gathering supplies, and often in working with technology out away from urban centres, with little to no technical support. Frontiersmen prospect for resources, like the rare and valuable Teseum, or rare herbs and wildlife with properties useful to the medical industry. Some are criminals fleeing the reach of the law by living on the frontier, and others are bounty hunters sent to hunt down those who would otherwise escape justice.",
            [2, 2, 1, 1, 2, 0, 2],
            [Skill.Survival, Skill.Animal_Handling, Skill.Resistance],
            [Skill.Discipline, Skill.Athletics, Skill.Thievery],
            ["Survival Rations (x6)", "Survival Kit", "Axe|Powered Multitool"],
            "1+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Hacker]: new CareerModel(
            "Hacker",
            "Nearly any conceivable information exists on the Maya network. Hackers make a living breaking down electronic barriers and uncovering secrets, or taking data from others for the purposes of fraud, theft, or mere thrills. Hackers also work with law enforcement, helping to track those with similar skills or counter their efforts. Some specialize in hacking corporate networks, like those of the massive banks and producers of consumer products. Others see it as an art form, hacking challenging military networks or plunging into the depths of Maya in order to find something no one else can.",
            [1, 2, 1, 2, 2, 2, 0],
            [Skill.Thievery, Skill.Hacking, Skill.Tech],
            [Skill.Observation, Skill.Ballistics, Skill.Stealth],
            ["Deployable Repeater (x3)", "Powered Multitool", "Assault Hacking Device|Defensive Hacking Device"],
            "2+D2",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Hassassin]: new CareerModel(
            "Hassassin Fiday",
            "No covert operative in human space is deadlier or more feared than those of the Hassassin Society. These mysterious agents act as spies and assassins, completing missions too dangerous for lesser agents. A Hassassin is a protector of Haqqislamic interests as well as a devout believer in the Search for Knowledge. Many Hassassins possess a zeal even their countrymen cannot match. Theirs is a dangerous and often thankless work, like the dreaded Fidays who embrace death as part of their duty. In secret camps known only to the Hassassin Society and the Hachib, the President of Haqqislam, Hassassins undergo the most gruelling training. Nearly limitless funds, a long tradition of discipline, honour, and deadly focus, and an unquenchable desire to guard humanity’s evolution give the Hassassins incomparable ability.",
            [1, 2, 1, 2, 1, 2, 1],
            [Skill.Stealth, Skill.Persuade, Skill.Thievery],
            [Skill.Close_Combat, Skill.Ballistics, Skill.Hacking],
            ["Fake ID 3", "Cosmetics Kit", "Climbing Plus", "Grazeblade", "DT Sniper Rifle", "2 Standard Reloads"],
            "1+D2",
            [Faction.Haqqislam],
            Source.Core,
            () => { return character.faction === Faction.Haqqislam && !character.hasSource(Source.Haqqislam); }
        ),
        [Career.HeavyIndustry]: new CareerModel(
            "Heavy Industry",
            "While expert systems and automation has reduced the number of workers involved in industrial pursuits, those that remain are all the more critical, providing skills and judgment. Modern materials require vacuum purification in electron-beam furnaces; titanic terraforming processors need calibration and adjustment to local conditions before being set to automated operation; volatile planetary core taps demand human decisions where predictive physics break down; and even automated maintenance systems want for their own upkeep. Industrial specialists are an increasingly rare breed that understand the link between sweat and advanced technology. Their knowledge spans grease guns to exclusion fields, and they have the experience to apply either to a problem. Professionals in this field are the gears that keep the Human Sphere moving.",
            [1, 2, 0, 2, 2, 1, 2],
            [Skill.Resistance, Skill.Pilot, Skill.Tech],
            [Skill.Close_Combat, Skill.Persuade, Skill.Thievery],
            ["Gruntsuit", "Respirator 1", "Powered Multitool", "Painkillers (x3)", "Repair Kit"],
            "2+D1",
            [Faction.MinorNation, Faction.Nomads],
            Source.Core,
            () => { return true }
        ),
        [Career.IntelligenceOperative]: new CareerModel(
            "Intelligence Operative",
            "The tense state of conflict in the Human Sphere means every agency looks for an edge over its competitors. Intelligence Operatives conduct corporate espionage, deep-cover spy missions, acts of sabotage, and other acts which risk their life and limb for agencies that would disavow any knowledge of, or connection to, their operations. An Intelligence Operative is quick-witted, highly disciplined, and often alone in a place surrounded by enemies unaware of the traitor in their midst. They trade in secrets — information that can turn the tide of small-scale conflicts, like a raid on secret warehouses holding valuable experimental gear or data, and they can influence the large-scale skirmishes that take place between rival nations. The intelligence an operative collects can cause wars or end them with equal facility.",
            [1, 3, 0, 2, 2, 1, 1],
            [Skill.Observation, Skill.Stealth, Skill.Analysis],
            [Skill.Hacking, Skill.Education, Skill.Thievery],
            ["Fake ID 2", "AP Pistol", "4 Standard Reloads", "Breaking & Entering Kit", "Recorder"],
            "3+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.InvestigativeJournalist]: new CareerModel(
            "Investigative Journalist",
            "Maya has more than its fair share of tabloid reporting and fluff stories, but the Investigative Journalist seeks the real stuff. These Journalists hunt the truth, bringing word to the public about enemy action, the heroic efforts of national forces, and of course the latest scandals to haunt politicians and entertainers alike. Investigative Journalists often face hostility from those they investigate, and tend to have more than a few criminal skills like shadowing, breaking and entering, and sometimes falsifying data to gain admittance to places otherwise barred from them. Some see their cause as bringing the truth to light, while others simply have an insatiable curiosity and a penchant for getting into (and out of) trouble.",
            [2, 2, 0, 2, 1, 2, 1],
            [Skill.Stealth, Skill.Persuade, Skill.Observation],
            [Skill.Hacking, Skill.Education, Skill.Thievery],
            ["Recorder|AR Eye Implants", "Analysis Suite", "Breaking & Entering Kit"],
            "1+D2",
            [Faction.MinorNation, Faction.Nomads],
            Source.Core,
            () => { return true }
        ),
        [Career.Lobbyist]: new CareerModel(
            "Lobbyist",
            "The PanOceanian government is immense, the largest in the Human Sphere, and it has ended the hypocritical separation between political power and economic power. The old political parties, now abolished, have been replaced by a substantial number of lobbies. Lobbyists vie for political favour, coordinate the activities of lobby members, and engage in covert battles of clout with rival lobbies. With the unprecedented level of transparency in modern lobbies, a Lobbyist can be practically anyone — from a citizen with a very active interest in the groups that preside over matters they care about, to a prestigious and influential leader intimately guiding the lobby’s political fortunes. Any Lobbyist, however, is highly motivated and skilled in whatever arena they choose, and the lobbying game is both robust and demanding.",
            [1, 2, 0, 2, 2, 2, 1],
            [Skill.Persuade, Skill.Psychology, Skill.Command],
            [Skill.Discipline, Skill.Lifestyle, Skill.Education],
            ["Negotiator's Suite (10 days rental credit)", "Geist Upgrade: +2 Psychology|Geist Upgrade: Research Specialist Talent"],
            "4+D2",
            [Faction.PanOceania],
            Source.Core,
            () => { return character.faction === Faction.PanOceania; }
        ),
        [Career.MayaPersonality]: new CareerModel(
            "Maya Personality",
            "Would-be Maya Personalities number in the millions, but the real stars reach hundreds of millions of viewers and devoted, fanatic fans. A Maya Personality might be a popular musician, a comedian, or spiritual speaker. Artists and life-casters broadcast their work and live sensory feeds across the Sphere. The Maya network hosts a staggering variety of content, and talented Maya Personalities rise from the faceless multitudes to become somebody. Popular newscasters and public speakers can gain far more fame and influence through legions of followers than they would have experienced as a government official. Larger-than-life personalities create legions of fans who hang on their every feeling, perception, thought, or word. They spawn both blind conformance and vehement dissent, filling up forums and editorial screeds with endless debate.",
            [1, 2, 1, 2, 2, 2, 0],
            [Skill.Persuade, Skill.Lifestyle, Skill.Observation],
            [Skill.Hacking, Skill.Discipline, Skill.Tech],
            ["Recorder (x3)", "High-Quality Clothing", "Fake ID 1", "AR Eye Implants"],
            "1+D4",
            [Faction.Ariadna, Faction.Corporation, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Media]: new CareerModel(
            "Media",
            "The media is perhaps the single largest industry in all of the Human Sphere, the one constant binding disparate nation-states, cultures, and spiritual organizations together. Despite the glamor accorded to actors, WarCors, event-casters, and the other public faces of news and entertainment, a legion of writers, editors, producers, and effects artists support their work. These media professionals support the select few in the spotlight, always battling for better ratings and the sponsorships that come with them. Despite limited time in the public eye, media corporations covet the most talented behind-the-scenes professionals more than the personalities they support. The Sphere is fi lled with potential stars, but only a select few can make those stars shine.",
            [1, 3, 0, 2, 1, 2, 1],
            [Skill.Education, Skill.Hacking, Skill.Analysis],
            [Skill.Hacking, Skill.Stealth, Skill.Tech],
            ["TinBot (with Recorder)", "AR Eye Implants", "Analysis Suite"],
            "2+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Medical]: new CareerModel(
            "Medical",
            "Medical science has advanced by leaps and bounds, but Hospitals often see a wide variety of strange cases and few professions can match the Medical career for a wealth of odd experiences. Doctors perform miracles, including resurrections, for those capable of paying the costs. Combat medics save the lives of wounded soldiers, or perform gruesome examinations on the fallen aliens. Some medics seek out new chemicals on alien worlds, hoping for the next big breakthrough. Ambitious medical scientists also push the envelope of human engineering, with advances in biotechnology, cybertechnology, and genetic therapies producing super-soldiers, making whole regions impervious to disease, or strengthening workforces to perform the most hazardous jobs where lesser people would fail.",
            [1, 2, 0, 2, 2, 1, 2],
            [Skill.Medicine, Skill.Athletics, Skill.Psychology],
            [Skill.Animal_Handling, Skill.Survival, Skill.Discipline],
            ["Armoured Clothing", "MediKit (with 5 Serum)", "Basic Medical Supplies"],
            "2+D2",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Military]: new CareerModel(
            "Military",
            "Military characters run the gamut from professional soldiers employed by nations to loosely-defi ned mercenary camps. Yu Jing employs the most well-disciplined soldiers as part of its interplanetary armed forces, while PanOceania makes heavy use of mercenaries with little connection to a larger governmental branch. At Paradiso and the front lines, soldiers of all stripes work to halt the Combined Army’s advance. ALEPH helps direct these battles, a fact that doesn’t always sit well with the soldiers: Nomads would rather strike at the AI’s own information centres and mercenaries would prefer to pirate poorly protected vessels carrying sensitive information. As the Human Sphere constantly expands, soldiers stand at the forefront, pushing the boundaries and forming the fi rst line of defence against the dangers of the frontier.",
            [2, 1, 2, 1, 2, 0, 2],
            [Skill.Athletics, Skill.Close_Combat, Skill.Ballistics],
            [Skill.Survival, Skill.Acrobatics, Skill.Tech],
            ["Medium Combat Armour", "Rifle", "4 Standard Reloads", "Stims (x3)"],
            "2+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Paratrooper]: new CareerModel(
            "Paratrooper",
            "In the advanced warfare of the Human Sphere, Paratroopers drop onto planets and battlefi elds inaccessible by land. These brave men and women parachute into hostile territory, using high-tech glider suits and stealth chutes to slip past enemy defences. Air support is key to victory in the countless confl icts that grip the Human Sphere, and airborne soldiers engage in dynamic operations all across space. Paratroopers often adopt a “live fast” motto, jumping out of the sky and into combat for a living. This can give them a reputation for wild behaviour, but Paratroopers are every bit as disciplined as their fellow soldiers. A Paratrooper character often fi nds themselves far behind enemy lines, facing challenges that less elite soldiers could only imagine.",
            [2, 2, 2, 1, 1, 0, 2],
            [Skill.Survival, Skill.Athletics, Skill.Ballistics],
            [Skill.Close_Combat, Skill.Pilot, Skill.Discipline],
            ["Combat Jump Pack", "Medium Combat Armour", "Combi Rifle", "4 Standard Reloads"],
            "2+D1",
            [Faction.Ariadna],
            Source.Core,
            () => { return true }
        ),
        [Career.Pilot]: new CareerModel(
            "Pilot",
            "Atmospheric, suborbital, and intrasystem shuttles ply the skies and space lanes everywhere humanity has touched. From the humble city hopper to deadly assault dropships, pilots ensure these vessels make it from origin to destination, quickly and in one piece, under both mild and dire circumstances. Acceleration crèches, physical alteration, and MetaChemicals help these pilots endure the prolonged periods at high-g with limited ill effect, but it’s still a hard, very physical life. Still, very little cargo, passengers, or sensitive data would fl ow throughout the Sphere without pilots at the controls of a host of scows, skiffs, and couriers. Pilots also helm the military’s vast fl eet of dropships, high-g interceptors, net weasels, stealth infi ltrators, and many other craft for accomplishing their missions.",
            [2, 2, 1, 2, 2, 1, 0],
            [Skill.Pilot, Skill.Observation, Skill.Spacecraft],
            [Skill.Ballistics, Skill.Hacking, Skill.Tech],
            ["Armoured Clothing|Crashsuit", "Pistol", "2 Standard Reloads", "Inlaid Palm Curcuitry|AR Eye Implants"],
            "3+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Police]: new CareerModel(
            "Police",
            "Law enforcement has had to adapt to the advances of the 22nd century in a big way. Humanity is spread so far that just as often police are privately contracted from the best mercenary agencies. Government-employed police forces work to keep the most fl agrant abuses at bay, though no law enforcement agency can hope to properly police the nightmare tangle of corporate laws. A police offi cer is highly trained in combat, negotiation tactics, and technical skills to help them in apprehending criminals. Police employ cutting-edge equipment and an offi cer also possesses specifi c skills related to their fi eld: cyber-crime, undercover and espionage, high-pressure hostage situations, and more.",
            [2, 2, 2, 0, 2, 1, 1],
            [Skill.Athletics, Skill.Observation, Skill.Persuade],
            [Skill.Close_Combat, Skill.Ballistics, Skill.Medicine],
            ["Armoured Clothing", "Heavy Pistol", "4 Standard Reloads", "Adhesive Grenade (x2)|Stun Baton"],
            "2+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Politician]: new CareerModel(
            "Politician",
            "Few professions are as simultaneously reviled and necessary as that of a Politician. With so many human souls and so much chaos threatening to engulf the Human Sphere at any moment, Politicians manage states, nations, whole interstellar empires. They conduct debates when the latest discovery of foreign action against their home comes to light. They work to develop and implement laws that better regulate the societies of which they are a part — or apart, if the Politician puts their own interests ahead of the people’s. To work in politics is to be a fighter; it is not a profession for the faint of heart. A Politician constantly struggles for influence on their own behalf and that of their constituents. Every new campaign brings with it hostile lobbyists, rival corporate interests, and ideological nemeses, all seeking to tear the Politician’s foundation out from beneath them.",
            [1, 2, 0, 2, 2, 2, 1],
            [Skill.Persuade, Skill.Psychology, Skill.Discipline],
            [Skill.Education, Skill.Lifestyle, Skill.Command],
            ["Negotiation Suite (3 days rental)", "Stims (x3)"],
            "2+D2",
            [Faction.O12],
            Source.Core,
            () => { return true }
        ),
        [Career.RemoteOperator]: new CareerModel(
            "Remote Operator",
            "Remote Operators pilot advanced combat and exploration machines. Highly advanced interface designs allow these operators to feel like they are right in the action, much like a TAG pilot. Due to their specialized training they come to know their machines as well as any pilot of a manned vehicle. Remote Operators engage in urban warfare, fighting in dense population centres where TAGs and large war-machines can’t go, relying on speed, mobility, and a keen sense of the battleground. Many Remote Operators also function in a scientific capacity, piloting submersible or deep-space salvage and forensics units to carry out delicate missions in extreme environments.",
            [2, 2, 1, 2, 2, 1, 0],
            [Skill.Pilot, Skill.Observation, Skill.Tech],
            [Skill.Education, Skill.Hacking, Skill.Discipline],
            ["Armoured Clothing", "Bioscanner", "Remote Presence Gear|Spotbot", "Stims (x3)"],
            "2+D1",
            [Faction.Mercenary],
            Source.Core,
            () => { return true }
        ),
        [Career.ReverendAgent]: new CareerModel(
            "Reverend Agent",
            "The Nomads have secret forces of their own in the Observants, a religious organization ideologically opposed to the likes of ALEPH and technology ruling over humanity. The Observants employ several types of Reverend Agents to carry out their most holy mission of protecting the human race. Reverend Moiras are elite women fighting against technologically superior enemies. They enact terrible vengeance upon those who have wronged the righteous. Reverend Custodiers manage intelligence and technical warfare, waging battles over Maya, intelligence networks, specialists in security programming. Reverend Healers perform field medicine, but they are also skilled warriors fighting alongside their Reverend sisters. Reverend Agents are among the most feared soldiers on the battlefield, and the most inspiring to their compatriots.",
            [2, 2, 1, 2, 2, 0, 1],
            [Skill.Extraplanetary, Skill.Athletics, Skill.Hacking],
            [Skill.Close_Combat, Skill.Ballistics, Skill.Acrobatics],
            ["Light Combat Armour", "Vac Suit", "2 Oxygen Loads", "Assault Hacking Device|Defensive Hacking Device", "AutoMediKit", "Viral Pistol|Light Shotgun"],
            "1+D1",
            [Faction.Nomads],
            Source.Core,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.ShipCrew]: new CareerModel(
            "Ship Crew",
            "Millions upon millions of ships fill the interplanetary routes of the Human Sphere. While a few, such as some employed by the AI ALEPH, can operate autonomously, the vast majority require skilled crew. Intrepid crewmembers keep their ships running both in and out of battle. A good crew is worth more than good upgrades, especially in a pinch. Ship Crew tends to form tight bonds with one another and with the ship itself, working in tandem to achieve victory. A wide variety of experience lends ship crew members a versatile set of skills: they have Zero-G training, most acquire significant technical skills, and have been in more than their share of scrapes. As a result, crew members tend to be some of the toughest and most experienced travellers in any system.",
            [1, 2, 1, 3, 2, 0, 1],
            [Skill.Survival, Skill.Tech, Skill.Extraplanetary],
            [Skill.Science, Skill.Spacecraft, Skill.Ballistics],
            ["Vac Suit", "5 Oxygen Loads", "Powered Multitool", "Repair Kit"],
            "2+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Smuggler]: new CareerModel(
            "Smuggler",
            "Smuggling is a lucrative but highly dangerous [Career. Skilled Smugglers slip past the constant vigil of advanced nations with weapons and industrial secrets to sell to competitors. Contraband reaches every world with a demand for it, brought in by crafty Smugglers. Scoundrels who smuggle objects from or perhaps through the territories of powerful leaders fetch a high bounty, but they are highly skilled in evading trouble, understanding the behaviour and methods of law enforcement, and above all covering their own retreat.",
            [2, 2, 2, 1, 2, 1, 0],
            [Skill.Pilot, Skill.Observation, Skill.Thievery],
            [Skill.Tech, Skill.Hacking, Skill.Discipline],
            ["Adhesive Grenade|Banshee Grenade", "Smoke Grenade (x2)", "AR Eye Implants|Long ModCoat"],
            "0+D4",
            [Faction.Submondo],
            Source.Core,
            () => { return true },
            true
        ),
        [Career.SpecialForces]: new CareerModel(
            "Special Forces",
            "The most elite soldiers in the Human Sphere carry out spec ops missions across known space... and sometimes upon unknown worlds. Special Forces units operate in covert missions of international warfare, hunting down war criminals, striking important assets and retreating before anyone can blame their acting governments. These elite units also carry out the most difficult ops in the war for Paradiso, attacking Combined Army commanders and bases, rescuing allies caught far behind enemy lines, and countering the threat of elite enemy units. Governments deploy Special Forces when discretion is needed — all too common in the shadow warfare fought between nations of the Human Sphere — and when regular mercenaries or law enforcement simply aren’t enough. A Special Forces soldier receives the finest training, equipment, and most important missions, demanding as much from themselves as their people do.",
            [2, 2, 2, 1, 1, 0, 2],
            [Skill.Survival, Skill.Resistance, Skill.Ballistics],
            [Skill.Close_Combat, Skill.Hacking, Skill.Discipline],
            ["Medium Combat Armour", "Combi Rifle|AP Rifle", "5 Standard Reloads", "Climbing Plus|Combat Jump Pack", "Garrotte"],
            "2+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.SportsPersonality]: new CareerModel(
            "Sports Personality",
            "Sporting events are a time-honoured tradition of competition between cities, countries, even whole worlds. The greatest sports stars are legends, heroes to their people, larger than life. They possess a sway and a swagger that few political leaders can match, all stemming from their ability to perform incredible athletic feats. With the advances in genetic engineering, wetware implants, and cybernetics, professional athletes boast physiques and abilities the common person could only imagine. A Sports Personality could be a rising star of Aristeia! Dog-Bowl, or the less glamorous Aristeia! Underground. Champions of these bone-breaking contests and professional duels can rise from humble roots to touch immortal fame. Sports Personalities can bear the colours and face of a nation, quest only for the next adrenaline rush, or hunt for personal glory.",
            [2, 2, 1, 0, 1, 2, 2],
            [Skill.Athletics, Skill.Persuade, Skill.Close_Combat],
            [Skill.Acrobatics, Skill.Athletics, Skill.Ballistics],
            ["Biografted Attribute Augmentation 2|Super-Jump", "Uniform"],
            "1+D3",
            [Faction.Ariadna],
            Source.Core,
            () => { return true }
        ),
        [Career.TagPilot]: new CareerModel(
            "TAG Pilot",
            "TAG (Tactical Armoured Gear) units command a presence on the battlefi eld with their hulking armour platforms. One part personal tank and one part weapons arrays, TAGs turn pilots into one-person armies. They bear heavy fi repower and tremendous strength. Pilots thus develop a certain confi dence born of the machines they so skilfully command. TAG pilots often fi ght on the front lines against the Combined Army, or lead forays into enemy territory when stealth and subtlety are lost. TAG pilots command some of the deadliest forces on the battlefi eld and they know it. Most are all too happy to show off their skills, eager for the kind of victory only TAGs can bring.",
            [2, 2, 1, 2, 2, 0, 1],
            [Skill.Pilot, Skill.Tech, Skill.Ballistics],
            [Skill.Discipline, Skill.Extraplanetary, Skill.Survival],
            ["Armoured Clothing", "Inlaid Palm Curcuitry|AR Eye Implants", "Pistol", "2 Standard Reloads"],
            "2+D1",
            [Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.Technician]: new CareerModel(
            "Technician",
            "The technician possesses skill desired all across the Human Sphere. Technology-dependent nations like PanOceania need technicians to keep industry booming. Backwater worlds and gleaming metropolises alike need technical knowledge, whether the technician is servicing farm equipment or the latest model of racing cars. Nomads employ technicians to salvage, jury-rig, and dismantle their gains. Their colossal motherships exist in a state of constant repair and modifi cation, with technicians working beneath cascades of welding sparks, stringing cable throughout the hulls, and fi nding ingenious ways to recycle scrap. PanOceanian or Yu Jing techs produce the latest and greatest models of vehicles and weaponry, working to ensure their nation’s continued dominance in the intergalactic arena. Ariadnan technicians possess unrivalled skills in fi eld-testing and repairing rugged equipment, despite their lack of the most modern advances.",
            [2, 2, 1, 2, 0, 1, 2],
            [Skill.Tech, Skill.Pilot, Skill.Hacking],
            [Skill.Observation, Skill.Resistance, Skill.Discipline],
            ["Powered Multitool", "Repair Kit (with 5 Parts)", "Stims (x1)"],
            "1+D1",
            [Faction.Ariadna, Faction.Corporation, Faction.Haqqislam, Faction.Mercenary, Faction.MinorNation, Faction.Nomads, Faction.O12, Faction.PanOceania, Faction.Submondo, Faction.YuJing],
            Source.Core,
            () => { return true }
        ),
        [Career.TerraformingScientist]: new CareerModel(
            "Terraforming Scientist",
            "Terraforming Scientists help transform new worlds into places much more fi t for human habitation. Terraforming is an expensive and time-consuming process, so only the brightest minds oversee the work. Characters in this profession possess a wide variety of scientifi c knowledge, from geology, climatology, and biology, to engineering and chemistry degrees. A Terraforming Scientist is usually adventurous, as she must brave alien environments and potentially dangerous fl ora and fauna. Every new world is a potential gold mine of resources. A Terraforming Scientist must be ambitious and persistent in order to prosper. She has probably seen stranger things than most, living out on the frontier. Terraforming Scientists are often more rugged than their lab-bound folk, though it’d be a mistake to doubt their academic prowess.",
            [0, 2, 1, 3, 2, 1, 0],
            [Skill.Science, Skill.Education, Skill.Observation],
            [Skill.Pilot, Skill.Tech, Skill.Extraplanetary],
            ["Survival Kit", "Analytical Kit (with 5 Reagents)", "Sensor Suite|Recorder"],
            "2+D1",
            [Faction.Haqqislam],
            Source.Core,
            () => { return true }
        ),
        [Career.Trader]: new CareerModel(
            "Trader",
            "Trade is the lifeblood of the Human Sphere. Nomads know it better than anyone. Because of their unique lifestyle, trading has become an art for them, maximizing the gains in value for as little as they can trade in return. Other Traders make a living on the frontier, conducting business with settlers and miners, frequenting planetary bazaars where a skilled Trader can fi nd anything for the right price. Some trade honestly with one hand and reach for the valuables with the other, like traders conducting business with Ariadna to bring them the latest in technological wonders... while also looking for ways to strip whatever resources they can manage. Haqqislam caravanserai serve as giant hubs of trade, where buyers can fi nd and acquire (or offl oad) nearly anything for the right price.",
            [1, 2, 1, 1, 2, 3, 0],
            [Skill.Persuade, Skill.Psychology, Skill.Discipline],
            [Skill.Pilot, Skill.Education, Skill.Lifestyle],
            ["Long ModCoat", "Survival Kit and Bottled Water", "Cosmetics Kit"],
            "1+D2",
            [Faction.Corporation, Faction.MinorNation],
            Source.Core,
            () => { return true }
        ),
        [Career.EmergencyResponder]: new CareerModel(
            "112 Emergency Responder",
            "It’s said that in Ariadna, there are three callings that never rest; drinking, debauchery, and the 112 Emergency Services. While the first two are debatable, the third is not; the 112 are always on-duty, patrolling the borders and byways 25 hours a day, seven days a week. Stormy weather, natural disasters, Antipode attacks — whatever the conditions, whatever the danger, it doesn’t matter — when distress signals go up, the 112 head out. In the remote reaches of Ariadna, they’re not just first responders; they’re often the only responders. As such, they train not just as field medics and firefighters, but as trackers, engineers, and soldiers. Sometimes, saving lives means splinting a broken bone, or repairing a busted generator. Sometimes it means cracking heads. But whatever the need, when the call goes out, the 112 answer.",
            [1,2,1,1,2,2,2],
            [Skill.Discipline, Skill.Medicine, Skill.Tech],
            [Skill.Close_Combat, Skill.Psychology, Skill.Survival],
            ["Survival Rations (x4)", "MediKit (with 5 Serum)", "Powered Multitool", "Merovingian Survival Gear", "Teseum Hatchet"],
            "2+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.faction === Faction.Ariadna; }
        ),
        [Career.BratvaGangster]: new CareerModel(
            "Bratva Gangster",
            "Every society has its criminals. Every underworld, its kingpins. In Rodina, that’s the Bratva — and they know it. Even though their style evokes the trappings of Russian Mafioso from Earth, the Bratva aren’t an import; they’re a fully home-grown enterprise. An empire built from scratch and tailored to the harsh realities of life on Dawn, Bratva are possessed of a uniquely Rodian form of pragmatism. Every Mafia family employs fronts, but the Bratva treat these polite fictions as what they are; a necessary cost of doing business. This leads to their remarkably integrated, unapologetic place in Ariadnan society. From tattooed underlings in track suits to the semi-legitimate “shipping professionals” that make up their lieutenants, their grim practicality is a constant, subtle presence in major cities.",
            [1,2,2,2,0,1,2],
            [Skill.Close_Combat, Skill.Resistance, Skill.Thievery],
            [Skill.Ballistics, Skill.Persuade, Skill.Survival],
            ["Armoured Clothing", "Fake ID 1", "Heavy Pistol", "2 Standard Reloads", "Wurari (2 doses)"],
            "1+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.birthPlace === "Rodina/Tartar" }
        ),
        [Career.CaledonianNoble]: new CareerModel(
            "Caledonian Noble",
            "The Caledonian clans boast a form of government unique in the Human Sphere, and their nobility form its proud, honour-bound heart. Caledonian Nobles work among their people; they hear their concerns, champion their causes, and fight their battles. If the Clan Chief is governor, judge, and warlord, they’re still one person. Rather than try to be everywhere at once, their additional nobles provide the legislative, judicial, and administrative apparatus. Usually originating from the Chief’s family and friends, capable Highlanders occasionally find themselves elevated to the position; and of course, anyone can challenge an existing Noble for their title. Loath to show any signs of weakness, Nobles have learned to throw their weight around; clad in Heavy Tesum jewellery —torcs, rings, necklaces and the like — they eschew subtlety, preferring strong, decisive action to lengthy deliberation.",
            [1,1,1,1,1,3,1],
            [Skill.Command, Skill.Lifestyle, Skill.Persuade],
            [Skill.Animal_Handling, Skill.Close_Combat, Skill.Analysis],
            ["Armoured Clothing", "Sgian Dubh"],
            "2+D4",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.birthPlace === "Caledonia" }
        ),
        [Career.ClaymoreDuellist]: new CareerModel(
            "Claymore Duellist",
            "In a society where duels are an acceptable means of resolving disputes, it pays to have a dedicated expert on your side. And while Caledonians respect anyone who can fight their own battles, there’s also a great deal to be said for inspiring loyalty in capable warriors. Sometimes serving as bodyguards, but never far from their liege’s side, a professional duellist hones their craft to a keen edge through an intense training regimen and a tireless thirst for competition. Of course, such capable warriors do more than just settle disputes; when the Highlands are in danger, Duellists are often the first to leap to its defence, Claymores held high.",
            [2,1,3,1,0,0,2],
            [Skill.Acrobatics, Skill.Close_Combat, Skill.Discipline],
            [Skill.Athletics, Skill.Close_Combat, Skill.Observation],
            ["Teseum Claymore", "Light Combat Armour"],
            "0+D4",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.faction === Faction.Ariadna; }
        ),
        [Career.FreeMiner]: new CareerModel(
            "Free Miner",
            "Teseum is the wealth of Dawn, but it doesn’t grow on trees; it’s hewed from stone through sheer grit, determination, and stubbornness. In the absence of sophisticated mining tools, early Ariadnans learned to make do with what was available, and that attitude persists among its miners today. While every nation employs dedicated teams, most Teseum mining is handled through independent contractors. These “Free Miners” are paragons of the Ariadnan spirit; heading off into dangerous territory, with only their wits and their grit, forcibly extracting their fortune out of some of the hardest, most unforgiving terrain anywhere in the Human Sphere. From the mountains of Caledonia to the hills of Tartary, their adventures aren’t always profitable, but few lives are as self-reliant.",
            [1,1,2,1,1,0,3],
            [Skill.Resistance, Skill.Survival, Skill.Tech],
            [Skill.Athletics, Skill.Pilot, Skill.Spacecraft],
            ["XO Suit", "2 D-Charges", "Trench Hammer", "Bottled Water"],
            "0+D6",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return true }
        ),
        [Career.FrontierDoctor]: new CareerModel(
            "Frontier Doctor",
            "Far from the cushy accoutrements of a private practice, the security of a major hospital, or even the relative stability of a wartime medical facility, the life of a Frontier Doctor is chaotic, but satisfying, and rarely dull. Often the only person with medical training — or an advanced education of any sort — as far as the eye can see, a Frontier doctor can treat snakebites one day, tend to sick cattle the next, and deliver a bouncing baby Dogface the day after that. Not for the faint of heart, or the weak of stomach, Frontier Doctors take pride in looking after their communities. After all, if they don’t, it’s unlikely anyone else will.",
            [1,2,2,1,2,0,2],
            [Skill.Analysis, Skill.Animal_Handling, Skill.Medicine],
            [Skill.Education, Skill.Medicine, Skill.Survival],
            ["Ballistic Vest", "Basic Medical Supplies", "MediKit", "USAriadnan Entrenching Tool"],
            "2+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return true }
        ),
        [Career.Hardcase]: new CareerModel(
            "Hardcase",
            "USAriadna’s southern border is sparsely populated, plenty dangerous, and unforgiving by any standard. A desolate place to be sure, but the refuge of choice for the rough souls collectively known as Hardcases. A term with its roots in the American Old West, Hardcases are a different breed — rough as rawhide, and tough as Teseum nails — but to the homesteaders of the southern border, they’re heroes. Between the smugglers, bandits, and Antipode raids, life on the frontier is incredibly dangerous; and when the nearest major city is hundreds of kilometres away, law is what you can make it. But whether they’re veterans, adventurous frontier folk, or just someone looking to forget the past, when things are at their worst, these Hardcases step into the void; grievous angels in Stetson hats and leather dusters, dispensing frontier justice with hardly a word.",
            [1,2,2,2,0,1,2],
            [Skill.Ballistics, Skill.Observation, Skill.Survival],
            [Skill.Analysis, Skill.Animal_Handling, Skill.Pilot],
            ["Americolt Eagle", "1 Standard Reload", "1 Eagle Reload", "Bandolier", "Binoculars", "Modcoat", "Long (Leather Duster)"],
            "1+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.birthPlace === "USAriadna" }
        ),
        [Career.IrmandinhosSmuggler]: new CareerModel(
            "Irmandinhos Smuggler",
            "Castropol has long been home to all manner of interesting — if occasionally suspect — dealings. Initially founded by a group of Galician biologists from the original colony ship, early settlers used their oceanographic research vessels to acquire, transport, and otherwise provide items for Ariadna’s nascent black market. Today, members of the Brotherhood of Waterborne Surveillance Volunteers, more commonly known as Irmandinhos, act as a shock force, run supplies to remote locations, and of course, they’ve kept right on smuggling. Training isn’t formalized; new recruits learn the ropes alongside veterans of the Irmandade, training in scavenging, repair, and short- range combat tactics, among other topics. With the Galician language essentially dead outside their ranks, they can ensure secrecy that can’t be hacked. A mainstay of the Ariadnan army, they’re also in contact with intelligence services from across the Human Sphere; though to what end, they’re not saying. Except, of course, in Galician.",
            [2,1,2,1,2,1,1],
            [Skill.Close_Combat, Skill.Pilot, Skill.Tech],
            [Skill.Observation, Skill.Stealth, Skill.Thievery],
            ["Chain Rifle", "4 Standard Reloads", "Light Shotgun (with 1 T2 Reload)|Americolt Eagle", "Smoke Grenade x2", "Knife", "Binoculars"],
            "1+D4",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.faction === Faction.Ariadna; }
        ),
        [Career.LoupGarou]: new CareerModel(
            "Loup-Garou",
            "Regardless of one’s feelings on the civil rights issues, a rampaging mass of tooth, claw, and muscle in the throes of a blood fury is a danger to themselves and everyone around them. Rather than trust in the dog-blooded to police themselves, the Ariadnan nations created the Loup-Garous. A joint task force, Loup-Garous are given the best training, equipment, and tactics — every possible advantage — and tasked with containing threats from Dogfaces, Wulvers, and even the occasional Antipode raid. In the aftermath of riots responding to the brutal apprehension and killing of a (later-exonerated) Dogface, the organization is attempting to reform on the fly, putting its shadier elements behind it. Trained to quickly ascertain threats, and versed in multiple de-escalation methods, modern Loup-Garou units are expected to eschew violent solutions whenever possible. But when that isn’t an option, they still strike with blinding precision, disabling their targets before matters get out of hand.",
            [1,2,1,3,0,1,1],
            [Skill.Analysis, Skill.Close_Combat, Skill.Athletics],
            [Skill.Ballistics, Skill.Observation, Skill.Psychology],
            ["Medium Combat Armour", "Boarding Shotgun", "3 Adhesive Shell Reloads", "1 Silver Bullet Reload", "Tactical Webbing"],
            "1+D4",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.faction === Faction.Ariadna; }
        ),
        [Career.MerovingianCommercialAgent]: new CareerModel(
            "Merovingian Commercial Agent",
            "Take one part explorer, two parts merchant, and mix in roving traders, spies, and con artists to taste. Add a dash of exploration, and season with an adventurous spirit, and you’ve got the recipe for a Merovingian Commercial Agent. If the cities are Merovingia’s heart, and the trade caravans her arteries, Commercial Agents are the blood; also, the sweat and tears. Trained in a variety of disciplines, and often a primary interaction point between Ariadna and galactics, a Commercial Agent has to be ready for absolutely anything. If they seem arrogant, it’s because confidence is their best weapon. If they seem uncaring, it’s because neutrality is their sworn duty. And if they keep one hand on their wallet, and another on their weapon? It’s because they’ve learned the hard way; not every partner can be trusted.",
            [1,1,0,1,2,3,1],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Hacking, Skill.Lifestyle, Skill.Stealth],
            ["Negotiator's Suite", "Fusebox", "Pistol", "Rucksack"],
            "2+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.birthPlace === "Merovingia" }
        ),
        [Career.MilitiaMember]: new CareerModel(
            "Militia Member",
            "It’s sometimes said that every Ariadnan is a soldier. And while that’s not technically true, it’s easy to see how it looks that way, given the prevalence of militias — both volunteer, and drafted — dotting the landscape. Much of Rodina mandates a term of service for citizens — equal parts education, training, and patrol — while takes pride in its multiple volunteer armies; and in Caledonia, it’s less an official designation, and more something one does when needed. However they come to be, Militias are diverse by nature, as well as necessity; on any given day, they may be called upon to provide scouting, fire support, field medicine, or just drive a truck. And while they might (and often do) complain, most Ariadnan Militia veterans are intensely proud of their service. They know that freedom isn’t free; they enjoy making their enemies foot the bill.",
            [2,2,1,2,0,1,2],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Observation],
            [Skill.Medicine, Skill.Pilot, Skill.Stealth],
            ["Armoured Clothing", "Rifle", "Painkillers (1 Dose)", "USAriadnan Entrenching Tool, Custom 1"],
            "0+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return true }
        ),
        [Career.Spetsnaz]: new CareerModel(
            "Spetsnaz",
            "Dubbed “The Walking Death” by the River Tribe during the First Antipode Offensive, most people have different names for the Spetznaz, and few are flattering. Heirs to the most underhanded and brutal tactics of the Russian Special Forces, their techniques have been honed by years of Cossack discipline, and the harsh, unforgiving teacher that is the planet Dawn. Their boot camp is founded on one simple principle; rather than stretch the limits of human endurance, they flatly deny the existence of such limits, and push forward. Paragons of the Rodinan virtue of “work hard/play hard,” these soldiers are an unholy terror whether you encounter them in the training yard, the saloon, or the battlefield. But when Ariadna needs defending, there is no better barbed-wire fence than this caustic group of troublemakers.",
            [2,1,2,2,1,0,2],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Resistance],
            [Skill.Discipline, Skill.Stealth, Skill.Thievery],
            ["Jump Pack", "Heavy Combat Armour", "Boarding Shotgun", "Tactical Webbing"],
            "0+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.faction === Faction.Ariadna; }
        ),
        [Career.Scavenger]: new CareerModel(
            "Scavenger",
            "Finding employment can be difficult for anyone. But when you’re a hulking mass of muscle, hated and feared by most of the population, it can be a waking nightmare. Demogrants don’t apply to the dog-blooded; most get by through a mix of hunting, foraging, and salvage. At least, when they’re not fighting off the latest big shot drunk, evading hostile DNAriadnans, or slowly killing themselves with vodka and bitterness. For their part, Antipode Trinaries cut off from their packs are no less dangerous for their desperation; like a racoon with Teseum-laced claws, they take what they can get, but getting in their way is unwise.",
            [2,2,2,1,1,0,2],
            [Skill.Close_Combat, Skill.Survival],
            [...SkillsHelper.getSkills().filter(s => s !== Skill.Close_Combat && s !== Skill.Survival)],
            [],
            "0+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.host === AlienHost.Antipode; }
        ),
        [Career.AntipodeWarlord]: new CareerModel(
            "Antipode Warlord",
            "Long Shadow. Sharp Knife. Names that strike fear into anyone who knows them, and lives to tell the tale; which isn’t many. To be an Antipode war-leader is to face down a technologically superior interloper, and to stand your ground. To look at the changing world, and defiantly bellow “no. You change.” Often mistaken for chiefs or tribal elders, Warlords often have little to do with decision-making capabilities; unless of course, those decisions take place on a battlefield. Warlords are chosen by a combination of consensus, combat prowess, and the most prized and rare trait among Antipode; the ability to stare down a growling, hungry pack of killers, and command them to follow you. Anyone who can pull that off, the reasoning goes, can face a human army without any trouble.",
            [2,2,2,1,0,2,1],
            [Skill.Command, Skill.Close_Combat, Skill.Stealth],
            [Skill.Acrobatics, Skill.Animal_Handling, Skill.Survival],
            ["Knife", "Tactical Bow", "2 AP Arrow Reload", "Wolfshots (3 doses)"],
            "0+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.host === AlienHost.Antipode; }
        ),
        [Career.AssaultPackMember]: new CareerModel(
            "Assault Pack Member",
            "Slavery. There’s really no other way to put it; at least, not at first. Biochemically shackled and leashed to the will of their would-be conquerors, to be an Assault Pack Member is to be an unwilling fist; a mind-controlled weapon, wielded as the master sees fit. And yet, once that initial breaking period is passed, the equation becomes much more complicated. For every tale of Assault Packs tearing their Controllers to shreds, there’s another of an injured handler being dragged back to base by a lone, protective Antipode. For every enemy drugged and mind-controlled, there’s an orphan cub who was taken in, now fighting to protect the only family they’ve ever known. But past the propaganda, an Assault Pack remains a living, breathing, act of violence upon free will… and anything else foolish enough to get in its way.",
            [3,2,3,2,0,0,0],
            [Skill.Acrobatics, Skill.Close_Combat, Skill.Observation],
            [Skill.Animal_Handling, Skill.Stealth, Skill.Survival],
            ["Antipode Control Cranial Implant", "Teseum-Edged Claws"],
            "0+D4",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.host === AlienHost.Antipode; }
        ),
        [Career.DogBloodedIrregular]: new CareerModel(
            "Dog-Blooded Irregular",
            "Most would be hard-pressed to call any unit incorporating Dog-Warriors and Wulvers “regular;” the presence of these preternaturally strong troops allows for some interesting tactical options, even by the standards of irregular military units. From Caledonia’s Cameronian Regiment — berserkers who injure themselves to enter the battle in Dog-Warrior form, Claymores in-hand —to USAriadnan Devil Dogs Marines, to Rodina’s catch-as-catch-can assignment of their primarily Kazak Dog-Warriors, tearing into the enemy with Teseum-laced claws, if you can fight, there’s no shortage of opportunities in the Ariadnan armed forces. And whether the brass likes it or not, there’s no denying that a blood fury is like unleashed hell on a battlefield. Regardless of their classification, Irregulars are trained to fight, to defend their homes, and ultimately, to kill their enemies. It’s also important to avoid being killed themselves; but those lessons come with time and experience. Or not.",
            [2,1,2,2,1,1,1],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Observation],
            [Skill.Acrobatics, Skill.Stealth, Skill.Athletics],
            ["Chain Rifle", "Chain Rifle", "Smoke Grenade (x2)"],
            "1+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return character.host === AlienHost.Dogface ||
                       character.host === AlienHost.Wulver; 
            }
        ),
        [Career.Cameronian]: new CareerModel(
            "Dog-Blooded Irregular: Cameronian",
            "Most would be hard-pressed to call any unit incorporating Dog-Warriors and Wulvers “regular;” the presence of these preternaturally strong troops allows for some interesting tactical options, even by the standards of irregular military units. From Caledonia’s Cameronian Regiment — berserkers who injure themselves to enter the battle in Dog-Warrior form, Claymores in-hand —to USAriadnan Devil Dogs Marines, to Rodina’s catch-as-catch-can assignment of their primarily Kazak Dog-Warriors, tearing into the enemy with Teseum-laced claws, if you can fight, there’s no shortage of opportunities in the Ariadnan armed forces. And whether the brass likes it or not, there’s no denying that a blood fury is like unleashed hell on a battlefield. Regardless of their classification, Irregulars are trained to fight, to defend their homes, and ultimately, to kill their enemies. It’s also important to avoid being killed themselves; but those lessons come with time and experience. Or not.",
            [2, 1, 2, 2, 1, 1, 1],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Observation],
            [Skill.Athletics, Skill.Close_Combat, Skill.Resistance],
            ["Teseum Claymore", "Smoke Grenade", "Grenade", "Chain Rifle"],
            "1+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return (character.host === AlienHost.Dogface ||
                        character.host === AlienHost.Wulver) &&
                        (character.birthPlace === "Caledonia");
            }
        ),
        [Career.KazakDogWarrior]: new CareerModel(
            "Dog-Blooded Irregular: Kazak Dog-Warrior",
            "Most would be hard-pressed to call any unit incorporating Dog-Warriors and Wulvers “regular;” the presence of these preternaturally strong troops allows for some interesting tactical options, even by the standards of irregular military units. From Caledonia’s Cameronian Regiment — berserkers who injure themselves to enter the battle in Dog-Warrior form, Claymores in-hand —to USAriadnan Devil Dogs Marines, to Rodina’s catch-as-catch-can assignment of their primarily Kazak Dog-Warriors, tearing into the enemy with Teseum-laced claws, if you can fight, there’s no shortage of opportunities in the Ariadnan armed forces. And whether the brass likes it or not, there’s no denying that a blood fury is like unleashed hell on a battlefield. Regardless of their classification, Irregulars are trained to fight, to defend their homes, and ultimately, to kill their enemies. It’s also important to avoid being killed themselves; but those lessons come with time and experience. Or not.",
            [2, 1, 2, 2, 1, 1, 1],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Observation],
            [Skill.Acrobatics, Skill.Discipline, Skill.Stealth],
            ["Teseum-Edged Claws", "Smoke Grenade (x3)", "Chain Rifle", "Chain Rifle"],
            "1+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return (character.host === AlienHost.Dogface ||
                        character.host === AlienHost.Wulver) &&
                        (character.birthPlace === "Rodina/Tartar");
            }
        ),
        [Career.DevilDogsMarines]: new CareerModel(
            "Dog-Blooded Irregular: Devil Dogs Marines",
            "Most would be hard-pressed to call any unit incorporating Dog-Warriors and Wulvers “regular;” the presence of these preternaturally strong troops allows for some interesting tactical options, even by the standards of irregular military units. From Caledonia’s Cameronian Regiment — berserkers who injure themselves to enter the battle in Dog-Warrior form, Claymores in-hand —to USAriadnan Devil Dogs Marines, to Rodina’s catch-as-catch-can assignment of their primarily Kazak Dog-Warriors, tearing into the enemy with Teseum-laced claws, if you can fight, there’s no shortage of opportunities in the Ariadnan armed forces. And whether the brass likes it or not, there’s no denying that a blood fury is like unleashed hell on a battlefield. Regardless of their classification, Irregulars are trained to fight, to defend their homes, and ultimately, to kill their enemies. It’s also important to avoid being killed themselves; but those lessons come with time and experience. Or not.",
            [2, 1, 2, 2, 1, 1, 1],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Observation],
            [Skill.Animal_Handling, Skill.Resistance, Skill.Stealth],
            ["Medium Combat Armour", "Smoke Grenade (x2)", "Boarding Shotgun"],
            "1+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return (character.host === AlienHost.Dogface ||
                        character.host === AlienHost.Wulver) &&
                        (character.birthPlace === "USAriadna");
            }
        ),
        [Career.DogBowlPlayer]: new CareerModel(
            "Dog-Bowl Player",
            "In a world of mistrust, fear, and outright hatred, it’s nice to be cheered. It’s even better to be cheered while the same qualities that mark them an outcast, propel them to indescribable feats of athleticism. In the streets, the risk of a blood fury causes police to profile them, and parents to hide their children; but in the game, that same fury carries them to glorious victory, amidst thunderous applause. To be a Dog-Bowl player is to live in a pocket of adoration amidst a sea of trouble; also, the salary’s nice. Unfortunately, athletic careers tend not to last all that long. Injury, scandal, the real or perceived effects of aging; any and all of these factors can cause the whole thing to come crashing down. But while it lasts, there’s nothing quite like it.",
            [2,0,3,1,0,2,1],
            [Skill.Acrobatics, Skill.Athletics, Skill.Close_Combat],
            [Skill.Close_Combat, Skill.Lifestyle, Skill.Observation],
            ["Cod (3 doses)", "Dog-Bowl Armour", "Recorder"],
            "1+D5",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return character.host === AlienHost.Dogface ||
                       character.host === AlienHost.Wulver; 
            }
        ),
        [Career.DogNationActivist]: new CareerModel(
            "Dog Nation Activist",
            "“Equality or Death! This is the voice of the metisy! The voice that cannot be silenced! The shout that cannot be ignored! The roaring cry of the Dog Nation!” It’s been years since John “Vanya” Rotten uttered those words; and while it seemed like things were getting better, many Dogfaces and Wulvers feel that it’s been two steps forward, two steps back. The Dog Nation isn’t in the business of waiting for the world to come around; its members want real change, and they’re willing to take action to get it. If that means protests, rallies, and civil disobedience, so be it. And for some, if that means stepping outside the boundaries of the law, that’s fine; they consider any damage they cause to be a drop in the bucket when compared to everything they’ve been through.",
            [1,1,1,0,1,2,3],
            [Skill.Education, Skill.Persuade, Skill.Tech],
            [Skill.Hacking, Skill.Stealth, Skill.Thievery],
            ["Digicloak (Urban)", "Fusebox", "Rebreather", "2 Recorders"],
            "1+D2",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return character.host === AlienHost.Dogface ||
                       character.host === AlienHost.Wulver;
            }
        ),
        [Career.ForestRanger]: new CareerModel(
            "Forest Ranger",
            "One of the few career paths that actively recruits Dogfaces and Wulvers, Forest Rangers — or simply “Wardens” in Caledonia — fill a unique niche in Ariadnan society. Even in the Antipodean wilds, having a lone Trinary keep tabs on the territory isn’t an uncommon occurrence. Less focused on conservational efforts or cracking down on poachers, Rangers cover wide stretches of wild territory; mapping, cataloguing, and marking changes in the natural ecosystem. Maintaining roads, outposts, and waystations is a constant task; given the large distances between many Ariadnan cities, they also provide guidance, support, and the occasional rescue to travellers. While not soldiers per se, the Ariadnan wilds are far from safe, so while some Rangers certainly know how to fight, every Ranger learns how to avoid one.",
            [1,3,2,1,1,0,1],
            [Skill.Medicine, Skill.Stealth, Skill.Survival],
            [Skill.Athletics, Skill.Animal_Handling, Skill.Survival],
            ["Knife", "Nav Suite (Forest)", "Survival Kit (Forest)", "Tracking Collar", "USAriadnan Entrenching Tool, Custom 1"],
            "1+D3",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return character.host === AlienHost.Dogface ||
                       character.host === AlienHost.Wulver ||
                       character.host === AlienHost.Antipode;
             }
        ),
        [Career.Raider]: new CareerModel(
            "Raider",
            "From the Dogface desperados of the USAriadnan frontier, to pirates harrying remote Stanitsas, to the Antipode raiding groups that provide a constant source of terror to frontier folk, Raiders all have one thing in common; they take what they want, using lethal force if necessary. Or sometimes, if they’re bored enough. Between the threats of Antipodes, wild animals, attacks by galactics, and the planet itself, there’s no shortage of opportunities for raiding in Ariadna. Unlike Submondo, who generally have an organizational structure, Raiders are wildcards in the truest sense; accountable to nothing but themselves, and one step ahead of what passes for law on the frontier. It is a life that few choose outright, but one that many find themselves particularly well-suited to.",
            [1,1,3,2,0,1,1],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Thievery],
            [Skill.Pilot, Skill.Survival, Skill.Stealth],
            ["Surge (1 dose)", "Teseum Chopper"],
            "0+D4",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return character.host === AlienHost.Dogface ||
                       character.host === AlienHost.Wulver ||
                       character.host === AlienHost.Antipode; },
            true
        ),
        [Career.Volk]: new CareerModel(
            "Volk",
            "“Pay up, or I throw you to the wolves.” Whoever first had the idea is lost to time, but where most Ariadnans saw a problem, the Bratva saw an opportunity. Many Dogfaces are societal castoffs, who can also casually destroy a motorcycle with their bare hands. The gangsters sensed an opportunity, and began recruiting Dogfaces as cheap muscle. Nowadays, the term “Volk” (from the Russian волк, meaning wolf), is used to describe any Dogface (or these days, Wulver) involved in Submondo activity. While not all Volks wear tracksuits and speak in mangled clichés, popular Ariadnan fiction suggests otherwise, and more than one Volk has simply steered into the stereotype, rather than constantly explain themselves. While it’s hardly upright work, many find it honest in its way. Regardless of their feelings on the matter, there’s no denying that they make excellent muscle.",
            [2,1,3,1,0,1,1],
            [Skill.Athletics, Skill.Close_Combat, Skill.Stealth],
            [Skill.Animal_Handling, Skill.Close_Combat, Skill.Thievery],
            ["Cod (2 doses)", "D.E.P.", "Nitrocaine (1 dose)", "Painkillers (2 doses)", "Sports Padding"],
            "",
            [Faction.Ariadna],
            Source.Ariadna,
            () => {
                return character.host === AlienHost.Dogface ||
                       character.host === AlienHost.Wulver; 
            },
            true
        ),
        [Career.WulverShockTroop]: new CareerModel(
            "Wulver Shock Troop",
            "“Airaghardt!” (Go Forth!) — the Gaelic motto of the Caledonian 9th Wulver Grenadiers Regiment — sums up the mentality of most Wulver strike teams; they hit hard, they hit fast, and if at all possible, they hit first. While studies have been inconclusive as to whether or not Wulvers are any more or less intelligent than their Dogface cousins, there’s no denying they have a much easier time communicating, leading some mixed-troop units to rely on them as commanders and field medics. Ariadnan militaries are still learning how best to use their Dogfaces; so how to effectively utilize Wulvers’ unique contributions is very much a work-in-progress. Until then, Wulver soldiers can usually be found in the thick of things, riding the blood fury to victory or death… or far too often, both.",
            [2,1,2,2,2,1,0],
            [Skill.Athletics, Skill.Close_Combat, Skill.Ballistics],
            [Skill.Acrobatics, Skill.Command, Skill.Medicine],
            ["Light Combat Armour", "Explosive Grenade", "Shock Grenade", "Smoke Grenade", "T2 Boarding Shotgun"],
            "1+D1",
            [Faction.Ariadna],
            Source.Ariadna,
            () => { return character.host === AlienHost.Wulver; }
        ),
        [Career.AkbarDoctor]: new CareerModel(
            "Akbar Doctor",
            "The study of Tebb al-Nabi, the Prophet’s Medicine, is more than a scholarly pursuit; it’s a metaphor for understanding the cosmos and the sublime intersection of Art, Science, and Spiritual pursuits. Having said that, anyone witnessing an Akbar Doctor (“great” in Arabic) at work would be hard-pressed to deny their practical applications, they aren’t just some of the best surgeons in the Human Sphere, they’re arguably the finest battlefield medics anyone has ever produced. Able to perform complex surgeries, apply genetic therapy, and deploy fast-acting nanomachines in the time it takes others to perform a diagnosis, it’s no exaggeration to suggest that the Great Doctors have played an integral role in Haqqislam’s military holding its own against far greater numbers. Not everyone can do what an Akbar Doctor can, and almost no one does it better under pressure.",
            [0, 1, 0, 1, 3, 2, 2],
            [Skill.Discipline, Skill.Education, Skill.Medicine],
            [Skill.Analysis, Skill.Medicine, Skill.Psychology],
            ["Basic Medical Supplies", "Akbar Kit|MediKit and Silk (1 dose)", "Light Combat Armour"],
            "2+D2",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.Caravaner]: new CareerModel(
            "Caravaner",
            "Caravanserais are more than just space stations, ports of call, or trade hubs; they’re a slice of Bourak out among the stars. A thousand factors go into each decision, from the cut of a rug, to which decks will have live musical performances, to the water pressure in a fountain. If Caravanserais are the beating heart of Haqqislam in space, Caravaners are the cardiac physicians, applying Tebb al-Nabi to ensure its continued health. Travelling from Caravanserai to Caravanserai, staffing and maintaining a particular location, or setting up shop as a Peddler, most Caravaners have done it all, or are on their way to doing so. They are passengers, pilots, technicians, security and more, but most of all, they are citizens.",
            [1, 2, 1, 1, 1, 2, 2],
            [Skill.Extraplanetary, Skill.Lifestyle, Skill.Observation],
            [Skill.Persuade, Skill.Pilot, Skill.Tech],
            ["Blu Khat (2 doses)", "Riha Rations", "Vac Suit (2 Oxygen Loads)", "Powered Multitool", "Inlaid Palm Circuitry|Pistol and Stun Baton"],
            "2+D3",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.DiwanFunctionary]: new CareerModel(
            "Diwân Functionary",
            "Many citizens find employment with Haqqislam’s government. Bureaucrats, diplomats, minor local officials, statisticians, and lawyers; the Diwân provide no shortage of opportunities for Haqqislam’s citizens to participate in civic governance, from supply clerks overseeing military support for the Diwân al Jund, to press agents for the Diwân al Hachib managing requests relating to the president, including flagging the journalists that might be foreign spies. Agents of the Diwân al Mazalim travel between Caravanserai, often hand-in-hand with agents from the Diwân al Kharâj, spotting foreign investors attempting to use Haqqislam’s intricate tax codes as shelter. The Diwân al Rasa’il’s agents coordinate with ALEPH while fending off quantronic attacks both foreign and domestic. Diwân Functionaries work tirelessly in the service of Haqqislam, with no issue too small, and no challenge too great.",
            [0, 1, 0, 1, 2, 2, 3],
            [Skill.Analysis, Skill.Persuade, Skill.Psychology],
            [Skill.Command, Skill.Hacking, Skill.Tech],
            ["Cosmetics Kit", "Psychotropics (2 Doses)", "Repair Kit|Negotiation's Kit (2 Day's Rental)", "Armoured Clothing"],
            "1+D4",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.GreyMarketSpy]: new CareerModel(
            "Grey Market Spy",
            "Given the thriving R&D industry in Haqqislam—particularly in biotechnological fields—it comes as no surprise that corporate espionage runs rampant, especially on Bourak. Free of the heavy regulations and protections that govern the Silk trade, Haqqislam Biohealth Corps are locked in a high-stakes chess game of sabotage, headhunting, and industrial espionage—and that’s before foreign powers get involved. Whether acquisition, counter-espionage, or more direct forms of sabotage, there’s a high demand for discreet agents willing to get their hands dirty. Enter the Grey Market Spy. Either as part of a Biohealth Corp’s dedicated counter-intelligence staff, or as freelancers offering their skills to whomever holds their contract, these professionals provide a less-combative alternative to many mercenary companies. A Grey Market Spy aims for their targets to lose profits, not lives. But when the chips are down, they’ll be what they always are: professional.",
            [1, 3, 0, 1, 1, 2, 1],
            [Skill.Lifestyle, Skill.Stealth, Skill.Thievery],
            [Skill.Hacking, Skill.Observation, Skill.Tech],
            ["Djinncloak", "Fake ID 3|Breaking & Entering Kit", "Hacking Device|Vrabec Pistol"],
            "1+D5",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.Hafza]: new CareerModel(
            "Hafza",
            "In Islamic mythology, four guardian spirits (known as Hafazas or Hafzas) keep watch over believers, bolstering their soul against malevolent influence and recording their deeds. In Haqqislam, the elite Hafza unit are guardian angels of the battlefield. Every Hafza trains at the prestigious Military Academy of Al-Khaafdif, where they learn tactics, philosophy, and behavioural sciences. A Hafza can turn any group of soldiers into an efficient, coordinated combat force, no matter how eclectic or diverse their skills and backgrounds. Soldiers know they can rely on the Hafza, who never ask for something they’re not willing to do themselves. Enemy forces quickly learned to target these lynchpins, so the modern Hafza is a master of disguise; even other Haqqislam soldiers have difficulty identifying them. The guardians are always there, invisibly guiding their charges to safety through any storm.",
            [1, 2, 0, 1, 2, 2, 2],
            [Skill.Command, Skill.Psychology, Skill.Stealth],
            [Skill.Ballistics, Skill.Discipline, Skill.Lifestyle],
            ["Hafza Holomask", "Spitfire|Rifle with Light Shotgun", "Cosmetics Kit"],
            "1+D2",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return character.faction === Faction.Haqqislam; }
        ),
        [Career.HassassinExemplar]: new CareerModel(
            "Hassassin Exemplar",
            "Hassassins have a singular goal: to protect the Search for Knowledge. Though, removing impediments to the scientific, cultural, and spiritual development of the Human Sphere is often anything but. Safeguarding the future requires full dedication to the cause. Seekers of Haqqislamite Virtues, committed to the Search for Knowledge. In other words, Hassassin Exemplars. While not every Hassassin is an assassin per se, each strives to understand the art of murder. The loss of any life is regrettable, but that cost is ever balanced against the Search. In a society where Cubes are commonplace, death can seem like little more than an inconvenience. Hassassins, however, use it to deliver a clear message that those who place themselves above humanity’s future are never safe, no matter where they hide.",
            [2, 2, 1, 1, 1, 2, 1],
            [Skill.Close_Combat, Skill.Discipline, Skill.Stealth],
            [], // determined by Order
            [""], // determined by Order
            "1+D2",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return character.faction === Faction.Haqqislam; }
        ),
        [Career.HassassinFidayHaqqislam]: new CareerModel(
            "Hassassin Fiday",
            "No covert operative in human space is deadlier or more feared than those of the Hassassin Society; and among the Society, few are as deadly or feared as the Fidays. Embracing death as part of their duty, the Fidays, or “those who sacrifice,” are not sent to quietly and subtly remove their targets: they intend to make a scene. To a Fiday, assassination is more an act of communication than one of violence, and they seek to safeguard the future of humanity’s evolution through powerful disincentivizing. No matter who you are, or how safe you believe yourself to be, the Fiday can find and end you. Needless to say, many Fidays don’t outlive their assignments.",
            [1, 2, 1, 2, 1, 1, 2],
            [Skill.Close_Combat, Skill.Discipline, Skill.Stealth],
            [], // determined by Order
            ["Fake ID 3", "Cosmetics Kit", "Climbing Plus", "Grazeblade", "DT Sniper Rifle", "2 Standard Reloads"],
            "1+D2",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return character.faction === Faction.Haqqislam; }
        ),
        [Career.Khawarij]: new CareerModel(
            "Khawarij",
            "Haqqislam’s biomedical research is second to none, a fact embodied by their best-in-class super soldier programs. Most notable among these are the Khawarijs, a group of Haqq Mutazilite scholars who undergo Runihura—literally “destructor” — treatment, resulting in sagacious super-soldiers who look as though they could subdue an Ezhdeha Tariki with their bare hands. Khawarijs endeavour to maintain a “wise contradiction and perfect balance,” weighing their scholarly pursuits and enhanced combat prowess against each other in delicate harmony. Though not all Khawarijs possess such a philosophical bent, it would be a mistake to classify any as soulless, unnatural, or otherwise detached from humanity. Unlike the Nomads’ Chimera, who push for transcendence, Haqqislam’s super-soldiers seek a greater understanding of the self through skilful application of The Prophet’s Medicine, building the temple in which Paradise is found.",
            [2, 2, 2, 2, 1, 0, 1],
            [Skill.Athletics, Skill.Athletics, Skill.Discipline], // TODO: Athletics twice?
            [Skill.Acrobatics, Skill.Ballistics, Skill.Close_Combat],
            ["Spitfire", "Runihura Augmentation"],
            "2+D4",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.KumGanger]: new CareerModel(
            "Kum Ganger",
            "“North, South, East, or West, where to find the Kyrgyz? By the silver hand of Alexander, look for them around their enemies!” For the Kum, this age-old Kyrgyz battle shout is as much a way of life as it is a rallying cry. Of course, to a Kum Ganger, the definition of enemy can include foreign militaries, rival gangs, local police, or a best friend, depending on the day. While the Sword of Allah recruits from these ruthless biker gangs for their Kum Motorized Troops, most Kum Gangers are preoccupied with dealings far less savoury or essential to the continued well-being of Haqqislam. The Kum Gangers few rules include: ride hard, fight harder, and keep what you kill. Possession is the whole of the law. If you’re not strong enough to stop something being taken, it was never truly yours to begin with.",
            [1, 0, 1, 0, 2, 2, 3],
            [Skill.Ballistics, Skill.Pilot, Skill.Resistance],
            [Skill.Command, Skill.Tech, Skill.Thievery],
            ["Smoke Grenade", "Chain Rifle", "Knife", "Signal Flare", "Kum Motorcycle", "Ad-Qali Armour 2", "ExcelRate (1 dose)"],
            "1+D2",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.MagharibaGuard]: new CareerModel(
            "Maghariba Guard",
            "While not exactly known for armoured regiments, the Maghariba Guard is nevertheless the pride of the Haqqislamite military. Impressive firepower and mobility mean the XPR-5 Akrep Scorpion TAGs can keep pace with anything PanOceania or Yu Jing can throw at them. When it comes to military spending, however, Haqqislam doesn’t have a seat at that table. Always outnumbered, and often outgunned, the Maghariba Guard are nevertheless anything but tentative or cautious. And crafty. That’s a must. Most TAG pilots would struggle with the cognitive dissonance in piloting a battlefield colossus with patience, precision, and cunning, so the Maghariba cannot afford to be most TAG Pilots. They must be better, or at the very least, more thoughtful in their actions. Maghariba tend to embody this contradiction in every aspect of their life: hyper-analysing the smallest details, yet willing to throw caution to the wind at a moment’s notice.",
            [1, 2, 1, 2, 2, 0, 2],
            [Skill.Discipline, Skill.Observation, Skill.Pilot],
            [Skill.Analysis, Skill.Ballistics, Skill.Education],
            ["Steady (2 doses)", "Rihla Rations", "Pistol"],
            "3+D1",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return character.faction === Faction.Haqqislam; }
        ),
        [Career.MedicalResearcher]: new CareerModel(
            "Medical Researcher",
            "For most Biomedical researchers, there is no more attractive environment than Bourak. Compared to the capitalistic pressures of most Hypercorps to create marketable products, the Search for Knowledge has prioritized understanding, and Tebb al-Nabi has given medicine a near-sacred place in Haqqislamite society. For a Medical Researcher, the chance to truly push the limits of human understanding without the need for results is incredibly attractive, though it’s not all roses and sunshine. Competition between Biohealth Corps is incredibly fierce, and recruiting tactics aren’t always ethical. Most Medical Researchers receive at least cursory training in counter-espionage; finding themselves employed in very different circumstances on short notice is a real risk. Everyone involved wants to see a Medical Researchers work come to fruition, however and for many that more than makes up for any unanticipated excitement.",
            [1, 2, 1, 1, 2, 1, 2],
            [Skill.Education, Skill.Medicine, Skill.Science],
            [Skill.Analysis, Skill.Animal_Handling, Skill.Command],
            ["Laboratory (2 month's rental credit)", "Noor AR", "Saifari AR", "Sniffer 2", "Geist Upgrade: +2 Education|Geist Upgrade: Research Specialist talent"],
            "3+D2",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.MuhafizAgent]: new CareerModel(
            "Muhafiz Agent",
            "Outside of the Hassassins, the Muhafiz make up Haqqislam’s only significant intelligence agency. In theory, the authority of the Funduq Security and Intelligence Force—the Muhafiz—is limited to trade route security. In practice, every aspect of the Human Sphere technically intersects with Haqqislam’s trade interests. High Command enjoy working with agents who don’t answer to a quasi-mythical figure outside of their command chain and send Muhafiz Agents across the Human Sphere. Some units have gained considerable notoriety, including their special assault corps: the Djanbazan Tactical Group. Many undergo extensive biogenic treatments and augmentations. Al Hawwa’ (“the snake charmer” in Classical Arabic) are a clandestine naval unit specializing in Infowar and covert operations. But whatever their classification, the Muhafiz are a popular tool for those uncomfortable with the Old Man’s stranglehold on Haqqislamite intelligence.",
            [1, 2, 1, 2, 2, 1, 1],
            [Skill.Analysis, Skill.Hacking, Skill.Observation],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Medicine],
            ["Assault Hacking Device|Multispectral Visor 2", "Vrabec Pistol", "Armoured Clothing", "Hawala Dot 1", "Djanbazan Regeneration|Sixth Sense"],
            "2+D1",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return character.faction === Faction.Haqqislam; }
        ),
        [Career.Odalisque]: new CareerModel(
            "Odalisque",
            "The most effective bodyguards in the Human Sphere, Funduq's Çember Odalisques Academy turns pretty faces into ethereal beauties, gifted athletes into precise killers, and flirtatious personalities into master manipulators. Their composure, precision, and beauty are the envy of agents across the Human Sphere. Able to wield their bodies and minds as precise instruments to achieve their goals, everything about an Odalisque is painstakingly considered; even the title is designed to conjure the image of an exotic beauty gracefully reclining over a divan. Though possessing every courtly charm imaginable, there is nothing languid about them once they spring to action. Combining the grace of a dancer with the ferocity of a tiger, more than one would-be kidnapper has wound up at the mercy of an Odalisque they mistook for just another pretty face.",
            [1, 1, 0, 1, 1, 3, 2],
            [Skill.Acrobatics, Skill.Observation, Skill.Persuade],
            [Skill.Ballistics, Skill.Education, Skill.Resistance],
            ["Aletheia Kit", "Nanopulse", "Subdermal Grafts|Odalisque Augmentation"],
            "3+D1",
            [Faction.Haqqislam],
            Source.Haqqislam,
            () => { return true; }
        ),
        [Career.Explorer]: new CareerModel(
            "Explorer",
            "The Hyperpower has always prided itself on its Explorers, the brave souls who fearlessly chart new courses, find neo-material rich asteroids to mine, and in exceptionally rare cases, new worlds to colonise. Of course, most of an Explorer’s life is spent in far less grandiose pursuits. Whether conducting an environmental survey, navigating an asteroid belt, or pushing the boundaries of the Human Edge, Explorers all have one thing in common—they heard the call of adventure.",
            [1, 2, 1, 3, 1, 0, 1],
            [Skill.Extraplanetary, Skill.Pilot, Skill.Spacecraft],
            [Skill.Observation, Skill.Survival, Skill.Tech],
            ["Crashsuit", "Exo-Compass", "Inland Palm Circuitry|Thunka Charges (2)"],
            "1+D4",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return true; }
        ),
        [Career.CrocMan]: new CareerModel(
            "Croc Man",
            "Veteran scouts from the brutal jungles of Paradiso, the Croc Men were founded in the wake of the Ravensbrücke debacle. The PanOceanian Polynesian Division went into the ill-fated operation as Fusiliers. The survivors came out as a battle-forged whanau. Many Crocs, regardless of ethnicity or gender, honour the unit’s heritage by opting to receive Tā moko—the tattoo- like facial markings signifying status and coming of age in Māori society—upon embarking on their first tour of duty.Specializing in surveillance, covert operations, and sabotage, Croc Men make stalwart friends and deadly enemies.",
            [2, 2, 1, 2, 1, 1, 1],
            [Skill.Ballistics, Skill.Survival, Skill.Stealth],
            [Skill.Close_Combat, Skill.Observation, Skill.Stealth],
            ["Light Combat Armour", "Mere X", "Croc Mines (3)|Subdermal Grafts", "MULTI Sniper Rifle"],
            "0+D1",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return true; }
        ),
        [Career.FighterPilot]: new CareerModel(
            "Fighter Pilot",
            "In the PanOceanian Armada, perhaps no role is as glamourized as that of the fighter pilot. PanOceania’s aviators are portrayed as brash and reckless top guns in many a Maya-series, a reputation that their real-world counterparts do little to discourage. Outside of the holomovies, successful fighter pilots possess a killer instinct and hunter’s temperament sharpened to a fine point. With unmanned high-manoeuvrability fighter squads operating at speeds beyond human capability, a pilot needs synchronisation that is hard to match from a Remote Presence Cockpit. Many Fighter Pilots become permanent adrenaline junkies; from Father-Pilots to Archeron Blockade vets, once you’ve danced among the stars with your life on the line, a sedentary lifestyle holds little appeal.",
            [1, 2, 1, 3, 0, 1, 1],
            [Skill.Ballistics, Skill.Pilot, Skill.Spacecraft],
            [Skill.Observation, Skill.Resistance, Skill.Spacecraft],
            ["AR Eye Implants", "Inlaid Palm Circuitry", "Surge (2 doses)", "Light Combat Armour|Assault Pistol"],
            "3+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return true; }
        ),
        [Career.Fusilier]: new CareerModel(
            "Fusilier",
            "The unquestioned backbone of the PanOceanian military, Fusiliers consider themselves the light infantry troop to judge all others by. Professional soldiers hailing from every corner of PanOceania, many citizens have spent a tour of duty with the Fusiliers. While not all go on to careers in the military, most look back on their service with immense pride. Fusiliers commonly posit that they form the heart of the army—everyone else is basically their support staff.And while this sentiment is echoed with a range of intentions from comical to dead serious, it wouldn’t survive this long without at least a grain of truth. Ubiquitous, modern, and versatile, Fusiliers are the binding agent that holds the PanOceanian Military Complex together.",
            [1, 2, 1, 2, 1, 1, 2],
            [Skill.Athletics, Skill.Ballistics, Skill.Resistance],
            [Skill.Medicine, Skill.Stealth, Skill.Tech],
            ["Light Combat Armour", "Combi Rifle", "Pollock Grenade", "Pollock Grenade"],
            "2+D1",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.faction === Faction.PanOceania; }
        ),
        [Career.HexasAgent]: new CareerModel(
            "Hexas Agent",
            "The living embodiment of the Hexahedron’s Strategic Security Division and an espionage fantasy made flesh, Hexas Agents safeguard PanOceanian interests throughout the Human Sphere. Equipped with bleeding edge tools, forward-thinking training, and the full support of the Hyperpower, a Hexas Agent has no boundaries, no moral code, and no conscience while in the field. The mission is all that matters, and the mission can change by the hour. Able to infiltrate corporate facilities, capture the attention of hyper- elites, and pursue targets through adverse conditions, Hexas Agents are chameleons by necessity.Who they are today might not suit tomorrow’s task.The spy fantasy both is and isn’t everything it’s cracked up to be, but the vids were right about one thing.Hexas Agents possess impeccable style.",
            [1, 2, 0, 1, 1, 3, 1],
            [Skill.Close_Combat, Skill.Persuade, Skill.Stealth],
            [Skill.Hacking, Skill.Psychology, Skill.Thievery],
            ["Hexas Nightwear", "Malasartes Grenade", "Wetspike"],
            "3+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.faction === Faction.PanOceania; }
        ),
        [Career.Knight]: new CareerModel(
            "Knight",
            "Symbols of faith, collaboration, and unwavering dedication, Knights are living emblems for not only the military, but for PanOceanian society as well. Living beyond a soldier’s ideals, a Knight must inspire others with their faith, even if they don’t share it. Beliefs must be upheld, even if surrounded by those who flaunt them. Internal rivalries must be put aside, both figurative and literal, so that a united charge can be taken against PanOceania’s enemies. It’s often said that Knights never truly retire, as they simply enter a new chapter of service.For a living embodiment of chivalry, piety, and holy warfare, there are no true days off, just new ways to serve.",
            [2, 1, 2, 1, 1, 1, 2],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Command],
            [], // determined by order
            [""], // determined by order
            "1+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.faction === Faction.PanOceania; }
        ),
        [Career.MayacastSupportStaff]: new CareerModel(
            "Mayacast Support Staff",
            "Every star has bodies in its orbit, and the stars of Maya broadcasts are no different. Equal parts roadie, tech support, film crew, business manager, and personal security, these unsung heroes of the entertainment industry work tirelessly behind the scenes so that programmes can air without a hitch. Often ducking and diving just beyond a camera’s view, their job is misunderstood, exhausting, and invisible. But these self-proclaimed “tech ninjas” wouldn’t have it any other way. As any entertainer who’s tried to make do without them will tell you, things just work out better when they’re on your side.",
            [1, 1, 0, 1, 1, 2, 2],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Command],
            [Skill.Hacking, Skill.Pilot, Skill.Stealth],
            ["AR Eye Implants", "Theia Orb", "Powered Multitool", "3 Recorders"],
            "2+D4",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return true; }
        ),
        [Career.NeoterranSpecialOfficer]: new CareerModel(
            "Neoterran Special Officer",
            "As one of the largest population centres in the Human Sphere, Neoterra is also arguably the safest. Exactly as intended. Whether it’s the Tactical Operations Unit, Special Narcotics Force, the Territory Response Group’s Hawk Brigade, or any of the countless other civilian police forces, Neoterra’s Special Officers ensure stability is maintained at any cost. Often working undercover or striking at a moment’s notice, Special Officers live their lives on- call.They seek out the worst dregs of society and prevent them from causing harm, all without disrupting, terrorizing, or otherwise harassing the rest of the citizenry.If the wrong call is made, they must be fast enough to make up the difference.Balancing optimism and cynicism in equal measure is no small task, but these officers wouldn’t trust anyone else with the job.",
            [1, 3, 1, 2, 1, 1, 0],
            [Skill.Ballistics, Skill.Observation, Skill.Stealth],
            [Skill.Analysis, Skill.Hacking, Skill.Science],
            ["AR Eye Implants", "Ballistic Vest", "Banduk|Hacking Device|Stun Baton"],
            "2+D3",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.faction === Faction.PanOceania; }
        ),
        [Career.OrderSergeant]: new CareerModel(
            "Order Sergeant",
            "Not all members of a Military Order become Knights, which is no bad thing as logistics, bureaucracy, technical issues, and a thousand other factors mean the Orders have their hands full. Sergeants at Arms, colloquially known as Order Sergeants, provide the assistance and support necessary for the Military Orders to reach their full potential. Ranging from earnestly pious, to opportunistic or even bloodthirsty, Order Sergeants are often temporary associates who have paid for the privilege of belonging to an Order.Regardless, they are the lifeblood in the Orders’ veins once the call to action goes out.Conducting tactical support tasks and securing combat zones as part of the advance force, Order Sergeants represent the breadth of PanOceanian society for both good and ill. There are few defenders of faith and home as stalwart once the call to arms goes out.",
            [1, 2, 2, 1, 1, 1, 2],
            [Skill.Close_Combat, Skill.Observation, Skill.Tech],
            [], // determined by order
            ["Assault Pistol", "Knife", "Light Combat Armour"],
            "1+D4",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.faction === Faction.PanOceania; }
        ),
        [Career.SensoriumMayacaster]: new CareerModel(
            "Sensorium Mayacaster",
            "The thrill of racing over Varuna’s waves. The exhilaration of traversing Neoterra’s urban environments via augmented parkour. The picoscale precision of an Acontecimento prima ballerina. Any Mayacaster can show their audience these things, but a Sensorium Mayacaster can make them feel it. Communicating sensory data through their augmentations, these entertainers bring their audiences with them on remarkable journeys, letting the audience feel the exhilaration of success, the shock of despair, and every range of emotions in-between.Athletes are common, but all Sensorium Mayacasters provide their own unique perspective to their fans.For them, the concept of privacy is almost foreign, but the rewards are absolutely worth it.",
            [1, 1, 0, 1, 2, 3, 1],
            [Skill.Acrobatics, Skill.Lifestyle, Skill.Persuade],
            [Skill.Education, Skill.Hacking, Skill.Psychology],
            ["AR Eye Implants", "High-Quality Clothing", "Full-Sensorium Maya Integration"],
            "1+D8",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return true; }
        ),
        [Career.Priest]: new CareerModel(
            "Priest",
            "Whether pious or lackadaisical, religion is an integral part of daily life for most PanOceanians. The Hyperpower produces more clergy per capita than any other G5 nation. While the Church is overwhelmingly the dominant religion, there exist no small number of Hindu Pujari, Sikh Granthi, and other clerical representatives of their respective religions. Affiliations aside, Priests provide guidance, leadership, and hope to their clergy. With the advent of quantronic-assisted communion, modern Priests are frequently opinion leaders rather than liturgists or ritual leaders; a source of spiritual insight, a willing ear for confession, and a moral and spiritual compass — all reachable via comlog. Pillars of the community by default, it’s no exaggeration that Priests are responsible for dictating large chunks of PanOceania’s culture, whether they intend to or not.",
            [1, 2, 0, 1, 2, 2, 2],
            [Skill.Command, Skill.Education, Skill.Persuade],
            [Skill.Analysis, Skill.Lifestyle, Skill.Psychology],
            ["High-Quality Clothing", "Geist Upgrade (+2 ranks in Education)"],
            "1+D4",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return true; }
        ),
        [Career.AquaticFirstResponder]: new CareerModel(
            "Aquatic First Responder",
            "EMTs, firefighters, lifeguards. Of the many career paths open to Helots, the First Responder is one that confuses humanity the most. Not that they aren’t happy to see them, as any human EMT would be hard-pressed to match a Helot when navigating hazardous underwater terrain. For a species tarred as “lazy”, however, many are confused to see how enthusiastically they take to the role.",
            [1, 2, 2, 2, 1, 1, 1],
            [Skill.Athletics, Skill.Medicine, Skill.Tech],
            [Skill.Discipline, Skill.Observation, Skill.Pilot],
            ["Light Combat Armour", "Pressure suit mod for armour", "Medikit (with 3 Serum)"],
            "1+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.Bartender]: new CareerModel(
            "Bartender",
            "Across Varuna, particularly Ikatere, Helots indulge in the ancient role of barkeep, dispensing drinks and offering a friendly ear in equal measure. Legend states that early PanOceanian entrepreneurs revelled with a pod of Helots. They watched their hosts dive effortlessly beneath the waves, then resurface with various chilled liquors that were mixed with playful aplomb. An opportunity not to be missed.",
            [2, 2, 1, 1, 2, 1, 1],
            [Skill.Lifestyle, Skill.Persuade, Skill.Psychology],
            [Skill.Education, Skill.Observation, Skill.Persuade],
            ["Fashionable clothing", "Psychotropics (3 doses)"],
            "0+D1",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.DeepSeaExplorer]: new CareerModel(
            "Deep-Sea Explorer",
            "Prideful as PanOceania are of their Explorers, it’s curious that much of Varuna’s depths remain unexplored. Of course, between the crushing pressure, aquatic predators, and omnipresent, oppressive darkness, most humans know better than to dive too deeply, undiscovered secrets or no. The Helots know better too. But they do it anyway.",
            [1, 3, 1, 2, 1, 1, 0],
            [Skill.Animal_Handling, Skill.Pilot, Skill.Tech],
            [Skill.Analysis, Skill.Observation, Skill.Survival],
            ["Crashsuit", "Pressure suit mod for crashsuit", "Exo-compass", "D-Thread (3 charges)", "Knife"],
            "1+D3",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.HelotMilitia]: new CareerModel(
            "Helot Militia",
            "Considered little more than cannon fodder by PanOceania’s command, Helot Militia specialise in amphibious operations and support the PanOceanian military in situations where amphibious natives provide a tactical edge. Primarily focused on internal security, though occasionally providing support in military operations abroad, these brave Helots have one of the highest casualty ratios in the PanOceanian military due to their primary deployment in highrisk situations.",
            [2, 1, 2, 2, 1, 1, 1],
            [Skill.Ballistics, Skill.Observation, Skill.Resistance],
            [Skill.Close_Combat, Skill.Discipline, Skill.Stealth],
            ["Light Combat Armour|Pain Filters", "Rifle"],
            "1+D1",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.Labourer]: new CareerModel(
            "Labourer",
            "When most people think of Helots, one of two things comes to mind. Either the terrorist actions of Libertos, or the many Helot Labourers working across Varuna. The advent of the pressure suit revolutionized the workforce, but even with this advancement, most Helots still make their living as semi-skilled Labourers.",
            [1, 2, 2, 1, 1, 2, 1],
            [Skill.Athletics, Skill.Discipline, Skill.Resistance],
            [Skill.Discipline, Skill.Observation, Skill.Pilot],
            ["Locational Beacon", "Powered Multitool|Repair Kit", "Painkillers (5 doses)"],
            "0+D3",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.LibertosMember]: new CareerModel(
            "Libertos Member",
            "Libertos view themselves as change. To make change requires blood, violence, and confrontation. Faced with unacceptable conditions and convinced that there can be no change without violent upheaval, Libertos members take their destiny into their heavily-armed hands. Viewed as anti-human terrorists, they actually have very little issue with individual humans.",
            [1, 2, 1, 2, 1, 1, 2],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Stealth],
            [Skill.Hacking, Skill.Survival, Skill.Thievery],
            ["D-Thread", "Fake ID 1", "Malasartes Grenade (x2)|Heavy Pistol"],
            "0+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; },
            true
        ),
        [Career.OmnStoryteller]: new CareerModel(
            "Omn Storyteller",
            "Owing to centuries of oral tradition as the primary means of recording their legends and history, the Omn (“those who speak” in Tetessom) are fantastic storytellers. Elder kossomn traditionally act as the primary lorekeepers, though everyone is encouraged to participate. Those with a talent for engaging, theatrical storytelling are singled out from fryhood.",
            [1, 1, 1, 0, 2, 3, 1],
            [Skill.Education, Skill.Lifestyle, Skill.Persuade],
            [Skill.Acrobatics, Skill.Persuade, Skill.Survival],
            ["Cosmetics Kit", "Recorder (x2)"],
            "0+D3",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.ScuballPlayer]: new CareerModel(
            "Scuball Player",
            "Unlike human players, who extensively use custom Scuball suits to better navigate the underwater environs, Helots are born swimmers. Unlike human athletes, who can’t start seriously competing without organisational support, young Helots engage in different variants of the game before they reach maturity. Although it’s among the more lucrative options available to them, the money hardly competes with the chance to enjoy their dream job.",
            [2, 1, 3, 1, 0, 1, 1],
            [Skill.Acrobatics, Skill.Athletics, Skill.Lifestyle],
            [Skill.Athletics, Skill.Command, Skill.Observation],
            ["AR Eye Implant", "Rippa X", "Helot Jet Harness", "Uniform"],
            "2+D3",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.Starfish]: new CareerModel(
            "Starfish",
            "After years of frustration in dealing with the Nomad Nations’ cetacean pilots and their intrinsic understanding of three-dimensional spatial manoeuvres, the PanOceanian Armada snapped. The StarSwimmer initiative hardly revolutionized the PanOceanian Navy, but recruiting the best, most tech-savvy, or reckless Helots available gave the Hyperpower an edge it had been sorely lacking.",
            [1, 2, 1, 3, 0, 2, 0],
            [Skill.Extraplanetary, Skill.Pilot, Skill.Spacecraft],
            [Skill.Ballistics, Skill.Lifestyle, Skill.Spacecraft],
            ["AR Eye Implants", "Light Combat Armour (with pressure suit mod)|Assault Pistol (2 reloads)"],
            "1+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.VarunanGuide]: new CareerModel(
            "Varunan Guide",
            "From underwater mining in Damak, to scouting for new construction sites, to friendly neighbourhood tour guides, many Helots spend their time guiding their human neighbours around Varuna. Intricately tied to the tourism industry, outside of Labourers, more Helots find their employ as Guides than in any other vocation. Requiring not just extensive local knowledge, but the ability to explain its importance to a highly-educated populace, more than one Varunan Guide has needed to explain why and how eating a poisonous plant is a bad idea.",
            [1, 2, 1, 0, 3, 2, 0],
            [Skill.Animal_Handling, Skill.Education, Skill.Psychology],
            [Skill.Athletics, Skill.Lifestyle, Skill.Survival],
            ["Adarsana Grenade", "Lantern", "Locational Beacon", "Signal Flare", "Survival Kit"],
            "1+D2",
            [Faction.PanOceania],
            Source.PanOceania,
            () => { return character.host === AlienHost.Helot; }
        ),
        [Career.CatSquadMember]: new CareerModel(
            "'Cat Squad Member",
            "Associated more by nomenclature and a shared aesthetic than anything else, Corregidor’s Tomcats, Hellcats, and Wildcats are nonetheless bound together by a singular thread: it’s difficult to imagine the Nomad Nation surviving without them. Whether defending the Motherships, rescuing stranded workers, or out on consignment, life in the NMF’s ‘Cat Squads is many things, but it’s never dull.",
            [1, 1, 2, 2, 2, 1, 1],
            [Skill.Ballistics, Skill.Extraplanetary, Skill.Hacking],
            [], // Determined by Squad
            [""], // Betermined by Squad
            "", // Determined by Squad
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.BarristerCorps]: new CareerModel(
            "Barrister Corps",
            "If the pen is mightier than the sword, the 101st Barrister Corp’s legal briefs are the equal of any TAG. A Tunguska tradition dating back to the Phantom Conflicts, the Barrister Corps repays aggression towards the Nomads with weaponised legal assaults; geists, LAIs, and more than a few botnets help unleash torrents of legal spam upon their targets. While most documents they produce are only dangerous if ignored, if an inbox is flooded with hundreds of thousands of such memos, one eventually slips through. The 101st prides itself on using unconscionably vile techniques such as takedown notices, zoning disputes, information requests, or good old-fashioned patent trolling that would surely be considered war crimes to their combat equivalents. Considering themselves among the Nomad’s most efficient defenders, everyone knows better than to argue with them.",
            [1, 2, 0, 1, 2, 2, 2],
            [Skill.Analysis, Skill.Education, Skill.Psychology],
            [Skill.Ballistics, Skill.Education, Skill.Persuade],
            ["Neural Hacking Socket", "Assault Hacking Device"],
            "2+D5",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.Chimera]: new CareerModel(
            "Chimera",
            "Though anyone can get cosmetic augmentations, Chimera, by definition, take them to a transformative extreme. Bushy fox tail? Ram horns? Maybe some cat ears? Where other Nomads might dabble, Chimera are likely to combine them all. For some, it’s a way to stand out in a crowd, and for others, an imperfect journey towards a body they can finally feel comfortable in. Progressive by necessity, many end up in prostitution, pornography, and Submondorun fight clubs. Capable in defending themselves, a rare few join the Überfallkommandos tasked with infiltrating and disrupting these illegal and exploitive rings. Regardless of their vocation, Chimera saunter through life with a pronounced swagger, even if it engenders trouble more often than not.",
            [2, 1, 2, 2, 0, 2, 1],
            [Skill.Acrobatics, Skill.Athletics, Skill.Close_Combat],
            [Skill.Animal_Handling, Skill.Lifestyle, Skill.Thievery],
            ["Cosmetic Augmentation 2", "Implanted Wetspike|Climbing Plus", "SecureCuffs", "Recorder"],
            "0+D4",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.Clockmaker]: new CareerModel(
            "Clockmaker",
            "While Clockmakers may or may not be Bakunin’s most valuable contribution to the NMF, they’re probably its most beloved. Consummate tinkerers, the Clockmakers are called in to rebuild, repair, and reinvent, often in extremely hazardous situations. Like most of the NMF, they live in a state of constant readiness, never knowing when the call to action will go out. Unlike most of their peers, however, their skillset is best sharpened by constant interaction with civilian projects. As such, it’s not uncommon to see a garage, forge works, or even the occasional boutique watch shop act as a combination of home base and playground for the Clockmakers when they’re not on deployment. Specialists in non-linear thought, Clockmakers are known for unorthodox and forward-looking technical solutions, though their tendency to tinker with everything in sight—including themselves—can sometimes get them into trouble.",
            [2, 0, 1, 1, 3, 1, 1],
            [Skill.Discipline, Skill.Education, Skill.Tech],
            [Skill.Acrobatics, Skill.Lifestyle, Skill.Tech],
            ["Neural Comlog", "D-Charge (3)", "Powered Multitool", "Repair Kit"],
            "1+D2",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.Infiltrator]: new CareerModel(
            "Infiltrator",
            "Nomad military doctrine is massively reliant on the ability to counterstrike anyone, anywhere, without warning or preparation time. For retaliatory strikes to be effective, Nomads rely heavily on Infiltrators. Bakunin’s Zeros—codenamed for their exceptionally low number of failed missions and casualties—scout deep behind enemy lines and acquire critical info for the Nomad’s deterrence strategies. Bakunian Prowlers’ aggressive, no-holds-barred tactics offer creative solutions to the enemy’s continued respiration. Tunguska’s Spektr troops specialise in industrial espionage, often undertaking small “additional objectives” while working for third parties. And the Corregidor Assault Commandos (Intruders) routinely conceal their presence amongst Corregidoran work crews, ensuring a safe working environment for their shipmates. Preferring to work in the shadows, stealth isn’t always an option, so Infiltrators are every bit as comfortable kicking down a door as they are staying hidden.",
            [1, 1, 1, 2, 2, 2, 1],
            [Skill.Hacking, Skill.Observation, Skill.Stealth],
            [Skill.Ballistics, Skill.Discipline, Skill.Lifestyle],
            ["Boarding Shotgun|HMG", "Armoured Clothing", "Chameleonwear|Cosmetics Kit"],
            "2+D1",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.Interventor]: new CareerModel(
            "Interventor",
            "Tunguska’s economy is entirely dependent upon information security. Without ironclad assurances that their funds, data, or other information is safe, confidence in the Bank of Tunguska would plummet. Leaks, downtime, and other compromises are simply not an option. Fortunately, Tunguska is home to arguably the best and most creative hackers in the Human Sphere, with the Interventors foremost among them. Leaving no stone unturned in their search for the best Infowarriors available, Tunguska’s Dragnet often turns to problematic “black hat” hackers, offering them the chance to take on the biggest challenges, with the best support, working alongside some of the most notorious hackers. Interventors do more than just secure financial transactions. These Infowarriors ensure quantronic superiority across a wide array of battlefields, many of them quite literal.",
            [1, 2, 1, 1, 3, 0, 1],
            [Skill.Hacking, Skill.Observation, Skill.Tech],
            [Skill.Hacking, Skill.Resistance, Skill.Stealth],
            ["Hacking Device Plus", "FastPanda"],
            "1+D4",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.Jaguar]: new CareerModel(
            "Jaguar",
            "In the early days of Corregidor, maras gangs were running wild. While everyone else (correctly) saw a problem, Juan Sarmiento, “the Mexican General,” saw an opportunity. He offered the rowdies a choice: skinny dipping out an airlock, or join his new Jaguar unit. Over time, these thugs, gangsters, and troublemakers were hammered into a cohesive—if brutal—unit. A police unit. It worked so shockingly well the practice continues to this day.Nobody knows gang territory like a Jaguar, and if local maras can avoid stirring up too much trouble, most Jaguars are happy to turn a blind eye.Given the Jaguar’s history and frequent deployment as NMF shock troops, most gangsters are only too happy with the arrangement.",
            [2, 1, 3, 1, 0, 1, 1],
            [Skill.Athletics, Skill.Close_Combat, Skill.Resistance],
            [Skill.Acrobatics, Skill.Extraplanetary, Skill.Thievery],
            ["Chain Rifle", "1 Standard Reload", "Knife", "Smoke Grenades (3)|Nitrocane (2 doses)"],
            "1+D2",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.MothershipSecurityCorps]: new CareerModel(
            "Mothership Security Corps",
            "Whether it’s Bakunin’s street savvy Moderators, Corregidor’s reliable Alguaciles, or the Tunguskan Dragnet’s grim Securitate direct tactical response force and tenacious Grenzer counter-intelligence teams, the Nomad Motherships require a flexible and adaptive security force. Protecting a Nomad Mothership is no walk in the park. Part military police, part detective, part riot cop, Mothership Security forces can be investigating a homicide on one day, then find themselves on mercenary deployment the next, only to spend the next week as mercenaries on the opposite side of the conflict, and finally return home to address a new wrinkle in their investigation. While each uses a variety of different assets to handle law enforcement and counter-terrorism actions, Motherships and Commercial Missions all rely on their security forces to evolve on the fly. Faced with no other option, they reliably do just that.",
            [1, 2, 1, 2, 2, 1, 1],
            [Skill.Ballistics, Skill.Extraplanetary, Skill.Observation],
            [Skill.Command, Skill.Hacking, Skill.Medicine],
            ["Armoured Clothing", "Hacking Device|MediKit", "Combi Rifle|Spitfire"],
            "1+D2",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.Negotiator]: new CareerModel(
            "Negotiator",
            "Words are powerful. Wars have been started, fortunes lost, and empires founded on the premise of a few carefully chosen words. It’s no secret that the Nomad Nation needs every edge that it can get. When dialogue is the battlefield, they deploy their Negotiators to devastating effect. From the logic-fuelled arguments of the Tunguskan debaters, to the enticing persuasion of trendsetters from Bakunin and the Corregidorans’ coercion techniques, these aggressive orators are experts at their craft. Whether making deals, negotiating over hostages, mediating disputes, or verbally eviscerating lobbyists, these wordsmiths excel in the science of communication, constantly pushing the state of the art forward. Nomad Negotiators understand what buttons to press.",
            [0, 2, 0, 0, 1, 3, 3],
            [Skill.Discipline, Skill.Lifestyle, Skill.Persuade],
            [Skill.Command, Skill.Observation, Skill.Persuade],
            ["Aletheia Suite", "Negotiator's Suite (7 days rental credit)", "Armoured Clothing", "Cosmetics Kit"],
            "1+D4",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.PraxisScientist]: new CareerModel(
            "Praxis Scientist",
            "Genius isn’t clean. It’s often messy, uncouth, difficult. Hard to deal with, even harder to understand. How could someone ever hope to regulate or control what they don’t understand? Only in an open environment can genius reach its full potential. So goes the thinking of the Praxis Scientist, anyway. Whether they work in the fabled Black Laboratories, assist someone else, or have their own private setup, Praxis Scientists blaze a trail to the future. They code intelligent software, push the boundaries of xenomedicinal research, or simply build a better bomb, and Praxis offers the opportunity to pursue their research virtually unchecked. Of course, there’s a flip side. Rogue AIs pop up unexpectedly, alien viruses can pose problems, and more than one lab has gone up in flames. But as long as they don’t sink the boat, Bakunin gives them free reign, and they make ample use of it.",
            [1, 3, 0, 0, 3, 1, 1],
            [Skill.Analysis, Skill.Education, Skill.Science],
            [Skill.Ballistics, Skill.Discipline, Skill.Lifestyle],
            ["AnyRez (1 service)", "Glavar Powder (2 doses)", "Analytical Kit|Baisc Medical Supplies"],
            "0+D6",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.Provocateur]: new CareerModel(
            "Provocateur",
            "A Bakunian specialty, Provocateurs are famed throughout the Human Sphere, though for what, exactly, varies wildly. Some are performance artists par excellence whose evocative displays elicit tears from the hardest of hearts. Some are punk vandals whose protest art invades popular Mayacasts with rhythmic stink bomb detonations or defaces corporate headquarters with multi-layered AR graffiti programs. Others work quietly, but perhaps to greater effect, by disseminating information behind the scenes for insurgent groups or broadcasting their target’s sins across Arachne. As agents of radical change, they’re sometimes harnessed for viral marketing campaigns or funnelled into weapons-grade memes that dominate conversations in the Human Sphere. And sometimes, they turn on the Nomads, because no one is safe and nothing is sacred to a Provocateur. Their code is simple: be the defiance you wish to see in the world.",
            [2, 1, 0, 1, 2, 2, 2],
            [Skill.Lifestyle, Skill.Persuade, Skill.Thievery],
            [Skill.Acrobatics, Skill.Hacking, Skill.Tech],
            ["Freedom Kit", "Fake ID 2", "Recorder", "Stealth Repeater", "Optical Disruption Device"],
            "0+D4",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.TestSubject]: new CareerModel(
            "Test Subject",
            "Sometimes, there just aren’t any good options. Steady work is a dream for many Uplifts, but far too often, it’s a dream out of reach. But when all else fails, when no one is hiring, and there’s nowhere left to turn, the Black Labs of Praxis always have room for another Test Subject. Ingesting strange fluids, testing new MetaChemistry treatments, and donating litres of blood, life as a Test subject is rarely pleasant, but at least it isn’t dull.",
            [1, 1, 1, 1, 1, 1, 3],
            [Skill.Animal_Handling, Skill.Resistance],
            [...SkillsHelper.getSkills().filter(s => s !== Skill.Animal_Handling && s !== Skill.Resistance)],
            [""],
            "0+D1",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.isUplift(); }
        ),
        [Career.DieMorlockGroup]: new CareerModel(
            "Die Morlock Gruppe",
            "On an orderly battlefield, superior discipline, tactics, and firepower rule the day. Amidst the chaos, however, it’s all about who can improvise. Enter Die Morlock Gruppe. Comprised of the dregs of Bakunian society, the Morlock Groups are experts in violence, chaos, and inflicting serious damage. Employed primarily as an anti-riot force, they’re also unleashed on battlefields around the Human Sphere as ultraviolent and effective, yet difficult to control, shock troopers. They are organised into three main segments, the Aufstand (rebellion), Chaos, and Schaden (damage) groups, and are about as subtle as a bat to the face. Inhuman in appearance, methods, and membership, the Morlocks gleefully introduce bloody chaos into any situation, transforming the crisis into an entirely new sort of problem, one they proceed to pound into the floor.",
            [2, 2, 3, 1, 0, 1, 0],
            [Skill.Athletics, Skill.Close_Combat, Skill.Thievery],
            [Skill.Ballistics, Skill.Close_Combat, Skill.Psychology],
            ["Combi Rifle|Chain Rifle", "1 Standard Reload", "D-Charges (2)", "Smoke Grenades (2)", "Sword"],
            "1+D3",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.BouboutiqueClerk]: new CareerModel(
            "Bouboutique Clerk",
            "In the iridescent sea of commerce that is Bakunin’s market, few wear its transgressive verve as proudly as the BouBoutiques. Experts in body modification, BouBoutiques can transform you into anything you like, provided you can pay. With no better advertisement than a living canvas, many BouBoutique clerks boast exotic and inhuman appearances. A recent synergy with Bakunin’s nascent Uplift population has led to inquisitive and visually striking Uplifts acting as the face of their business. Skilled in sales and walking encyclopaedias of fashion knowledge, BouBoutique Clerks also acquire a fair share of experience in modifying Lhosts, Biomorphs, and other physical hosts. BouBoutiques often run with a lean staff, so Clerks offer a little of everything —all with a smile and a wink.",
            [1, 2, 1, 1, 2, 2, 1],
            [Skill.Lifestyle, Skill.Persuade, Skill.Tech],
            [Skill.Discipline, Skill.Education, Skill.Medicine],
            ["Powered Multitool", "6 Units of Parts", "Internal Pocket 1|Geist Upgrade: +2 Tech|Geist Upgrade: Pattern Recognition Talent"],
            "1+D4",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.faction === Faction.Nomads; }
        ),
        [Career.Entertainer]: new CareerModel(
            "Entertainer",
            "Nomads—especially Bakunians—seem to have an insatiable appetite for novelty. Exoticism is prized and is in comparatively short supply. A tourist walking down Sunset Boulevard will have their senses assaulted by a barrage of unfamiliar, wild sights and sounds. But for a Nomad, it’s nothing they haven’t seen before. Fortunately for them, Bakunin is always producing something new and exciting. Products, services, or people, the Radical Mothership is only too happy to raise its supply of weird to meet this ravenous demand for novelty.If they are nothing else, Uplifts are unmistakably novel.Whether they’re dancing, serving drinks, or taking on clients in the Ultraviolet District, if you’ve got a striking look—which many Uplifts can claim by default—there’s work to be had.Even if most of it is being gawked at by strangers.",
            [2, 1, 1, 1, 0, 3, 1],
            [Skill.Acrobatics, Skill.Persuade, Skill.Psychology],
            [Skill.Athletics, Skill.Lifestyle, Skill.Observation],
            ["Cosmetics Kit", "SecurCuffs", "Recorder", "Nitrocane (2 Doses)", "Naughties"],
            "2+D1",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.Starswimmer]: new CareerModel(
            "Starswimmer",
            "This is where it all began. A staple of the Nomad navy, the original NeoCetaceans’ instinctual understanding of three-dimensional navigation was invaluable in keeping pace with the technological juggernauts of the Human Sphere. The introduction of uplifted Cephalopods to the program has reinvigorated Nomad naval tactics, as their instincts add another unpredictable twist to the Nomad bag of tricks. Other pilots might ghost into a Remote, or dabble in VR - based piloting, but a Starswimmer goes further.For all intents and purposes, they become their ships in flight.This grants Starswimmers unprecedented grace and control, but it comes at a cost: they feel every strain and impact as though the hull was their own body.For Starswimmers, the risk is worth it.The chance to become their ships is the ultimate adrenaline rush.Just don’t call them “blowholes.”",
            [1, 2, 1, 2, 1, 2, 1],
            [Skill.Discipline, Skill.Stealth, Skill.Spacecraft],
            [Skill.Extraplanetary, Skill.Stealth, Skill.Spacecraft],
            ["Immersive Pilot Gear", "Crashsuit"],
            "2+D2",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.Tinkerer]: new CareerModel(
            "Tinkerer",
            "Some people are just born curious. And for certain types of Uplift, the instinct to tinker with things irresistible. It’s not uncommon to find young Avians studiously disassembling their surroundings, though it’s less common to find one who puts them back together again. Constantly deconstructing things, Tinkerers are ceaselessly inventing, reverse-engineering, or tweaking anything to hand. The wealth of technological know-how that these Uplifts possess can be surprising, but to a Tinkerer, it’s quite literally in their nature. Many find success in chop shops, with black market arms dealers, or even in legitimate work on a drydock. Some have even joined the NMF as battlefield technicians, though there’s always the risk they’ll disassemble a soldier’s Combi Rifle just before they need it...",
            [1, 2, 1, 2, 2, 1, 1],
            [Skill.Analysis, Skill.Tech, Skill.Thievery],
            [Skill.Education, Skill.Hacking, Skill.Science],
            ["Powered Multitool", "6 Units of Parts", "Internal Pocket 1|Geist Upgrade: +1 Tech|Geist Upgrade: Pattern Recognition Talent"],
            "",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        [Career.UpliftedMuscle]: new CareerModel(
            "Uplifted Muscle",
            "From Tunguskan investment bankers’ private bodyguards, to a Corregidor maras gang’s heavies, to a BouBoutique’s storefront security, every Nomad could use some intimidating muscle from time to time. Sure, there’s no shortage of ruthless, violent, or heavyset folks available for the job, for many the ordinary just won’t cut it. And that’s when having some muscled Uplift as your Personal Security really shines. Using Pupniks in an obvious security role has long been a favourite tactic of Submondo crime bosses. Once they realised they could get their hands on similarly intimidating specimens with a roughly human intellect, the idea really took off. For the discerning underworld tycoon, there’s little that flaunts your power like a hulking boar or gorilla at your back. Attack dogs and big cats on a leash have long been a symbol of black-market power, but with Uplifts it’s been taken to a whole new level.",
            [2, 1, 3, 1, 0, 1, 1],
            [Skill.Close_Combat, Skill.Discipline, Skill.Persuade],
            [Skill.Athletics, Skill.Observation, Skill.Resistance],
            ["Modhand|Nanopulser", "Armoured Clothing", "Deflector-2"],
            "2+D1",
            [Faction.Nomads],
            Source.Nomads,
            () => { return character.isUplift(); }
        ),
        [Career.Wrench]: new CareerModel(
            "Wrench",
            "Nomads live and die by their ships. The cold void of space doesn’t care where you came from; you either survive, or you don’t. So, when it comes down to ship and equipment maintenance, the Nomads are similarly pragmatic. It doesn’t matter what school you went to, who your parents are, or how many people up-voted your viral video. You can either do the work, or you can’t. As it turns out, plenty of Uplifts can do the work. Sure, some Nomads find it strange to see the person next to them gripping a Multitool with their tail, but if the work is sound, they can only bring themselves to care so much. Nicknamed “Wrenches,” these Uplifted mechanics can be found working the most dangerous assignments in the guts of a fallen TAG, repairing a ship’s hull from the outside, or anything else where you need a skilled—but expendable—mechanic.",
            [1, 1, 2, 1, 2, 1, 2],
            [Skill.Discipline, Skill.Extraplanetary, Skill.Tech],
            [Skill.Pilot, Skill.Survival, Skill.Tech],
            ["Engineering Waldo 1", "Repair Kit", "Plasteel Pipe"],
            "1+D2",
            [Faction.Nomads],
            Source.Nomads,
            () => { return true; }
        ),
        /*[Career.EmergencyResponder]: new CareerModel(
            "",
            "",
            [],
            [Skill., Skill., Skill.],
            [Skill., Skill., Skill.],
            [""],
            "",
            [Faction.Ariadna],
            Source.Core,
            () => { return true; }
        ),*/
    };

    generateBasicCareer() {
        var career: Career = undefined;
        var roll = Math.floor(Math.random() * 20) + 1;

        switch (roll) {
            case 1:
            case 2: career = Career.Unemployed; break;
            case 3:
            case 4: career = Career.Corporate; break;
            case 5:
            case 6: career = Career.Technician; break;
            case 7:
            case 8: career = Career.Military; break;
            case 9:
            case 10: career = Career.Medical; break;
            case 11:
            case 12: career = Career.Academic; break;
            case 13: career = Career.Criminal; break;
            case 14: career = Career.Police; break;
            case 15: career = Career.Frontiersman; break;
            case 16: career = Career.Media; break;
            case 17: career = Career.ShipCrew; break;
            case 18: career = Career.Pilot; break;
            case 19:
            case 20: career = this.generateFactionCareer(character.faction); break;
        }

        if (character.prohibitedCareers.indexOf(career) > -1) {
            return this.generateBasicCareer();
        }

        return career;
    }

    generateFactionCareer(faction: Faction) {
        var career: Career = undefined;
        var roll = Math.floor(Math.random() * 6) + 1;

        if (faction === Faction.Ariadna) {
            if (character.hasSource(Source.Ariadna)) {
                roll = Math.floor(Math.random() * 20) + 1;

                if (character.host === AlienHost.Antipode) {
                    switch (roll) {
                        case 1:
                        case 2:
                        case 3: return Career.Scavenger;
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                        case 8: return Career.AntipodeWarlord;
                        case 9:
                        case 10:
                        case 11:
                        case 12: return Career.AssaultPackMember;
                        case 13:
                        case 14:
                        case 15:
                        case 16: return Career.ForestRanger;
                        case 17:
                        case 18:
                        case 19:
                        case 20: return Career.Raider;
                    }
                }
                else if (character.host === AlienHost.Dogface || character.host === AlienHost.Wulver) {
                    switch (roll) {
                        case 1:
                        case 2:
                        case 3: return Career.Scavenger;
                        case 4: return Career.AssaultPackController;
                        case 5:
                        case 6: return character.birthPlace === "USAriadna" ? Career.DevilDogsMarines : this.generateFactionCareer(faction);
                        case 7:
                        case 8: return Career.DogBowlPlayer;
                        case 9:
                        case 10: return Career.DogNationActivist;
                        case 11:
                        case 12: return Career.ForestRanger;
                        case 13:
                        case 14: return Career.DogBloodedIrregular;
                        case 15:
                        case 16: return Career.Raider;
                        case 17:
                        case 18: return Career.Volk;
                        case 19:
                        case 20: return character.host === AlienHost.Wulver ? Career.WulverShockTroop : this.generateFactionCareer(faction);
                    }
                }
                else {
                    switch (roll) {
                        case 1: return Career.SpecialForces;
                        case 2: return Career.IntelligenceOperative;
                        case 3: return Career.AssaultPackController;
                        case 4: return Career.SportsPersonality;
                        case 5: return Career.Paratrooper;
                        case 6: return Career.EmergencyResponder;
                        case 7: return Career.BratvaGangster;
                        case 8: return Career.CaledonianNoble;
                        case 9: return Career.ClaymoreDuellist;
                        case 10: return Career.FreeMiner;
                        case 11: return Career.FrontierDoctor;
                        case 12: return Career.Hardcase;
                        case 13: return Career.IrmandinhosSmuggler;
                        case 14: return Career.LoupGarou;
                        case 15: return Career.MerovingianCommercialAgent;
                        case 16: return Career.MilitiaMember;
                        case 17: return Career.Spetsnaz;
                        case 18:
                        case 19:
                        case 20: return Career.Any;
                    }
                }
            }
            else {
                switch (roll) {
                    case 1: return Career.SpecialForces;
                    case 2: return Career.IntelligenceOperative;
                    case 3: return Career.AssaultPackController;
                    case 4: return Career.SportsPersonality;
                    case 5: return Career.Paratrooper;
                    case 6: return Career.Any;
                }
            }
        }
        else if (faction === Faction.Haqqislam) {
            if (character.hasSource(Source.Haqqislam)) {
                roll = Math.floor(Math.random() * 20) + 1;

                switch (roll) {
                    case 1: return Career.SpecialForces;
                    case 2: return Career.HassassinFidayHaqqislam;
                    case 3: return Career.Corsair;
                    case 4: return Career.TerraformingScientist;
                    case 5: return Career.Bodyguard;
                    case 6: return Career.Khawarij;
                    case 7: return Career.DiwanFunctionary;
                    case 8: return Career.GreyMarketSpy;
                    case 9: return Career.HassassinExemplar;
                    case 10: return Career.MagharibaGuard;
                    case 11: return Career.KumGanger;
                    case 12: return Career.MedicalResearcher;
                    case 13: return Career.MuhafizAgent;
                    case 14: return Career.Odalisque;
                    case 15: return Career.Caravaner;
                    case 16: return Career.AkbarDoctor;
                    case 17: return Career.Hafza;
                    case 18:
                    case 19:
                    case 20: return Career.Any;
                }
            }
            else {
                switch (roll) {
                    case 1: return Career.SpecialForces;
                    case 2: return Career.Hassassin;
                    case 3: return Career.Corsair;
                    case 4: return Career.TerraformingScientist;
                    case 5: return Career.Bodyguard;
                    case 6: return Career.Any;
                }
            }
        }
        else if (faction === Faction.Nomads) {
            if (character.hasSource(Source.Nomads)) {
                roll = Math.floor(Math.random() * 20) + 1;

                if (character.isUplift()) {
                    return this.generateUpliftCareer(roll);
                }
                else {
                    switch (roll) {
                        case 1: return Career.SpecialForces;
                        case 2: return Career.IntelligenceOperative;
                        case 3: return Career.ReverendAgent;
                        case 4: return Career.HeavyIndustry;
                        case 5: return Career.InvestigativeJournalist;
                        case 6: return Career.Hacker;
                        case 7: return Career.CatSquadMember;
                        case 8: return Career.Jaguar;
                        case 9: return Career.Negotiator;
                        case 10: return Career.BarristerCorps;
                        case 11: return Career.Chimera;
                        case 12: return Career.PraxisScientist;
                        case 13: return Career.Infiltrator;
                        case 14: return Career.Interventor;
                        case 15: return Career.PraxisScientist;
                        case 16: return Career.MothershipSecurityCorps;
                        case 17: return Career.Clockmaker;
                        case 18: return Career.Provocateur;
                        case 19:
                        case 20: return Career.Any;
                    }
                }
            }
            else {
                switch (roll) {
                    case 1: return Career.SpecialForces;
                    case 2: return Career.IntelligenceOperative;
                    case 3: return Career.ReverendAgent;
                    case 4: return Career.HeavyIndustry;
                    case 5: return Career.InvestigativeJournalist;
                    case 6: return Career.Any;
                }
            }
        }
        else if (faction === Faction.PanOceania) {
            if (character.hasSource(Source.PanOceania)) {
                roll = Math.floor(Math.random() * 20) + 1;

                if (character.host === AlienHost.Helot) {
                    switch (roll) {
                        case 1: return Career.Unemployed;
                        case 2: return Career.Frontiersman;
                        case 3: return Career.Criminal;
                        case 4: return Career.ShipCrew;
                        case 5: return Career.Pilot;
                        case 6: return Career.IntelligenceOperative;
                        case 7: return Career.LibertosMember;
                        case 8: return Career.AquaticFirstResponder;
                        case 9: return Career.Bartender;
                        case 10: return Career.HelotMilitia;
                        case 11: return Career.Labourer;
                        case 12: return Career.VarunanGuide;
                        case 13: return Career.MayacastSupportStaff;
                        case 14: return Career.ScuballPlayer;
                        case 15: return Career.OmnStoryteller;
                        case 16: return Career.DeepSeaExplorer;
                        case 17: return Career.Priest;
                        case 18: return Career.Trader;
                        case 19: return Career.HeavyIndustry
                        case 20: return Career.Starfish;
                    }
                }
                else {
                    switch (roll) {
                        case 1: return Career.SpecialForces;
                        case 2: return Career.IntelligenceOperative;
                        case 3: return Career.Lobbyist;
                        case 4: return Career.MayaPersonality;
                        case 5: return Career.CorporateExecutive;
                        case 6: return Career.Fusilier;
                        case 7: return Career.MayacastSupportStaff;
                        case 8: return Career.SensoriumMayacaster;
                        case 9: return Career.Explorer;
                        case 10: return Career.FighterPilot;
                        case 11: return Career.NeoterranSpecialOfficer;
                        case 12: return Career.HexasAgent;
                        case 13: return Career.Priest;
                        case 14: return Career.OrderSergeant;
                        case 15: return Career.Knight;
                        case 16: return Career.CrocMan;
                        case 17:
                        case 18:
                        case 19:
                        case 20: return Career.Any;
                    }
                }
            }
            else {
                switch (roll) {
                    case 1: return Career.SpecialForces;
                    case 2: return Career.IntelligenceOperative;
                    case 3: return Career.Lobbyist;
                    case 4: return Career.MayaPersonality;
                    case 5: return Career.CorporateExecutive;
                    case 6: return Career.Any;
                }
            }
        }
        else if (faction === Faction.YuJing) {
            switch (roll) {
                case 1: return Career.SpecialForces;
                case 2: return Career.IntelligenceOperative;
                case 3: return character.hasCriminalRecord ? this.generateFactionCareer(character.faction) : Career.CelestialGuard;
                case 4: return Career.Bosozoku;
                case 5: return Career.TagPilot;
                case 6: return Career.Any;
            }
        }
        else if (faction === Faction.Corporation) {
            switch (roll) {
                case 1: return Career.SpecialForces;
                case 2: return Career.IntelligenceOperative;
                case 3: return Career.CorporateExecutive;
                case 4: return Career.Trader;
                case 5: return Career.FieldScientist;
                case 6: return Career.Any;
            }
        }
        else if (faction === Faction.Submondo) {
            switch (roll) {
                case 1: return Career.SpecialForces;
                case 2: return Career.Corsair;
                case 3: return Career.Smuggler;
                case 4: return Career.Hacker;
                case 5: return Career.Bodyguard;
                case 6: return Career.Any;
            }
        }
        else if (faction === Faction.Mercenary) {
            switch (roll) {
                case 1: return Career.SpecialForces;
                case 2: return Career.IntelligenceOperative;
                case 3: return Career.BountyHunter;
                case 4: return Career.RemoteOperator;
                case 5: return Career.ShipCrew;
                case 6: return Career.Any;
            }
        }
        else if (faction === Faction.O12 || faction === Faction.Aleph) {
            switch (roll) {
                case 1: return Career.SpecialForces;
                case 2: return Career.IntelligenceOperative;
                case 3: return Career.Diplomat;
                case 4: return Career.Politician;
                case 5: return character.hasCriminalRecord ? this.generateFactionCareer(character.faction) : Career.BureauTothAgent;
                case 6: return Career.Any;
            }
        }
        else if (faction === Faction.MinorNation) {
            switch (roll) {
                case 1: return Career.SpecialForces;
                case 2: return Career.IntelligenceOperative;
                case 3: return Career.HeavyIndustry;
                case 4: return Career.Trader;
                case 5: return Career.InvestigativeJournalist;
                case 6: return Career.Any;
            }
        }

        if (character.prohibitedCareers.indexOf(career) > -1) {
            return this.generateFactionCareer(faction);
        }

        return career;
    }

    getBasicCareers() {
        var careers = [
            Career.Academic,
            Career.Corporate,
            Career.Criminal,
            Career.Frontiersman,
            Career.Media,
            Career.Medical,
            Career.Military,
            Career.Pilot,
            Career.Police,
            Career.ShipCrew,
            Career.Technician,
        ];

        if (character.hasCriminalRecord) {
            careers.splice(careers.indexOf(Career.Police), 1);
        }

        character.prohibitedCareers.forEach(c => {
            const index = careers.indexOf(c);
            if (index > -1) {
                careers.splice(index, 1);
            }
        });

        return careers;
    }

    getHazardableCareers() {
        var careers: Career[] = [];
        var n = 0;
        for (var career in this._careers) {
            var c = this._careers[career];
            if ((c.canBeHazarded() || character.ignoreHazardRequirements) &&
                character.hasSource(c.source)) {
                careers.push(n);
            }

            n++
        }

        if (character.hasCriminalRecord && !character.ignoreHazardRequirements) {
            careers.splice(careers.indexOf(Career.CelestialGuard), 1);
            careers.splice(careers.indexOf(Career.BureauTothAgent), 1);
            careers.splice(careers.indexOf(Career.AquaticFirstResponder), 1);
        }

        character.prohibitedCareers.forEach(c => {
            const index = careers.indexOf(c);
            if (index > -1) {
                careers.splice(index, 1);
            }
        });

        return careers.sort((a, b) => this._careers[a].name.localeCompare(this._careers[b].name));
    }

    getCareer(career: Career) {
        return this._careers[career];
    }

    applyCareer(career: Career) {
        var c = this.getCareer(career);

        if (character.careers.length === 1) {
            for (var i = 0; i < c.attributes.length; i++) {
                character.attributes[i].value += c.attributes[i];
            }
        }

        let careerCounter = 0;
        character.careers.forEach(c => {
            if (c.career === career) {
                careerCounter++;
            }
        });

        if (careerCounter === 1) {
            c.equipment.forEach(eq => {
                if (eq.indexOf('|') === -1) {
                    character.addEquipment(eq);
                }
            });
        }

        character.earnings = this.calculateEarnings(c.earnings);

        if (career === Career.IrmandinhosSmuggler) {
            character.addLanguage("Galician");
        }
        else if (career === Career.Hafza &&
            character.education !== Education.Military_Training) {
            character.age += DiceRoller.rollSpecial(2, 2).hits;
        }
        else if (career === Career.FighterPilot) {
            if (character.equipment.indexOf("Assault Pistol") > -1) {
                character.addEquipment("2 Standard Reloads");
            }
        }
        else if (career === Career.CrocMan) {
            character.addOtherEvent("Contacts: Any other Croc Man", "");
            character.equipment.forEach(eq => {
                if (eq.indexOf("Mere") > -1) {
                    eq.replace("X", character.careers.filter(c => c.career === Career.CrocMan).length.toString());
                }
            });
        }
        else if (career === Career.ScuballPlayer) {
            character.equipment.forEach(eq => {
                if (eq.indexOf("Rippa") > -1) {
                    eq.replace("X", character.careers.filter(c => c.career === Career.ScuballPlayer).length.toString());
                }
            });
        }
        else if (career === Career.DieMorlockGroup) {
            EquipmentHelper.generateChaoticGear().forEach(eq => {
                character.addEquipment(eq);
            });
        }

        // Reset this.
        character.ignoreHazardRequirements = false;
    }

    getEarningsSpan(earnings: string) {
        var c = parseInt(earnings[0]);
        var d = parseInt(earnings[earnings.length - 1]);
        var maxd = c + (d * 2);
        return c.toString() + "-" + maxd.toString();
    }

    careerIsSameFaction(career: Career, faction: Faction) {
        var c = this.getCareer(career);
        return c.factions.indexOf(faction) > -1;
    }

    getHazardDifficulty(career: Career) {
        var c = this.getCareer(career);

        if (c.isCriminal && character.hasCriminalRecord) {
            return 1;
        }

        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            switch (character.heritageTrait) {
                case HeritageTraits.Bakunian:
                    if ([Career.Chimera, Career.Clockmaker, Career.Provocateur].indexOf(career) > -1) {
                        return 1;
                    }
                    break;
                case HeritageTraits.Corregidoran:
                    if ([Career.CatSquadMember, Career.Jaguar, Career.HeavyIndustry].indexOf(career) > -1) {
                        return 1;
                    }
                    break;
                case HeritageTraits.Tunguskan:
                    if ([Career.BarristerCorps, Career.Hacker, Career.Interventor].indexOf(career) > -1) {
                        return 1;
                    }
                    break;
                case HeritageTraits.Lub:
                    if ([Career.Infiltrator, Career.InvestigativeJournalist, Career.Pilot].indexOf(career) > -1) {
                        return 1;
                    }
                    break;
                case HeritageTraits.Missionary:
                    if ([Career.BountyHunter, Career.Diplomat, Career.Negotiator].indexOf(career) > -1) {
                        return 1;
                    }
                    break;
            }
        }

        return 2;
    }

    calculateEarnings(earnings: string) {
        if (earnings.length > 0) {
            var c = parseInt(earnings[0]);
            var d = parseInt(earnings[earnings.length - 1]);
            var earningsRoll = DiceRoller.rollSpecial(d, 0);
            var newEarnings = earningsRoll.hits + c;

            if (newEarnings > character.earnings) {
                if (earningsRoll.special > 0) {
                    var diff = newEarnings - character.earnings;
                    for (var i = 0; i < diff && i < earningsRoll.special; i++) {
                        SocialClassesHelper.increaseSocialClass();
                    }
                }

                return newEarnings;
            }
            else if (newEarnings < character.earnings) {
                if (earningsRoll.special > 0) {
                    var diff = character.earnings - newEarnings;
                    for (var i = 0; i < diff && i < earningsRoll.special; i++) {
                        SocialClassesHelper.reduceSocialClass();
                    }
                }

                return Math.max(character.earnings - 1, 0);
            }
        }

        return character.earnings;
    }

    private generateUpliftCareer(roll: number) {
        if (roll >= 1 && roll <= 2) {
            return Career.TestSubject;
        }

        switch (character.host) {
            case AlienHost.UpliftAvian:
                switch (roll) {
                    case 3:
                    case 4:
                    case 5: return Career.Smuggler;
                    case 6:
                    case 7:
                    case 8: return Career.Entertainer;
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                    case 13:
                    case 14: return Career.Tinkerer;
                    case 15:
                    case 16: return Career.BouboutiqueClerk;
                    case 17: return Career.DieMorlockGroup;
                    case 18: return Career.Starswimmer;
                    case 19: return Career.Clockmaker;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
            case AlienHost.UpliftCanine:
                switch (roll) {
                    case 3:
                    case 4:
                    case 5: 
                    case 6:
                    case 7: return Career.UpliftedMuscle;
                    case 8:
                    case 9:
                    case 10:
                    case 11: return Career.DieMorlockGroup;
                    case 12:
                    case 13: return Career.Entertainer;
                    case 14: 
                    case 15: return Career.Military;
                    case 16: 
                    case 17: return Career.ShipCrew;
                    case 18: return Career.Wrench;
                    case 19: return Career.MothershipSecurityCorps;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
            case AlienHost.UpliftCephaplopod:
                switch (roll) {
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7: return Career.Starswimmer;
                    case 8:
                    case 9:
                    case 10:
                    case 11: 
                    case 12: return Career.Tinkerer;
                    case 13: 
                    case 14: return Career.Hacker;
                    case 15: 
                    case 16: return Career.Medical;
                    case 17: return Career.RemoteOperator;
                    case 18: return Career.BouboutiqueClerk;
                    case 19: return Career.TagPilot;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
            case AlienHost.UpliftCetacean:
                switch (roll) {
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10:
                    case 11:
                    case 12: return Career.Starswimmer;
                    case 13:
                    case 14: return Career.RemoteOperator;
                    case 15: return Career.Negotiator;
                    case 16: return Career.Pilot;
                    case 17: return Career.Entertainer;
                    case 18: return Career.Media;
                    case 19: return Career.Corsair;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
            case AlienHost.UpliftFeline:
                switch (roll) {
                    case 3:
                    case 4:
                    case 5: return Career.Entertainer;
                    case 6:
                    case 7:
                    case 8:
                    case 9:
                    case 10: return Career.UpliftedMuscle;
                    case 11:
                    case 12: 
                    case 13: return Career.DieMorlockGroup;
                    case 14: 
                    case 15: return Career.Criminal;
                    case 16:
                    case 17: return Career.CatSquadMember;
                    case 18: return Career.SpecialForces;
                    case 19: return Career.BouboutiqueClerk;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
            case AlienHost.UpliftSimian:
                switch (roll) {
                    case 3: return Career.TestSubject;
                    case 4:
                    case 5: 
                    case 6:
                    case 7:
                    case 8: return Career.Wrench;
                    case 9:
                    case 10: 
                    case 11: return Career.DieMorlockGroup;
                    case 12:
                    case 13: return Career.Criminal;
                    case 14:
                    case 15:
                    case 16: return Career.Tinkerer;
                    case 17: return Career.ShipCrew;
                    case 18: return Career.Infiltrator;
                    case 19: return Career.UpliftedMuscle;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
            case AlienHost.UpliftSuidae:
                switch (roll) {
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 8: return Career.UpliftedMuscle;
                    case 9:
                    case 10:
                    case 11: return Career.HeavyIndustry;
                    case 12:
                    case 13: 
                    case 14:
                    case 15: return Career.DieMorlockGroup;
                    case 16: return Career.Military;
                    case 17: return Career.Wrench;
                    case 18: return Career.Criminal;
                    case 19: return Career.BouboutiqueClerk;
                    case 20: return this.generateFactionCareer(character.faction);
                }
                break;
        }
    }
}

export const CareersHelper = new Careers();