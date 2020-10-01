import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {PageIdentity} from '../pages/pageFactory';

export class CyberneticLegOrArmEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        You have a cybernetic arm or leg.
                        Increase the Maintenance cost by 1 but add one bonus Momentum on successful tests made with the limb.
                    </div>
                    <Button text="ARM" className="button-dark" onClick={() => this.onArm() }/>
                    <br/>
                    <Button text="LEG" className="button-dark" onClick={() => this.onLeg() }/>
                </div>
            </div>
        );
    }

    private onArm() {
        character.addEquipment("Cybernetic Arm");
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onLeg() {
        character.addEquipment("Cybernetic Leg");
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}