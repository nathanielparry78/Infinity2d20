import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {Career, CareersHelper} from '../helpers/careers';
import {Skill, SkillsHelper} from '../helpers/skills';
import {DiceRoller} from  '../helpers/diceRoller';
import {PageIdentity} from '../pages/pageFactory';

interface IHazardTestOrFiredProperties {
}

export class HazardTestOrFiredEvent extends React.Component<IHazardTestOrFiredProperties, {}> {
    constructor(props: IHazardTestOrFiredProperties) {
        super(props);
    }

    render() {
        const career = CareersHelper.getCareer(character.careers[character.careers.length - 1].career);

        const skills = career.mandatory.map((skill, i) => {
            return (
                <div className="skill-container" key={i}>
                    <Button text="Select" className="button-small align-right" onClick={() => { this.onConfirm(skill, 1) } } />
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
                        You must pass an Average (D1) hazard test for your current career or you are Fired.
                    </div>
                    {skills}
                </div>
            </div>
        );
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