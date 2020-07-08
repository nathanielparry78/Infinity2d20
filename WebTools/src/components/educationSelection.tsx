import * as React from 'react';
import {Education, EducationsHelper} from '../helpers/educations';
import {SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {Button} from './button';

interface IEducationSelectionProperties {
    onSelection: (edu: Education) => void;
    onCancel: () => void;
}

export class EducationSelection extends React.Component<IEducationSelectionProperties, {}> {
    constructor(props: IEducationSelectionProperties) {
        super(props);
    }

    render() {
        var edus = EducationsHelper.getEducations().map((edu, i) => {
            const attributes =
                (
                    <div key={i}>
                        +2 {AttributesHelper.getAttributeName(edu.plus2).substr(0, 3) }<br/>
                        +1 {AttributesHelper.getAttributeName(edu.plus1).substr(0, 3) }<br/>
                        -1 {AttributesHelper.getAttributeName(edu.minus1).substr(0, 3) }
                    </div>
                );

            const mandatory = edu.mandatory.map((m, i) => {
                return (
                    <div key={i}>
                        {SkillsHelper.getSkillName(m) }
                    </div>
                )
            });

            const elective = edu.elective.map((e, i) => {
                return (
                    <div key={i}>
                        {SkillsHelper.getSkillName(e) }
                    </div>
                )
            });

            return (
                <tr key={i}>
                    <td className="selection-header">{edu.name}</td>
                    <td>{attributes}</td>
                    <td>{mandatory}</td>
                    <td>{elective}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(edu.id) } } /></td>
                </tr>
            )
        });

        return (
            <div className="panel">
                <div className="header-text">SELECT EDUCATION</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attributes</h3></td>
                            <td><h3>Mandatory Skills</h3></td>
                            <td><h3>Elective Skills</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {edus}
                    </tbody>
                </table>
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}