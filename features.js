'use strict';

class Roadmap extends React.Component {
    constructor(props) {
        super(props);
        //Tracks whether json data has been fetched from url
        this.state = { fetched: false };
        this.getRoadmapData();
    }

    getRoadmapData(){
        return fetch("https://raw.githubusercontent.com/crystal-linux/.github/main/roadmap.json", {
            method: "GET",
        })
        .then((response) => response.json())
        .then((responseData) => {
            //indicates that data was fetched, then stores only the required data in a list in the object state
            this.setState({
                fetched: true,
                points: responseData.map(step =>{
                    return{
                        version: step.Version,
                        date: step.Date,
                        features: step.Features
                    }
                })
            });
        })
        .catch(error => console.warn(error));
    }

    render(){
        var steps;
        if(this.state.fetched){

            steps = this.state.points.map((step) => (
                //Creates new a link tag with a nested img tag with the user's data
                React.createElement(
                    'div', 
                    {
                        className: "roadmap-step",
                        title: step.version
                    },
                    React.createElement(
                        'h2',
                        {
                            className: "roadmap-version"
                        },
                        step.version + " - " + step.date
                    ),
                    React.createElement(
                        'ul',
                        {
                            className: "roadmap-list"
                        },
                        step.features.map((f) => (
                            React.createElement(
                                'p',
                                {
                                    className: "roadmap-feature"
                                },
                                f
                            )
                        ))
                    )
                )   
            ));
        }

        return React.createElement('div', {className:"roadmap"}, steps);

    }
}

const roadmap = document.querySelector('#Roadmap');
const roadmapRoot = ReactDOM.createRoot(roadmap);
roadmapRoot.render(React.createElement(Roadmap));