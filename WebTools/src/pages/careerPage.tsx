import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {CareerSelection} from '../components/careerSelection';
import {FactionSelection} from '../components/factionSelection';
import {HazardAttempt} from '../components/hazardAttempt';
import {Career, CareersHelper} from '../helpers/careers';
import {Faction, FactionsHelper} from '../helpers/factions';
import {Skill, SkillsHelper} from '../helpers/skills';
import {DiceRoller} from '../helpers/diceRoller';
import {SocialClass} from '../helpers/socialClasses';
import { Source } from '../helpers/sources';
import { HeritageTraits } from '../helpers/birthPlaces';

interface ICareerPageProps {
    showGeneralSelection: boolean;
    showHazardSelection: boolean;
    showFactionSelection: boolean;
    showHazardAttempt: boolean;
    showFreeCareers: boolean;
}

export class CareerPage extends React.Component<IPageProperties, ICareerPageProps> {
    private _hazardCareer: Career;
    private _anyFactionCareer: boolean;

    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        };

        if (character.isAlMustaslaha()) {
            character.socialClass = SocialClass.Middle;
        }

        if (character.firstCareer !== undefined) {
            this.selectCareer(character.firstCareer, 0, true);
            Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerDetails1));
        }

        character.canExtendCareer = true;
    }

    render() {
        if (character.firstCareer !== undefined) {
            return (<div className="page"></div>);
        }

        const numCareers = character.careers.length;

        let rollBasic: JSX.Element = undefined;
        let selectBasic: JSX.Element = undefined;
        let rollFaction: JSX.Element = undefined;
        let hazard: JSX.Element = undefined;

        if (numCareers < 2) {
            rollBasic = !character.isOptional
                ? (<Button text="ROLL BASIC CAREER" className="button-dark" onClick={() => { this.rollGeneralCareer() } }/>)
                : undefined;

            selectBasic = (<Button text="SELECT BASIC CAREER" lpCost={1} className="button-dark" onClick={() => { this.showGeneralCareers() } }/>);

            const factionRollCost = character.freeFactionCareerRoll > 0 ? 0 : 1;
            rollFaction = (<Button text="ROLL FACTION CAREER" lpCost={factionRollCost} className="button-dark" onClick={() => { this.rollFactionCareer() } }/>);

            hazard = (<Button text="HAZARD CAREER" className="button-dark" onClick={() => { this.showHazardCareers() } }/>);
        }
        else {
            rollBasic = !character.isOptional && character.lifePoints >= 1
                ? (<Button text="ROLL BASIC CAREER" lpCost={1} className="button-dark" onClick={() => { this.rollGeneralCareer() } }/>)
                : undefined;

            selectBasic = (<Button text="SELECT BASIC CAREER" lpCost={2} className="button-dark" onClick={() => { this.showGeneralCareers() } }/>);

            const factionRollCost = character.freeFactionCareerRoll > 0 ? 1 : 2;
            rollFaction = (<Button text="ROLL FACTION CAREER" lpCost={factionRollCost} className="button-dark" onClick={() => { this.rollFactionCareer() } }/>);

            hazard = (<Button text="HAZARD CAREER" lpCost={1} className="button-dark" onClick={() => { this.showHazardCareers() } }/>);
        }

        if (character.isDogBlooded()) {
            rollBasic = undefined;
            selectBasic = undefined;
            rollFaction = numCareers < 2
                ? (<Button text="ROLL CAREER" lpCost={0} className="button-dark" onClick={() => { this.rollFactionCareer() } }/>)
                : (<Button text="ROLL CAREER" lpCost={0} className="button-dark" onClick={() => { this.rollFactionCareer() } }/>);
        }

        const changeFaction = (<Button text="CHANGE FACTION" lpCost={1} className="button-dark" onClick={() => { this.showFactions() } }/>);

        const unemployed = !character.isDogBlooded()
            ? character.careers.length < 2
                ? (<Button text="UNEMPLOYED (+1 LP)" className="button-dark" lpCost={-1} onClick={() => { this.selectCareer(Career.Unemployed, -1) } }/>)
                : (<Button text="UNEMPLOYED" className="button-dark" onClick={() => { this.selectCareer(Career.Unemployed) } }/>)
            : character.careers.length < 2
                ? (<Button text="SCAVENGER (+1 LP)" className="button-dark" lpCost={-1} onClick={() => { this.selectCareer(Career.Scavenger, -1) } }/>)
                : (<Button text="SCAVENGER" className="button-dark" onClick={() => { this.selectCareer(Career.Scavenger) } }/>)

        const free = character.freeCareers.length > 0
            ? <Button text={`FREE CAREERS (${character.freeCareers.length})`} className="button-dark" onClick={() => { this.showFreeCareers() } }/>
            : undefined;

        const continueCareer = character.careers.length >= 1 && this.canContinueCareer()
            ? character.careers.length >= 2
                ? <Button text="CONTINUE PREVIOUS" lpCost={1} className="button-dark" onClick={() => this.continueCareer()}/>
                : <Button text="CONTINUE PREVIOUS" className="button-dark" onClick={() => this.continueCareer()}/>
            : undefined;

        const finish = character.careers.length >= 2
            ? character.hasGeist()
                ? <Button text="FINISH" className="button-dark" onClick={() => Navigation.navigateToPage(PageIdentity.Geist) }/>
                : <Button text="FINISH" className="button-dark" onClick={() => Navigation.navigateToPage(PageIdentity.Finish) }/>
            : undefined;

        const rollAnyDesc = this.state.showFactionSelection || this._anyFactionCareer
            ? " You may select a faction to roll on that faction's career table. There is a slight chance that you also defect to the selected faction."
            : undefined;

        const content = !this.state.showGeneralSelection && !this.state.showHazardSelection &&
                        !this.state.showFactionSelection && !this.state.showHazardAttempt &&
                        !this.state.showFreeCareers ?
            (
                <div>
                    <div className="page-text">
                        What career (or careers) do you decide to pursue? Are you doing something that you love? Are you trapped in a job that you hate?
                        What are you good at and what are you learning out among the planets? Are you aggressively seeking promotions or happy where you are?
                        You will complete a minimum of two career phases, and you can spend a Life Point for each additional career phase to a maximum of four career phases.
                    </div>
                    <div className="button-container">
                        {free}
                        {continueCareer}
                        {finish}
                        {rollBasic}
                        {selectBasic}
                        {rollFaction}
                        {hazard}
                        {unemployed}
                        {changeFaction}
                    </div>
                </div>
            )
            : this.state.showHazardSelection ?
                (
                    <CareerSelection
                        careers={CareersHelper.getHazardableCareers() }
                        isHazard={true}
                        onSelection={(career, isHazard) => { this.selectHazardCareer(career) } }
                        onCancel={() => { this.hideHazardCareers() } } />
                )
                : this.state.showFactionSelection ?
                    (
                        <div>
                            <div className="page-text">
                                {rollAnyDesc}
                            </div>
                            <FactionSelection
                                showOwnFaction={true}
                                showSkills={false}
                                showCancel={!this._anyFactionCareer}
                                onSelection={(faction) => { this.selectFaction(faction) } }
                                onCancel={() => { this.hideFactions() } }/>
                        </div>
                    )
                    : this.state.showFreeCareers ?
                        (
                            <CareerSelection
                                careers={character.freeCareers}
                                onSelection={(career) => { this.selectCareer(career, character.careers.length < 2 ? 0 : 1, true) } }
                                onCancel={() => { this.hideGeneralCareers() } } />
                        )
                        : this.state.showHazardAttempt ?
                            (
                                <HazardAttempt
                                    career={this._hazardCareer}
                                    onConfirm={(career, skill, diff) => this.onHazardAttempt(career, skill, diff) }
                                    onCancel={() => this.onCancelHazardAttempt() }/>
                            )
                            : (
                            <CareerSelection
                                careers={CareersHelper.getBasicCareers() }
                                onSelection={(career) => { this.selectCareer(career, character.careers.length < 2 ? 1 : 2, false) } }
                                onCancel={() => { this.hideGeneralCareers() } } />
                            );
        return (
            <div className="page">
                <PageHeader text="CAREER" />
                {content}
            </div>
        );
    }

    private rollGeneralCareer() {
        var career = CareersHelper.generateBasicCareer();

        if (career !== Career.Any) {
            if (character.careerRerolls > 0) {
                Dialog.showYesNo(`You rolled ${CareersHelper.getCareer(career).name}. Do you want to keep it?`,
                    () => {
                        this.selectCareer(career, character.careers.length < 2 ? 0 : 1);
                    },
                    () => {
                        character.careerRerolls--;
                        this.rollGeneralCareer();
                    });
            }
            else {
                this.selectCareer(career, character.careers.length < 2 ? 0 : 1);
            }
        }
        else {
            this.handleAnyCareer();
        }
    }

    private rollFactionCareer(faction?: Faction) {
        var career = CareersHelper.generateFactionCareer(faction ? faction : character.faction);

        var cost = character.careers.length < 2 ? 1 : 2;

        if (character.freeFactionCareerRoll > 0) {
            cost = Math.max(0, cost - 1);
            character.freeFactionCareerRoll = Math.max(0, character.freeFactionCareerRoll - 1);
        }

        if (this._anyFactionCareer) {
            cost = 0;
        }

        character.lifePoints -= cost;

        if (career !== Career.Any) {
            this.selectCareer(career);
        }
        else {
            this.handleAnyCareer();
        }
    }

    private handleAnyCareer() {
        this._anyFactionCareer = true;

        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: true,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private showGeneralCareers() {
        this.setState({
            showGeneralSelection: true,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private hideGeneralCareers() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private showHazardCareers() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: true,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private hideHazardCareers() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private showFactions() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: true,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private hideFactions() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private showFreeCareers() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: true
        });
    }

    private selectFaction(faction: Faction) {
        if (!this._anyFactionCareer) {
            character.heritage = character.faction;
            character.hasDefected = true;
            character.faction = faction;
            character.lifePoints--;

            if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                character.heritageTrait = HeritageTraits.Lub;
            }

            Dialog.show(`You have defected to ${FactionsHelper.getFaction(faction).name}!`);

            this.hideFactions();
        }
        else {
            var roll = Math.floor(Math.random() * 20) + 1;
            if (roll === 1 && faction !== character.faction) {
                character.heritage = character.faction;
                character.hasDefected = true;
                character.faction = faction;

                if (character.faction === Faction.Nomads && character.hasSource(Source.Nomads)) {
                    character.heritageTrait = HeritageTraits.Lub;
                }

                Dialog.show(`You have defected to ${FactionsHelper.getFaction(faction).name}!`);
            }

            this.rollFactionCareer(faction);
        }
    }

    private selectHazardCareer(career: Career) {
        this._hazardCareer = career;
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: false,
            showFactionSelection: false,
            showHazardAttempt: true,
            showFreeCareers: false
        });
    }

    private onCancelHazardAttempt() {
        this.setState({
            showGeneralSelection: false,
            showHazardSelection: true,
            showFactionSelection: false,
            showHazardAttempt: false,
            showFreeCareers: false
        });
    }

    private onHazardAttempt(career: Career, skill: Skill, difficulty: number) {
        const targetValue = character.skills[skill].expertise + character.attributes[SkillsHelper.getAttributeForSkill(skill)].value;
        const roll = DiceRoller.roll(targetValue, character.skills[skill].focus, difficulty);

        if (character.careers.length >= 2) {
            character.lifePoints--;
        }

        if (difficulty === 0 || (roll.successes > 0 && !roll.hasRepercusions)) {
            character.hazardDecrease = 0;

            if (career === Career.HassassinFidayHaqqislam || career === Career.HassassinExemplar) {
                character.hassassinEvent = false;
            }

            this.selectCareer(career, 0);
        }
        else {
            character.hazardDecrease = 0;
            Navigation.navigateToPage(character.getCareerPage(PageIdentity.HazardFail1));
        }
    }

    private continueCareer() {
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

    private selectCareer(career: Career, points?: number, isFree?: boolean) {
        if (points) {
            character.lifePoints -= points;
        }

        if (isFree) {
            character.freeCareers.splice(character.freeCareers.indexOf(career), 1);
        }

        const age = Math.floor(Math.random() * 6) + 2;
        character.age += age;
        character.careers.push(new CharacterCareer(career, age));

        CareersHelper.applyCareer(career);

        if (character.hazardDecrease > 0) {
            character.hazardDecrease = 0;
            character.earnings++;
        }

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerDetails1));
    }

    private canContinueCareer() {
        const lastCareer = character.careers[character.careers.length - 1].career;
        return character.prohibitedCareers.indexOf(lastCareer) === -1;
    }
}