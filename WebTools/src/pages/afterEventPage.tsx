import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {Button} from '../components/button';
import {Faction} from '../helpers/factions';
import {CareersHelper} from '../helpers/careers';
import {SocialClassesHelper} from '../helpers/socialClasses';

export class AfterEventPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        if (character.pendingEvents.length > 0) {
            Navigation.navigateToPage(PageIdentity.EventDetails);
        }
        else if (character.careers.length === 0) {
            Navigation.navigateToPage(character.getCareerPage(PageIdentity.Career1));
        }
    }

    render() {
        // To avoid "blinking".. or whatever to call it.
        if (character.pendingEvents.length > 0 ||
            character.careers.length === 0) {
            return (<div className="page"></div>);
        }

        const finish = character.careers.length >= 2
            ? (<Button className="button-dark" text="FINISH" onClick={() => { this.onFinish() } } />)
            : undefined;

        const continueCareer = character.canExtendCareer && character.careers.length < 2
            ? (<Button className="button-dark" text="CONTINUE CAREER" onClick={() => { this.onContinue() } }/>)
            : character.careers.length < 4 && character.lifePoints >= 1 && character.canExtendCareer
                ? (<Button className="button-dark" text="CONTINUE CAREER" lpCost={1} onClick={() => { this.onContinue() } }/>)
                : undefined;

        const newCareer = character.careers.length < 2
            ? (<Button className="button-dark" text="NEW CAREER" onClick={() => { this.onNew() } }/>)
            : character.careers.length < 4 && character.lifePoints >= 1
                ? (<Button className="button-dark" text="NEW CAREER" lpCost={1} onClick={() => { this.onNew() } }/>)
                : undefined;

        return (
            <div className="page">
                <div className="page-text">
                    Select an option to continue.
                </div>
                <div className="button-container">
                    {finish}
                    {continueCareer}
                    {newCareer}
                </div>
            </div>
        );
    }

    private onFinish() {
        if (character.hassassinEvent) {
            character.hassassinEvent = false;
            SocialClassesHelper.increaseSocialClass();
        }

        if (character.hasGeist()) {
            Navigation.navigateToPage(PageIdentity.Geist);
        }
        else {
            Navigation.navigateToPage(PageIdentity.FinalTweaks);
        }
    }

    private onContinue() {
        if (character.careers.length >= 2) {
            character.lifePoints--;
        }

        const career = character.careers[character.careers.length - 1].career;
        const age = Math.floor(Math.random() * 6) + 1;
        character.age += age;
        character.careers.push(new CharacterCareer(career, age));

        CareersHelper.applyCareer(career);

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerDetails1));
    }

    private onNew() {
        Navigation.navigateToPage(character.getCareerPage(PageIdentity.Career1));
    }
}