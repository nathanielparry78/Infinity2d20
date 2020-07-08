import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {Skill} from '../helpers/skills';
import {PageIdentity} from '../pages/pageFactory';

interface IIncreaseSkillEventProperties {
    points: number;
    skills: Skill[];
}

export class IncreaseSkillEvent extends React.Component<IIncreaseSkillEventProperties, {}> {
    private _skillsDone: boolean;

    constructor(props: IIncreaseSkillEventProperties) {
        super(props);

        this._skillsDone = false;
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <ElectiveSkillImprovement skills={this.props.skills} points={this.props.points} onDone={(done) => { this._skillsDone = done; } }/>
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