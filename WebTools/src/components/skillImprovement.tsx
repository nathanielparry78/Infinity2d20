import * as React from 'react';
import {Skill, SkillsHelper} from '../helpers/skills';
import {character} from '../common/character';

interface ISkillImprovementProperties {
    skill: Skill;
    onDone?: (done: boolean) => void;
}

export class SkillImprovement extends React.Component<ISkillImprovementProperties, {}> {
    private _originalExpertise: number;
    private _originalFocus: number;
    private _points: number;

    constructor(props: ISkillImprovementProperties) {
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
        const showIncreaseExpertise = expertise === this._originalExpertise && this._points > 0 && expertise < max;
        const showDecreaseFocus = focus > this._originalFocus;
        const showIncreaseFocus = focus === this._originalFocus && focus !== expertise && this._points > 0 && focus < max;

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

        const signature = character.skills[skill].isSignature
            ? (<span className="signature">S</span>)
            : undefined;

        return (
            <div className="skill-container">
                <div className="skill-name">
                    {SkillsHelper.getSkillName(skill) }
                    {signature}
                </div>
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

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }
        //else {
            this.forceUpdate();
        //}
    }

    private onIncreaseExpertise() {
        character.skills[this.props.skill].expertise++;
        this._points--;

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }
        //else {
            this.forceUpdate();
        //}
    }

    private onDecreaseFocus() {
        character.skills[this.props.skill].focus--;
        this._points++;

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }
        //else {
            this.forceUpdate();
        //}
    }

    private onIncreaseFocus() {
        character.skills[this.props.skill].focus++;
        this._points--;

        if (this.props.onDone) {
            this.props.onDone(this._points === 0);
        }
        //else {
            this.forceUpdate();
        //}
    }
}