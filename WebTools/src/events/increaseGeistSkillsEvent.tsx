import * as React from 'react';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { SkillsHelper } from '../helpers/skills';
import { PageIdentity } from '../pages/pageFactory';
import { GeistSkillImprovement } from '../components/geistSkillImprovement';

export class IncreaseGeistSkillsEvent extends React.Component<{}, {}> {
    private _skillsDone: boolean;

    constructor(props: {}) {
        super(props);

        this._skillsDone = false;
    }

    render() {
        return (
            <div>
                <div>
                    Add 4 skill ranks to your Geist.
                </div>
                <div className="panel">
                    <GeistSkillImprovement skills={SkillsHelper.getSkills()} points={4} onDone={(done) => { this._skillsDone = done; }} />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.onNext()} />
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