import * as React from 'react';
import {character} from '../common/character';
import {AdolescenceEventModel, AdolescenceEventsHelper} from '../helpers/adolescenceEvents';
import {Button} from './button';

interface IAdolescenceEventSelectionProperties {
    onSelection: (ev: AdolescenceEventModel) => void;
    onCancel: () => void;
}

export class AdolescenceEventSelection extends React.Component<IAdolescenceEventSelectionProperties, {}> {
    constructor(props: IAdolescenceEventSelectionProperties) {
        super(props);
    }

    render() {
        const evs = AdolescenceEventsHelper.getEvents();
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
                <div className="header-text">SELECT ADOLESCENCE EVENT</div>
                <br/>
                {eventElements}
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }

    private selectEvent(ev: AdolescenceEventModel) {
        this.props.onSelection(ev);
    }
}