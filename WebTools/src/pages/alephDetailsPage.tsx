import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {Skill, SkillsHelper} from '../helpers/skills';
import {Faction} from '../helpers/factions';
import {BirthPlacesHelper} from '../helpers/birthPlaces';
import {SocialClass, SocialClassesHelper} from '../helpers/socialClasses';
import {PageHeader} from '../components/pageHeader';
import {AttributeImprovementCollection, AttributeImprovementCollectionMode} from '../components/attributeImprovement';
import {ElectiveSkillImprovement} from '../components/electiveSkillImprovement';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';

export class AlephDetailsPage extends React.Component<IPageProperties, {}> {
    private _languages = [];
    private _attributesDone: boolean;
    private _skillsDone: boolean;

    constructor(props: IPageProperties) {
        super(props);

        for (var i = 0; i < 5; i++) {
            var lang = BirthPlacesHelper.generateRandomLanguage(character.heritage, true, true)[0];
            while (this._languages.indexOf(lang) > -1) {
                lang = BirthPlacesHelper.generateRandomLanguage(character.heritage, true, true)[0];
            }

            this._languages.push(lang);

            this._attributesDone = false;
            this._skillsDone = false;
        }
    }

    render() {
        const langs = this._languages.map((l, i) => {
            return (
                <div key={i}>{l}</div>
            )
        });

        const next = character.faction === Faction.Aleph
            ? "HOME ENVIRONMENT"
            : "SOCIAL STATUS";

        return (
            <div className="page">
                <PageHeader text="ALEPH BIOFORM" />
                <div className="page-text">Pick two attributes and increase them by one each. Then select a skill to gain a rank in.</div>
                <div className="panel">
                    <div className="header-small">ATTRIBUTES</div>
                    <AttributeImprovementCollection points={2} mode={AttributeImprovementCollectionMode.Aleph} onDone={(done) => { this._attributesDone = done; } } />
                </div>
                <div className="panel">
                    <div className="header-small">SKILLS</div>
                    <ElectiveSkillImprovement points={1} skills={SkillsHelper.getSkills() } onDone={(done) => { this._skillsDone = done; } } />
                </div>
                <div className="panel">
                    <div className="header-small">KNOWN LANGUAGES</div>
                    {langs}
                </div>
                <Button text={next} className="button-next" onClick={() => this.onNext() }/>
            </div>
        );
    }

    private onNext() {
        if (!this._attributesDone) {
            Dialog.show("You have not distributed all attribute points.");
            return;
        }

        if (!this._skillsDone) {
            Dialog.show("You have not distributed all skill points.");
            return;
        }

        this._languages.forEach(lang => { character.addLanguage(lang) });

        if (character.faction === Faction.Aleph) {
            character.socialClass = SocialClass.Elite;
            SocialClassesHelper.applySocialClass(SocialClass.Elite);

            Navigation.navigateToPage(PageIdentity.HomeEnvironment);
        }
        else {
            Navigation.navigateToPage(PageIdentity.SocialClass);
        }
    }
}