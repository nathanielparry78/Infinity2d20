import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AdolescenceEventSelection} from '../components/adolescenceEventSelection';
import {AdolescenceEventsHelper, AdolescenceEventModel} from '../helpers/adolescenceEvents';

interface IAdolescenceEventPageProps {
    showSelection: boolean;
    showEvent: boolean;
}

export class AdolescenceEventPage extends React.Component<IPageProperties, IAdolescenceEventPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false,
            showEvent: false
        };
    }

    render() {
        const roll = !character.isOptional ?
            (<Button text="ROLL EVENT" className="button-dark" onClick={() => { this.rollAdolescenceEvent() } }/>)
            : undefined;

        const select = (<Button text="SELECT EVENT" lpCost={1} className="button-dark" onClick={() => { this.showAdolescenceEvents() } }/>);

        const reroll = (<Button className="button-dark" lpCost={1} text="REROLL" onClick={() => { this.reroll() } }/>);

        const content = !this.state.showEvent && !this.state.showSelection?
            (
                <div>
                    <div className="page-text">
                        At some point during your adolescence, you experienced a defining event which still shapes who you are today.
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
                        <AdolescenceEventSelection
                            onSelection={(ev) => { this.selectAdolescenceEvent(ev); character.lifePoints--; } }
                            onCancel={() => this.hideAdolescenceEvents() }/>
                    </div>
                )
                : this.state.showEvent ?
                    (
                        <div className="page">
                            <div className="panel">
                                <div className="option-header">{character.adolescenceEvent.event}</div>
                                <br/>
                                {reroll}
                            </div>
                            <Button className="button-next" text="CAREER" onClick={() => { this.onNext() } }/>
                        </div>
                    )
                    : undefined;

        return (
            <div className="page">
                <PageHeader text="ADOLESCENCE EVENT" />
                {content}
            </div>
        );
    }

    private rollAdolescenceEvent() {
        var ev = AdolescenceEventsHelper.generateEvent();
        character.adolescenceEvent = ev;
        this.setState({ showSelection: false, showEvent: true });
    }

    private reroll() {
        character.lifePoints--;
        this.rollAdolescenceEvent();
        this.forceUpdate();
    }

    private showAdolescenceEvents() {
        this.setState({ showSelection: true, showEvent: false });
    }

    private hideAdolescenceEvents() {
        this.setState({ showSelection: false, showEvent: false });
    }

    private selectAdolescenceEvent(ev: AdolescenceEventModel) {
        character.adolescenceEvent = ev;
        this.setState({ showSelection: false, showEvent: true });
    }

    private onNext() {
        if (character.adolescenceEvent.onApply) {
            character.adolescenceEvent.onApply();
        }

        if (character.adolescenceEvent.detailView) {
            character.pendingEvents.push(character.adolescenceEvent);
            Navigation.navigateToPage(PageIdentity.EventDetails);
        }
        else {
            Navigation.navigateToPage(PageIdentity.Career1);
        }
    }
}