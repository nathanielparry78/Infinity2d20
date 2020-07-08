import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {CareerEventsHelper, CareerEventModel} from '../helpers/careerEvents';
import {PageIdentity} from '../pages/pageFactory';

export class ChineseCurseEvent extends React.Component<{}, {}> {
    private _event1: CareerEventModel;
    private _event2: CareerEventModel;
    private _event3: CareerEventModel;

    constructor(props: {}) {
        super(props);

        this._event1 = CareerEventsHelper.generateEvent();
        while (this._event1.eventNumber === 20) {
            this._event1 = CareerEventsHelper.generateEvent();
        }

        this._event2 = CareerEventsHelper.generateEvent();
        while ((this._event2.table === this._event1.table && this._event2.eventNumber === this._event1.eventNumber) ||
               this._event2.eventNumber === 20) {
            this._event2 = CareerEventsHelper.generateEvent();
        }

        this._event3 = CareerEventsHelper.generateEvent();
        while ((this._event3.table === this._event1.table && this._event3.eventNumber === this._event1.eventNumber) ||
               (this._event3.table === this._event2.table && this._event3.eventNumber === this._event2.eventNumber) ||
               this._event3.eventNumber === 20) {
            this._event3 = CareerEventsHelper.generateEvent();
        }

        character.pendingEvents.push(this._event1);
        character.pendingEvents.push(this._event2);
        character.pendingEvents.push(this._event3);
    }

    render() {
        return (
            <div>
                <div className="page-text">
                    You are suffering from the Chinese Curse: May you live in interesting times!You gain three career events for this career phase.
                </div>
                <div className="panel">
                    {this._event1.event}
                </div>
                <div className="panel">
                    {this._event2.event}
                </div>
                <div className="panel">
                    {this._event3.event}
                </div>
                <Button text="NEXT" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.AfterEvent) }/>
            </div>
        );
    }
}