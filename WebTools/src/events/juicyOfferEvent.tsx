import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Faction, FactionsHelper } from '../helpers/factions';
import { EventModel } from '../common/eventModel';
import { PageIdentity } from '../pages/pageFactory';
import { ElectiveSkillImprovement } from '../components/electiveSkillImprovement';
import { Skill } from '../helpers/skills';

export class JuicyOfferEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        While on assignment, a hypercorp purchases a controlling interest in your client, resulting in mass layoffs. 
                        You’re in the process of organising a noisy response when an executive approaches you with a juicy offer.
                        <br />
                        <b>Accept</b> to increase Earnings by 1, but gain an appropriate trait.
                        <br />
                        <b>Decline</b> to become Fired.
                        </div>
                    <Button text="ACCEPT" className="button-dark" onClick={() => this.onYes()} />
                    <br />
                    <Button text="DECLINE" className="button-dark" onClick={() => this.onNo()} />
                </div>
            </div>
        );
    }

    private onNo() {
        character.careerEvents[character.careerEvents.length - 1].effect += ` You declined and was Fired.`;
        Navigation.navigateToPage(PageIdentity.Fired);
    }

    private onYes() {
        character.earnings++;
        character.careerEvents[character.careerEvents.length - 1].effect += ` You accepted. Gain an appropriate trait.`;

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}