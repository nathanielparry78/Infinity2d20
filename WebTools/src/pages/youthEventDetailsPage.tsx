import * as React from 'react';
import {character} from '../common/character';
import {Navigation} from '../common/navigator';
import {PageIdentity, IPageProperties} from './pageFactory';
import {AttributesHelper} from '../helpers/attributes';
import {PageHeader} from '../components/pageHeader';
import {Button} from '../components/button';
import {ReduceAttributeEvent} from '../events/reduceAttributeEvent';
import {ResurrectedEvent} from '../events/resurrectedEvent';

export class YouthEventDetailsPage extends React.Component<IPageProperties, {}> {
    constructor(props: IPageProperties) {
        super(props);
    }

    render() {
        const event = character.youthEvent.description;

        const page = event.indexOf("Biological/Chemical weapons") > -1
            ? (<ReduceAttributeEvent points={1} />)
            : event.indexOf("Died!") > -1
                ? (<ResurrectedEvent/>)
                : undefined;

        return (
            <div className="page">
                <PageHeader text="YOUTH EVENT" />
                <div className="page-text">{event}</div>
                {page}
            </div>
        );
    }

    private onNext() {
        Navigation.navigateToPage(PageIdentity.Education);
    }
}