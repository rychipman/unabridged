const client = new stitch.StitchClient('bridgebid-wpodi');
const db = client.service('mongodb', 'mongodb-atlas').db('tutorial');

var Stitch = {
    client: client,
    db: db,
};

var State = {
    lastError: '',
    clearError: function() { State.lastError = '' },
};

var Auth = {

    currentUser: '',
    loggedIn: function() {
        return Auth.currentUser != '' && Stitch.client.authedId();
    },

    register: {
        email: '',
        password: '',
        setEmail: function(value) { Auth.register.email = value; },
        setPassword: function(value) { Auth.register.password = value; },
        canSubmit: function() {
            return Auth.register.email != '' && Auth.register.password != '';
        },
        submit: function() {
            Stitch.client.register(Auth.register.email, Auth.register.password)
                .then(() => {
                    console.log('registered user');
                    Auth.register.email = '';
                    Auth.register.password = '';
                    m.route.set('/auth/login');
                })
                .catch(err => {
                    State.lastError = err.error;
                    m.redraw();
                });
        },
    },

    confirmation: {
        done: false,
        error: '',
        confirm: function() {
            console.log('confirming email');
            var token = m.route.param('token');
            var tokenId = m.route.param('tokenId');
            return client.auth.provider('userpass')
                .emailConfirm(tokenId, token)
                .then(() => {
                    console.log('confirmed email');
                    Auth.confirmation.done = true;
                    m.redraw();
                })
                .catch(err => {
                    State.lastError = err.error;
                    Auth.confirmation.done = true;
                    Auth.confirmation.error = err.error;
                    m.redraw();
                });
        },
    },

    logout: function() {
        client.logout()
            .then(res => {
                console.log('logged out');
                console.log(res);
                m.route.set('/');
            })
            .catch(err =>  {
                State.lastError = err.error;
                m.redraw();
            });
    },

    login: {
        email: '',
        password: '',
        setEmail: function(value) { Auth.login.email = value; },
        setPassword: function(value) { Auth.login.password = value; },
        canSubmit: function() {
            return Auth.login.email != '' && Auth.login.password != '';
        },
        submit: function() {
            console.log('logging in');
            client.login(Auth.login.email, Auth.login.password)
                .then(res => {
                    console.log('logged in successfully');
                    console.log(res);
                    Auth.currentUser = Auth.login.email;
                    Auth.login.email = '';
                    Auth.login.password = '';
                    m.redraw();
                })
                .catch(err => {
                    State.lastError = err.error;
                    m.redraw();
                });
        },
    },

};

var Bridge = {

    dealer: 'E',
    bids: [ 'P', '1NT', 'P', '2H', 'P', '2S', 'P', '2NT', 'P', '3NT' ],

    submitBid: function(bid) {
        db.collection('helloworld').insert({
            owner_id: Stitch.client.authedId(),
            bid: bid,
        }).then(Bridge.getBids);
    },

    getBids: function() {
        db.collection('helloworld').find({
            bid: { $exists: true },
        }).then(docs => {
            Bridge.bids = [];
            docs.map(doc => {
                Bridge.bids.push(doc.bid);
            });
            m.redraw();
        });
    },
};

var Layout = {
    view: function(vnode) {
        var err = [];
        if ( State.lastError != '' ) {
            err = [
                m('p', 'ERROR: ' + State.lastError),
                m('button', { onclick: State.clearError }, 'clear'),
            ];
        }
        return m('.main', [
            m('header', [
                err,
                m('h1', 'Bridge The Gap'),
                m('p', 'A partnership practice tool for bridge bidding'),
                m('hr'),
            ]),
            m('.content', [
                vnode.children,
            ]),
            m(Footer),
        ])
    },
};

var Footer = {
    view: function(vnode) {
        var footerItems = [
            m('p', [
                m('a[href=/auth/login]', { oncreate: m.route.link }, 'Log In'),
            ]),
            m('p', [
                m('a[href=/auth/register]', { oncreate: m.route.link }, 'Register'),
            ]),
        ];
        if ( Auth.loggedIn() ) {
            footerItems = [
                m('p', 'Logged in as ' + Auth.currentUser),
                m('p', [
                    m('a[href=/home]', { oncreate: m.route.link }, 'Home'),
                ]),
                m('p', [
                    m('a[href=/auth/logout]', { oncreate: m.route.link }, 'Log Out'),
                ]),
            ];
        }
        return m('footer', [
            m('hr'),
            footerItems,
        ]);
    },
};

var rootComponent = {
    view: function(vnode) {
        return [
            m('h2', 'Root'),
            m('p', 'This is the root page.'),
            m('p', 'Please log in or register to continue.'),
        ];
    },
};

var homeComponent = {
    view: function(vnode) {
        return [
            m('h2', 'Home'),
            m('p', 'This is the home page.'),
        ];
    },
};

var set = {
    view: function(vnode) {
        var info = [
            m('h2', 'Set'),
            m('h3', 'You and ' + vnode.attrs.set.partner),
            m('h4', 'Deal ' + vnode.attrs.deal + '/' + vnode.attrs.set.deals.length),
        ];
        var deal = [ m(bidTable) ];
        if ( vnode.attrs.set.nextBid === Stitch.authedId() ) {
            deal.push(
                m('p', 'make your bid!'),
                m(bidButtons),
            );
        } else {
            deal.push(m('p'), 'waiting on partner'),
        }
    },
};

var bidTable = {
    view: function(vnode) {
        var table = [];
        var seats = [ 'N', 'E', 'S', 'W' ];

        // make the bids line up with the starting seat
        var startIdx = 0;
        while ( seats[(startIdx+3)%4] != vnode.attrs.dealer ) {
            vnode.attrs.bids.unshift('');
            startIdx++;
        }

        // make sure we have a multiple of 4 entries in array
        var remainder = (vnode.attrs.bids.length % 4);
        if ( remainder > 0 ) {
            remainder = 4 - remainder;
        }
        while ( remainder > 0 ) {
            vnode.attrs.bids.push('');
            remainder--;
        }

        // paginate bids into table
        for ( var i=0; i+4<=vnode.attrs.bids.length; i+=4 ) {
            table.push(vnode.attrs.bids.slice(i, i+4));
        }

        return m('table', [
            m('tr', seats.map(seat => {
                return m('th', seat);
            })),
            table.map(row => {
                return m('tr', row.map(bid => {
                    return m('td', bid);
                }));
            }),
        ])
    },
};

var bidButtons = {
    view: function(vnode) {

        var suits = [ 'C', 'D', 'H', 'S', 'NT' ];
        var levels = [ '1', '2', '3', '4', '5', '6', '7' ];
        var others = [ 'Pass', 'Dbl', 'Rdbl' ];

        return m('table', [
            m('tr', others.map(bid => {
                return m('td',
                    m('button', {
                        onclick: m.withAttr('innerHTML', Bridge.submitBid),
                    }, bid)
                );
            })),
            levels.map(level => {
                return m('tr', suits.map(suit => {
                    var bid = level + suit;
                    return m('td',
                        m('button', {
                            onclick: m.withAttr('innerHTML', Bridge.submitBid),
                        }, bid),
                    );
                }));
            }),
        ])

    },
};

var loginComponent = {
    view: function(vnode) {
        return [
            m('h2', 'Login'),
            m('p', 'Existing users can log in here.'),
            m('input[type=text][placeholder=email]', {
                value: Auth.login.email,
                oninput: m.withAttr('value', Auth.login.setEmail),
            }),
            m('input[type=password][placeholder=password]', {
                value: Auth.login.password,
                oninput: m.withAttr('value', Auth.login.setPassword),
            }),
            m('button', {
                disabled: !Auth.login.canSubmit(),
                onclick: Auth.login.submit,
            }, 'Login'),
        ];
    },
};

var registerComponent = {
    view: function(vnode) {
        return [
            m('h2', 'Register'),
            m('p', 'New users can create an account here.'),
            m('input[type=text][placeholder=email]', {
                value: Auth.register.email,
                oninput: m.withAttr('value', Auth.register.setEmail),
            }),
            m('input[type=password][placeholder=password]', {
                value: Auth.register.password,
                oninput: m.withAttr('value', Auth.register.setPassword),
            }),
            m('button', {
                disabled: !Auth.register.canSubmit(),
                onclick: Auth.register.submit,
            }, 'Register'),
        ];
    },
};

var confirmEmailComponent = {
    oninit: Auth.confirmation.confirm,
    view: function(vnode) {
        var msg = 'Confirming email...';
        if (Auth.confirmation.done) {
            msg = 'Successfully confirmed email';
            if ( Auth.confirmation.error != '' ) {
                msg = 'Error confirming email: ' + Auth.confirmation.error;
            }
        }
        return [
            m('h2', 'Email Confirmation'),
            m('p', msg),
        ];
    },
};

var resetPasswordComponent = {
};

function renderRegister() {
}

window.onload = function() {

    //m.route.prefix('');

    m.route(document.body, '/', {

        '/': {
            render: function() {
                return m(Layout, m(rootComponent));
            },
        },

        '/home': {
            onmatch: function() {
                if ( !Auth.loggedIn() ) {
                    console.log('Cannot access /home: not logged in');
                    console.log('Redirecting to /');
                    m.route.set('/');
                }
            },
            render: function() {
                return m(Layout, m(homeComponent));
            },
        },

        '/sets': {
            onmatch: function() {
                if ( !Auth.loggedIn() ) {
                    console.log('Cannot access /sets: not logged in');
                    console.log('Redirecting to /');
                    m.route.set('/');
                }
            },
            render: function() {
                return m(Layout, m(set));
            },
        }

        '/auth/login': {
            render: function() {
                return m(Layout, m(loginComponent));
            },
        },

        '/auth/logout': {
            onmatch: function() {
                Auth.logout();
            },
        },

        '/auth/register': {
            render: function() {
                return m(Layout, m(registerComponent));
            },
        },

        '/auth/confirm': {
            render: function() {
                return m(Layout, m(confirmEmailComponent));
            },
        },

        '/auth/reset': {
            render: function() {
                return m(Layout, m(resetPasswordComponent));
            },
        },

    });

}
