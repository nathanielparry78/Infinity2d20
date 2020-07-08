import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Faction, FactionsHelper } from '../helpers/factions';
import { EventModel } from '../common/eventModel';
import { PageIdentity } from '../pages/pageFactory';
import { ElectiveSkillImprovement } from '../components/electiveSkillImprovement';
import { Skill } from '../helpers/skills';
import { DiceRoller } from '../helpers/diceRoller';
import { SocialClassesHelper } from '../helpers/socialClasses';

export class SocialReductionOrDebtEvent extends React.Component<{}, {}> {
    private debt = DiceRoller.rollSpecial(6, 6).hits;

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        You find yourself caught up in a controversy. A Tunguskan lawyer can help, but it won’t be cheap.
                        Either reduce Social Status by one step, or gain {this.debt} Asset debt, as expensive legal trickery saves you.
                    </div>
                    <Button text="REDUCE" className="button-dark" onClick={() => this.onReduce()} />
                    <br />
                    <Button text="DEBT" className="button-dark" onClick={() => this.onDebt()} />
                </div>
            </div>
        );
    }

    private onDebt() {
        character.careerEvents[character.careerEvents.length - 1].effect += ` You have a ${this.debt} Asset debt.`;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onReduce() {
        SocialClassesHelper.reduceSocialClass();
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}