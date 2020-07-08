import * as React from 'react';
import {character} from '../common/character';
import {TribesHelper} from '../helpers/tribes';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {Button} from './button';
import {AttributeView} from './attribute';

interface ITribeSelectionProperties {
    onSelection: (id: number) => void;
    onCancel: () => void;
}

export class TribeSelection extends React.Component<ITribeSelectionProperties, {}> {
    constructor(props: ITribeSelectionProperties) {
        super(props);
    }

    render() {
        var tribes = TribesHelper.getTribes().map((tribe, i) => {
            const attributes = tribe.attributes.map((attr, i) => {
                return (<div key={i}>{AttributesHelper.getAttributeName(attr) } +1</div>)
            });

            return (
                <tr key={i}>
                    <td>{tribe.name}</td>
                    <td>{attributes}</td>
                    <td>{SkillsHelper.getSkillName(tribe.skill) }</td>
                    <td><Button text="Select" className="button-small" onClick={() => { this.props.onSelection(tribe.id) } }/></td>
                </tr>
            )
        });

        return (
            <div className="panel">
                <div className="header-text">SELECT ANTIPODEAN TRIBE</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attributes</h3></td>
                            <td><h3>Skill</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {tribes}
                    </tbody>
                </table>
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}