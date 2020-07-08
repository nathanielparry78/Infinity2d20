import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {YouthEventSelection} from '../components/youthEventSelection';
import {YouthEventsHelper, YouthEventModel} from '../helpers/youthEvents';
import {FryEventsHelper} from '../helpers/fryEvents';
import {AlienHost} from '../helpers/alienHosts';
import { AwakeningEventsHelper } from '../helpers/awakeningEvents';

interface IYouthEventPageProps {
    showSelection: boolean;
    showEvent: boolean;
}

export class YouthEventPage extends React.Component<IPageProperties, IYouthEventPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false,
            showEvent: false
        };
    }

    render() {
        const isOtherEvent = character.host === AlienHost.Helot || character.isUplift();

        const roll = !character.isOptional
            ? (<Button text="ROLL EVENT" className="button-dark" onClick={() => { this.rollYouthEvent() } }/>)
            : undefined;

        const select = character.lifePoints >= 1
            ? (<Button text="SELECT EVENT" lpCost={1} className="button-dark" onClick={() => { this.showYouthEvents() } }/>)
            : undefined;

        const reroll = !isOtherEvent
            ? (<Button className="button-dark" lpCost={1} text="REROLL" onClick={() => { this.reroll() } }/>)
            : undefined;

        const pageText = !isOtherEvent
            ? "Each event indicates something that had a massive impact on your youth. It might be something you’ve long since put past you or it may still be the core of your later life, but either way, you’ll want to use the simple description as a springboard for your imagination and detail exactly what happened."
            : character.host === AlienHost.Helot
                ? "Being a fry is both like and unlike being a human child. While Humans and Helots alike are routinely shocked by how much they have in common despite their obvious differences, fryhood tends to be a fairly dramatic time for Helots and their pods."
                : character.isUplift()
                    ? "Uplifts don’t really have a childhood. They have the time before their awakening and everything that comes afterwards. The transition into sapience is many things—shocking, traumatic, unreal—but it is never gentle."
                    : "";

        const content = !this.state.showSelection && !this.state.showEvent ?
            (
                <div>
                    <div className="page-text">
                        {pageText}         
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : this.state.showSelection ?
                (
                    <YouthEventSelection
                        onSelection={(ev) => { this.selectYouthEvent(ev); character.lifePoints--; } }
                        onCancel={() => { this.hideYouthEvents() } } />
                )
                : this.state.showEvent ?
                    (
                        <div className="page">
                            <div className="panel">
                                <div className="option-header">{character.youthEvent.description}</div>
                                <br/>
                                {reroll}
                            </div>
                            <Button className="button-next" text="EDUCATION" onClick={() => { this.onNext() } }/>
                        </div>
                    )
                    : undefined;

        const header = !isOtherEvent
            ? "YOUTH EVENT"
            : character.host === AlienHost.Helot
                ? "FRY EVENT"
                : character.isUplift()
                    ? "AWAKENING"
                    : "";

        return (
            <div className="page">
                <PageHeader text={header} />
                {content}
            </div>
        );
    }

    private rollYouthEvent() {
        if (character.host === AlienHost.Helot) {
            let ev = FryEventsHelper.generateEvent();
            character.youthEvent = new YouthEventModel(ev.effect, ev.onApply);
        }
        else if (character.isUplift()) {
            let ev = AwakeningEventsHelper.generateEvent();
            character.youthEvent = new YouthEventModel(ev.description, ev.apply);
        }
        else {
            let ev = YouthEventsHelper.generateEvent()
            character.youthEvent = ev;
        }

        this.setState({ showSelection: false, showEvent: true });
    }

    private showYouthEvents() {
        this.setState({ showSelection: true, showEvent: false });
    }

    private hideYouthEvents() {
        this.setState({ showSelection: false, showEvent: false });
    }

    private selectYouthEvent(env: YouthEventModel) {
        character.youthEvent = env;
        this.onNext();
    }

    private reroll() {
        character.lifePoints--;
        this.rollYouthEvent();
        this.forceUpdate();
    }

    private onNext() {
        character.youthEvent.apply();

        if (YouthEventsHelper.getDetailView(character.youthEvent)) {
            Navigation.navigateToPage(PageIdentity.YouthEventDetails);
        }
        else {
            Navigation.navigateToPage(PageIdentity.Education);
        }
    }
}