import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { PageIdentity, IPageProperties } from './pageFactory';
import { PageHeader } from '../components/pageHeader';
import { Button } from '../components/button';
import { DropDownInput } from '../components/dropDownInput';

export class UpliftHostDetailsPage extends React.Component<IPageProperties, {}> {
    private _selected: string;
    private _equipment = ["Remote Presence Gear", "Cube 2.0"];

    constructor(props: IPageProperties) {
        super(props);

        this._selected = "Remote Presence Gear";
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="REMOTE SPECIALIST" />
                <div className="page-text">
                    Pick a piece of equipment.
                </div>
                <div className="panel">
                    <DropDownInput items={this._equipment}
                                   defaultValue={this._selected} 
                                   onChange={(index) => { this.selectItem(index); }} />
                </div>
                <Button text="SOCIAL CLASS" className="button-next" onClick={() => this.onNext()} />
            </div>
        );
    }

    private selectItem(index: number) {
        this._selected = this._equipment[index];
    }

    private onNext() {
        character.addEquipment(this._selected);

        Navigation.navigateToPage(PageIdentity.BirthPlace);
    }
}