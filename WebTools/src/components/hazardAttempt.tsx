import * as React from 'react';
import {character} from '../common/character';
import {Career, CareersHelper} from '../helpers/careers';
import {SkillsHelper, Skill} from '../helpers/skills';
import {Button} from '../components/button';

interface IHazardAttemptProperties {
    career: Career;
    onConfirm: (career: Career, skill: Skill, difficulty: number) => void;
    onCancel: () => void;
}

export class HazardAttempt extends React.Component<IHazardAttemptProperties, {}> {
    private _difficulty: number;
    private _maxDifficulty: number;
    private _lifePointsSpent: number;

    constructor(props: IHazardAttemptProperties) {
        super(props);

        const career = CareersHelper.getCareer(this.props.career);

        this._maxDifficulty = this._difficulty = CareersHelper.getHazardDifficulty(this.props.career) - character.hazardDecrease;

        if ((career.name.indexOf("Hassassin") > -1 && character.hassassinEvent === false) ||
            (career.isCriminal && character.hasCriminalRecord)) {
            this._maxDifficulty--;
            this._difficulty--;
        }

        if (this._difficulty < 0) {
            this._difficulty = 0;
        }

        if (this._maxDifficulty < 0) {
            this._maxDifficulty = 0;
        }

        this._lifePointsSpent = 0;
    }

    render() {
        const career = CareersHelper.getCareer(this.props.career);

        const dec = this._difficulty > 0 && character.lifePoints >= 1
            ? (<img style={{ float: "left" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecrease() } }/>)
            : undefined;

        const inc = this._difficulty < this._maxDifficulty
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncrease() } }/>)
            : undefined;

        const skills = career.mandatory.map((skill, i) => {
            return (
                <div className="skill-container" key={i}>
                    <Button text="Select" className="button-small align-right" onClick={() => { this.props.onConfirm(this.props.career, skill, this._difficulty) } } />
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
                <div className="header-text">HAZARD ATTEMPT</div>
                <div className="panel">
                    <div>
                        You are attempting to hazard your way into the <b>{career.name}</b> career.
                        The difficulty to succeed with your hazard attempt is <b>{this._difficulty}</b>.
                        <br/><br/>
                        You can spend Life Points to lower the difficulty. If you cancel, any spent Life Points
                        will be refunded.
                    </div>
                    <div>
                        <div className="attribute-container">Difficulty</div>
                        <div className="attribute-value">
                            {dec}
                            {this._difficulty}
                            {inc}
                        </div>
                    </div>
                    <br/>
                    <div>
                        Select a skill to use in your attempt.
                    </div>
                    {skills}
                </div>
                <Button text="Cancel" className="button button-cancel" onClick={() => this.onCancel() }/>
            </div>
        );
    }

    private onDecrease() {
        this._difficulty--;
        character.lifePoints--;
        this._lifePointsSpent++;
        this.forceUpdate();
    }

    private onIncrease() {
        this._difficulty++;
        character.lifePoints++;
        this._lifePointsSpent--;
        this.forceUpdate();
    }

    private onCancel() {
        character.lifePoints += this._lifePointsSpent;
        this.props.onCancel();
    }
}