import {character} from '../common/character';
import {Skill} from './skills';

export enum ItemType {
    Armor,
    Weapon,
    Ammo,
}

export enum WeaponType {
    Grenade,
    Melee,
    Ranged,
}

export enum WeaponSize {
    OneHanded,
    TwoHanded,
    Unbalanced,
    Unwieldy
}

export interface IWeaponProperties {
    weaponType: WeaponType;
    size: WeaponSize;
    damageDice: number;
    damageBonus: number;
    qualities: string[];
    range?: string;
    burst?: number;
}

export interface IArmorProperties {
    head: number;
    arms: number;
    torso: number;
    legs: number;
    qualities: string[];
}

export interface IAmmoProperties {
    qualities: string[];
}

class Item {
    listName: string;
    sheetName: string;
    type: ItemType;
    properties: any;

    constructor(listName: string, sheetName: string, type: ItemType, properties: any) {
        this.listName = listName;
        this.sheetName = sheetName;
        this.type = type;
        this.properties = properties;
    }
}

class Equipment {
    private _weapons: Item[] = [
        new Item("Knife", "Knife", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 3,
                qualities: ["Conc1", "NonH", "Sub2", "Thr", "Unf1"]
            }
        ),
        new Item("Implanted Knife", "Implanted Knife", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 3,
                qualities: ["Aug", "Conc2", "Neural", "NonH", "Sub2", "Unf1"]
            }
        ),
        new Item("Sword", "Sword", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.Unbalanced, damageBonus: 1, damageDice: 5,
                qualities: ["NonH", "Par2", "Vic1"]
            }
        ),
        new Item("Blade of St. George", "Blade of St. George", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["Griev", "NonH", "Par2", "Pcng2", "Vic1"]
            }
        ),
        new Item("Axe", "Axe", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.Unbalanced, damageBonus: 1, damageDice: 5,
                qualities: ["NonH", "Thr", "Vic1"]
            }
        ),
        new Item("Tonfa Bangles", "Tonfa Bangles", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 3,
                qualities: ["Conc2", "Par1"]
            }
        ),
        new Item("Grazeblade", "Grazeblade", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Break", "NonH", "Stun", "Sub2", "Thr", "Tox3"]
            }
        ),
        new Item("Teseum Chopper", "Teseum Chopper", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.Unbalanced, damageBonus: 1, damageDice: 5,
                qualities: ["NonH", "Pcng4", "Vic2"]
            }
        ),
        new Item("Teseum Claymore", "Teseum Claymore", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.TwoHanded, damageBonus: 2, damageDice: 5,
                qualities: ["Griev", "NonH", "Parr2", "Pcng2", "Vic2"]
            }
        ),
        new Item("Teseum Hatchet", "Teseum Hatchet", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 3,
                qualities: ["NonH", "Sub1", "Pcng2", "Thr", "Vic1"]
            }
        ),
        new Item("Stun Baton", "Stun Baton", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["NonH", "Knock", "Sub1", "Stun"]
            }
        ),
        new Item("Garrotte", "Garrotte", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["NonH", "Conc2", "Sub2", "Unf1"]
            }
        ),
        new Item("Pistol", "Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Breaker Pistol", "Breaker Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Vrabec Pistol", "Vrabec Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1", "Conc", "Sub1"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Combi Rifle", "Combi Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["Exp1", "MultL", "Vic1"],
                range: "C/M", burst: 2
            }
        ),
        new Item("Assault Pistol", "Assault Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unbalanced, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1"],
                range: "R/C", burst: 2
            }
        ),
        new Item("Heavy Pistol", "Heavy Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unbalanced, damageBonus: 2, damageDice: 4,
                qualities: ["Unf1", "Vic1"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Boarding Shotgun", "Boarding Shotgun", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["Knock", "MultM"],
                range: "C", burst: 1
            }
        ),
        new Item("T2 Boarding Shotgun", "T2 Boarding Shotgun", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["Knock"],
                range: "C", burst: 1
            }
        ),
        new Item("Sniper Rifle", "Sniper Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unwieldy, damageBonus: 1, damageDice: 6,
                qualities: ["Unf2"],
                range: "L", burst: 3
            }
        ),
        new Item("Viral Sniper Rifle", "Viral Sniper Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unwieldy, damageBonus: 1, damageDice: 6,
                qualities: ["Unf2", "Bio", "Griev", "Tox2"],
                range: "L", burst: 3
            }
        ),
        new Item("DT Sniper Rifle", "DT Sniper Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unwieldy, damageBonus: 1, damageDice: 6,
                qualities: ["Unf2", "Bio", "Tox1", "Vic1"],
                range: "L", burst: 3
            }
        ),
        new Item("MULTI Sniper Rifle", "MULTI Sniper Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unwieldy, damageBonus: 1, damageDice: 6,
                qualities: ["Unf2", "MultM", "MultH"],
                range: "L", burst: 2
            }
        ),
        new Item("AP Pistol", "AP Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Rifle", "Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["MultL", "Vic1"],
                range: "M", burst: 2
            }
        ),
        new Item("Rifle with Light Shotgun", "Rifle with Light Shotgun", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["MultL", "Vic1", "LightShotgun"],
                range: "M", burst: 2
            }
        ),
        new Item("AP Rifle", "AP Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["MultL", "Vic1"],
                range: "M", burst: 2
            }
        ),
        new Item("Viral Pistol", "Viral Pistol", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1", "Bio", "Griev", "Tox2"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Light Shotgun", "Light Shotgun", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unbalanced, damageBonus: 1, damageDice: 4,
                qualities: ["Knock"],
                range: "C", burst: 1
            }
        ),
        new Item("Panzerfaust", "Panzerfaust", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 2, damageDice: 5,
                qualities: ["Munition", "Unsubtle"],
                range: "L", burst: 1
            }
        ),
        new Item("Light Grenade Launcher", "Light Grenade Launcher", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unbalanced, damageBonus: 2, damageDice: 4,
                qualities: ["Area(C)", "Munition", "SpecFire"],
                range: "M", burst: 1
            }
        ),
        new Item("Spitfire", "Spitfire", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["Spread2", "Unsubtle"],
                range: "M", burst: 3
            }
        ),
        new Item("E/M Grenade", "E/M Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Vic1"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Adhesive Grenade", "Adhesive Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["Disp", "Imm", "Ind(C)", "Knock", "NonL", "SpecFi", "Thr", "Unsub"]
            }
        ),
        new Item("Banshee Grenade", "Banshee Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["Deaf", "Disp", "Ind(C)", "NonL", "SpecFi", "Stun", "Terr3", "Thr", "Unsub"]
            }
        ),
        new Item("Smoke Grenade", "Smoke Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["Disp", "Ind(C)", "NonL", "SpecFi", "Smoke2", "Thr"]
            }
        ),
        new Item("Americolt Eagle", "Americolt Eagle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unbalanced, damageBonus: 2, damageDice: 5,
                qualities: ["Vic1", "Pcng1", "NonH", "Knock"],
                range: "R/C", burst: 1
            }
        ),
        new Item("Ojotnik", "Ojotnik", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.Unwieldy, damageBonus: 1, damageDice: 6,
                qualities: ["Unf3"],
                range: "M", burst: 2
            }
        ),
        new Item("Sgian Dubh", "Sgian Dubh", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 3,
                qualities: ["Conc2", "NonH", "Sub2", "Unf1"]
            }
        ),
        new Item("Tactical Bow", "Tactical Bow", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 3,
                qualities: ["NonH", "Sub2", "Vic2"],
                range: "C", burst: 1
            }
        ),
        new Item("Chain Rifle", "Chain Rifle", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 6,
                qualities: ["Spread1", "Torr", "Vic1"],
                range: "C", burst: 1
            }
        ),
        new Item("Nanopulser", "Nanopulser", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.TwoHanded, damageBonus: 1, damageDice: 5,
                qualities: ["Bio", "Comms", "Disp", "Torr", "Vic2"],
                range: "C", burst: 1
            }
        ),
        new Item("Pollock Grenade", "Pollock Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["ExplGren", "Disp", "Ind(C)", "NonL", "SpecFi", "Throw", "Unsub", "Marker"]
            }
        ),
        new Item("Malasartes Grenade", "Malasartes Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["ExplGren", "Disp", "Ind(C)", "NonL", "Reflect1", "Throw", "Unsub", "SpecFi"]
            }
        ),
        new Item("Mere 1", "Mere 1", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Heritage1", "Knock", "Stun", "Vic2"]
            }
        ),
        new Item("Mere 2", "Mere 2", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Heritage2", "Knock", "Stun", "Vic2"]
            }
        ),
        new Item("Mere 3", "Mere 3", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Heritage3", "Knock", "Stun", "Vic2"]
            }
        ),
        new Item("Mere 4", "Mere 4", ItemType.Weapon,
            {
                weaponType: WeaponType.Melee, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 4,
                qualities: ["Heritage4", "Knock", "Stun", "Vic2"]
            }
        ),
        new Item("Banduk", "Banduk", ItemType.Weapon,
            {
                weaponType: WeaponType.Ranged, size: WeaponSize.OneHanded, damageBonus: 1, damageDice: 5,
                qualities: ["NonL"],
                range: "C/M", burst: 1
            }
        ),
        new Item("Adarsana Grenade", "Adarsana Grenade", ItemType.Weapon,
            {
                weaponType: WeaponType.Grenade, size: WeaponSize.OneHanded, damageBonus: 0, damageDice: 0,
                qualities: ["Disp", "Ind(M)", "NonL", "SpecFi", "Unsub", "Thr"]
            }
        ),
    ];

    private _armor: Item[] = [
        new Item("Ballistic Vest", "Ballistic Vest", ItemType.Armor,
            { head: 0, arms: 0, torso: 2, legs: 0, qualities: ["Hidden1"] }
        ),
        new Item("Armoured Clothing", "Armoured Clothing", ItemType.Armor,
            { head: 0, arms: 1, torso: 1, legs: 1, qualities: ["Hidden2"] }
        ),
        new Item("Light Combat Armour", "Light Combat Armour", ItemType.Armor,
            { head: 1, arms: 1, torso: 2, legs: 1, qualities: [] }
        ),
        new Item("Medium Combat Armour", "Medium Combat Armour", ItemType.Armor,
            { head: 2, arms: 2, torso: 3, legs: 2, qualities: [] }
        ),
        new Item("Powered Combat Armour", "Powered Combat Armour", ItemType.Armor,
            { head: 4, arms: 3, torso: 5, legs: 3, qualities: ["Comms", "Exo 1", "Kinematica", "Self-Repair"] }
        ),
        new Item("Knight of Santiago Armour", "Knight of Santiago Armour", ItemType.Armor,
            { head: 4, arms: 3, torso: 5, legs: 3, qualities: ["Comms", "Exo 1", "Kinematica", "Self-Repair", "Santiago"] }
        ),
        new Item("Crashsuit", "Crashsuit", ItemType.Armor,
            { head: 3, arms: 3, torso: 3, legs: 3, qualities: ["Disp"] }
        ),
        new Item("Long ModCoat", "Long ModCoat", ItemType.Armor,
            { head: 0, arms: 1, torso: 1, legs: 1, qualities: ["Hidden2"] }
        ),
        new Item("Khafiin Microservor Armour", "Khafiin Microservor Armour", ItemType.Armor,
            { head: 2, arms: 3, torso: 3, legs: 3, qualities: ["Comms", "Exo 1", "Self-Repair"] }
        ),
        new Item("Ad-Qali Armour 2", "Ad-Qali Armour 2", ItemType.Armor,
            { head: 2, arms: 2, torso: 2, legs: 2, qualities: ["SocialBonus"] }
        ),
        new Item("Hexas Nightwear", "Hexas Nightwear", ItemType.Armor,
            { head: 0, arms: 1, torso: 1, legs: 1, qualities: ["Hidden2", "Kinematica", "ThermoCamo"] }
        ),
    ];

    private _ammo: Item[] = [
        new Item("Standard Reload", "Standard", ItemType.Ammo, { qualities: [] }),
        new Item("AP Reload", "Armour-Piercing", ItemType.Ammo, { qualities: ["Pcng2"] }),
        new Item("Standard Shell Reload", "Standard Shell", ItemType.Ammo, { qualities: [] }),
        new Item("AP Shell Reload", "Armour-Piercing Shell", ItemType.Ammo, { qualities: ["Pcng3"] }),
        new Item("Adhesive Shell Reload", "Adhesive Shell", ItemType.Ammo, { qualities: ["Area(C)", "Imm", "Imp1", "NonL", "Unsub"] }),
        new Item("AP Arrow Reload", "Armour-Piercing Arrow", ItemType.Ammo, { qualities: ["Pcng2"] }),
        new Item("Silver Bullet Reload", "Silver Bullet", ItemType.Ammo, { qualities: ["Silver"] }),
        new Item("Eagle Reload", "Eagle Reload", ItemType.Ammo, { qualities: ["Unsub", "Pcng3"] }),
    ];

    getWeapons() {
        return this._weapons;
    }

    getWeaponByName(name: string) {
        for (var i = 0; i < this._weapons.length; i++) {
            const weapon = this._weapons[i];
            if (weapon.listName === name) {
                return weapon;
            }
        }

        return null;
    }

    getArmorByName(name: string) {
        for (var i = 0; i < this._armor.length; i++) {
            const armor = this._armor[i];
            if (armor.listName === name) {
                return armor;
            }
        }

        return null;
    }

    getAmmo(name: string) {
        for (var i = 0; i < this._ammo.length; i++) {
            const ammo = this._ammo[i];
            if (name.indexOf(ammo.listName) > -1) {
                return ammo;
            }
        }

        return null;
    }

    sizeToString(size: WeaponSize) {
        switch (size) {
            case WeaponSize.OneHanded: return "1H";
            case WeaponSize.TwoHanded: return "2H";
            case WeaponSize.Unbalanced: return "U";
            case WeaponSize.Unwieldy: return "UW";
        }

        return "";
    }

    handleSpecialEquipment(eq: string) {
        if (eq === "Geist Upgrade: +2 Psychology") {
            character.geist.skills[Skill.Psychology].expertise += 2;
            return true;
        }
        else if (eq === "Geist Upgrade: +2 Tech") {
            character.geist.skills[Skill.Tech].expertise += 2;
            return true;
        }
        else if (eq === "Geist Upgrade: +2 Education") {
            character.geist.skills[Skill.Education].expertise += 2;
            return true;
        }
        else if (eq === "Pistol and Stun Baton") {
            character.addEquipment("Pistol");
            character.addEquipment("Stun Baton");
            return true;
        }

        return false;
    }

    generateChaoticGear() {
        switch (Math.floor(Math.random() * 20) + 1) {
            case 1: return ["Mess (1 Dose)", "Old Steely (2 Doses)"];
            case 2: return ["Smoke Grenade (2)", "Tear Gas Grenade (2)"];
            case 3: return ["Goonade (8)"];
            case 4: return ["Goonade (8)"];
            case 5: return ["B&E Kit", "Location Beacon", "SecureCuffs"];
            case 6: return ["Micro-Torch", "USAriadnan Entrenching Tool"];
            case 7: return ["Signal Flares", "Bottled Water (1 Week's Suply)", "Survival Rations (1 Week's Supply)"];
            case 8: return ["Busted Old Tinbot"];
            case 9: return ["Puraza (1 Dose)", "Stims (2 Doses)"];
            case 10: return ["Animal Habitat", "Painkillers (5 Doses)"];
            case 11: return ["Recorders (2)", "Sports Padding"];
            case 12: return ["Naughties (1 Month's Supply)"];
            case 13: return ["Adhesive Solvent", "Portable Monkey Bar"];
            case 14: return ["Freedom Kit"];
            case 15: return ["Hard Hat", "Plasteel Pipe"];
            case 16: return ["Non-functional Tin Bot", "3 Units of Parts"];
            case 17: return ["Fake ID 3"];
            case 18:
            case 19:
            case 20: return [...this.generateChaoticGear(), ...this.generateChaoticGear()];
        }

        return [];
    }
}

export const EquipmentHelper = new Equipment();
