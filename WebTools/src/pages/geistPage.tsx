import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {GeistSkillImprovement} from '../components/geistSkillImprovement';
import {Dialog} from '../components/dialog';

export class GeistPage extends React.Component<IPageProperties, {}> {
    private _attributesDone: boolean;
    private _skillsDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this._attributesDone = false;
        this._skillsDone = false;
    }

    render() {
        let skills: Skill[] = [];
        character.geist.skills.forEach(skill => {
            skills.push(skill.skill);
        });

        return (
            <div className="page">
                <PageHeader text="GEIST"/>
                <div className="page-text">
                    You get 2 attribute points and 4 skill points to improve your Geist with.
                </div>
                <div className="header-text">ATTRIBUTES</div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.Geist} points={2} onDone={(done) => { this._attributesDone = done; } } />
                </div>
                <br/>
                <div className="header-text">SKILLS</div>
                <div className="panel">
                    <GeistSkillImprovement points={4} skills={skills} onDone={(done) => { this._skillsDone = done; } }/>
                </div>
                <Button text="NEXT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        if (!this._attributesDone) {
            Dialog.show("You have not distributed all attribute points.");
            return;
        }

        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        Navigation.navigateToPage(PageIdentity.FinalTweaks);
    }
}