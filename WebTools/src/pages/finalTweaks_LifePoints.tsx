import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {UntrainedSkillImprovement} from '../components/untrainedSkillImprovement';
import {TalentList} from '../components/talentList';
import {IncreaseInfinityPoints} from '../components/increaseInfinityPoints';
import {IncreaseAssets} from '../components/increaseAssets';
import {IncreaseSkills} from '../components/increaseSkills';
import {LifePointLanguages} from '../components/lifePointLanguages';

export class FinalTweaks_LifePoints extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        let skills: Skill[] = [];
        character.skills.forEach(skill => {
            skills.push(skill.skill);
        });

        return (
            <div className="page">
                <PageHeader text="FINAL TWEAKS"/>
                <div className="page-text">
                    You can now use any remaining Life Points to either increase your Infinity Point refresh rate, increase
                    your skills or assets, or gain new languages.
                </div>
                <div className="panel">
                    <IncreaseInfinityPoints onUpdated={() => this.forceUpdate() } />
                    <br/>
                    <IncreaseAssets onUpdated={() => this.forceUpdate() } />
                </div>
                <br/>
                <div className="header-text">SKILLS</div>
                <div className="panel">
                    <IncreaseSkills skills={skills} onUpdated={() => this.forceUpdate() } />
                </div>
                <br/>
                <div className="header-text">LANGUAGES</div>
                <div className="panel">
                    <LifePointLanguages />
                </div>
                <Button text="FINISH" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.Finish);
    }
}