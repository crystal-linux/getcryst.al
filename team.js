'use strict';

class Team extends React.Component {
    constructor(props) {
        super(props);
        //Variable to store repo name
        this.repo = this.props.repo;
        //Tracks whether json data has been fetched from url
        this.state = { fetched: false };
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
        const core = ["SomethingGeneric", "not-my-segfault", "hericimvevo", "axtloss"];
        this.getContributorData();
        //Stores the contributor avatar elements
        var avatars;
        if (this.state.fetched) {
            for (let user in this.state.users) {
                if (!core.includes(user.login)) {
                    let i = this.state.users.indexOf(user);
                    this.state.users.splice(i, 1);
                }
            }
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
        }

        //Creates a listing for the specific repository
        return ([
            avatars
        ]);
    }
}

const container = document.querySelector('#contributors-list');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(Team));