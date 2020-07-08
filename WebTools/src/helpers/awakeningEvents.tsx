import { character } from '../common/character';
import { YouthEventModel } from './youthEvents';
import { Skill } from './skills';

class AwakeningEvents {
    generateEvent(): YouthEventModel {
        const roll = Math.floor(Math.random() * 20) + 1;
        return this.getEvent(roll);
    }

    getEvent(roll: number) {
        switch (roll) {
            case 1:
            case 2:
            case 3:
            case 4: {
                return new YouthEventModel(
                    "Shapes, glyphs, symbols—how could anyone hope to make sense of this informational deluge? But slowly, over time, patterns began to emerge.",
                    () => { character.addTalent("Pattern Recognition"); });
            }
            case 5:
            case 6:
            case 7:
            case 8: {
                return new YouthEventModel(
                    "You remember screaming. Pain. The procedures tore your siblings apart, but you managed to survive. Your first self-aware thought was the realisation that you were very much alone, in more ways than one.",
                    () => { character.addTalent("Sturdy"); });
            }
            case 9:
            case 10:
            case 11:
            case 12: {
                return new YouthEventModel(
                    "They said you were a failed experiment, a dead end. Furious at the dismissal, you determined to make them eat their words.",
                    () => { character.addTalent("Stubborn"); });
            }
            case 13:
            case 14:
            case 15:
            case 16: {
                return new YouthEventModel(
                    "When the lab lost power, your fellow subjects were gripped in raw, animal panic. Not you, however. You calmed them all down, even as the stark differences between you and them took shape in your mind.",
                    () => { character.addTalent("Wild Empathy"); });
            }
            case 17:
            case 18:
            case 19: {
                return new YouthEventModel(
                    "They thought they had you secured tightly, but you soon gave your habitat the slip. It would take them weeks to find you, giving you time to think.",
                    () => { character.addTalent("Scout"); });
            }
            case 20: {
                return new YouthEventModel(
                    "The raid came at the worst possible time. Not just for your siblings and your creator(s), but for your attackers: you were awake, you were angry, and you were fully in control. You made them regret it.",
                    () => { character.addTalent("Quickdraw"); });
            }
        }

        return null;
    }

    getSkillForEvent(roll: number) {
        switch (roll) {
            case 1:
            case 2:
            case 3:
            case 4: return [Skill.Analysis];
            case 5:
            case 6:
            case 7:
            case 8: return [Skill.Resistance];
            case 9:
            case 10:
            case 11:
            case 12: return [Skill.Discipline];
            case 13:
            case 14:
            case 15:
            case 16: return [Skill.Animal_Handling];
            case 17:
            case 18:
            case 19: return [Skill.Stealth];
            case 20: return [Skill.Ballistics, Skill.Close_Combat];
        }

        return [];
    }
}

export const AwakeningEventsHelper = new AwakeningEvents();