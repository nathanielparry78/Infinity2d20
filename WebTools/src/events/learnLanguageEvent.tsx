import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/DropDownInput';
import {PageIdentity} from '../pages/pageFactory';
import {BirthPlacesHelper} from '../helpers/birthPlaces';

export class LearnLanguageEvent extends React.Component<{}, {}> {
    private _languages: string[];
    private _language: string;

    constructor(props: {}) {
        super(props);

        this._languages = BirthPlacesHelper.getCustomizationLanguages();
        this._language = this._languages[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Choose a language.
                    </div>
                    <DropDownInput
                        items={this._languages}
                        defaultValue={this._language}
                        onChange={(index) => { this.selectLanguage(index) } } />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectLanguage(index: number) {
        this._language = this._languages[index];
        this.forceUpdate();
    }

    private next() {
        character.addLanguage(this._language);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}