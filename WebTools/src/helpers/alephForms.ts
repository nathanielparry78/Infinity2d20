import {character} from '../common/character';
import {EventModel} from '../common/eventModel';
import {CareerEventModel} from '../helpers/careerEvents';

export enum AlephForm {
    Aspect,
    Recreation
}

class AlephFormModel {
    name: string;
    description: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }
}

export class AlephFormViewModel extends AlephFormModel {
    id: AlephForm;

    constructor(id: AlephForm, base: AlephFormModel) {
        super(base.name, base.description);
        this.id = id;
    }
}

export class AlephForms {
    private _forms: { [id: number]: AlephFormModel } = {
        [AlephForm.Aspect]: new AlephFormModel(
            "Aspect",
            "Fragments of ALEPH known as Aspects are sometimes given enough functional autonomy to be considered individual characters despite their connection to ALEPH’s greater consciousness. (In some rare cases, these aspects become completely separated from ALEPH. These renegade aspects, however, are effectively independent — and therefore outlaw — AIs. However, some renegade aspects have disguised themselves as resurrected humans)."
        ),
        [AlephForm.Recreation]: new AlephFormModel(
            "Recreation",
            "ALEPH is also responsible for the recreations, a combination of innovative biogenics and experimental Cubes. Hosted in sophisticated Lhosts, recreations are faithful simulations of the personalities of important historical figures, although their skills have been adapted to the modern age so they can work as diplomats, soldiers, spokespeople, and artists."
        )
    };

    getForms() {
        var forms: AlephFormViewModel[] = [];
        var n = 0;
        for (var form in this._forms) {
            var f = this._forms[form];
            forms.push(new AlephFormViewModel(n, f));
            n++;
        }

        return forms;
    }

    getForm(form: AlephForm) {
        return this._forms[form];
    }

    applyForm(form: AlephForm) {
        if (form === AlephForm.Recreation) {
            character.careerEvents.push(new CareerEventModel(new EventModel("", null, "You have a 10 asset debt owed to whoever funded your creation.")));
        }
    }
}

export const AlephFormsHelper = new AlephForms();