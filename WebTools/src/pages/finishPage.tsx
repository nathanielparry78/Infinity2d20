import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {CharacterSerializer} from '../common/characterSerializer';
import {PageIdentity, IPageProperties} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {CharacterSheet} from '../components/characterSheet';

export class FinishPage extends React.Component<IPageProperties, {}> {
    private name: HTMLInputElement;
    private description: HTMLTextAreaElement;
    private height: HTMLInputElement;
    private weight: HTMLInputElement;
    private hair: HTMLInputElement;
    private eyes: HTMLInputElement;

    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const characterData = CharacterSerializer.serialize(character);

        const data = characterData.map((d, i) => {
            return (<input key={i} type="hidden" name={d.name} value={d.value}/>)
        });

        return (
            <div className="page">
                <PageHeader text="FINISHED"/>
                <div className="page-text">
                    Your character is finished. You can either use this reference to fill in a character sheet by hand, or use the button at the bottom
                    to export your character to PDF.
                </div>
                <div>
                    <b>* PDF exporting is not working on iOS 11. Use this page as a reference to fill in your character manually.</b>
                </div>
                <div className="panel">
                    <div className="header-small">NAME</div>
                    <input type="text" onChange={() => this.onNameChanged() } ref={(input) => this.name = input}/>
                </div>
                <br/>
                <div className="panel">
                    <div className="header-small">APPEARANCE</div>
                    <br/>
                    <table>
                        <tbody>
                            <tr>
                                <td style={{ verticalAlign: "top" }}>Description</td>
                                <td><textarea cols={20} rows={10} onChange={() => this.onDescChanged() } ref={(input) => this.description = input}/></td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td><input type="text" onChange={() => this.onHeightChanged() } ref={(input) => this.height = input}/></td>
                            </tr>
                            <tr>
                                <td>Weight</td>
                                <td><input type="text" onChange={() => this.onWeightChanged() } ref={(input) => this.weight = input}/></td>
                            </tr>
                            <tr>
                                <td>Hair</td>
                                <td><input type="text" onChange={() => this.onHairChanged() } ref={(input) => this.hair = input}/></td>
                            </tr>
                            <tr>
                                <td>Eyes</td>
                                <td><input type="text" onChange={() => this.onEyesChanged() } ref={(input) => this.eyes = input}/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <br/>
                <div className="panel">
                    <CharacterSheet isVisible={true} />
                </div>
                <br/>
                <div className="button-container">
                    <form action="http://pdf.modiphiusapps.hostinguk.org/api/sheet" method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="submit" value="Export to PDF" className="button"/>
                    </form>
                    <br/>
                </div>
            </div>
        );
    }

    private onNameChanged() {
        character.name = this.name.value;
        this.forceUpdate();
    }

    private onDescChanged() {
        character.description = this.description.value;
        this.forceUpdate();
    }

    private onHeightChanged() {
        character.height = this.height.value;
        this.forceUpdate();
    }

    private onWeightChanged() {
        character.weight = this.weight.value;
        this.forceUpdate();
    }

    private onHairChanged() {
        character.hair = this.hair.value;
        this.forceUpdate();
    }

    private onEyesChanged() {
        character.eyes = this.eyes.value;
        this.forceUpdate();
    }
}