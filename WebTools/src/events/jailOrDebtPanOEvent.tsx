import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Faction, FactionsHelper} from '../helpers/factions';
import {EventModel} from '../common/eventModel';
import {PageIdentity} from '../pages/pageFactory';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Skill} from '../helpers/skills';
import {DiceRoller} from '../helpers/diceRoller';

export class JailOrDebtPanOEvent extends React.Component<{}, {}> {
    private _debt = DiceRoller.rollSpecial(5, 3);

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Facing the consequences of crimes you most assuredly did commit, someone offered to make it all go away.
                        Did you let them? If so, what was the cost?
                        You can either spend 1-6 years in jail and gain a criminal record or
                        gain a debt of {this._debt.hits} assets.
                        <br/>
                        ... 
                    </div>
                    <Button text="GO TO JAIL" className="button-dark" onClick={() => this.goToJail() }/>
                    <br/>
                    <Button text="GAIN DEBT" className="button-dark" onClick={() => this.gainDebt() }/>
                </div>
            </div>
        );
    }

    private goToJail() {
        const years = Math.floor(Math.random() * 6) + 1;
        character.age += years;
        character.hasCriminalRecord = true;

        character.careerEvents[character.careerEvents.length - 1].effect += ` You spent ${years} years in jail.`;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private gainDebt() {
        const debt = Math.floor(Math.random() * 10) + 1;
        character.careerEvents[character.careerEvents.length - 1].effect += ` You have a ${debt} Asset debt.`;

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}