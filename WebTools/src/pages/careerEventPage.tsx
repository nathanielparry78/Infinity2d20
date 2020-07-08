import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {CareerEventSelection} from '../components/careerEventSelection';
import {CareerEventsHelper, CareerEventModel} from '../helpers/careerEvents';
import {EventModel} from '../common/eventModel';

interface ICareerEventPageProps {
    showSelection: boolean;
    showEvent: boolean;
}

export class CareerEventPage extends React.Component<IPageProperties, ICareerEventPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false,
            showEvent: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL CAREER EVENT" className="button-dark" onClick={() => { this.rollCareerEvent() } }/>)
            : undefined;

        const select = (<Button text="SELECT EVENT" lpCost={1} className="button-dark" onClick={() => { this.showCareerEvents() } }/>);

        const reroll = character.lifePoints >= 1
                ? (<Button className="button-dark" text="REROLL" lpCost={1} onClick={() => { this.reroll() } }/>)
                : undefined;

        const content = !this.state.showEvent && !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        While working your career, what was the most significant event in your life?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : this.state.showSelection ?
                (
                    <div>
                        <CareerEventSelection
                            onSelection={(ev) => { this.selectCareerEvent(ev); character.lifePoints--; } }
                            onCancel={() => this.hideCareerEvents() }/>
                    </div>
                )
                : this.state.showEvent ?
                (
                    <div className="page">
                        <div className="panel">
                            <div className="option-header">{character.careerEvents[character.careerEvents.length - 1].event}</div>
                            <br/>
                            {reroll}
                        </div>
                        <Button className="button-next" text="NEXT" onClick={() => { this.onNext() } }/>
                    </div>
                )
                : undefined;

        return (
            <div className="page">
                <PageHeader text="CAREER EVENT" />
                {content}
            </div>
        );
    }

    private rollCareerEvent() {
        var ev = CareerEventsHelper.generateEvent();
        character.careerEvents.push(ev);
        this.setState({ showSelection: false, showEvent: true });
    }

    private reroll() {
        character.careerEvents.splice(character.careerEvents.length - 1, 1);
        character.lifePoints--;

        this.rollCareerEvent();
        this.forceUpdate();
    }

    private showCareerEvents() {
        this.setState({ showSelection: true, showEvent: false });
    }

    private hideCareerEvents() {
        this.setState({ showSelection: false, showEvent: false });
    }

    private selectCareerEvent(ev: CareerEventModel) {
        character.careerEvents.push(ev);
        this.setState({ showSelection: false, showEvent: true });
    }

    private onNext() {
        const ev = character.careerEvents[character.careerEvents.length - 1];

        if (ev.onApply) {
            ev.onApply();
        }

        if (ev.detailView) {
            if (ev.detailView.indexOf('|') > -1) {
                const details = ev.detailView.split('|');

                for (var i = 0; i < details.length; i++) {
                    character.pendingEvents.push(new EventModel(ev.event, ev.trait, ev.effect, details[i]));
                }
            }
            else {
                character.pendingEvents.push(ev);
            }
            Navigation.navigateToPage(PageIdentity.EventDetails);
        }
        else {
            Navigation.navigateToPage(PageIdentity.AfterEvent);
        }
    }
}