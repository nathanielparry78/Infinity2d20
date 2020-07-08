import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface IElectiveSkillProperties {
    controller: ElectiveSkillImprovement;
    skill: Skill;
    onExpertiseIncreased: () => void;
    onExpertiseDecreased: () => void;
    onFocusIncreased: () => void;
    onFocusDecreased: () => void;
    hideModifiers?: boolean;
}

class ElectiveSkill extends React.Component<IElectiveSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: IElectiveSkillProperties) {
        super(props);

        this._originalExpertise = character.skills[this.props.skill].expertise;
        this._originalFocus = character.skills[this.props.skill].focus;
        this._points = 1;
    }

    componentWillUpdate() {
        if (this._points === 1) {
            this._originalExpertise = character.skills[this.props.skill].expertise;
            this._originalFocus = character.skills[this.props.skill].focus;
        }
    }

    render() {
        const {skill} = this.props;

        const max = character.skills[skill].isSignature ? 5 : 3;

        const expertise = character.skills[skill].expertise;
        const focus = character.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise;
        const showIncreaseExpertise = expertise === this._originalExpertise &&
                                      focus === this._originalFocus && 
                                      this.props.controller.points > 0 && 
                                      !this.props.hideModifiers &&
                                      expertise < max;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus === this._originalFocus &&
                                  focus !== expertise && 
                                  expertise === this._originalExpertise && 
                                  this.props.controller.points > 0 && 
                                  !this.props.hideModifiers &&
                                  focus < max;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseExpertise() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseExpertise() } }/>)
            : undefined;

        const decFoc = showDecreaseFocus
            ? (<img style={{ float: "right" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseFocus() } }/>)
            : undefined;

        const incFoc = showIncreaseFocus
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseFocus() } }/>)
            : undefined; 

        return (
            <div className="skill-container">
                <div className="skill-name">{SkillsHelper.getSkillName(skill) }</div>
                <div className="skill-expertise">
                    Expertise: {expertise} {decExp} {incExp}
                </div>
                <div className="skill-focus">
                    Focus: {focus} {decFoc} {incFoc}
                </div>
            </div>
        );
    }

    private onDecreaseExpertise() {
        character.skills[this.props.skill].expertise--;
        this._points++;
        this.addToExcludedSkills();
        this.props.onExpertiseDecreased();
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        this._points--;
        this.removeFromExcludedSkills();
        this.props.onExpertiseIncreased();
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        this._points++;
        this.addToExcludedSkills();
        this.props.onFocusDecreased();
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        this._points--;
        this.removeFromExcludedSkills();
        this.props.onFocusIncreased();
    }

    private addToExcludedSkills() {
        const n = character.excludedElectiveSkills.indexOf(this.props.skill);
        if (n === -1) {
            character.excludedElectiveSkills.push(this.props.skill);
        }
    }

    private removeFromExcludedSkills() {
        const n = character.excludedElectiveSkills.indexOf(this.props.skill);
        if (n > -1) {
            character.excludedElectiveSkills.splice(n, 1);
        }
    }
}

interface IElectiveImprovementProperties {
    skills: Skill[];
    points: number;
    onDone?: (done: boolean) => void;
}

interface IElectiveImprovementState {
    showSkills: boolean;
}

export class ElectiveSkillImprovement extends React.Component<IElectiveImprovementProperties, IElectiveImprovementState> {
    private _points: number;
    private _otherSkills: Skill[];

    constructor(props: IElectiveImprovementProperties) {
        super(props);

        this._points = props.points;

        character.excludedElectiveSkills = [];
        character.excludedElectiveSkills.push(...this.props.skills);

        this._otherSkills = SkillsHelper.getSkills().filter(s => {
            return this.props.skills.indexOf(s) === -1;
        });

        this.state = {
            showSkills: false
        };
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            return (
                <div key={i}>
                    <ElectiveSkill
                        skill={s}
                        controller={this}
                        onExpertiseDecreased={() => this.update(false)}
                        onExpertiseIncreased={() => this.update(true)}
                        onFocusDecreased={() => this.update(false)}
                        onFocusIncreased={() => this.update(true)}/>
                </div>
            )
        });

        const otherSkills = this.state.showSkills
            ? this._otherSkills.map((s, i) => {
                return (
                    <div key={i}>
                        <ElectiveSkill
                            skill={s}
                            hideModifiers={character.lifePoints === 0}
                            controller={this}
                            onExpertiseDecreased={() => this.update(false, false) }
                            onExpertiseIncreased={() => this.update(true, true) }
                            onFocusDecreased={() => this.update(false, false) }
                            onFocusIncreased={() => this.update(true, true) }/>
                    </div>
                )
              })
            : undefined;

        const toggle = this.state.showSkills
            ? <img style={{ transform: "translate(5px, 5px)" }} height="20" src="res/img/up.png" onClick={ () => { this.setState({ showSkills: false }); } }/>
            : <img style={{ transform: "translate(5px, 5px)" }} height="20" src="res/img/down.png" onClick={ () => { this.setState({ showSkills: true }); } }/>;

        const other = this._otherSkills.length > 0
            ? (
                <div style={{ backgroundColor: "#0a334c" }}>
                    <b>Other elective skills</b> (costs 1 Life Point to increase)
                    {toggle}
                    <br/>
                    {otherSkills}
                </div>
            )
            : undefined;

        return (
            <div>
                {skills}
                {other}
            </div>
        );
    }

    get points() {
        return this._points;
    }

    private update(decreasePoint: boolean, decreaseLifePoints?: boolean) {
        this._points += decreasePoint ? -1 : 1;

        if (decreaseLifePoints === true) {
            character.lifePoints--;
        }
        else if (decreaseLifePoints === false) {
            character.lifePoints++;
        }

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }

        this.forceUpdate();
    }
}