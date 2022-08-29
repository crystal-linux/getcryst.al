'use strict';

class Contributors extends React.Component {
    constructor(props) {
        super(props);
        //Variable to store repo name
        this.repo = this.props.repo;
        //Tracks whether json data has been fetched from url
        this.state = { fetched: false };
        this.getContributorData();
    }

    //Fetches and parses repository data from Github
    getContributorData() {
        return fetch("https://api.github.com/repos/crystal-linux/" + this.repo + "/contributors", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                //indicates that data was fetched, then stores only the required data in a list in the object state
                this.setState({
                    fetched: true,
                    users: responseData.map(user => {
                        return {
                            login: user.login,
                            link: user.html_url,
                            avatar: user.avatar_url
                        }
                    })
                });
            })
            .catch(error => console.warn(error));
    }

    render() {
        //Stores the contributor avatar elements
        var avatars;
        //Only executes the process if the json data has been fetched (will throw a hissy fit and break otherwise)
        if (this.state.fetched) {
            avatars = this.state.users.map((user) => (
                //Creates new a link tag with a nested img tag with the user's data
                React.createElement(
                    'a', {
                        className: "contributor-link",
                        title: user.login,
                        href: user.link
                    }, //Good lord I cannot wait to figure out how to get JSX working
                    React.createElement(
                        'img', {
                            className: "contributor-avatar",
                            alt: user.login,
                            src: user.avatar
                        }
                    )
                )
            ));
            //Removes contributors below top 5 from list
            while (avatars.length > 5) {
                avatars.pop();
            }
        }

        //Creates a container for the contributor list
        var icons = React.createElement('div', { className: "contributor-icons", children: avatars });

        //Creates a listing for the specific repository
        return ([
            React.createElement("p", { style: { fontSize: "14px", marginBottom: "0.5rem" } }, "crystal-linux/", this.repo, "\xA0contributors"),
            icons,
        ]);
    }
}

//Creates and renders an individual instance of the Contributors object for each repository listed
//Gets the containers by their id and nests the objects within them
const ameContainer = document.querySelector('#ame');
const ameRoot = ReactDOM.createRoot(ameContainer);
ameRoot.render(React.createElement(Contributors, { repo: "amethyst" }));

const jadeContainer = document.querySelector('#jade');
const jadeRoot = ReactDOM.createRoot(jadeContainer);
jadeRoot.render(React.createElement(Contributors, { repo: "jade" }));

const malContainer = document.querySelector('#mal');
const malRoot = ReactDOM.createRoot(malContainer);
malRoot.render(React.createElement(Contributors, { repo: "malachite" }));

const brandingContainer = document.querySelector('#branding');
const brandingRoot = ReactDOM.createRoot(brandingContainer);
brandingRoot.render(React.createElement(Contributors, { repo: "branding" }));