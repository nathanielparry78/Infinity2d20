import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {Dialog} from '../components/dialog';
import {AlienHost, AlienHostsHelper} from '../helpers/alienHosts';
import {Faction, FactionsHelper} from '../helpers/factions';
import {AttributesHelper} from '../helpers/attributes';

export class HostBodyPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const hosts = AlienHostsHelper.getAlienHosts().map((host, i) => {
            const attributes = host.attributeBonuses.map((attr, i) => {
                return (
                    <div key={i}>{AttributesHelper.getAttributeName(i).substring(0, 3) } {attr >= 0 ? "+" : ""}{attr}</div>
                )
            });

            return (
                <tr key={i}>
                    <td className="selection-header">{host.name}</td>
                    <td><small>{host.faction}</small></td>
                    <td>{attributes}</td>
                    <td>{host.cost}</td>
                    <td>
                        <Button text="Select" className="button-small" onClick={() => this.onHostSelected(host.id) }/>
                    </td>
                </tr>
            )
        });

        return (
            <div className="page">
                <PageHeader text="HOST BODY" />
                <div className="page-text">
                    Select your host body (contrary to the book, no roll is needed, this step has been simplified).
                    A non-Human host gives you attribute bonuses 
                    as well as special abilities. But there is a Lifepoint cost attached. 
                    Below you can see the available hosts. 
                </div>
                <div className="panel">
                    <table className="selection-list">
                        <thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><h3>Attributes</h3></td>
                                <td><h3>Cost</h3></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {hosts}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

    private onHostSelected(host: AlienHost) {
        character.host = host;

        var alienHost = AlienHostsHelper.getAlienHost(host);
        AlienHostsHelper.applyAlienHost(host);

        if (host === AlienHost.Human) {
            Navigation.navigateToPage(PageIdentity.Faction);
        }
        else if (host === AlienHost.UpliftAvian ||
                 host === AlienHost.UpliftCanine ||
                 host === AlienHost.UpliftCephaplopod ||
                 host === AlienHost.UpliftCetacean ||
                 host === AlienHost.UpliftFeline ||
                 host === AlienHost.UpliftSimian ||
                 host === AlienHost.UpliftSuidae) {
            FactionsHelper.applyFaction(Faction.Nomads);
            Navigation.navigateToPage(PageIdentity.UpliftHosts);
        }
        else {
            switch (host) {
                case AlienHost.Antipode:
                case AlienHost.Dogface:
                case AlienHost.Wulver:
                    FactionsHelper.applyFaction(Faction.Ariadna);
                    break;
                case AlienHost.Helot:
                    FactionsHelper.applyFaction(Faction.PanOceania);
                    break;
            }

            Navigation.navigateToPage(PageIdentity.FactionDetails);
        }
    }
}