import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {IPageProperties, PageIdentity} from './pageFactory';
import {PageHeader} from '../components/pageHeader';
import {CriminalRecordEvent} from '../events/criminalRecordEvent';

export class CriminalRecordPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        return (
            <div className="page">
                <PageHeader text="CRIMINAL RECORD" />
                <CriminalRecordEvent />
            </div>
        );
    }
}