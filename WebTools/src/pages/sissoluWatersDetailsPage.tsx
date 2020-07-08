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

export class SissoluWatersDetailsPage extends React.Component<IPageProperties, {}> {
    private _languages: string[];
    private _language: string;

    constructor(props: IPageProperties) {
        super(props);

        var waters = BirthPlacesHelper.getSissoluWater(character.sissoluWaters);

        this._languages = waters.languages.length > 1 ? waters.languages[1].split("|") : undefined;

        if (this._languages) {
            this._language = this._languages ? this._languages[0] : null;
        }
    }

    render() {
        const waters = BirthPlacesHelper.getSissoluWater(character.sissoluWaters);

        const optionalLangs = waters.languages.length > 1 ? waters.languages[1].split("|") : undefined;

        const languages = optionalLangs
            ? <div className="panel">
                <div className="header-small">OPTIONAL LANGUAGE</div>
                <DropDownInput items={optionalLangs} defaultValue={this._language} onChange={(index) => this.selectLanguage(index) }/>
              </div>
            : undefined;

        return (
            <div className="page">
                <PageHeader text="SISSOLU WATERS" />
                <div className="header-text">{waters.name}</div>
                <div className="panel">
                    <div className="page-text">If your Sissolu Waters provides an optional language, select it below before proceeding.</div>
                </div>
                {languages}
                <Button text="SOCIAL CLASS" className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private selectLanguage(index: number) {
        this._language = this._languages[index];
        this.forceUpdate();
    }

    private onNext() {
        if (this._language) {
            character.addLanguage(this._language);
        }

        Navigation.navigateToPage(PageIdentity.SocialClass);
    }
}