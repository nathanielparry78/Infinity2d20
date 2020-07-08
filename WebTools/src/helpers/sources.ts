export enum Source {
    Core,
    Ariadna,
    Haqqislam,
    PanOceania,
    Nomads,
}

class SourceModel {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class SourceViewModel extends SourceModel {
    id: Source;

    constructor(id: Source, base: SourceModel) {
        super(base.name);
        this.id = id;
    }
}

export class Sources {
    private _sources: { [id: number]: SourceModel } = {
        [Source.Core]: { name: "Core" },
        [Source.Ariadna]: { name: "Ariadna" },
        [Source.Haqqislam]: { name: "Haqqislam" },
        [Source.PanOceania]: { name: "PanOceania" },
        [Source.Nomads]: { name: "Nomads" },
    };

    getSources() {
        var sources: SourceViewModel[] = [];
        var n = 0;
        for (var source in this._sources) {
            var src = this._sources[source];
            sources.push(new SourceViewModel(n, src));
            n++;
        }

        return sources;
    }
}

export const SourcesHelper = new Sources();