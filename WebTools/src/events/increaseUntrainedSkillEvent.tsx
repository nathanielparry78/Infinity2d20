import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {Skill} from '../helpers/skills';
import {PageIdentity} from '../pages/pageFactory';

interface IIncreaseUntrainedSkillEventProperties {
    points: number;
}

export class IncreaseUntrainedSkillEvent extends React.Component<IIncreaseUntrainedSkillEventProperties, {}> {
    private _skills: Skill[];
    private _skillsDone: boolean;

    constructor(props: IIncreaseUntrainedSkillEventProperties) {
        super(props);

        this._skills = [];

        for (var i = Skill.Acrobatics; i <= Skill.Thievery; i++) {
            if (character.skills[i].expertise === 0) {
                this._skills.push(i);
            }
        }

        this._skillsDone = false;
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <ElectiveSkillImprovement skills={this._skills} points={this.props.points} onDone={(done) => this._skillsDone = done}/>
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}