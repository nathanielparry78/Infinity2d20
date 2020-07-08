import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {FactionSelection} from '../components/factionSelection';
import {Faction, FactionsHelper} from '../helpers/factions';
import {Career, CareersHelper} from '../helpers/careers';

export class HazardFailPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const repeat = character.careers.length > 0
            ? (<Button text="REPEAT CAREER" className="button-dark" onClick={() => { this.repeatCareer() } }/>)
            : undefined;

        const unemployed = character.careers.length < 2
            ? (<Button text="UNEMPLOYED (+1 LP)" className="button-dark" onClick={() => { this.selectCareer(Career.Unemployed, -1) } }/>)
            : (<Button text="UNEMPLOYED" className="button-dark" onClick={() => { this.selectCareer(Career.Unemployed) } }/>);

        return (
            <div className="page">
                <PageHeader text="CAREER" />
                <div className="page-text">
                    Your hazard attempt failed!
                    <br/><br/>
                    Select one of the following options to proceed:
                </div>
                <div className="button-container">
                    {repeat}
                    {unemployed}
                </div>
            </div>
        );
    }

    private repeatCareer() {
        this.selectCareer(character.careers[character.careers.length - 1].career, 0);
    }

    private selectCareer(career: Career, points?: number, isFree?: boolean) {
        if (points) {
            character.lifePoints -= points;
        }

        if (isFree) {
            character.freeCareers.splice(character.freeCareers.indexOf(career), 1);
        }

        const age = Math.floor(Math.random() * 6) + 1;
        character.age += age;
        character.careers.push(new CharacterCareer(career, age));

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerDetails1));
    }
}