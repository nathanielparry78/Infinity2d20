import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { AttributeImprovementCollection, AttributeImprovementCollectionMode } from '../components/attributeImprovement';
import { Button } from '../components/button';
import { Dialog } from '../components/dialog';
import { PageIdentity } from '../pages/pageFactory';
import { Attribute } from '../helpers/attributes';

export class PraxisEvent extends React.Component<{}, {}> {
    private _attrsDone: boolean;

    constructor(props: {}) {
        super(props);

        this._attrsDone = false;
    }

    render() {
        const contact = !this._attrsDone
            ? <div>
                You gain a contact in Praxis' Black Labs.
              </div>
            : <div>
                You gain a 10 Asset debt.
              </div>;

        return (
            <div>
                <div className="panel">
                    <div>
                        An old contact from Praxis gets you into an experimental program after the first test subjects found the risks. Most of them.
                        Either increase an Attribute of your choice by 1, gaining a 10 Asset debt along the way, or gain a contact in Praxis’s Black Labs.
                    </div>
                    <div>
                        <AttributeImprovementCollection
                            mode={AttributeImprovementCollectionMode.Increase}
                            points={1}
                            attributes={[Attribute.Agility, Attribute.Awareness, Attribute.Brawn, Attribute.Coordination, Attribute.Intelligence, Attribute.Personality, Attribute.Willpower]}
                            onDone={(done) => { this._attrsDone = done; }} />
                    </div>
                    {contact}
                </div>
                <Button text="NEXT" className="button-next" onClick={() => this.onNext()} />
            </div>
        );
    }

    private onNext() {
        if (!this._attrsDone) {
            character.addOtherEvent("You gain a contact in Praxis' Black Labs.", "");
        }
        else {
            character.addOtherEvent("You gain a 10 Asset debt.", "");
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}