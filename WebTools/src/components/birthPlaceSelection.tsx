import * as React from 'react';
import {character} from '../common/character';
import {BirthPlacesHelper} from '../helpers/birthPlaces';
import {Attribute, AttributesHelper} from '../helpers/attributes';
import {Skill, SkillsHelper} from '../helpers/skills';
import {Button} from './button';
import {AttributeView} from './attribute';

interface IBirthPlaceSelectionProperties {
    onSelection: (id: number) => void;
    onCancel: () => void;
}

export class BirthPlaceSelection extends React.Component<IBirthPlaceSelectionProperties, {}> {
    constructor(props: IBirthPlaceSelectionProperties) {
        super(props);
    }

    render() {
        var birthPlaces = BirthPlacesHelper.getBirthPlaces(character.heritage).map((home, i) => {
            const attributes = home.attributes.map((attr, i) => {
                return (<div key={i}>{AttributesHelper.getAttributeName(attr) } +1</div>)
            });

            return (
                <tr key={i}>
                    <td>{home.name}</td>
                    <td>{attributes}</td>
                    <td>{SkillsHelper.getSkillName(home.skill) }</td>
                    <td><Button text="Select" className="button-small" onClick={() => { this.props.onSelection(home.roll) } }/></td>
                </tr>
                )
        });

        return (
            <div className="panel">
                <div className="header-text">SELECT BIRTH PLACE</div>
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
                        {birthPlaces}
                    </tbody>
                </table>
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}