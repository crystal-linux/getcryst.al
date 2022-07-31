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
        this.getLangData(["amethyst", "jade", "jade_gui", "malachite", "jade-gui", "site", "onyx", "lapis", "caveman", "pkg-manager-warner"]);
    }

    getLangData(repos) {
        for (let i in repos) {
            fetch("https://api.github.com/repos/crystal-linux/" + repos[i] + "/languages", {
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

                        if (this.state.langs.indexOf(k) == -1) {
                            this.state.langs.push(k);
                        }
                    }
                    if (i == repos.length - 1) {
                        this.setState({
                            fetched: true
                        });
                    }
                })
                .catch(error => console.warn(error));
        }
        //indicates that data was fetched, then stores only the required data in a list in the object state
    }

    render() {
        var langlist = [];
        //var totalBytes = 0;
        //console.log(this.state.langs);
        if (this.state.fetched) {
            let i = 0;
            for (let k in this.state.langs) {
                let id = "";
                switch (this.state.langs[k]) {
                    case "C++":
                        id = "CPP";
                        break;
                    default:
                        id = this.state.langs[k];
                }

                langlist.push(React.createElement(
                    'div', {
                        id: id + "-tag",
                        className: "lang-tag",
                        title: this.state.langs[k],
                        style: {
                            animationDelay: "" + (0.1 + (0.1 * i)) + "s"
                        }
                    },
                    this.state.langs[k]
                ));
                i++;
            }
        }

        return langlist;
    }

}

const teamContainer = document.querySelector('#team-members');
const teamRoot = ReactDOM.createRoot(teamContainer);
teamRoot.render(React.createElement(Team));

const langContainer = document.querySelector('#languages');
const langRoot = ReactDOM.createRoot(langContainer);
langRoot.render(React.createElement(Languages));