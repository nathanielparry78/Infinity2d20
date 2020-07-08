import * as React from 'react';
import { character } from '../common/character';
import { Navigation } from '../common/navigator';
import { IPageProperties, PageIdentity } from './pageFactory';
import { PageHeader } from '../components/pageHeader';
import { Button } from '../components/button';
import { AttributesHelper } from '../helpers/attributes';
import { UpliftHostsHelper, UpliftHost } from '../helpers/upliftHosts';

export class UpliftHostPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const hosts = UpliftHostsHelper.getHosts().map((host, i) => {
            const attributes = host.bonuses.map((attr, i) => {
                return (
                    <div key={i}>{AttributesHelper.getAttributeName(i).substring(0, 3)} {attr >= 0 ? "+" : ""}{attr}</div>
                )
            });

            return (
                <tr key={i}>
                    <td className="selection-header">{host.name}</td>
                    <td>{attributes}</td>
                    <td>{host.cost}</td>
                    <td>
                        <Button text="Select" className="button-small" onClick={() => this.onHostSelected(host.id, host.cost)} />
                    </td>
                </tr>
            )
        });

        return (
            <div className="page">
                <PageHeader text="UPLIFT HOST BODY" />
                <div className="page-text">
                    You must choose whether your character resides in an Lhost, interacts primarily through Remotes, 
                    or is a Custom Biomorph.
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

    private onHostSelected(host: UpliftHost, cost: number) {
        character.upliftHost = host;
        character.lifePoints -= cost;

        UpliftHostsHelper.applyHost(host);

        if (host === UpliftHost.RemoteSpecialist) {
            Navigation.navigateToPage(PageIdentity.UpliftHostDetails);
        }
        else {
            Navigation.navigateToPage(PageIdentity.BirthPlace);
        }
    }
}