import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {EducationSelection} from '../components/educationSelection';
import {Education, EducationsHelper} from '../helpers/educations';

interface IEducationPageProps {
    showSelection: boolean;
}

export class EducationPage extends React.Component<IPageProperties, IEducationPageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        const roll = !character.isOptional
            ? (<Button text="ROLL EDUCATION" className="button-dark" onClick={() => { this.rollEducation() } }/>)
            : undefined;

        const select = (<Button text="SELECT EDUCATION" lpCost={1} className="button-dark" onClick={() => { this.showEducations() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        What kind of education did you get?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <EducationSelection
                    onSelection={(env) => { this.selectEducation(env); character.lifePoints--; } }
                    onCancel={() => { this.hideEducations() } } />
            );
        return (
            <div className="page">
                <PageHeader text="EDUCATION" />
                {content}
            </div>
        );
    }

    private rollEducation() {
        var edu = EducationsHelper.generateEducation();
        this.selectEducation(edu);
    }

    private showEducations() {
        this.setState({ showSelection: true });
    }

    private hideEducations() {
        this.setState({ showSelection: false });
    }

    private selectEducation(edu: Education) {
        character.education = edu;
        EducationsHelper.applyEducation(edu);
        Navigation.navigateToPage(PageIdentity.EducationDetails);
    }
}