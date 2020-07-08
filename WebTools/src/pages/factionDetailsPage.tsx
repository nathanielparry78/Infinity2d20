import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Faction, FactionsHelper} from '../helpers/factions';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AlienHost} from '../helpers/alienHosts';
import {TalentsHelper} from '../helpers/talents';
import {PageHeader} from '../components/pageHeader';
import {SkillView} from '../components/skill';
import {Button} from '../components/button';
import {SignatureSkillChoice} from '../components/signatureSkillChoice';
import {TalentDescription} from '../components/talentDescription';
import {Dialog} from '../components/dialog';

export class FactionDetailsPage extends React.Component<IPageProperties, {}> {
    private _signatureSkill: Skill;
    private _talentName: string;
    private _talentDesc: string;

    constructor(props: IPageProperties) {
        super(props);

        this._talentName = "";
        this._talentDesc = "";
    }

    render() {
        var faction = FactionsHelper.getFaction(character.faction);
        var heritage = FactionsHelper.getFaction(character.heritage);

        const name = character.hasDefected
            ? (<span>DEFECTED FROM {heritage.name} TO {faction.name}</span>)
            : faction.name === heritage.name
                ? (<span>{faction.name}</span>)
                : (<span>{faction.name} (BORN IN {heritage.name}) </span>);

        const skills = faction.skills.map((s, i) => {
            return (<SkillView key={i} skill={s} points={1} />)
        });

        const next = character.heritage !== Faction.Aleph
            ? FactionsHelper.getBirthPlaceType(character.heritage)
            : "ASPECT";

        return (
            <div className="page">
                <PageHeader text="FACTION" />
                <div className="header-text">{name}</div>
                <div className="panel">
                    <div className="header-small">SKILLS</div>
                    {skills}
                </div>
                <div className="panel">
                    <div className="header-small">SIGNATURE SKILL</div>
                    <div className="desc-text">
                        Select your first <b>signature skill</b> to receive +1 Focus and your first talent.
                    </div>
                    <SignatureSkillChoice skills={faction.skills} onSkillSelected={skill => this.onSignatureSkillSelected(skill) }/>
                </div>
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentDescription name={this._talentName.substring(0, this._talentName.indexOf("("))} description={this._talentDesc} />
                </div>
                <Button text={next} className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onSignatureSkillSelected(skill: Skill) {
        this._signatureSkill = skill;

        var talent = TalentsHelper.getTalentsForSkills([skill])[0];
        this._talentName = talent.name;
        this._talentDesc = talent.description;

        this.forceUpdate();
    }

    private onNext() {
        if (this._signatureSkill == null) {
            Dialog.show("You have not selected a signature skill.");
            return;
        }

        character.skills[this._signatureSkill].focus++;
        character.skills[this._signatureSkill].isSignature = true;
        character.addTalent(this._talentName);

        if (character.heritage !== Faction.Aleph) {
            if (character.host === AlienHost.Antipode) {
                Navigation.navigateToPage(PageIdentity.Tribe);
            }
            else {
                Navigation.navigateToPage(PageIdentity.BirthPlace);
            }
        }
        else {
            Navigation.navigateToPage(PageIdentity.AlepForms);
        }
    }
}