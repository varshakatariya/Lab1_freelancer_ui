import React from 'react';
import {ProjectDetailsView} from "./src/app/components/ProjectDetailsView.js"

export class App extends React.Component{
    render() {
        return (

            <div>
                <ProjectDetailsView email="varshhakataria@gmail.com"/>
            </div>

        );
    }
}

export default App;

