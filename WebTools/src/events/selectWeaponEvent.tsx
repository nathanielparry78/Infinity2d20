import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {PageIdentity} from '../pages/pageFactory';
import {EquipmentHelper} from '../helpers/equipment';

interface ISelectWeaponEventProperties {
    weapons?: string[];
}

export class SelectWeaponEvent extends React.Component<ISelectWeaponEventProperties, {}> {
    private _weapons: string[];
    private _weapon: string;

    constructor(props: ISelectWeaponEventProperties) {
        super(props);

        this._weapons = this.props.weapons
            ? this.props.weapons
            : EquipmentHelper.getWeapons().map((w, i) => {
                return w.listName;
              });

        this._weapon = this._weapons[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Choose a weapon.
                    </div>
                    <DropDownInput
                        items={this._weapons}
                        defaultValue={this._weapon}
                        onChange={(index) => { this.selectWeapon(index) } } />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectWeapon(index: number) {
        this._weapon = this._weapons[index];
        this.forceUpdate();
    }

    private next() {
        character.addEquipment(this._weapon);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}