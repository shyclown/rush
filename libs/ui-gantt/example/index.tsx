import * as ReactDOM from 'react-dom';
import {Gantt} from "../src";
import {FC} from "react";
import React = require('react');

const App: FC = () => {
  return (
    <div>
      <Gantt data={[{key:"str"}]}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
