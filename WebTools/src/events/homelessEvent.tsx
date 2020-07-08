import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Faction, FactionsHelper} from '../helpers/factions';
import {PageIdentity} from '../pages/pageFactory';

export class HomelessEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);

        if (character.assets < 5) {
            this.onNo();
        }
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Do you want to spend 5 Assets to avoid becoming homeless?
                    </div>
                    <Button text="YES" className="button-dark" onClick={() => this.onYes() }/>
                    <br/>
                    <Button text="NO" className="button-dark" onClick={() => this.onNo() }/>
                </div>
            </div>
        );
    }

    private onYes() {
        character.assets -= 5;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onNo() {
        character.careerEvents[character.careerEvents.length - 1].effect += " You're now homeless.";
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}