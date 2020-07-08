import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {BirthPlacesHelper} from '../helpers/birthPlaces';
import {Skill, SkillsHelper} from '../helpers/skills';
import {AttributesHelper} from '../helpers/attributes';
import {FactionsHelper} from '../helpers/factions';
import {TalentsHelper} from '../helpers/talents';
import {PageHeader} from '../components/pageHeader';
import {AttributeView} from '../components/attribute';
import {SkillImprovement} from '../components/skillImprovement';
import {DropDownInput} from '../components/dropDownInput';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {AlienHost} from '../helpers/alienHosts';

export class BirthPlaceDetailsPage extends React.Component<IPageProperties, {}> {
    private _languages: string[];
    private _language: string;
    private _skillsDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        var birthPlace = BirthPlacesHelper.getBirthPlace(character.heritage, character.birthPlaceId);

        this._languages = birthPlace.languageOptions;
        this._language = this._languages ? this._languages[0] : null;

        this._skillsDone = false;
    }

    render() {
        var birthPlace = BirthPlacesHelper.getBirthPlace(character.heritage, character.birthPlaceId);

        const attributes = birthPlace.attributes.map((a, i) => {
            return (<AttributeView key={i} name={AttributesHelper.getAttributeName(a) } points={1} value={character.attributes[a].value} />)
        });

        const homeland = character.homeland
            ? ` (${character.homeland})`
            : undefined;

        const languages = birthPlace.languageOptions
            ? <div className="panel">
                <div className="header-small">OPTIONAL LANGUAGE</div>
                <DropDownInput items={birthPlace.languageOptions} defaultValue={this._language} onChange={(index) => this.selectLanguage(index) }/>
              </div>
            : undefined;

        const nextLabel = character.host === AlienHost.Helot
            ? "SISSOLU WATERS"
            : "SOCIAL CLASS";

        return (
            <div className="page">
                <PageHeader text={FactionsHelper.getBirthPlaceType(character.heritage).toUpperCase() } />
                <div className="header-text">{birthPlace.name}{homeland}</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    {attributes}
                </div>
                <div className="panel">
                    <div className="header-small">SKILL</div>
                    <SkillImprovement skill={birthPlace.skill} onDone={(done) => this._skillsDone = done } />
                </div>
                {languages}
                <Button text={nextLabel} className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private selectLanguage(index: number) {
        this._language = this._languages[index];
        this.forceUpdate();
    }

    private onNext() {
        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        if (this._language) {
            character.addLanguage(this._language);
        }

        if (character.host === AlienHost.Helot) {
            Navigation.navigateToPage(PageIdentity.SissoluWaters);
        }
        else {
            Navigation.navigateToPage(PageIdentity.SocialClass);
        }
    }
}