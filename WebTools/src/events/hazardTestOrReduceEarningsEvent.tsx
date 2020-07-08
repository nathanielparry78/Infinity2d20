import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {Career, CareersHelper} from '../helpers/careers';
import {Skill, SkillsHelper} from '../helpers/skills';
import {DiceRoller} from  '../helpers/diceRoller';
import {PageIdentity} from '../pages/pageFactory';

interface IHazardTestOrReduceEarningsProperties {
}

export class HazardTestOrReduceEarningsEvent extends React.Component<IHazardTestOrReduceEarningsProperties, {}> {
    constructor(props: IHazardTestOrReduceEarningsProperties) {
        super(props);
    }

    render() {
        const career = CareersHelper.getCareer(character.careers[character.careers.length - 1].career);

        const skills = career.mandatory.map((skill, i) => {
            return (
                <div className="skill-container" key={i}>
                    <Button text="Select" className="button-small align-right" onClick={() => { this.onConfirm(skill, 2) } } />
                    <div className="skill-name">
                        {SkillsHelper.getSkillName(skill) }
                    </div>
                    <div className="skill-expertise">
                        Expertise&nbsp;
                        {character.skills[skill].expertise}
                    </div>
                    <div className="skill-focus">
                        Focus&nbsp;
                        {character.skills[skill].focus}
                    </div>
                </div>
            )
        });

        return (
            <div>
                <div className="panel">
                    <div>
                        Your employer hits a slump and is struggling to make ends meet. 
                        You can either agree to a pay cut (reduce your Earnings Rating by 1) or you can
                        choose to make a Challenging (D2) hazard test for your current career.
                        If you fail the test, you are Fired. But if you succeed, your Earnings Rating is
                        unchanged as you swap to a new employer.
                    </div>
                    <Button text="CUT PAY" className="button-dark" onClick={() => this.onCutPay() }/>
                    <br/>
                    {skills}
                </div>
            </div>
        );
    }

    private onCutPay() {
        character.earnings = Math.max(character.earnings - 1, 0);
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onConfirm(skill: Skill, difficulty: number) {
        const targetValue = character.skills[skill].expertise + character.attributes[SkillsHelper.getAttributeForSkill(skill)].value;
        const roll = DiceRoller.roll(targetValue, character.skills[skill].focus, difficulty);
        if (roll.successes > 0 && !roll.hasRepercusions) {
            Dialog.show("Your hazard test succeeded.", () => {
                Navigation.navigateToPage(PageIdentity.AfterEvent);
            });
        }
        else {
            Navigation.navigateToPage(PageIdentity.Fired);
        }
    }
}