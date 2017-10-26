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
                    m.route.set('/test/set');
                },
            },

            '/sets': {
                render: () => {

                },
            },

            '/set/:setid': {
                render: () => {
                    var set = state.getSetById(m.route.param('setid'));
                    if (!set) {
                        console.log('error retrieving set')
                    }
                    return m(view.Set, { set: set });
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

                    return m(view.Table, { set: set, table: table });
                }
            },

        });

    };

})()
