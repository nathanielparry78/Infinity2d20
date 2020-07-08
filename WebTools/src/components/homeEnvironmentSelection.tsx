import * as React from 'react';
import {HomeEnvironment, HomeEnvironmentsHelper} from '../helpers/homeEnvironments';
import {AttributesHelper} from '../helpers/attributes';
import {SkillsHelper} from '../helpers/skills';
import {Button} from './button';

interface IHomeEnvironmentSelectionProperties {
    onSelection: (env: HomeEnvironment) => void;
    onCancel: () => void;
}

export class HomeEnvironmentSelection extends React.Component<IHomeEnvironmentSelectionProperties, {}> {
    constructor(props: IHomeEnvironmentSelectionProperties) {
        super(props);
    }

    render() {
        var envs = HomeEnvironmentsHelper.getHomeEnvironments().map((env, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{env.name}</td>
                    <td>{AttributesHelper.getAttributeName(env.attribute) }</td>
                    <td>{SkillsHelper.getSkillName(env.skill) }</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(env.id) } } /></td>
                </tr>
            )
        });

        return (
            <div className="panel">
                <div className="header-text">SELECT HOME ENVIRONMENT</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attribute</h3></td>
                            <td><h3>Skill</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {envs}
                    </tbody>
                </table>
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}