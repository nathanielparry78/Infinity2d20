import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {BirthPlaceSelection} from '../components/birthPlaceSelection';
import {BirthPlacesHelper} from '../helpers/birthPlaces';
import {FactionsHelper} from '../helpers/factions';
import {Source} from '../helpers/sources';
import {AlienHost} from '../helpers/alienHosts';

interface IBirthPlacePageProps {
    showSelection: boolean;
}

export class BirthPlacePage extends React.Component<IPageProperties, IBirthPlacePageProps> {
    constructor(props: IPageProperties) {
        super(props);

        this.state = {
            showSelection: false
        };
    }

    render() {
        if (character.hasSource(Source.PanOceania) &&
            character.host === AlienHost.Helot) {
            return this.renderHelot();
        }

        const type = FactionsHelper.getBirthPlaceType(character.heritage);

        const roll = !character.isOptional
            ? (<Button text={"ROLL " + type} className="button-dark" onClick={() => { this.rollBirthPlace() } }/>)
            : undefined;

        const select = (<Button text={"SELECT " + type} lpCost={1} className="button-dark" onClick={() => { this.showBirthPlaces() } }/>);

        const content = !this.state.showSelection ?
            (
                <div>
                    <div className="page-text">
                        Where were you born and raised?
                    </div>
                    <div className="button-container">
                        {roll}
                        {select}
                    </div>
                </div>
            )
            : (
                <BirthPlaceSelection
                    onSelection={(id) => { this.selectBirthPlace(id); character.lifePoints--; } }
                    onCancel={() => { this.hideBirthPlaces() } } />
            );
        return (
            <div className="page">
                <PageHeader text={type.toUpperCase() } />
                {content}
            </div>
        );
    }

    private renderHelot() {
        return (
            <div className="page">
                <PageHeader text={FactionsHelper.getBirthPlaceType(character.heritage) } />
                <div className="page-text">
                    Helots, without exception, call Varuna their home; the next Helot hatched off-world
                    will be the first, if it ever happens at all.
                </div>
                <div className="button-container">
                    <Button text={"VARUNA"} lpCost={0} className="button-dark" onClick={() => { this.selectBirthPlace(12); } }/>
                </div>
            </div>
        );
    }

    private rollBirthPlace() {
        var birthPlace = BirthPlacesHelper.generateBirthPlace(character.heritage, true);
        this.selectBirthPlace(birthPlace.roll);
    }

    private showBirthPlaces() {
        this.setState({ showSelection: true });
    }

    private hideBirthPlaces() {
        this.setState({ showSelection: false });
    }

    private selectBirthPlace(id: number) {
        var home = BirthPlacesHelper.getBirthPlace(character.heritage, id);
        character.birthPlace = home.name;
        character.birthPlaceId = home.roll;

        BirthPlacesHelper.applyBirthPlace(home);

        Navigation.navigateToPage(PageIdentity.BirthPlaceDetails);
    }
}