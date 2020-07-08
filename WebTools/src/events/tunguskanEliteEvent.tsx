import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { Faction, FactionsHelper } from '../helpers/factions';
import { EventModel } from '../common/eventModel';
import { PageIdentity } from '../pages/pageFactory';
import { ElectiveSkillImprovement } from '../components/electiveSkillImprovement';
import { Skill } from '../helpers/skills';
import { SocialClassesHelper } from '../helpers/socialClasses';

interface IJailOrDebtState {
    showSkillIncrease: boolean;
}

export class TunguskanEliteEvent extends React.Component<{}, IJailOrDebtState> {
    private years = Math.floor(Math.random() * 6) + 1;

    constructor(props: {}) {
        super(props);

        this.state = {
            showSkillIncrease: false
        };
    }

    render() {
        if (!this.state.showSkillIncrease) {
            return (
                <div>
                    <div className="panel">
                        <div>
                            You come across a Tunguskan Elite in some serious hot water. 
                            They lean on you to help them out, while Bureau Aegis tries to warn you away. 
                            Either course will have benefits and consequences. What do you do?
                            <br />
                            <b>Help</b> them to gain a Criminal Record and spend ${this.years} in jail, but gain 10 Assets.
                            <br />
                            <b>Decline</b> to help to reduce Social Status by 1 and gain 1 rank in Discipline.
                        </div>
                        <Button text="HELP" className="button-dark" onClick={() => this.onHelp()} />
                        <br />
                        <Button text="DECLINE" className="button-dark" onClick={() => this.onDecline()} />
                    </div>
                </div>
            );
        }
        else {
            <div>
                <div className="panel">
                    <div className="panel">
                        <ElectiveSkillImprovement skills={[Skill.Discipline]} points={1} />
                    </div>
                    <Button text="DONE" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.AfterEvent)} />
                </div>
            </div>
        }
    }

    private onHelp() {
        character.age += this.years;
        character.hasCriminalRecord = true;
        character.assets += 10;

        character.careerEvents[character.careerEvents.length - 1].effect += ` You helped them and spent ${this.years} years in jail.`;
        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onDecline() {
        SocialClassesHelper.reduceSocialClass();
        character.careerEvents[character.careerEvents.length - 1].effect += ` You declined to help.`;

        this.setState({ showSkillIncrease: true });
    }
}