import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Faction, FactionsHelper} from '../helpers/factions';
import {PageIdentity} from '../pages/pageFactory';
import { Source } from '../helpers/sources';
import { HeritageTraits } from '../helpers/birthPlaces';

interface IDefectionEventProperties {
    faction: Faction;
}

export class DefectionEvent extends React.Component<IDefectionEventProperties, {}> {
    constructor(props: IDefectionEventProperties) {
        super(props);
    }

    render() {
        const factionName = FactionsHelper.getFaction(this.props.faction).name;

        return (
            <div>
                <div className="panel">
                    <div>
                        Do you want to defect to the <b>{factionName}</b> faction?
                    </div>
                    <Button text="YES" className="button-dark" onClick={() => this.onYes() }/>
                    <br/>
                    <Button text="NO" className="button-dark" onClick={() => this.onNo() }/>
                </div>
            </div>
        );
    }

    private onYes() {
        character.heritage = character.faction;
        character.hasDefected = true;
        character.faction = this.props.faction;

        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            character.heritageTrait = HeritageTraits.Lub;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onNo() {
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}