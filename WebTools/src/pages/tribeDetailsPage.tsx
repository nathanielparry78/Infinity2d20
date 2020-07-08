import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {TribesHelper} from '../helpers/tribes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {FactionsHelper} from '../helpers/factions';
import {TalentsHelper} from '../helpers/talents';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {DropDownInput} from '../components/dropDownInput';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';

export class TribeDetailsPage extends React.Component<IPageProperties, {}> {
    private _skillsDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this._skillsDone = false;
    }

    render() {
        var tribe = TribesHelper.getTribe(character.birthPlaceId);

        const attributes = tribe.attributes.map((a, i) => {
            return (<AttributeView key={i} name={AttributesHelper.getAttributeName(a) } points={1} value={character.attributes[a].value} />)
        });

        return (
            <div className="page">
                <PageHeader text="ANTIPODEAN TRIBE" />
                <div className="header-text">{tribe.name}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    <SkillImprovement skill={tribe.skill} onDone={(done) => { this._skillsDone = done; } } />
                </div>
                <Button text="SOCIAL CLASS" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        Navigation.navigateToPage(PageIdentity.SocialClass);
    }
}