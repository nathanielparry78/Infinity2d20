import {character} from '../common/character';
import {CareerEventModel} from './careerEvents';
import {EventModel} from '../common/eventModel';
import {Career} from './careers';
import {Attribute} from './attributes';
import {BirthPlacesHelper} from './birthPlaces';

class FryEvents {
    generateEvent(doubleEvent: boolean = false): CareerEventModel {
        const roll1 = Math.floor(Math.random() * 20) + (doubleEvent ? 1 : 0);
        const roll2 = Math.floor(Math.random() * 11) + 2;

        switch (roll1) {
            case 1:
            case 2:
            case 3:
            case 4: {
                switch (roll2) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return new CareerEventModel(new EventModel(
                            "Your pod clashed with a rival pod; the fighting was intense, and you lost someone close to you. Reduce your Resolve by 1.",
                            "",
                            "Your pod clashed with a rival pod; the fighting was intense, and you lost someone close to you."),
                            () => { character.resolveReduction++; });
                    case 6:
                    case 7:
                    case 8:
                        return new CareerEventModel(new EventModel(
                            "Your pod clashed with a rival pod; the fighting was intense, and you lost people close to you on both sides.",
                            "Pod Rivalry",
                            "Your pod clashed with a rival pod; the fighting was intense, and you lost people close to you on both sides."));
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return new CareerEventModel(new EventModel(
                            "Your pod clashed with a rival pod; the fighting was intense, and despite your youth, you took a life with your own hands. Gain 1 rank in Close Combat.",
                            "",
                            "Your pod clashed with a rival pod; the fighting was intense, and despite your youth, you took a life with your own hands.",
                            "IncreaseClose Combat"));
                }
            }
            case 5:
            case 6:
            case 7:
            case 8: {
                switch (roll2) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return new CareerEventModel(new EventModel(
                            "Libertos came to your pod, trying to recruit it. Some left to join the cause, while others rebuffed the strangers; but everyone fought, and your Pojju split that day. Reduce your Vigour by 1 from the injuries you sustained.",
                            "",
                            "Libertos came to your pod, trying to recruit it. Some left to join the cause, while others rebuffed the strangers; but everyone fought, and your Pojju split that day."),
                            () => { character.vigourReduction++; });
                    case 6:
                    case 7:
                    case 8:
                        return new CareerEventModel(new EventModel(
                            "Libertos came to your pod, trying to recruit it. Some left to join the cause, others rebuffed it, but either way, your Pojju split that day.",
                            "Pojju Recruitment",
                            "Libertos came to your pod, trying to recruit it. Some left to join the cause, others rebuffed it, but either way, your Pojju split that day."));
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return new CareerEventModel(new EventModel(
                            "Libertos came to your pod, trying to recruit it. When it became clear that you weren’t interested, they forced the issue. You didn’t know how to fight, but that didn’t stop any of you; your pod banded together to protect its own. Increase both your Resolve and your Vigour by 1 rank each.",
                            "",
                            "Libertos came to your pod, trying to recruit it. When it became clear that you weren’t interested, they forced the issue. You didn’t know how to fight, but that didn’t stop any of you; your pod banded together to protect its own."),
                            () => {
                                character.vigourReduction--;
                                character.resolveReduction--;
                            });
                }
            }
            case 9:
            case 10:
            case 11:
            case 12: {
                switch (roll2) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return new CareerEventModel(new EventModel(
                            "Members of your pod were abducted. Your Pojju never really recovered, drifting apart over the next few years. Reduce your Resolve by 1. You can choose to take Libertos Member as your first career.",
                            "",
                            "Members of your pod were abducted. Your Pojju never really recovered, drifting apart over the next few years. Reduce your Resolve by 1."),
                            () => { character.freeCareers.push(Career.LibertosMember); });
                    case 6:
                    case 7:
                    case 8:
                        return new CareerEventModel(new EventModel(
                            "Members of your pod wanted to go to the surface, but as you didn’t have legs yet, you stayed behind with a neighboring pod. Did they ever return? Did you rejoin them if they did?",
                            "",
                            "Members of your pod wanted to go to the surface, but as you didn’t have legs yet, you stayed behind with a neighboring pod. Did they ever return? Did you rejoin them if they did?"));
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return new CareerEventModel(new EventModel(
                            "A group of human scientists traveled with your pod for a time. Were they friendly? Cold? Could you even communicate with them? Gain 1 rank in Awareness. You can also select Human Education as your education.",
                            "",
                            "A group of human scientists traveled with your pod for a time. Were they friendly? Cold? Could you even communicate with them?"),
                            () => {
                                character.attributes[Attribute.Awareness].value--;
                                character.canSelectHumanEducation = true;
                            });
                }
            }
            case 13:
            case 14:
            case 15:
            case 16: {
                switch (roll2) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return new CareerEventModel(new EventModel(
                            "Your pod migrated to a beautiful, but empty, cave network. You soon discovered why; as the Varunan Water-Snakes were quite pleased you’d moved into their den, and much of your pod didn’t survive. Reduce your Brawn by 1, as injuries and venom stunt your physical development.",
                            "",
                            "Your pod migrated to a beautiful, but empty, cave network. You soon discovered why; as the Varunan Water-Snakes were quite pleased you’d moved into their den, and much of your pod didn’t survive."),
                            () => { character.attributes[Attribute.Brawn].value--; });
                    case 6:
                    case 7:
                    case 8: {
                        const sissolu = BirthPlacesHelper.generateSissoluWaters();

                        return new CareerEventModel(new EventModel(
                            "Your pod migrated via the same katallpeac so often that it began to feel like home. An Atek shanty town floated on top; what were your relations like?",
                            "",
                            "Your pod migrated via the same katallpeac so often that it began to feel like home. An Atek shanty town floated on top; what were your relations like?"),
                            () => {
                                for (var lang in sissolu.languages) {
                                    if (lang.indexOf('|') > -1) {
                                        character.addLanguage(lang.substring(0, lang.indexOf('|')));
                                    }
                                    else {
                                        character.addLanguage(lang);
                                    }
                                }
                            });
                    }
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return new CareerEventModel(new EventModel(
                            "Your pod welcomed back an old friend who’d served in the Helot Militia. Stories of their exploits captured everyone’s imaginations, but they saw something special in you. Increase your Resolve by 1; you can choose to take Helot Militia as your first career.",
                            "",
                            "Your pod welcomed back an old friend who’d served in the Helot Militia. Stories of their exploits captured everyone’s imaginations, but they saw something special in you."),
                            () => {
                                character.resolveReduction--;
                                character.freeCareers.push(Career.HelotMilitia);
                            });
                }
            }
            case 17:
            case 18:
            case 19: {
                switch (roll2) {
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        return new CareerEventModel(new EventModel(
                            "Through circumstances beyond your control, your entire pod was wiped out, leaving you stranded and completely alone. Reduce Willpower by 1.",
                            "",
                            "Through circumstances beyond your control, your entire pod was wiped out, leaving you stranded and completely alone."),
                            () => { character.attributes[Attribute.Willpower].value--; });
                    case 6:
                    case 7:
                    case 8:
                        return new CareerEventModel(new EventModel(
                            "Your pod reunited with an old member, who’d left to join. Libertos. While the pod was divided in their politics, your elders showered them in praise, ignoring you in the process. Reduce Willpower by 1.",
                            "",
                            "Your pod reunited with an old member, who’d left to join. Libertos. While the pod was divided in their politics, your elders showered them in praise, ignoring you in the process."),
                            () => { character.attributes[Attribute.Willpower].value--; });
                    case 9:
                    case 10:
                    case 11:
                    case 12:
                        return new CareerEventModel(new EventModel(
                            "Whether through choice, tragedy, or circumstance, you joined the Tete-Kulu , relocating to the surface before your body was fully adapted. Reduce both Vigour and Willpower by 1, but increase Coordination by 1. Your Education will be Wild Pod.",
                            "",
                            "Whether through choice, tragedy, or circumstance, you joined the Tete-Kulu , relocating to the surface before your body was fully adapted."),
                            () => {
                                character.attributes[Attribute.Willpower].value--;
                                character.attributes[Attribute.Coordination].value++;
                                character.vigourReduction++;
                            });
                }
            }
            case 20: {
                const event1 = this.generateEvent(true);
                const event2 = this.generateEvent(true);

                return new CareerEventModel(new EventModel(
                    `${event1.event} ${event2.event}`,
                    "",
                    `${event1.effect} ${event2.effect}`));
            }
        }

        return null;
    }
}

export const FryEventsHelper = new FryEvents();