import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { Button } from '../components/button';
import { PageIdentity } from '../pages/pageFactory';
import { ElectiveSkillImprovement } from '../components/electiveSkillImprovement';
import { Skill } from '../helpers/skills';
import { Career } from '../helpers/careers';

export class JailOrJaguarEvent extends React.Component<{}, {}> {
    private years = Math.floor(Math.random() * 6) + 1;

    constructor(props: {}) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="panel">
                    <div>
                        You fell in with a rough crowd, running with the maras gangs of Corregidor.
                        Caught red-handed, you were offered a choice: prison or something exponentially tougher.
                        <br />
                        <b>Jail</b> to go to prison for {this.years} years.
                        <br />
                        <b>Jaguar</b> to spend your first career as a Jaguar.
                    </div>
                    <Button text="JAIL" className="button-dark" onClick={() => this.onJail()} />
                    <br />
                    <Button text="JAGUAR" className="button-dark" onClick={() => this.onJaguar()} />
                </div>
            </div>
        );
    }

    private onJail() {
        const years = Math.floor(Math.random() * 6) + 1;
        character.age += years;
        character.careerEvents[character.careerEvents.length - 1].effect += ` You spent ${years} years in jail.`;

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onJaguar() {
        character.firstCareer = Career.Jaguar;
        character.careerEvents[character.careerEvents.length - 1].effect += ` You spent your first career as a Jaguar.`;

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}