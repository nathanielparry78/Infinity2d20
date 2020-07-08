import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {HomeEnvironmentSelection} from '../components/homeEnvironmentSelection';
import {HomeEnvironment, HomeEnvironmentsHelper} from '../helpers/homeEnvironments';

interface IHomeEnvironmentPageProps {
    showSelection: boolean;
}

export class HomeEnvironmentPage extends React.Component<IPageProperties, IHomeEnvironmentPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL ENVIRONMENT" className="button-dark" onClick={() => { this.rollHomeEnvironment() } }/>)
            : undefined;

        const select = (<Button text="SELECT ENVIRONMENT" lpCost={character.paidForSocialClass ? 0 : 1} className="button-dark" onClick={() => { this.showHomeEnvironments() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What was life like and what type of people were you surrounded by?
                        Continue Determining your social status by rolling or choosing the
                        kind of home environment you grew up in.
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <HomeEnvironmentSelection
                    onSelection={(env) => {
                        this.selectHomeEnvironment(env);
                        if (!character.paidForSocialClass) {
                            character.lifePoints--;
                        }
                    }}
                    onCancel={() => { this.hideHomeEnvironments() } } />
            );
        return (
            <div className="page">
                <PageHeader text="STATUS: HOME ENVIRONMENT" />
                {content}
            </div>
        );
    }

    private rollHomeEnvironment() {
        var env = HomeEnvironmentsHelper.generateHomeEnvironment();
        this.selectHomeEnvironment(env);
    }

    private showHomeEnvironments() {
        this.setState({ showSelection: true });
    }

    private hideHomeEnvironments() {
        this.setState({ showSelection: false });
    }

    private selectHomeEnvironment(env: HomeEnvironment) {
        character.homeEnvironment = env;
        HomeEnvironmentsHelper.applyHomeEnvironment(env);
        Navigation.navigateToPage(PageIdentity.StatusDetails);
    }
}