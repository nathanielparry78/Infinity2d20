import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {TribeSelection} from '../components/tribeSelection';
import {TribesHelper, TribeViewModel} from '../helpers/tribes';
import {FactionsHelper} from '../helpers/factions';

interface ITribePageState {
    showSelection: boolean;
}

export class TribePage extends React.Component<IPageProperties, ITribePageState> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL TRIBE" className="button-dark" onClick={() => { this.rollTribe() } }/>)
            : undefined;

        const select = (<Button text="SELECT TRIBE" lpCost={1} className="button-dark" onClick={() => { this.showTribes() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What tribe do you belong to?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <TribeSelection
                    onSelection={(id) => { this.selectTribe(id); character.lifePoints--; } }
                    onCancel={() => { this.hideTribes() } } />
            );
        return (
            <div className="page">
                <PageHeader text="ANTIPODEAN TRIBE" />
                {content}
            </div>
        );
    }

    private rollTribe() {
        var tribe = TribesHelper.generateTribe();
        this.selectTribe(tribe);
    }

    private showTribes() {
        this.setState({ showSelection: true });
    }

    private hideTribes() {
        this.setState({ showSelection: false });
    }

    private selectTribe(tribe: number) {
        const tr = TribesHelper.getTribe(tribe);

        character.birthPlace = tr.name;
        character.birthPlaceId = tribe;

        TribesHelper.applyTribe(tribe);

        Navigation.navigateToPage(PageIdentity.TribeDetails);
    }
}