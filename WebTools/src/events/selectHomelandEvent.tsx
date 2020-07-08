import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/DropDownInput';
import {PageIdentity} from '../pages/pageFactory';
import {BirthPlacesHelper} from '../helpers/birthPlaces';

export class SelectHomelandEvent extends React.Component<{}, {}> {
    private _homelands: string[];
    private _homeland: string;

    constructor(props: {}) {
        super(props);

        this._homelands = [];

        BirthPlacesHelper.getBirthPlaces(character.heritage).forEach(home => {
            const homelands = BirthPlacesHelper.getHomelands(home.name).forEach(land => {
                this._homelands.push(`${home.name} (${land.name})`);
            });
        });

        this._homeland = this._homelands[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Choose a new homeland.
                    </div>
                    <DropDownInput
                        items={this._homelands}
                        defaultValue={this._homeland}
                        onChange={(index) => { this.selectHomeland(index) } } />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectHomeland(index: number) {
        this._homeland = this._homelands[index];
        this.forceUpdate();
    }

    private next() {
        const birthplace = this._homeland.substr(0, this._homeland.indexOf("("));
        const homeland = this._homeland.substr(this._homeland.indexOf("(") + 1, this._homeland.indexOf(")")); 

        character.birthPlace = birthplace;
        character.homeland = homeland;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}