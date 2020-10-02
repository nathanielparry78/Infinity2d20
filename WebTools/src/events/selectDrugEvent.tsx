import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {PageIdentity} from '../pages/pageFactory';

export class SelectDrugEvent extends React.Component<{}, {}> {
    private _drugs: string[];
    private _drug: string;

    constructor(props: {}) {
        super(props);

        this._drugs = [
            "Antibiotics",
            "Nitrocaine",
            "Painkillers",
            "Stims",
            "Surge"
        ];

        this._drug = this._drugs[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Choose your addiction.
                    </div>
                    <DropDownInput
                        items={this._drugs}
                        defaultValue={this._drug}
                        onChange={(index) => { this.selectDrug(index) } } />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectDrug(index: number) {
        this._drug = this._drugs[index];
        this.forceUpdate();
    }

    private next() {
        character.careerEvents[character.careerEvents.length - 1].effect += ` You are addicted to ${this._drug}. Additionally, reduce the difficulty of all Lifestyle tests by 1 (to a minimum of 0).`;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}