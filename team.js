'use strict';

class Team extends React.Component {
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
        return fetch("https://api.github.com/orgs/crystal-linux/members", {
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
                    users: responseData.map(user => {
                        return {
                            login: user.login,
                            link: user.html_url,
                            avatar: user.avatar_url
                        }

                    })
                });
                this.setState({
                    fetched: true
                });
            })
            .catch(error => console.warn(error));
    }

    render() {
        //Stores the contributor avatar elements
        var filteredUsers;
        var avatars;
        if (this.state.fetched) {
            avatars = this.state.users.map((user) => (
                //Creates new a link tag with a nested img tag with the user's data
                React.createElement(
                    'a', {
                    className: "team-link",
                    title: user.login,
                    href: user.link
                }, //Good lord I cannot wait to figure out how to get JSX working
                    React.createElement(
                        'img', {
                        className: "team-avatar",
                        alt: user.login,
                        src: user.avatar
                    }
                    ),
                    React.createElement('br'),
                    user.login
                )
            ));
        }

        //Creates a listing for the specific repository
        return avatars;
    }
}

class Languages extends React.Component {
    constructor(props) {
        super(props);
        //Tracks whether json data has been fetched from url
        this.state = { fetched: false, langs: [] };
        this.getLangData();
        this.getLangData();
    }

    getLangData() {
        fetch("https://api.github.com/repos/crystal-linux/amethyst/languages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                for (let key in Object.keys(responseData)) {
                    let k = Object.keys(responseData)[key];
                    this.state.langs.push(k);
                }
            })
            .catch(error => console.warn(error));
        fetch("https://api.github.com/repos/crystal-linux/jade/languages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                for (let key in Object.keys(responseData)) {
                    let k = Object.keys(responseData)[key];
                    this.state.langs.push(k);
                }
            })
            .catch(error => console.warn(error));
        fetch("https://api.github.com/repos/crystal-linux/malachite/languages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                for (let key in Object.keys(responseData)) {
                    let k = Object.keys(responseData)[key];
                    this.state.langs.push(k);
                }
            })
            .catch(error => console.warn(error));
        fetch("https://api.github.com/repos/crystal-linux/lapis/languages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                for (let key in Object.keys(responseData)) {
                    let k = Object.keys(responseData)[key];
                    this.state.langs.push(k);
                }
            })
            .catch(error => console.warn(error));
        fetch("https://api.github.com/repos/crystal-linux/caveman/languages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                for (let key in Object.keys(responseData)) {
                    let k = Object.keys(responseData)[key];
                    this.state.langs.push(k);
                }
            })
            .catch(error => console.warn(error));

        fetch("https://api.github.com/repos/crystal-linux/site/languages", {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                for (let key in Object.keys(responseData)) {
                    let k = Object.keys(responseData)[key];
                    this.state.langs.push(k);
                }
                //indicates that data was fetched, then stores only the required data in a list in the object state
                this.setState({
                    fetched: true
                });
            })
            .catch(error => console.warn(error));
    }
}

const teamContainer = document.querySelector('#team-members');
const teamRoot = ReactDOM.createRoot(teamContainer);
teamRoot.render(React.createElement(Team));