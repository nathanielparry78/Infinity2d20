import {Character, CharacterAttribute, CharacterSkill, CharacterTalent, CharacterCareer, Gender} from './character';
import {GeistSkill} from './geist';
import {SkillsHelper} from '../helpers/skills';
import {FactionsHelper, Faction} from '../helpers/factions';
import {SocialClassesHelper, SocialClass} from '../helpers/socialClasses';
import {HomeEnvironmentsHelper, HomeEnvironment} from '../helpers/homeEnvironments';
import {EducationsHelper, Education} from '../helpers/educations';
import {Career, CareersHelper} from '../helpers/careers';
import {AlienHostsHelper, AlienHost} from '../helpers/alienHosts';
import {AlephFormsHelper, AlephForm} from '../helpers/alephForms';
import {EquipmentHelper, IWeaponProperties, IArmorProperties, IAmmoProperties} from '../helpers/equipment';
import {TalentsHelper} from '../helpers/talents';
import {DiceRoller} from '../helpers/diceRoller';
import {EventModel} from './eventModel';

interface ICharacterData {
    name: string;
    value: string;
}

export class CharacterSerializer {
    static serialize(character: Character): ICharacterData[] {
        return [
            { name: "game", value: "INFINITY" },
            { name: "attributes", value: CharacterSerializer.serializeAttributes(character.attributes) },
            { name: "modifiers", value: CharacterSerializer.serializeAttributes(character.modifiers) },
            { name: "skills", value: CharacterSerializer.serializeSkills(character.skills) },
            { name: "talents", value: CharacterSerializer.serializeTalents(character.talents) },
            { name: "host", value: CharacterSerializer.serializeHost(character.host) },
            { name: "hostName", value: character.hostName },
            { name: "hostAbilities", value: CharacterSerializer.serializeArray(character.hostAbilities) },
            { name: "faction", value: CharacterSerializer.serializeFaction(character.faction) },
            { name: "heritage", value: CharacterSerializer.serializeFaction(character.heritage) },
            { name: "hasDefected", value: character.hasDefected ? "1" : "0" },
            { name: "alephForm", value: CharacterSerializer.serializeAlephForm(character.alephForm) },
            { name: "birthPlace", value: character.birthPlace },
            { name: "socialClass", value: CharacterSerializer.serializeSocialClass(character.socialClass) },
            { name: "homeEnv", value: CharacterSerializer.serializeHomeEnvironment(character.homeEnvironment) },
            { name: "education", value: CharacterSerializer.serializeEducation(character.education) },
            { name: "careers", value: CharacterSerializer.serializeCareers(character.careers) },
            { name: "languages", value: CharacterSerializer.serializeArray(character.languages) },
            { name: "name", value: character.name },
            { name: "age", value: character.age.toString() },
            { name: "gender", value: Gender[character.gender] },
            { name: "specialPoints", value: character.infinityPoints.toString() },
            { name: "equipment", value: CharacterSerializer.serializeEquipment(character.equipment) },
            { name: "weapons", value: CharacterSerializer.serializeWeapons(character.equipment) },
            { name: "ammo", value: CharacterSerializer.serializeAmmo(character.equipment) },
            { name: "armor", value: CharacterSerializer.serializeArmor(character.equipment) },
            { name: "derived", value: `${character.resolve},${character.vigour},${character.firewall}` },
            { name: "bonuses", value: `${character.meleeBonus},${character.rangedBonus},${character.infowarBonus},${character.psywarBonus}` },
            { name: "earnings", value: character.getEarnings().toString() },
            { name: "assets", value: (character.attributes[5].value + character.assets).toString() },
            { name: "geistAttributes", value: CharacterSerializer.serializeAttributes(character.geist.attributes) },
            { name: "geistSkills", value: CharacterSerializer.serializeGeistSkills(character.geist.skills) },
            { name: "geistBonuses", value: `${character.geist.firewallBonus},${character.geist.moraleBonus}` },
            { name: "youthEvent", value: character.youthEvent.description },
            { name: "adolescenceEvent", value: character.adolescenceEvent.effect },
            { name: "careerEvents", value: CharacterSerializer.serializeCareerEvents(character.careerEvents) },
            { name: "description", value: character.description },
            { name: "appearance", value: CharacterSerializer.serializeAppearance(character) },
            { name: "morale", value: character.morale.toString() },
            { name: "soak", value: character.armorBonus.toString() },
            { name: "bts", value: character.bts.toString() },
            { name: "traits", value: CharacterSerializer.serializeTraits(character.adolescenceEvent.trait, character.careerEvents.map(e => { return e.trait; })) },
        ];
    }

    private static serializeAttributes(attrs: CharacterAttribute[]) {
        var result = "";
        attrs.forEach(a => {
            result += `${a.value},`;
        });
        return result;
    }

    private static serializeSkills(skills: CharacterSkill[]) {
        var result = "";
        skills.forEach(s => {
            result += `${SkillsHelper.getSkillName(s.skill)},${s.expertise},${s.focus},${s.isSignature ? "1" : "0"}|`;
        });
        return result;
    }

    private static serializeGeistSkills(skills: GeistSkill[]) {
        var result = "";
        skills.forEach(s => {
            result += `${SkillsHelper.getSkillName(s.skill)},${s.expertise},${s.focus}|`;
        });
        return result;
    }

    private static serializeTalents(talents: { [name: string]: CharacterTalent }) {
        var result = "";
        for (var talent in talents) {
            var t = talents[talent];
            result += `${talent},${t.rank},${SkillsHelper.getSkillName(TalentsHelper.getSkillForTalent(talent))}|`;
        }
        return result;
    }

    private static serializeFaction(faction: Faction) {
        return FactionsHelper.getFaction(faction).name;
    }

    private static serializeSocialClass(soc: SocialClass) {
        return SocialClassesHelper.getSocialClass(soc).name;
    }

    private static serializeHomeEnvironment(env: HomeEnvironment) {
        return HomeEnvironmentsHelper.getHomeEnvironment(env).name;
    }

    private static serializeEducation(edu: Education) {
        return EducationsHelper.getEducation(edu).name;
    }

    private static serializeCareers(careers: CharacterCareer[]) {
        var result = "";
        for (var career in careers) {
            var c = careers[career];
            result += `${Career[c.career]},${c.years}|`;
        }
        return result;
    }

    private static serializeHost(host: AlienHost) {
        return AlienHostsHelper.getAlienHost(host).name;
    }

    private static serializeAlephForm(form: AlephForm) {
        if (!form) {
            return "";
        }

        return AlephFormsHelper.getForm(form).name;
    }

    private static serializeCareerEvents(events: EventModel[]) {
        var result = "";
        events.forEach(e => {
            result += `${e.effect}|`;
        });
        return result;
    }

    private static serializeEquipment(eq: string[]) {
        var result = "";
        eq.forEach(item => {
            if (EquipmentHelper.getWeaponByName(item)) {
                result += `${EquipmentHelper.getWeaponByName(item).sheetName}|`;
            }
            else {
                result += `${item}|`;
            }
        });
        return result;
    }

    private static serializeWeapons(eq: string[]) {
        var result = "";
        eq.forEach(item => {
            if (EquipmentHelper.getWeaponByName(item)) {
                const weapon = EquipmentHelper.getWeaponByName(item);
                const props = weapon.properties as IWeaponProperties;
                result += `${weapon.sheetName},${props.range ? props.range : "-"},${props.damageBonus},${props.damageDice},${props.burst ? props.burst : "-"},${EquipmentHelper.sizeToString(props.size)},${props.qualities.join(">")}|`;
            }
        });
        return result;
    }

    private static serializeAmmo(eq: string[]) {
        var result = "";

        eq.forEach(item => {
            if (item && item.indexOf("Reload") > -1) {
                const quantity = item.substr(0, 1);
                const type = EquipmentHelper.getAmmo(item.substr(2));
                const props = type.properties as IAmmoProperties;

                result += `${quantity},${type.sheetName},${props.qualities.join(">")}|`;
            }
        });

        return result;
    }
    
    private static serializeArmor(eq: string[]) {
        var result = "";
        var totalAbs = 0;

        eq.forEach(item => {
            if (EquipmentHelper.getArmorByName(item)) {
                const armor = EquipmentHelper.getArmorByName(item);
                const props = armor.properties as IArmorProperties;

                if (armor.listName === "Ad-Qali Armour 2") {
                    const location1 = DiceRoller.rollHitLocation();
                    let location2 = DiceRoller.rollHitLocation();
                    while (location2 === location1) {
                        location2 = DiceRoller.rollHitLocation();
                    }

                    if (location1 === "head" || location2 === "head") {
                        props.head = 0;
                    }
                    else if (location1 === "torso" || location2 === "torso") {
                        props.torso = 0;
                    }
                    else if (location1.indexOf("arm") > -1 || location2.indexOf("arm") > -1) {
                        props.arms = 0;
                    }
                    else if (location1.indexOf("leg") > -1 || location2.indexOf("leg") > -1) {
                        props.legs = 0;
                    }
                }

                var abs = props.head + props.arms + props.torso + props.legs;

                if (abs > totalAbs) {
                    totalAbs = abs;
                    result = `${item},${props.head},${props.arms},${props.torso},${props.legs},${props.qualities.join(">")}`;
                }
            }
        });
        return result;
    }

    private static serializeAppearance(character: Character) {
        return `${character.height || ""}|${character.weight || ""}|${character.hair || ""}|${character.eyes || ""}`
    }

    private static serializeTraits(adolescenceTrait: string, careerTraits: string[]) {
        var result = `${adolescenceTrait}`;

        careerTraits.forEach(t => {
            if (t !== undefined && t.length > 0) {
                result += `|${t}`;
            }
        });

        return result;
    }

    private static serializeArray(array: string[]) {
        var result = "";
        array.forEach(item => {
            result += `${item}|`;
        });
        return result;
    }
}