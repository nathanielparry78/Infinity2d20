import * as React from 'react';
import {character, CharacterCareer} from '../common/character';
import {IPageProperties} from './pageFactory';
import {CharacterSerializer} from '../common/characterSerializer';
import {YouthEventModel} from '../helpers/youthEvents';
import {AdolescenceEventModel} from '../helpers/adolescenceEvents';
import {CareerEventModel} from '../helpers/careerEvents';
import {EventModel} from '../common/eventModel';
import {TalentsHelper} from '../helpers/talents';

export class ExportTestPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);

        character.name = "Hubba Bubba";
        character.age = 34;
        character.gender = 0; // Male
        character.host = 0; // Human
        character.hostName = "Birth";
        character.faction = character.heritage = 4; // Yu Jing
        character.skills[22].expertise++; // Tech
        character.skills[22].focus++;
        character.skills[22].isSignature = true;
        character.skills[8].expertise++; // Education
        character.birthPlace = "Human Edge";
        character.homeland = "On the Edge";
        character.attributes[0].value++; // Agility
        character.attributes[1].value++; // Awareness
        character.skills[22].expertise++;
        character.addLanguage("Yujingyu");
        character.socialClass = 2; // Middle Class
        character.attributes[6].value++; // Willpower
        character.earnings = 3;
        character.homeEnvironment = 5; // High Society
        character.attributes[6].value++;
        character.skills[11].expertise++; // Lifestyle
        character.youthEvent = new YouthEventModel("Moved to a new planet (Paradiso)");
        character.education = 4;
        character.attributes[1].value += 2;
        character.attributes[4].value++;
        character.attributes[6].value--;
        character.skills[8].focus++;
        character.skills[13].expertise++; // Observation
        character.skills[15].expertise++; // Pilot
        character.skills[22].focus++;
        character.skills[23].expertise++; // Thievery
        character.skills[10].expertise++; // Hacking
        character.skills[9].expertise++; // Extraplanetary
        character.addEquipment("Powered Multitool");
        character.addEquipment("Repair Kit (with 5 Parts)");
        character.adolescenceEvent = new AdolescenceEventModel(new EventModel("A rogue retrovirus rewrote your genetics, causing a shift in aggression and fight/ flight reactions.", "Quick With a Fist", "You fly off the handle faster than people can react. You gain +1d20 to Surprise tests in Mexican standoffs and similar situations."));
        character.careers.push(new CharacterCareer(35, 7)); // TAG Pilot
        character.attributes[0].value += 2;
        character.attributes[1].value += 2;
        character.attributes[2].value++;
        character.attributes[3].value += 2;
        character.attributes[4].value += 2;
        character.attributes[6].value++;
        character.skills[15].focus++;
        character.skills[22].expertise++;
        character.skills[4].expertise++; // Ballistics
        character.skills[7].expertise++; // Discipline
        character.skills[21].expertise++; // Survival
        character.addEquipment("Inlaid Palm Circuitry");
        character.addEquipment("Pistol");
        character.addEquipment("2 Standard Reloads");
        character.socialClass++;
        character.careerEvents.push(new CareerEventModel(new EventModel("You discover that you have a talent for something you’d never considered trying before. What happened? Why do you love it?", "", "You discover that you have a talent for something you’d never considered trying before.What happened? Why do you love it?")));
        character.skills[5].expertise++; // Close Combat
        character.careers.push(new CharacterCareer(35, 6)); // TAG Pilot
        character.skills[15].expertise++;
        character.skills[22].focus++;
        character.skills[4].focus++;
        character.skills[7].focus++;
        character.skills[9].focus++;
        character.careerEvents.push(new CareerEventModel(new EventModel("Your employer hits a slump and is struggling to make ends meet.", "Hubba", "Your employer hits a slump and is struggling to make ends meet.")));
        character.earnings--;
        character.infinityPoints = 3;
        character.attributes[6].value++;
        character.attributes[3].value++;
        character.skills[12].expertise++;
        character.skills[12].focus++;
        character.assets = 7;
        character.addEquipment("Fake ID 2");
        character.addEquipment("Assault Hacking Device");
        character.addEquipment("1 Eagle Reload");
        character.addEquipment("3 Adhesive Shell Reloads");

        const skills = TalentsHelper.getTalents();
        for (var skill in skills) {
            var talents = skills[skill];
            talents.forEach(t => {
                character.addTalent(t.name);
            });
        }

        character.description = "Nice and warm";
        character.height = "180cm";
        character.weight = "80kg";
        character.hair = "Blonde";
        character.eyes = "Blue";

        character.morale = 1;
        character.bts = 2;
        character.armorBonus = 0;

        character.geist.attributes[4].value = 5;
        character.geist.skills[10].expertise = 1;
    }

    render() {
        const characterData = CharacterSerializer.serialize(character);

        const data = characterData.map((d, i) => {
            return (<input type="hidden" name={d.name} value={d.value}/>)
        });

        const url = "http://localhost:52355/api/sheet";
        //const url = "http://pdf.modiphiusapps.hostinguk.org/api/sheet";

        return (
            <div className="page">
                <div className="panel button-container">
                    <form action={url} method="post" encType="application/x-www-form-urlencoded" target="_blank">
                        {data}
                        <input type="submit" value="Export PDF"/>
                    </form>
                    <br/>
                </div>
            </div>
        );
    }
}