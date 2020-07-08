import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Button} from '../components/button';
import {Faction, FactionsHelper} from '../helpers/factions';
import {EventModel} from '../common/eventModel';
import {PageIdentity} from '../pages/pageFactory';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Skill} from '../helpers/skills';

interface EventState {
    showSkillIncrease: boolean;
}

export class ImproveHackingOrGeistEvent extends React.Component<{}, EventState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showSkillIncrease: false
        };
    }

    render() {
        if (!this.state.showSkillIncrease) {
            return (
                <div>
                    <div className="panel">
                        <div>
                            While at a caravanserai, you witnessed a serious hack.
                            What happened?
                            Who was responsible?
                            Either gain 1 in Hacking or increase your geist's Firewall by 2.
                        </div>
                        <Button text="HACKING" className="button-dark" onClick={() => this.onYes() }/>
                        <br/>
                        <Button text="GEIST" className="button-dark" onClick={() => this.onNo() }/>
                    </div>
                </div>
            );
        }
        else {
            return (
                <div>
                    <div className="panel">
                        <div className="panel">
                            <ElectiveSkillImprovement skills={[Skill.Hacking]} points={1}/>
                        </div>
                        <Button text="DONE" className="button-next" onClick={() => Navigation.navigateToPage(PageIdentity.AfterEvent) }/>
                    </div>
                </div>
            );
        }
    }

    private onNo() {
        character.firewallReduction -= 2;

        Navigation.navigateToPage(PageIdentity.AfterEvent);
    }

    private onYes() {
        this.setState({ showSkillIncrease: true });
    }
}