import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Faction, FactionsHelper} from '../helpers/factions';
import {EventModel} from '../common/eventModel';
import {PageIdentity} from '../pages/pageFactory';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Skill} from '../helpers/skills';

export class JailOrDebtHaqqislamEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Maybe you knew what you were getting into, maybe not;
                        either way, you were caught helping a Silk smuggling ring, and the authorities were not amused.
                        <br/>
                        <b>Accept</b> to gain a 1-10 Asset debt.
                        <br/>
                        <b>Decline</b> to spend 1-6 years in jail and gain a criminal record.
                    </div>
                    <Button text="ACCEPT" className="button-dark" onClick={() => this.onYes() }/>
                    <br/>
                    <Button text="DECLINE" className="button-dark" onClick={() => this.onNo() }/>
                </div>
            </div>
        );
    }

    private onNo() {
        const years = Math.floor(Math.random() * 6) + 1;
        character.age += years;
        character.hasCriminalRecord = true;

        character.careerEvents[character.careerEvents.length - 1].effect += ` You spent ${years} years in jail.`;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onYes() {
        const debt = Math.floor(Math.random() * 10) + 1;
        character.careerEvents[character.careerEvents.length - 1].effect += ` You have a ${debt} Asset debt.`;

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}