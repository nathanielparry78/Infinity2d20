import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {SkillImprovement} from '../components/skillImprovement';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {Skill} from '../helpers/skills';
import {PageIdentity} from '../pages/pageFactory';

interface IIncreaseAllSkillsEventProperties {
    skills: Skill[];
}

export class IncreaseAllSkillsEvent extends React.Component<IIncreaseAllSkillsEventProperties, {}> {
    private _skillsDone: boolean[];

    constructor(props: IIncreaseAllSkillsEventProperties) {
        super(props);

        this._skillsDone = [];
        this.props.skills.forEach((s, i) => this._skillsDone[i] = false);
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            return <SkillImprovement key={i} skill={s} onDone={(done) => { this._skillsDone[i] = done; } }/>;
        });

        return (
            <div>
                <div className="panel">
                    {skills}
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        if (!this._skillsDone.every(s => s === true)) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}