import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AlephFormsHelper, AlephForm} from '../helpers/alephForms';

export class AlephFormPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const aspects = AlephFormsHelper.getForms().map((f, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{f.name}</td>
                    <td>{f.description}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.onAspectSelected(f.id) } } /></td>
                </tr>
            )
        });

        return (
            <div className="page">
                <PageHeader text="ALEPH ASPECT" />
                <div className="page-text">
                    Select your ALEPH aspect.
                </div>
                <div className="panel">
                    <table className="selection-list">
                        <thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {aspects}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private onAspectSelected(aspect: AlephForm) {
        character.alephForm = aspect;
        AlephFormsHelper.applyForm(character.alephForm);

        if (aspect === AlephForm.Recreation) {
            Navigation.navigateToPage(PageIdentity.BirthPlace);
        }
        else {
            Navigation.navigateToPage(PageIdentity.AlephDetails);
        }
    }
}