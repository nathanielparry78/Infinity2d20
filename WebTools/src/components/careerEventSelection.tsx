import * as React from 'react';
import {character} from '../common/character';
import {CareerEventModel, CareerEventsHelper} from '../helpers/careerEvents';
import {Button} from './button';

interface ICareerEventSelectionProperties {
    onSelection: (ev: CareerEventModel) => void;
    onCancel: () => void;
}

export class CareerEventSelection extends React.Component<ICareerEventSelectionProperties, {}> {
    constructor(props: ICareerEventSelectionProperties) {
        super(props);
    }

    render() {
        const evs = CareerEventsHelper.getEvents();
        var eventElements: JSX.Element[] = [];
        var n = 0;

        for (var table in evs) {
            const events = evs[table].map((e, i) => {
                return (
                    <div key={i}>
                        <div style={{ backgroundColor: "#0a334c" }}>
                            <div>{e.event}</div>
                            <br/>
                            <Button className="button-small" text="SELECT" onClick={() => { this.selectEvent(e); } } />
                        </div>
                        <br/>
                    </div>
                );
            });

            eventElements.push((
                <div key={n++}>
                    <div className="panel">
                        <div className="option-header">Table {table}</div>
                        {events}
                    </div>
                    <br/>
                </div>
            ));
        }

        return (
            <div>
                <div className="header-text">SELECT CAREER EVENT</div>
                <br/>
                {eventElements}
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }

    private selectEvent(ev: CareerEventModel) {
        this.props.onSelection(ev);
    }
}