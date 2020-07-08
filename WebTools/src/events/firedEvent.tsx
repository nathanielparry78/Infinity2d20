import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {PageIdentity} from '../pages/pageFactory';
import {SocialClassesHelper} from '../helpers/socialClasses';

interface IFiredEventProperties {
}

export class FiredEvent extends React.Component<IFiredEventProperties, {}> {
    constructor(props: IFiredEventProperties) {
        super(props);
    }

    render() {
        const extend = character.careers.length > 0 && !character.careers[character.careers.length - 1].isExtended && character.lifePoints >= 2 && character.earnings > 0
            ? (<Button text="EXTEND CAREER*" lpCost={2} className="button-dark" onClick={() => this.onExtendCareer() }/>)
            : undefined;

        const cont = character.careers.length < 4 && character.lifePoints >= 2 && character.earnings > 0
            ? (<Button text="CONTINUE CAREER*" lpCost={2} className="button-dark" onClick={() => this.onContinueCareer() }/>)
            : undefined;

        const newCareer = character.careers.length < 4
            ? (<Button text="NEW CAREER" className="button-dark" onClick={() => this.onNewCareer() }/>)
            : undefined;

        const finish = character.careers.length >= 2
            ? (<Button text="FINISH" className="button-dark" onClick={() => this.onFinish() }/>)
            : undefined;

        return (
            <div>
                <div className="panel">
                    <div>
                        You have been Fired from your current career! How do you want to proceed?
                        Choices marked with <b>*</b> will reduce your Earnings by one. 
                    </div>
                    <br/><br/>
                    <div className="button-container">
                        {extend}
                        <br/>
                        {cont}
                        <br/>
                        {newCareer}
                        <br/>
                        {finish}
                    </div>
                </div>
            </div>
        );
    }

    private onExtendCareer() {
        const years = Math.floor(Math.random() * 6) + 2;
        character.age += years;
        character.careers[character.careers.length - 1].isExtended = true;
        character.careers[character.careers.length - 1].years += years;
        character.earnings = Math.max(0, character.earnings - 1);
        character.lifePoints -= 2;
        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerEvent1));
    }

    private onContinueCareer() {
        const years = Math.floor(Math.random() * 6) + 2;
        character.age += years;
        character.careers.push(character.careers[character.careers.length - 1]);
        character.careers[character.careers.length - 1].years = years;
        character.earnings = Math.max(0, character.earnings - 1);
        character.lifePoints -= 2;
        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerDetails1));
    }

    private onNewCareer() {
        character.prohibitedCareers.push(character.careers[character.careers.length - 1].career);
        Navigation.navigateToPage(character.getCareerPage(PageIdentity.Career1));
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
}