import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { ElectiveSkillImprovement } from '../components/electiveSkillImprovement';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { Skill } from '../helpers/skills';
import { PageIdentity } from '../pages/pageFactory';
import { PageHeader } from '../components/pageHeader';

export class AwakeningEventDetailsPage extends React.Component<{}, {}> {
    private _skillsDone: boolean;
    private _skill: Skill[] = [];

    constructor(props: {}) {
        super(props);

        this._skillsDone = false;

        if (character.youthEvent.description.indexOf("Shapes, glyphs, symbols") > -1) {
            this._skill = [Skill.Analysis];
        }
        else if (character.youthEvent.description.indexOf("You remember screaming. Pain.") > -1) {
            this._skill = [Skill.Resistance];
        }
        else if (character.youthEvent.description.indexOf("They said you were a failed experiment") > -1) {
            this._skill = [Skill.Discipline];
        }
        else if (character.youthEvent.description.indexOf("When the lab lost power") > -1) {
            this._skill = [Skill.Animal_Handling];
        }
        else if (character.youthEvent.description.indexOf("They thought they had you secured tightly") > -1) {
            this._skill = [Skill.Stealth];
        }
        else if (character.youthEvent.description.indexOf("The raid came at the worst possible time.") > -1) {
            this._skill = [Skill.Ballistics, Skill.Close_Combat];
        }
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="AWAKENING" />
                <div className="panel">
                    <ElectiveSkillImprovement skills={this._skill} points={1} onDone={(done) => { this._skillsDone = done; }} />
                </div>
                <Button text="ADOLESCENCE EVENT" className="button-next" onClick={() => this.onNext()} />
            </div>
        );
    }

    private onNext() {
        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.AdolescenceEvent));
    }
}