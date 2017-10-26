(function() {

    var state = {
        sets: [
            new model.Set({
                _id: 'sabcde12345',
                players: ['ryan@ryanchipman.com', 'mylesbkeating@gmail.com'],
                tables: [
                    new model.Table({
                        _id: 'tabcde12345',
                        bids: [ '1S', 'P', '1NT', 'P', '2D', 'P', '2S', 'P' ],
                    }),
                ],
            }),
            new model.Set({
                _id: 'swxyz12345',
                players: ['ryan@ryanchipman.com', 'mylesbkeating@gmail.com'],
                tables: [
                    new model.Table({
                        _id: 'twxyz12345',
                        bids: [ 'P', 'P' ],
                    }),
                ],
            }),
        ],
        getSetById: id => {
            for ( set of state.sets ) {
                if ( set._id === id ) {
                    return set;
                }
            }
        },
    }

    window.onload = function() {

        //m.route.prefix('');

        m.route(document.body, '/', {

            '/': {
                onmatch: function() {
                    m.route.set('/sets');
                },
            },

            '/sets': {
                render: () => {
                    return m(view.Layout, state.sets.map(set => {
                        return m('a', {
                            href: '/set/' + set._id,
                            oncreate: m.route.link,
                            onupdate: m.route.link,
                        }, m('p', set._id));
                    }));
                },
            },

            '/set/:setid': {
                render: () => {
                    var set = state.getSetById(m.route.param('setid'));
                    if (!set) {
                        console.log('error retrieving set')
                    }
                    return m(view.Layout, m(view.Set, { set: set }));
                }
            },

            '/set/:setid/table/:idx': {
                render: () => {
                    var set = state.getSetById(m.route.param('setid'));
                    if (!set) {
                        console.log('error retrieving set');
                        m.route.set('/');
                        return;
                    }

                    var idx = m.route.param('idx');
                    if (set.tables.length <= idx) {
                        console.log('error retrieving table from set');
                        m.route.set('/');
                        return;
                    }
                    var table = set.tables[idx];

                    return m(view.Layout, m(view.Table, { set: set, table: table }));
                }
            },

        });

    };

})()
