import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Gantt } from './Gantt';

describe('it', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        const data = [{key: "something"}]
        ReactDOM.render(<Gantt data={data} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});