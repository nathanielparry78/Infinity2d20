import * as React from 'react';
import {character} from '../common/character';

interface IButtonProperties {
    onClick: () => void;
    text: string;
    className: string;
    lpCost?: number;
}

export class Button extends React.Component<IButtonProperties, {}> {
    constructor(props: IButtonProperties) {
        super(props);
    }

    render() {
        const lifePoints = this.props.lpCost
            ? this.props.lpCost === -1
                ? "+1 LP"
                : `-${this.props.lpCost} LP`
            : undefined;

        const badge = this.props.lpCost && character.lifePoints >= this.props.lpCost
            ? <div className="lp-badge">{lifePoints}</div>
            : undefined;

        const content = this.props.lpCost && character.lifePoints < this.props.lpCost
            ? (<div></div>)
            : (
                <div className={"button-title"}>
                    {this.props.text}
                </div>
              );

        const buttonClassName = character.lifePoints < this.props.lpCost
            ? "button-hidden"
            : this.props.className;

        return (
            <div className={buttonClassName} onClick={() => this.props.onClick() }>
                {content}
                {badge}
            </div>
        );
    }
}