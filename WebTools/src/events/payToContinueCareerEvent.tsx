import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {EventModel} from '../common/eventModel';
import {PageIdentity} from '../pages/pageFactory';

export class PayToContinueCareerEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Do you want to pay 1 Earnings to be able to continue this career?
                    </div>
                    <Button text="YES" className="button-dark" onClick={() => this.onYes() }/>
                    <br/>
                    <Button text="NO" className="button-dark" onClick={() => this.onNo() }/>
                </div>
            </div>
        );
    }

    private onYes() {
        character.earnings = Math.max(0, character.earnings - 1);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onNo() {
        character.prohibitedCareers.push(character.careers[character.careers.length - 1].career);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}