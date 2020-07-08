import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {SocialClassesHelper} from '../helpers/socialClasses';
import {HomeEnvironmentsHelper} from '../helpers/homeEnvironments';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {AlienHost} from '../helpers/alienHosts';

export class StatusDetailsPage extends React.Component<IPageProperties, {}> {
    private _skillsDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this._skillsDone = false;
    }

    render() {
        const socialClass = SocialClassesHelper.getSocialClass(character.socialClass);
        const environment = HomeEnvironmentsHelper.getHomeEnvironment(character.homeEnvironment);

        var socialClassAttributeReduction = 0;
        if (socialClass.attribute === environment.attribute) {
            socialClassAttributeReduction = -1;
        }

        const nextLabel = character.host === AlienHost.Helot
            ? "FRY EVENT"
            : character.isUplift()
                ? "AWAKENING"
                : "YOUTH EVENT";

        return (
            <div className="page">
                <PageHeader text="STATUS" />
                <div className="header-text">{socialClass.name}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTE</div>
                    <AttributeView name={AttributesHelper.getAttributeName(socialClass.attribute) } points={1} value={character.attributes[socialClass.attribute].value + socialClassAttributeReduction} />
                </div>
                <br/>
                <div className="header-text">{environment.name}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTE</div>
                    <AttributeView name={AttributesHelper.getAttributeName(environment.attribute) } points={1} value={character.attributes[environment.attribute].value} />
                    <div className="header-small">SKILL</div>
                    <SkillImprovement skill={environment.skill} onDone={(done) => { this._skillsDone = done; } } />
                </div>
                <Button text={nextLabel} className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        if (character.isUplift()) {
            Navigation.navigateToPage(PageIdentity.AwakeningEvent);
        }
        else {
            Navigation.navigateToPage(PageIdentity.YouthEvent);
        }
    }
}