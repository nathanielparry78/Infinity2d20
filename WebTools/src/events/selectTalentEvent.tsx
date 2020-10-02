import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {TalentsHelper, TalentModel} from '../helpers/talents';
import {Button} from '../components/button';
import {DropDownInput} from '../components/dropDownInput';
import {Skill, SkillsHelper} from '../helpers/skills';
import {PageIdentity} from '../pages/pageFactory';

interface ISelectTalentEventProperties {
    skill?: Skill;
}

export class SelectTalentEvent extends React.Component<ISelectTalentEventProperties, {}> {
    private _talents: string[] = [];
    private _descs: string[] = [];
    private _talent: string;
    private _desc: string;

    constructor(props: ISelectTalentEventProperties) {
        super(props);

        this._talents = [];
        this._descs = [];

        if (!this.props.skill) {
            const talents = TalentsHelper.getTalents();
            for (var tal in talents) {
                for (var i = 0; i < talents[tal].length; i++) {
                    var t = talents[tal][i];
                    if (!character.hasTalent(t.name)) {
                        this._talents.push(t.name);
                        this._descs.push(t.description);
                    }
                }
            }
        }
        else {
            const talents = TalentsHelper.getTalentsForSkills([this.props.skill]);
            if (!character.hasTalent(talents[0].name)) {
                this._talents.push(talents[0].name);
                this._descs.push(talents[0].description);
            }
            else {
                talents.forEach(t => {
                    if (!character.hasTalent(t.name)) {
                        this._talents.push(t.name);
                        this._descs.push(t.description);
                    }
                });
            }
        }

        this._talent = this._talents[0];
        this._desc = this._descs[0];
    }

    render() {
        const skill = this.props.skill
            ? <div>
                You may select an additional <b>{SkillsHelper.getSkillName(this.props.skill) }</b> talent.
              </div>
            : <div>
                You may select an additional talent.
              </div>;

        if (this._talents.length > 0) {
            return (
                <div>
                    <div className="panel">
                        {skill}
                        <DropDownInput
                            items={this._talents}
                            defaultValue={this._talent}
                            onChange={(index) => { this.selectTalent(index) } } />
                        <div>{this._desc}</div>
                    </div>
                    <Button text="DONE" className="button-next" onClick={() => this.next() }/>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="panel">
                        You are not eligible for any additional talent.
                    </div>
                    <Button text="OK" className="button-next" onClick={() => this.next() }/>
                </div>
            );
        }
    }

    private selectTalent(index: number) {
        this._talent = this._talents[index];
        this._desc = this._descs[index];
        this.forceUpdate();
    }

    private next() {
        if (this._talent) {
            character.addTalent(this._talent);
        }

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }
}