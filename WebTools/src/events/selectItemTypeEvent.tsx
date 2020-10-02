import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {PageIdentity} from '../pages/pageFactory';

interface ISelectWeaponEventProperties {
}

export class SelectItemTypeEvent extends React.Component<ISelectWeaponEventProperties, {}> {
    private _types: string[];
    private _type: string;

    constructor(props: ISelectWeaponEventProperties) {
        super(props);

        this._types = [
            "Explosives",
            "Firearms",
            "Hacking Devices",
            "Remotes",
            "Vehicles",
        ];

        this._type = this._types[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Choose one category of modern gear. You do not suffer increased difficulty when using items of that type.
                    </div>
                    <DropDownInput
                        items={this._types}
                        defaultValue={this._type}
                        onChange={(index) => { this.selectItemType(index) } } />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectItemType(index: number) {
        this._type = this._types[index];
        this.forceUpdate();
    }

    private next() {
        character.adolescenceEvent.effect = `You do not suffer increased difficulty when using items of the ${this._type} type.`;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}