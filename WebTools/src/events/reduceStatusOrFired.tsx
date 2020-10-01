import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {PageIdentity} from '../pages/pageFactory';
import { SocialClassesHelper } from '../helpers/socialClasses';

export class ReduceStatusOrFiredEvent extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        Do you want to reduce your Status to be able to continue this career?
                    </div>
                    <Button text="YES" className="button-dark" onClick={() => this.onYes() }/>
                    <br/>
                    <Button text="NO" className="button-dark" onClick={() => this.onNo() }/>
                </div>
            </div>
        );
    }

    private onYes() {
        SocialClassesHelper.reduceSocialClass();
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onNo() {
        character.prohibitedCareers.push(character.careers[character.careers.length - 1].career);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}