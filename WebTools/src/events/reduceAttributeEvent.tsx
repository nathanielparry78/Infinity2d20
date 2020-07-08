import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {PageIdentity} from '../pages/pageFactory';
import {Attribute} from '../helpers/attributes';

interface IReduceAttributeEventProperties {
    attributes?: Attribute[];
    points: number;
}

export class ReduceAttributeEvent extends React.Component<IReduceAttributeEventProperties, {}> {
    private _attrsDone: boolean;

    constructor(props: IReduceAttributeEventProperties) {
        super(props);

        this._attrsDone = false;
    }

    render() {
        const next = character.careers.length > 0
            ? <Button text="NEXT" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.AfterEvent) }/>
            : <Button text="EDUCATION" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.Education) }/>;

        return (
            <div>
                <div className="panel">
                    <AttributeImprovementCollection
                        mode={AttributeImprovementCollectionMode.Decrease}
                        points={this.props.points}
                        attributes={this.props.attributes}
                        onDone={(done) => this._attrsDone = done }/>
                </div>
                {next}
            </div>
        );
    }

    private onNext() {
        if (!this._attrsDone) {
            Dialog.show("You have not reduced one of your attributes.");
            return;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}