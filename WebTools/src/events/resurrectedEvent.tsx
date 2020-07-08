import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {EventModel} from '../common/eventModel';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {Button} from '../components/button';
import {PageIdentity} from '../pages/pageFactory';
import {Attribute} from '../helpers/attributes';

interface IResurrectedEventProperties {
}

export class ResurrectedEvent extends React.Component<IResurrectedEventProperties, {}> {
    constructor(props: IResurrectedEventProperties) {
        super(props);
    }

    render() {
        const std = character.lifePoints >= 1
            ? <Button className="button-dark" text="Select" lpCost={1} onClick={() => { this.onStandardSelected(); } } />
            : "Not affordable";

        const nabia = character.lifePoints >= 3
            ? <Button className="button-dark" text="Select" lpCost={3} onClick={() => { this.onNabiaSelected(); } }/>
            : "Not affordable";

        const orlando = character.lifePoints >= 3
            ? <Button className="button-dark" text="Select" lpCost={3} onClick={() => { this.onOrlandoSelected(); } }/>
            : "Not affordable";

        const siren = character.lifePoints >= 3
            ? <Button className="button-dark" text="Select" lpCost={3} onClick={() => { this.onSirenSelected(); } }/>
            : "Not affordable";

        const titan = character.lifePoints >= 2
            ? <Button className="button-dark" text="Select" lpCost={3} onClick={() => { this.onTitanSelected(); } }/>
            : "Not affordable";

        return (
            <div>
                <div className="page-text">
                    You have died and been resurrected. By default, you will be placed in an Antiquated Lhost. If you can afford it, you may spend Life Points to be placed in a more advanced Lhost instead.
                </div>
                <div className="panel">
                    <table className="selection-list">
                        <thead>
                            <tr>
                                <td></td>
                                <td>Attributes</td>
                                <td>Abilities</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="selection-header">ANTIQUATED LHOST</td>
                                <td>-1 to all attributes</td>
                                <td>Inured to disease</td>
                                <td><Button className="button-dark" text="Select" onClick={() => { this.onAntiquatedSelected(); } } /></td>
                            </tr>
                            <tr>
                                <td className="selection-header">STANDARD LHOST</td>
                                <td>No attribute reduction</td>
                                <td>
                                    Inured to disease<br/>
                                    +1 Armor Soak
                                </td>
                                <td>{std}</td>
                            </tr>
                            <tr>
                                <td className="selection-header">NABIA LHOST</td>
                                <td>-1 AGI/COO, +1 BRW</td>
                                <td>
                                    Inured to Aquatic Pressure, Cold, Disease<br/>
                                    Amphibious<br/>
                                    +1 Armor Soak<br/>
                                    +1 BTS
                                    </td>
                                <td>{nabia}</td>
                            </tr>
                            <tr>
                                <td className="selection-header">ORLANDO LHOST</td>
                                <td>-1 WIL, +1 BRW/COO</td>
                                <td>
                                    Inured to disease<br/>
                                    Ballistics Expert System 1<br/>
                                    Close Combat Expert System 1
                                </td>
                                <td>{orlando}</td>
                            </tr>
                            <tr>
                                <td className="selection-header">SIREN LHOST</td>
                                <td>+1 AGI/PER</td>
                                <td>
                                    Inured to disease<br/>
                                    Persuade Expert System 1<br/>
                                    +1 Morale
                                </td>
                                <td>{siren}</td>
                            </tr>
                            <tr>
                                <td className="selection-header">TITAN LHOST</td>
                                <td>-1 AGI/PER/COO, +2 BRW</td>
                                <td>
                                    Inured to disease, vacuum<br/>
                                    +2 Armor Soak<br/>
                                    +2 BTS
                                </td>
                                <td>{titan}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private onAntiquatedSelected() {
        character.attributes.forEach(attr => {
            character.attributes[attr.attribute].value--;
        });

        this.addHostAbility("Inured to disease");

        character.hostName = "Antiquated Lhost";

        this.onNext();
    }

    private onStandardSelected() {
        this.addHostAbility("Inured to disease");

        character.lifePoints--;
        character.hostName = "Standard Lhost";
        character.armorBonus++;

        this.onNext();
    }

    private onNabiaSelected() {
        character.attributes[Attribute.Agility].value--;
        character.attributes[Attribute.Coordination].value--;
        character.attributes[Attribute.Brawn].value++;

        this.addHostAbility("Inured to disease");
        this.addHostAbility("Inured to aquatic pressure");
        this.addHostAbility("Inured to cold");
        this.addHostAbility("Amphibious (-3D traversing aquatic terrain)");

        character.lifePoints -= 3;
        character.hostName = "Nabia Lhost";
        character.armorBonus++;
        character.bts++;

        this.onNext();
    }

    private onOrlandoSelected() {
        character.attributes[Attribute.Willpower].value--;
        character.attributes[Attribute.Coordination].value++;
        character.attributes[Attribute.Brawn].value++;

        this.addHostAbility("Inured to disease");
        this.addHostAbility("Ballistics Expert System 1");
        this.addHostAbility("Close Combat Expert System 1");

        character.lifePoints -= 3;
        character.hostName = "Orlando Lhost";

        this.onNext();
    }

    private onSirenSelected() {
        character.attributes[Attribute.Agility].value++;
        character.attributes[Attribute.Personality].value++;

        this.addHostAbility("Inured to disease");
        this.addHostAbility("Persuade Expert System 1");

        character.lifePoints -= 3;
        character.hostName = "Siren Lhost";
        character.morale++;

        this.onNext();
    }

    private onTitanSelected() {
        character.attributes[Attribute.Agility].value--;
        character.attributes[Attribute.Personality].value--;
        character.attributes[Attribute.Coordination].value--;
        character.attributes[Attribute.Brawn].value += 2;

        this.addHostAbility("Inured to disease");
        this.addHostAbility("Inured to vacuum");

        character.lifePoints -= 2;
        character.hostName = "Titan Lhost";
        character.armorBonus += 2;
        character.bts += 2;

        this.onNext();
    }

    private addHostAbility(ability: string) {
        if (!character.hostAbilities.some(a => a === ability)) {
            character.hostAbilities.push(ability);
        }
    }

    private onNext() {
        if (character.education >= 0) {
            Navigation.navigateToPage(PageIdentity.AfterEvent);
        }
        else {
            Navigation.navigateToPage(PageIdentity.Education);
        }
    }
}