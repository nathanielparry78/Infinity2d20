import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { IPageProperties, PageIdentity } from './pageFactory';
import { PageHeader } from '../components/pageHeader';
import { Button } from '../components/button';
import { AwakeningEventSelection } from '../components/awakeningEventSelection';
import { AwakeningEventsHelper } from '../helpers/awakeningEvents';
import { YouthEventModel } from '../helpers/youthEvents';

interface IYouthEventPageProps {
    showSelection: boolean;
    showEvent: boolean;
}

export class AwakeningEventPage extends React.Component<IPageProperties, IYouthEventPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false,
            showEvent: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL EVENT" className="button-dark" onClick={() => { this.rollYouthEvent() }} />)
            : undefined;

        const select = character.lifePoints >= 1
            ? (<Button text="SELECT EVENT" lpCost={1} className="button-dark" onClick={() => { this.showYouthEvents() }} />)
            : undefined;

        const pageText = "Uplifts don’t really have a childhood. They have the time before their awakening and everything that comes afterwards. The transition into sapience is many things—shocking, traumatic, unreal—but it is never gentle.";

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
                    <AwakeningEventSelection
                        onSelection={(ev) => { this.selectYouthEvent(ev); character.lifePoints--; }}
                        onCancel={() => { this.hideYouthEvents() }} />
                )
                : this.state.showEvent ?
                    (
                        <div className="page">
                            <div className="panel">
                                <div className="option-header">{character.youthEvent.description}</div>
                            </div>
                            <Button className="button-next" text="NEXT" onClick={() => { this.onNext() }} />
                        </div>
                    )
                    : undefined;

        const header = "AWAKENING";

        return (
            <div className="page">
                <PageHeader text={header} />
                {content}
            </div>
        );
    }

    private rollYouthEvent() {
        let ev = AwakeningEventsHelper.generateEvent();
        character.youthEvent = ev;

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

    private onNext() {
        character.youthEvent.apply();

        Navigation.navigateToPage(PageIdentity.AwakeningEventDetails);
    }
}