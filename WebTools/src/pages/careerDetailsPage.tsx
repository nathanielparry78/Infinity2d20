import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Career, CareersHelper} from '../helpers/careers';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {TalentsHelper} from '../helpers/talents';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {Button} from '../components/button';
import {CheckBox} from '../components/checkBox';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {SignatureSkillSelection} from '../components/signatureSkillSelection';
import {TalentList} from '../components/talentList';
import {EquipmentList} from '../components/equipmentList';
import {Dialog} from '../components/dialog';
import {HassassinOrder, HassassinOrdersHelper} from '../helpers/hassassinOrders';
import {MilitaryOrder, MilitaryOrdersHelper} from '../helpers/militaryOrders';
import {SocialClassesHelper} from '../helpers/socialClasses';
import {EquipmentHelper} from '../helpers/equipment';
import { CatSquadsHelper } from '../helpers/catSquads';

export class CareerDetailsPage extends React.Component<IPageProperties, {}> {
    private _selectedTalent: string;
    private _selectedEquipment: string[];
    private _signatureSkills: Skill[];
    private _selectedSignatureSkill: Skill;
    private _showEquipment: boolean;
    private _mandatoryDone: boolean;
    private _electiveDone: boolean;
    private _isHassassin: boolean;
    private _isMilitaryOrder: boolean;
    private _isCatSquad: boolean;
    private _order: number;
    private _selectedOrder: number;

    constructor(props: IPageProperties) {
        super(props);

        if (character.hazardDecrease > 0) {
            character.hazardDecrease = 0;
            character.earnings++;
        }

        const currentCareer = character.careers[character.careers.length - 1].career;
        const career = CareersHelper.getCareer(currentCareer);

        this._signatureSkills = [];

        career.mandatory.forEach(skill => {
            if (this._signatureSkills.indexOf(skill) === -1 && !character.skills[skill].isSignature) {
                this._signatureSkills.push(skill);
            }
        });

        career.elective.forEach(skill => {
            if (this._signatureSkills.indexOf(skill) === -1 && !character.skills[skill].isSignature) {
                this._signatureSkills.push(skill);
            }
        });

        this._selectedEquipment = [];

        var n = 0;
        career.equipment.forEach(eq => {
            if (eq.indexOf('|') > -1) {
                const e = eq.split('|');
                this._selectedEquipment[n] = e[0];
                n++;
            }
        });

        let careerCounter = 0;
        character.careers.forEach(c => {
            if (c.career === currentCareer) {
                careerCounter++;
            }
        });

        this._showEquipment = careerCounter === 1;

        this._mandatoryDone = false;
        this._electiveDone = false;

        this._isHassassin = currentCareer === Career.HassassinFidayHaqqislam || currentCareer === Career.HassassinExemplar;
        if (this._isHassassin) {
            this._order = character.hassassinOrder >= 0 ? character.hassassinOrder : HassassinOrdersHelper.generateOrder();
            this._selectedOrder = this._order;
        }

        this._isMilitaryOrder = currentCareer === Career.Knight || currentCareer === Career.OrderSergeant;
        if (this._isMilitaryOrder) {
            this._order = character.militaryOrder >= 0 ? character.militaryOrder : MilitaryOrdersHelper.generateOrder();
            this._selectedOrder = this._order;
        }

        this._isCatSquad = currentCareer === Career.CatSquadMember;
        if (this._isCatSquad) {
            this._order = character.catSquad >= 0 ? character.catSquad : CatSquadsHelper.generateOrder();
            this._selectedOrder = this._order;
        }

        if (character.hassassinEvent) {
            if (character.careers.length >= 2) {
                const lastCareer = character.careers[character.careers.length - 2].career;
                if (lastCareer === currentCareer) {
                    character.hassassinEvent = false;
                    SocialClassesHelper.increaseSocialClass();
                } 
            }
        }

        // Reset this...
        character.firstCareer = undefined;
    }

    render() {
        var career = CareersHelper.getCareer(character.careers[character.careers.length - 1].career);

        const attributes = character.careers.length === 1
            ? career.attributes.map((attr, i) => {
                return <AttributeView key={i} name={AttributesHelper.getAttributeName(i) } points={attr} value={character.attributes[i].value}/>
            })
            : undefined;

        const attributesContainer = character.careers.length === 1
            ? (
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
              )
            : undefined;

        const mandatory = career.mandatory.map((m, i) => {
            return (
                <SkillImprovement key={i} skill={m} onDone={(done) => { this._mandatoryDone = done; this.onUpdate(); } } />
            )
        });

        const signature = character.careers.length < 2
            ? (
                <div className="panel">
                    <div className="header-small">SIGNATURE SKILL</div>
                    <SignatureSkillSelection skills={this._signatureSkills} onSelection={(skill) => this.onSignatureSkillSelected(skill) } />
                </div>
            )
            : undefined;

        const orders = this.drawOrderSelection();

        const elective = this._isHassassin
            ? HassassinOrdersHelper.getOrder(this._selectedOrder).electiveSkills
            : this._isMilitaryOrder
                ? MilitaryOrdersHelper.getOrder(this._selectedOrder).electiveSkills
                : this._isCatSquad
                    ? CatSquadsHelper.getOrder(this._selectedOrder).electiveSkills
                    : career.elective;

        const equipment = this.drawEquipment(career.equipment);

        return (
            <div className="page">
                <PageHeader text="CAREER" />
                <div className="header-text">{career.name}</div>
                {orders}
                {attributesContainer}
                <div className="panel">
                    <div className="header-small">MANDATORY SKILLS</div>
                    {mandatory}
                </div>
                <div className="panel">
                    <div className="header-small">ELECTIVE SKILLS</div>
                    <ElectiveSkillImprovement skills={elective} points={2} onDone={(done) => { this._electiveDone = done; this.onUpdate(); } } />
                </div>
                {signature}
                <div className="panel">
                    <div className="header-small">TALENT</div>
                    <TalentList skills={[...career.mandatory, ...career.elective]} onSelection={talent => this.onTalentSelected(talent) }/>
                </div>
                {equipment}
                <Button text="CAREER EVENT" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onUpdate() {
        this.forceUpdate();
    }

    private onSignatureSkillSelected(skill: Skill) {
        this._selectedSignatureSkill = skill;
        this.forceUpdate();
    }

    private onTalentSelected(talent: string) {
        this._selectedTalent = talent;
    }

    private onEquipmentSelected(eq: string, index: number) {
        this._selectedEquipment[index] = eq;
    }

    private onNext() {
        if (!this._mandatoryDone) {
            Dialog.show("You have not distributed all mandatory skill points.");
            return;
        }

        if (!this._electiveDone) {
            Dialog.show("You have not distributed all elective skill points.");
            return;
        }

        if (character.careers.length === 1 && this._selectedSignatureSkill == null) {
            Dialog.show("You have not selected a signature skill.");
            return;
        }

        if (this._selectedTalent === null || this._selectedTalent.length === 0) {
            Dialog.show("You have not selected a talent.");
            return;
        }

        character.addTalent(this._selectedTalent);

        if (this._isHassassin) {
            character.hassassinOrder = this._selectedOrder;
        }
        else if (this._isMilitaryOrder) {
            character.militaryOrder = this._selectedOrder;
        }
        else if (this._isCatSquad) {
            character.earnings = CareersHelper.calculateEarnings(CatSquadsHelper.getOrder(this._selectedOrder).earnings);
            character.catSquad = this._selectedOrder;
        }

        if (this._selectedOrder !== this._order) {
            character.lifePoints--;
        }

        if (this._showEquipment) {
            // Regular equipment is added in applyCareer.
            this._selectedEquipment.forEach(eq => {
                if (!EquipmentHelper.handleSpecialEquipment(eq)) {
                    character.addEquipment(eq);
                }
            });

            // Hassassin orders get their own set of equipment.
            if (this._isHassassin) {
                const order = HassassinOrdersHelper.getOrder(character.hassassinOrder);
                order.gear.forEach(eq => {
                    if (eq.indexOf('|') === -1) {
                        character.addEquipment(eq);
                    }
                });
            }
            else if (this._isMilitaryOrder) {
                const order = MilitaryOrdersHelper.getOrder(character.militaryOrder);
                order.gear.forEach(eq => {
                    if (eq.indexOf('|') === -1) {
                        character.addEquipment(eq);
                    }
                });
            }
            else if (this._isCatSquad) {
                const order = CatSquadsHelper.getOrder(character.catSquad);
                order.gear.forEach(eq => {
                    if (eq.indexOf('|') === -1) {
                        character.addEquipment(eq);
                    }
                });
            }
        }

        Navigation.navigateToPage(character.getCareerPage(PageIdentity.CareerEvent1));
    }

    private drawEquipment(careerEquipment: string[]) {
        if (!this._showEquipment) {
            return undefined;
        }

        var equipment: string[] = [];

        if (this._isHassassin && character.careers[character.careers.length - 1].career !== Career.HassassinFidayHaqqislam) {
            equipment = HassassinOrdersHelper.getOrder(this._selectedOrder).gear;
        }
        else if (this._isMilitaryOrder) {
            equipment = MilitaryOrdersHelper.getOrder(this._selectedOrder).gear;
        }
        else if (this._isCatSquad) {
            equipment = CatSquadsHelper.getOrder(this._selectedOrder).gear;
        }
        else {
            equipment = careerEquipment;
        }

        return (
            <div className="panel">
                <div className="header-small">EQUIPMENT</div>
                <EquipmentList
                    equipment={equipment}
                    onSelected={(eq, i) => this.onEquipmentSelected(eq, i) }/>
            </div>
        );
    }

    private drawOrderSelection() {
        if (this._isHassassin) {
            return (
                <div className="panel">
                    <div className="header-small">HASSASSIN ORDER</div>
                    <div>
                        Your assigned Hassassin Order is {HassassinOrdersHelper.getOrder(this._selectedOrder).name}.
                        Changing it will cost you a Life Point.
                    </div>
                    <div>
                        <table className="selection-list">
                            <tbody>
                                {HassassinOrdersHelper.getOrders().map((o, i) => {
                                    const checkBox = <CheckBox
                                        isChecked={this._selectedOrder === o.id}
                                        value={o.id}
                                        onChanged={(order) => { this._selectedOrder = order; this.forceUpdate(); } }
                                        />;
                                    return (
                                        <tr key={i}>
                                            <td>{o.name}</td>
                                            <td>
                                                {character.lifePoints < 1
                                                    ? o.id !== this._selectedOrder
                                                        ? checkBox
                                                        : undefined
                                                    : checkBox}
                                            </td>
                                        </tr>
                                    );
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else if (this._isMilitaryOrder) {
            return (
                <div className="panel">
                    <div className="header-small">MILITARY ORDER</div>
                    <div>
                        Your assigned Military Order is {MilitaryOrdersHelper.getOrder(this._selectedOrder).name}.
                        Changing it will cost you a Life Point.
                    </div>
                    <div>
                        <table className="selection-list">
                            <tbody>
                                {MilitaryOrdersHelper.getOrders().map((o, i) => {
                                    const checkBox = <CheckBox
                                        isChecked={this._selectedOrder === o.id}
                                        value={o.id}
                                        onChanged={(order) => { this._selectedOrder = order; this.forceUpdate(); } }
                                        />;
                                    return (
                                        <tr key={i}>
                                            <td>{o.name}</td>
                                            <td>
                                                {character.lifePoints < 1
                                                    ? o.id !== this._selectedOrder
                                                        ? checkBox
                                                        : undefined
                                                    : checkBox}
                                            </td>
                                        </tr>
                                    );
                                }) }
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else if (this._isCatSquad) {
            return (
                <div className="panel">
                    <div className="header-small">'CAT SQUADS</div>
                    <div>
                        Your assigned 'Cat Squad is {CatSquadsHelper.getOrder(this._selectedOrder).name}.
                        Changing it will cost you a Life Point.
                    </div>
                    <div>
                        <table className="selection-list">
                            <tbody>
                                {CatSquadsHelper.getOrders().map((o, i) => {
                                    const checkBox = <CheckBox
                                        isChecked={this._selectedOrder === o.id}
                                        value={o.id}
                                        onChanged={(order) => { this._selectedOrder = order; this.forceUpdate(); }}
                                    />;
                                    return (
                                        <tr key={i}>
                                            <td>{o.name}</td>
                                            <td>
                                                {character.lifePoints < 1
                                                    ? o.id !== this._selectedOrder
                                                        ? checkBox
                                                        : undefined
                                                    : checkBox}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            );
        }
        else {
            return undefined;
        }
    }
}