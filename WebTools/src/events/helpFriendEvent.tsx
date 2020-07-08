import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Faction, FactionsHelper} from '../helpers/factions';
import {EventModel} from '../common/eventModel';
import {PageIdentity} from '../pages/pageFactory';

export class HelpFriendEvent extends React.Component<{}, {}> {
    private _factionName: string;

    constructor(props: {}) {
        super(props);
    }

    render() {
        const faction = FactionsHelper.generateFaction(false, true);
        this._factionName = FactionsHelper.getFaction(faction).name;

        return (
            <div>
                <div className="panel">
                    <div>
                        You discover that your friend is a traitor working for a rival faction. 
                        The authorities request your help in arresting them.
                        <br/><br/>
                        If you cooperate with the authorities, gain 5 assets as a reward.
                        <br/><br/>
                        If you help your friend, you gain a contact in the {this._factionName} faction
                        but you must make an Average (D1) hazard test in your current career or gain a Criminal Record.
                        <br/><br/>
                        Do you want to help your friend?
                    </div>
                    <Button text="YES" className="button-dark" onClick={() => this.onYes() }/>
                    <br/>
                    <Button text="NO" className="button-dark" onClick={() => this.onNo() }/>
                </div>
            </div>
        );
    }

    private onYes() {
        character.careerEvents[character.careerEvents.length - 1].effect += " You helped your friend. You gain a contact in the " + this._factionName + " faction.";
        character.pendingEvents.push(new EventModel("", "", "", "HazardTestOrCriminalRecord"));
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onNo() {
        character.careerEvents[character.careerEvents.length - 1].effect += " You did not help your friend.";
        character.assets += 5;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}