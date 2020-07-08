export class EventModel {
    event: string;
    trait: string;
    effect: string;
    detailView: string;
    table: string;
    eventNumber: number;

    constructor(event: string, trait: string, effect: string, detailView?: string) {
        this.event = event;
        this.trait = trait;
        this.effect = effect;
        this.detailView = detailView;
    }
}