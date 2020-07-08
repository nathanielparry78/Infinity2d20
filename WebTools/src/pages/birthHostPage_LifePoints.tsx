import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';

export class BirthHostPage_LifePoints extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="BIRTH HOST"/>
                <div className="page-text">
                    You may now increase attributes using Life Points.1 Life Points equals 1 point of increase in an attribute.
                    No attributes can be raised higher than 10, and any attributes above 8 usually represent some form of genetic tweaking or similar modification.
                </div>
                <div className="panel">
                    <AttributeImprovementCollection mode={AttributeImprovementCollectionMode.LifePoints} points={0} />
                </div>
                <Button text="HOST BODY" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        character.calculateModifiers();
        Navigation.navigateToPage(PageIdentity.HostBody);
    }
}