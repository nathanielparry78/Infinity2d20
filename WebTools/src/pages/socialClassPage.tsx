import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {SocialClassSelection} from '../components/socialClassSelection';
import {SocialClass, SocialClassesHelper} from '../helpers/socialClasses';

interface ISocialClassPageProps {
    showSelection: boolean;
}

export class SocialClassPage extends React.Component<IPageProperties, ISocialClassPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL SOCIAL CLASS" className="button-dark" onClick={() => { this.rollSocialClass() } }/>)
            : undefined;

        const select = (<Button text="SELECT SOCIAL CLASS" lpCost={1} className="button-dark" onClick={() => { this.showSocialClasses() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Now that you know where you were born and raised, let’s find out more about how you grew up.
                        What were your economic circumstances? First determine your social status by rolling
                        or choosing your social class.
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <SocialClassSelection
                    onSelection={(faction) => {
                        character.paidForSocialClass = true;
                        this.selectSocialClass(faction);
                        character.lifePoints--;
                    }}
                    onCancel={() => { this.hideSocialClasses() } } />
            );
        return (
            <div className="page">
                <PageHeader text="STATUS: SOCIAL CLASS" />
                {content}
            </div>
        );
    }

    private rollSocialClass() {
        var soc = SocialClassesHelper.generateSocialClass();
        this.selectSocialClass(soc);
    }

    private showSocialClasses() {
        this.setState({ showSelection: true });
    }

    private hideSocialClasses() {
        this.setState({ showSelection: false });
    }

    private selectSocialClass(socialClass: SocialClass) {
        character.socialClass = socialClass;
        SocialClassesHelper.applySocialClass(socialClass);
        Navigation.navigateToPage(PageIdentity.HomeEnvironment);
    }
}