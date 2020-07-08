import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Events, EventIdentity} from '../common/eventChannel';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {FactionsHelper} from '../helpers/factions';
import {AlienHostsHelper} from '../helpers/alienHosts';
import {SocialClassesHelper} from '../helpers/socialClasses';
import {HomeEnvironmentsHelper} from '../helpers/homeEnvironments';
import {EducationsHelper} from '../helpers/educations';
import {CareersHelper} from '../helpers/careers';
import {Skill, SkillsHelper} from '../helpers/skills';
import {TalentsHelper} from '../helpers/talents';

interface ICharacterSheetProperties {
    isVisible?: boolean;
}

class SectionContent {
    name: string;
    value: any;

    constructor(name: string, value: any) {
        this.name = name;
        this.value = value;
    }
}

class CareerSectionContent extends SectionContent {
    constructor(career: CharacterCareer, index: number) {
        super(
            "CAREER " + (index + 1),
            career
                ? `${CareersHelper.getCareer(career.career).name} ${career.years} years.`
                : undefined
            );
    }
}

class CharacterSheetData {
    private _data: SectionContent[] = [
        new SectionContent("FACTION", character.faction >= 0
            ? FactionsHelper.getFaction(character.faction).name +
              (character.faction === character.heritage
                ? ""
                : (character.hasDefected
                    ? "(Defected from " + FactionsHelper.getFaction(character.heritage).name + ")"
                    : "(Heritage: " + FactionsHelper.getFaction(character.heritage).name + ")"))
            : "None"),
        new SectionContent("HOST BODY", this.getHostBody()),
        new SectionContent("BIRTH PLACE", `${character.birthPlace} ${character.homeland ? "(" + character.homeland + ")" : ""}`),
        new SectionContent("SOCIAL CLASS", character.socialClass >= 0 ? SocialClassesHelper.getSocialClass(character.socialClass).name : "None"),
        new SectionContent("HOME ENVIRONMENT", character.homeEnvironment >= 0 ? HomeEnvironmentsHelper.getHomeEnvironment(character.homeEnvironment).name : "None"),
        new SectionContent("YOUTH EVENT", character.youthEvent ? character.youthEvent.description : undefined),
        new SectionContent("EDUCATION", character.education >= 0 ? EducationsHelper.getEducation(character.education).name : "None"),
        new SectionContent("ADOLESCENCE EVENT", character.adolescenceEvent ? character.adolescenceEvent.effect : undefined),
        new SectionContent("TRAIT", character.adolescenceEvent ? character.adolescenceEvent.trait : undefined),
        new CareerSectionContent(character.careers.length > 0 ? character.careers[0] : undefined, 0),
        new CareerSectionContent(character.careers.length > 1 ? character.careers[1] : undefined, 1),
        new CareerSectionContent(character.careers.length > 2 ? character.careers[2] : undefined, 2),
        new CareerSectionContent(character.careers.length > 3 ? character.careers[3] : undefined, 3),
        new SectionContent("EARNINGS", character.getEarnings().toString()),
        new SectionContent("ASSETS", character.attributes[Attribute.Personality].value + character.assets)
    ];

    private _attributes1: Attribute[] = [
        Attribute.Agility,
        Attribute.Awareness,
        Attribute.Brawn,
        Attribute.Coordination
    ];

    private _attributes2: Attribute[] = [
        Attribute.Intelligence,
        Attribute.Personality,
        Attribute.Willpower
    ];

    get dataSection() {
        return this._data;
    }

    get firstAttributesSection() {
        return this._attributes1;
    }

    get secondAttributesSection() {
        return this._attributes2;
    }

    private getHostBody() {
        const host = character.host >= 0 ? AlienHostsHelper.getAlienHost(character.host).name : "Human";
        const body = character.hostName || "Birth";

        return `${host} (${body})`;
    }
}

export class CharacterSheet extends React.Component<ICharacterSheetProperties, {}> {
    private _sheetData: CharacterSheetData;

    constructor(props: ICharacterSheetProperties) {
        super(props);

        this._sheetData = new CharacterSheetData();

        Events.listen(EventIdentity.UpdateCharacter, () => {
            this._sheetData = new CharacterSheetData();
            this.forceUpdate();
        });
    }

    render() {
        const data = this._sheetData.dataSection.map((s, i) => {
            return (
                <tr key={i}>
                    <td className="bg-dark">{s.name}</td>
                    <td className="bg-light border-dark text-dark">{s.value}</td>
                </tr>
            )
        });

        const events = character.careerEvents.map((e, i) => {
            return (
                <div key={i}><div>{e.effect}{e.trait && e.trait.length > 0 ? " Trait: " + e.trait : ""}</div><br/></div>
            )
        });

        const attributesAndSkills1 = this._sheetData.firstAttributesSection.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a).map((s, i) => {
                const legendary = character.skills[s].isSignature
                    ? (<span className="legendary">S</span>)
                    : undefined;

                return (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase() }
                            {legendary}
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].focus}</td>
                    </tr>
                )
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a).toLocaleUpperCase() }</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{character.attributes[a].value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        const attributesAndSkills2 = this._sheetData.secondAttributesSection.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a).map((s, i) => {
                const legendary = character.skills[s].isSignature
                    ? (<span className="legendary">S</span>)
                    : undefined;

                return (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase() }
                            {legendary}
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.skills[s].focus}</td>
                    </tr>
                )
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a).toLocaleUpperCase() }</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{character.attributes[a].value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        const geist = character.geist.attributes.map((a, i) => {
            const skills = SkillsHelper.getSkillsForAttribute(a.attribute).map((s, i) => {
                return character.geist.skills[s].expertise > 0 ?
                (
                    <tr key={i}>
                        <td className="bg-light border-dark text-dark sheet-skillname">
                            {SkillsHelper.getSkillName(s).toLocaleUpperCase() }
                        </td>
                        <td className="bg-light border-dark text-dark text-center">{character.geist.skills[s].expertise}</td>
                        <td className="bg-light border-dark text-dark text-center">{character.geist.skills[s].focus}</td>
                    </tr>
                )
                : undefined;
            });

            return (
                <table className="sheet-section" key={i}>
                    <tbody>
                        <tr>
                            <td className="bg-dark-wide" style={{ padding: "4px" }}>{AttributesHelper.getAttributeName(a.attribute).toLocaleUpperCase() }</td>
                            <td colSpan={2} className="bg-light border-dark text-dark text-center">{a.value}</td>
                        </tr>
                        {skills}
                    </tbody>
                </table>
            )
        });

        let characterTalents = [];
        for (var talent in character.talents) {
            var t = character.talents[talent];
            var tt = TalentsHelper.getTalent(talent);
            if (tt.maxRank > 1) {
                characterTalents.push(talent + " [Rank: " + t.rank + "]");
            } else {
                characterTalents.push(talent);
            }
        }

        const talents = characterTalents.map((t, i) => {
            return (<div key={i}>{t}</div>)
        });

        const equipment = character.equipment.map((e, i) => {
            return (<div key={i}>{e}</div>)
        });

        const languages = character.languages.map((l, i) => {
            return (<div key={i}>{l}</div>)
        });

        let containerClass = "sheet-container";
        if (this.props.isVisible) {
            containerClass = "sheet-container-nonfixed";
        }

        return (
            <div id="character-sheet" className="sheet-hidden">
                <div className="sheet-bg" id="sheet-bg" style={{ display: "none" }}></div>
                <div className={containerClass} id="sheet-container">
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                {data}
                                <tr>
                                    <td className="bg-dark">EVENTS</td>
                                    <td className="bg-light border-dark text-dark">{events}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        {attributesAndSkills1}
                    </div>
                    <div className="sheet-panel">
                        {attributesAndSkills2}
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">TALENTS</td>
                                    <td className="bg-light border-dark-nopadding text-dark">
                                        {talents}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">EQUIPMENT</td>
                                    <td className="bg-light border-dark text-dark">
                                        {equipment}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <table className="sheet-section">
                            <tbody>
                                <tr>
                                    <td className="bg-dark">LANGUAGES</td>
                                    <td className="bg-light border-dark text-dark">
                                        {languages}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="sheet-panel">
                        <b>GEIST</b>
                        {geist}
                    </div>
                    <br />
                </div>
            </div>
        );
    }
}