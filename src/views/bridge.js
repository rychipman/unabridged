var view = {};

(function() {

    view = view || {};

    view.Set = {
        view: (vnode) => {
            return [
                m('h3', 'Set (id: ' + vnode.attrs.set._id + ')'),
                m('p', 'Participants: ' + vnode.attrs.set.players.join(', ')),
                m('h4', 'Tables:'),
                vnode.attrs.set.tables.map((table, idx) => {
                    return m('a', {
                        href: '/set/' + vnode.attrs.set._id + '/table/' + idx,
                        oncreate: m.route.link,
                        onupdate: m.route.link,
                    }, table._id);
                }),
            ];
        },
    };

    view.Table = {
        view: (vnode) => {
            var table = vnode.attrs.table;
            var deal = vnode.attrs.table.deal;
            return [
                m('h3', 'Table (id: ' + table._id + ')'),
                m(view.Deal, { deal: deal }),
                m(view.bidTable, {
                    bids: table.bids,
                    dealer: deal.dealer,
                }),
                m(view.bidButtons, {
                    onbid: table.makeBid,
                }),
            ];
        },
    };

    view.Deal = {
        view: (vnode) => {
            var deal = vnode.attrs.deal;
            return m('table', [
                m('tr', ['N', 'E', 'S', 'W'].map(seat => {
                    var dealer = '';
                    if ( seat === deal.dealer ) { dealer = '*' };
                    return m('th', seat+dealer);
                })),
                m('tr', deal.hands.map(hand => {
                    return m('td', [
                        m('p', 's:' + hand.spades),
                        m('p', 'h:' + hand.hearts),
                        m('p', 'd:' + hand.diamonds),
                        m('p', 'c:' + hand.clubs),
                    ]);
                })),
            ]);
        },
    };

    view.bidTable = {
        view: function(vnode) {
            var bids = vnode.attrs.bids.slice();
            var dealer = vnode.attrs.dealer;

            var table = [];
            var seats = [ 'N', 'E', 'S', 'W' ];

            // make the bids line up with the starting seat
            var startIdx = 0;
            while ( seats[(startIdx+3)%4] != dealer ) {
                bids.unshift('');
                startIdx++;
            }

            // make sure we have a multiple of 4 entries in array
            var remainder = (bids.length % 4);
            if ( remainder > 0 ) {
                remainder = 4 - remainder;
            }
            while ( remainder > 0 ) {
                bids.push('');
                remainder--;
            }

            // paginate bids into table
            for ( var i=0; i+4<=bids.length; i+=4 ) {
                table.push(bids.slice(i, i+4));
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

    view.bidButtons = {
        view: function(vnode) {
            var onbid = vnode.attrs.onbid;

            var suits = [ 'C', 'D', 'H', 'S', 'NT' ];
            var levels = [ '1', '2', '3', '4', '5', '6', '7' ];
            var others = [ 'Pass', 'Dbl', 'Rdbl' ];

            return m('table', [
                m('tr', others.map(bid => {
                    return m('td', m('button', {
                        onclick: () => onbid(bid),
                    }, bid));
                })),
                levels.map(level => {
                    return m('tr', suits.map(suit => {
                        var bid = level + suit;
                        return m('td', m('button', {
                            onclick: () => onbid(bid),
                        }, bid));
                    }));
                }),
            ]);
        },
    };

})();
