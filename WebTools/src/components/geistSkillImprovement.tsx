import * as React from 'react';
import {character} from '../common/character';
import {Skill, SkillsHelper} from '../helpers/skills';

interface IGeistSkillProperties {
    controller: GeistSkillImprovement;
    points: number;
    skill: Skill;
    onExpertiseIncreased: () => void;
    onExpertiseDecreased: () => void;
    onFocusIncreased: () => void;
    onFocusDecreased: () => void;
}

class GeistSkill extends React.Component<IGeistSkillProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: IGeistSkillProperties) {
        super(props);

        this._originalExpertise = character.geist.skills[this.props.skill].expertise;
        this._originalFocus = character.geist.skills[this.props.skill].focus;
        this._points = this.props.points;
    }

    componentWillUpdate() {
        if (this._points === 4) {
            this._originalExpertise = character.geist.skills[this.props.skill].expertise;
            this._originalFocus = character.geist.skills[this.props.skill].focus;
        }
    }

    render() {
        const {skill} = this.props;

        const expertise = character.geist.skills[skill].expertise;
        const focus = character.geist.skills[skill].focus;
        const showDecreaseExpertise = expertise > this._originalExpertise;
        const showIncreaseExpertise = this.props.controller.points > 0 && expertise < 3;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus !== expertise && this.props.controller.points > 0 && focus < 3;

        const decExp = showDecreaseExpertise
            ? (<img style={{ float: "right", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseExpertise() } }/>)
            : undefined;

        const incExp = showIncreaseExpertise
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseExpertise() } }/>)
            : undefined;

        const decFoc = showDecreaseFocus
            ? (<img style={{ float: "right", marginRight: "20px" }} height="20" src="res/img/dec.png" onClick={ () => { this.onDecreaseFocus() } }/>)
            : undefined;

        const incFoc = showIncreaseFocus
            ? (<img style={{ float: "right" }} height="20" src="res/img/inc.png" onClick={ () => { this.onIncreaseFocus() } }/>)
            : undefined;

        return (
            <div className="skill-container">
                <div className="skill-name">{SkillsHelper.getSkillName(skill) }</div>
                <div className="skill-expertise">
                    Expertise: {expertise} {incExp} {decExp}
                </div>
                <div className="skill-focus">
                    Focus: {focus} {incFoc} {decFoc}
                </div>
            </div>
        );
    }

    private onDecreaseExpertise() {
        character.geist.skills[this.props.skill].expertise--;
        this._points++;
        this.props.onExpertiseDecreased();
    }

    private onIncreaseExpertise() {
        character.geist.skills[this.props.skill].expertise++;
        this._points--;
        this.props.onExpertiseIncreased();
    }

    private onDecreaseFocus() {
        character.geist.skills[this.props.skill].focus--;
        this._points++;
        this.props.onFocusDecreased();
    }

    private onIncreaseFocus() {
        character.geist.skills[this.props.skill].focus++;
        this._points--;
        this.props.onFocusIncreased();
    }
}

interface IGeistImprovementProperties {
    skills: Skill[];
    points: number;
    onDone?: (done: boolean) => void;
}

export class GeistSkillImprovement extends React.Component<IGeistImprovementProperties, {}> {
    private _points: number;

    constructor(props: IGeistImprovementProperties) {
        super(props);
        this._points = props.points;
    }

    render() {
        const skills = this.props.skills.map((s, i) => {
            return (
                <div key={i}>
                    <GeistSkill
                        skill={s}
                        points={this.props.points}
                        controller={this}
                        onExpertiseDecreased={() => this.update(false) }
                        onExpertiseIncreased={() => this.update(true) }
                        onFocusDecreased={() => this.update(false) }
                        onFocusIncreased={() => this.update(true) }/>
                </div>
            )
        });

        return (
            <div>{skills}</div>
        );
    }

    get points() {
        return this._points;
    }

    private update(decreasePoint: boolean) {
        this._points += decreasePoint ? -1 : 1;

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }

        this.forceUpdate();
    }
}