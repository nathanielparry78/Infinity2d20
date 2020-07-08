import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {Faction, FactionViewModel, FactionsHelper} from '../helpers/factions';
import {PageIdentity} from '../pages/pageFactory';
import { Source } from '../helpers/sources';
import { HeritageTraits } from '../helpers/birthPlaces';

interface IDefectionChoiceEventProperties {
}

export class DefectionChoiceEvent extends React.Component<IDefectionChoiceEventProperties, {}> {
    private _selectedFaction: string;
    private _factions: string[];

    constructor(props: IDefectionChoiceEventProperties) {
        super(props);

        this._factions = [];

        FactionsHelper.getFactions().forEach(faction => {
            if (faction.id !== character.faction && !faction.needsHeritage) {
                this._factions.push(faction.name);
            }
        });

        this._selectedFaction = this._factions[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Which faction do you want to defect to?
                    </div>
                    <DropDownInput items={this._factions} defaultValue={this._selectedFaction} onChange={index => this.onFactionSelected(index) }/>
                    <br/><br/>
                    <Button text="DONE" className="button-dark" onClick={() => this.onNext() }/>
                </div>
            </div>
        );
    }

    private onFactionSelected(index: number) {
        this._selectedFaction = this._factions[index];
        this.forceUpdate();
    }

    private onNext() {
        character.heritage = character.faction;
        character.hasDefected = true;
        character.faction = FactionsHelper.getFactionByName(this._selectedFaction);

        if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
            character.heritageTrait = HeritageTraits.Lub;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}