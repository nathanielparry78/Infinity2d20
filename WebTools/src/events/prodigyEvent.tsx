import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {PageIdentity} from '../pages/pageFactory';
import {SocialClassesHelper} from '../helpers/socialClasses';

export class ProdigyEvent extends React.Component<{}, {}> {
    private _options: string[];
    private _choice: string;

    constructor(props: {}) {
        super(props);

        this._options = [
            "+1 Status",
            "5 Assets",
            "Media contact",
            "Academia contact",
            "Entertainment contact"
        ];

        this._choice = this._options[0];
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        You are a prodigy and excelled at a particular skill from a very young age.
                        You could have been a talented musician or a math whiz.
                        Regardless, your talent got a lot of attention in the media before you grew out of it.
                    </div>
                    <DropDownInput
                        items={this._options}
                        defaultValue={this._choice}
                        onChange={(index) => { this.selectOption(index) } } />
                </div>
                <Button text="DONE" className="button-next" onClick={() => this.next() }/>
            </div>
        );
    }

    private selectOption(index: number) {
        this._choice = this._options[index];
        this.forceUpdate();
    }

    private next() {
        if (this._choice.indexOf("Status") > -1) {
            SocialClassesHelper.increaseSocialClass();
        }
        else if (this._choice.indexOf("Assets") > -1) {
            character.assets += 5;
        }
        else if (this._choice.indexOf("Media contact") > -1) {
            character.adolescenceEvent.effect += ` You gain a ${this._choice}.`;
        }
        else {
            character.adolescenceEvent.effect += ` You gain an ${this._choice}.`;
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}