import * as React from 'react';
import {character} from '../common/character';
import {YouthEventsHelper, YouthEventModel} from '../helpers/youthEvents';
import {Button} from './button';

interface IYouthEventSelectionProperties {
    onSelection: (ev: YouthEventModel) => void;
    onCancel: () => void;
}

export class YouthEventSelection extends React.Component<IYouthEventSelectionProperties, {}> {
    constructor(props: IYouthEventSelectionProperties) {
        super(props);
    }

    render() {
        var eventElements: JSX.Element[] = [];
        var events: { [category: string]: YouthEventModel[] } = {};

        for (var i = 1; i <= 19; i++) {
            for (var j = 1; j <= 6; j++) {
                var event = YouthEventsHelper.getEvent(i, j);
                var category: string;
                var n = -1;

                n = event.description.indexOf(":");
                if (n === -1) {
                    n = event.description.indexOf(" ");
                }

                category = event.description.substring(0, n) + "...";
                var ev = "..." + event.description.substring(n + 1);

                if (events[category] === undefined) {
                    events[category] = [];
                }

                var exists = false;
                for (var k = 0; k < events[category].length; k++) {
                    if (events[category][k].description === event.description) {
                        exists = true;
                        break;
                    }
                }

                if (!exists) {
                    events[category].push(event);
                }
            }
        }

        var n = 0;
        for (var category in events) {
            const evs = events[category].map((ev, i) => {
                return (<div key={i} className="youth-event" onClick={() => this.props.onSelection(ev) }>...{ev.description}</div>)
            });

            eventElements.push((
                <div key={n++}>
                    <div className="panel">
                        <div className="option-header">{category}</div>
                        {evs}
                    </div>
                    <br/>
                </div>
            ));
        }

        return (
            <div>
                <div className="header-text">SELECT YOUTH EVENT</div>
                <br/>
                {eventElements}
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}