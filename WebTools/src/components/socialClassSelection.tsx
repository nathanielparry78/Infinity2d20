import * as React from 'react';
import {SocialClass, SocialClassesHelper} from '../helpers/socialClasses';
import {AttributesHelper} from '../helpers/attributes';
import {Button} from './button';

interface ISocialClassSelectionProperties {
    onSelection: (socialClass: SocialClass) => void;
    onCancel: () => void;
}

export class SocialClassSelection extends React.Component<ISocialClassSelectionProperties, {}> {
    constructor(props: ISocialClassSelectionProperties) {
        super(props);
    }

    render() {
        var socialClasses = SocialClassesHelper.getSocialClasses().map((soc, i) => {
            return (
                <tr key={i}>
                    <td className="selection-header">{soc.name}</td>
                    <td>{AttributesHelper.getAttributeName(soc.attribute) }</td>
                    <td>{soc.earnings}</td>
                    <td><Button className="button-small" text="Select" onClick={() => { this.props.onSelection(soc.id) } } /></td>
                </tr>
            )
        });

        return (
            <div className="panel">
                <div className="header-text">SELECT SOCIAL CLASS</div>
                <br/>
                <table className="selection-list">
                    <thead>
                        <tr>
                            <td></td>
                            <td><h3>Attribute</h3></td>
                            <td><h3>Earnings</h3></td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {socialClasses}
                    </tbody>
                </table>
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel() }/>
            </div>
        );
    }
}