import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {Events, EventIdentity} from '../common/eventChannel';
import {PageIdentity} from '../pages/pageFactory';

interface IHistoryState {
    showHistory: boolean;
}

export class History extends React.Component<{}, IHistoryState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            showHistory: false
        };

        Events.listen(EventIdentity.ShowHistory, () => {
            this.toggleHistory();
        });
    }

    render() {
        const pages = character.steps.length > 0
            ? character.steps.map((step, i) => {
                const name = this.getPageName(step.page);
                if (name.length > 0) {
                    return (
                        <div className="history-item" key={i} onClick={() => this.goToPage(step.page) }>
                            {name}
                        </div>
                    );
                }
              })
            : <div>No history.</div>;

        const history = this.state.showHistory
            ? <div className="history">
                {pages}
              </div>
            : undefined;

        return (
            <div>
                {history}
            </div>
        );
    }

    private toggleHistory() {
        this.setState({
            showHistory: !this.state.showHistory
        });
    }

    private goToPage(page: PageIdentity) {
        this.toggleHistory();
        character.goToStep(page);
        Navigation.navigateToHistoryPage(page);
    }

    private getPageName(page: PageIdentity) {
        switch (page) {
            case PageIdentity.ToolSelection: return "Tool Selection";
            case PageIdentity.PathSelection: return "Path Selection";
            case PageIdentity.BirthHost: return "Birth Host";
            case PageIdentity.BirthHost_LifePoints: return "Birth Host (Life Points)";
            case PageIdentity.HostBody: return "Host Body";
            case PageIdentity.Faction: return "Faction";
            case PageIdentity.FactionDetails: return "Faction Details";
            case PageIdentity.BirthPlace: return "Birthplace";
            case PageIdentity.BirthPlaceDetails: return "Birthplace Details";
            case PageIdentity.Tribe: return "Tribe";
            case PageIdentity.TribeDetails: return "Tribe Details";
            case PageIdentity.SissoluWaters: return "Sissolu Waters";
            case PageIdentity.SissoluWatersDetails: return "Sissolu Waters Details";
            case PageIdentity.SocialClass: return "Social Class";
            case PageIdentity.HomeEnvironment: return "Home Environment";
            case PageIdentity.StatusDetails: return "Status Details";
            case PageIdentity.YouthEvent: return character.host === 4 ? "Fry Event" : "Youth Event";
            case PageIdentity.YouthEventDetails: return character.host === 4 ? "Fry Event Details" : "Youth Event Details";
            case PageIdentity.AwakeningEvent: return "Awakening Event";
            case PageIdentity.AwakeningEventDetails: return "Awakening Event Details";
            case PageIdentity.Education: return "Education";
            case PageIdentity.EducationDetails: return "Education Details";
            case PageIdentity.AdolescenceEvent: return "Adolescence Event";
            case PageIdentity.Career1: return "Career";
            case PageIdentity.Career2: return "Career";
            case PageIdentity.Career3: return "Career";
            case PageIdentity.Career4: return "Career";
            case PageIdentity.HazardFail1: return "Hazard Failure";
            case PageIdentity.HazardFail2: return "Hazard Failure";
            case PageIdentity.HazardFail3: return "Hazard Failure";
            case PageIdentity.HazardFail4: return "Hazard Failure";
            case PageIdentity.CareerDetails1: return "Career Details";
            case PageIdentity.CareerDetails2: return "Career Details";
            case PageIdentity.CareerDetails3: return "Career Details";
            case PageIdentity.CareerDetails4: return "Career Details";
            case PageIdentity.CareerEvent1: return "Career Event";
            case PageIdentity.CareerEvent2: return "Career Event";
            case PageIdentity.CareerEvent3: return "Career Event";
            case PageIdentity.CareerEvent4: return "Career Event";
            case PageIdentity.Geist: return "Geist";
            case PageIdentity.FinalTweaks: return "Final Tweaks";
            case PageIdentity.FinalTweaks_LifePoints: return "Final Tweaks (Life Points)";
            case PageIdentity.Finish: return "Finish";
            case PageIdentity.AlepForms: return "Aleph Forms";
            case PageIdentity.AlephDetails: return "Aleph Form Details";
            case PageIdentity.UpliftHosts: return "Uplift Forms";
            case PageIdentity.UpliftHostDetails: return "Uplift Form Details";
            case PageIdentity.AfterEvent: return "After Event";
            case PageIdentity.Fired: return "Fired";
            case PageIdentity.CriminalRecord: return "Criminal Record";
        }

        return "";
    }
}