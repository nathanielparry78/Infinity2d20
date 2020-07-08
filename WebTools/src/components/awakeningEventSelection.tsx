import * as React from 'react';
import { Button } from './button';
import { AwakeningEventsHelper } from '../helpers/awakeningEvents';
import { YouthEventModel } from '../helpers/youthEvents';
import { SkillsHelper } from '../helpers/skills';

interface IYouthEventSelectionProperties {
    onSelection: (ev: YouthEventModel) => void;
    onCancel: () => void;
}

export class AwakeningEventSelection extends React.Component<IYouthEventSelectionProperties, {}> {
    constructor(props: IYouthEventSelectionProperties) {
        super(props);
    }

    render() {
        var eventElements: JSX.Element[] = [];

        [1, 5, 9, 13, 17, 20].forEach(n => {
            var event = AwakeningEventsHelper.getEvent(n);
            var skill = AwakeningEventsHelper.getSkillForEvent(n);
            var skillName = "";

            if (skill.length === 1) {
                skillName = SkillsHelper.getSkillName(skill[0]);
            }
            else {
                skillName = `${SkillsHelper.getSkillName(skill[0])} or ${SkillsHelper.getSkillName(skill[1])}`;
            }

            eventElements.push((
                <div key={n++}>
                    <div className="panel">
                        <div className="youth-event" onClick={() => this.props.onSelection(event)}>
                            {event.description}
                            <br/>
                            Gain 1 rank in {skillName}
                        </div>
                    </div>
                    <br />
                </div>
            ));
        });

        return (
            <div>
                <div className="header-text">SELECT AWAKENING EVENT</div>
                <br />
                {eventElements}
                <Button text="Cancel" className="button button-cancel" onClick={() => this.props.onCancel()} />
            </div>
        );
    }
}