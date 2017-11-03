(function() {

    Table = {
        view: (vnode) => {
            var data = { _table: vnode.attrs._table };
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );
            return m('div', {class: gridClasses}, [
                m(BidTable, data),
                m(BidButtons, data),
                m(Hand, data),
            ]);
        },
    };

    var suitSym = {
        spades: '\u2660',
        hearts: '\u2665',
        diamonds: '\u2666',
        clubs: '\u2663',
        dbl: 'dbl',
        rdbl: 'rdbl',
    };

    Hand = {
        view: (vnode) => {
            var table = vnode.attrs._table;
            var data = {
                key: 'hand',
                class: classNames(
                    'fadein',
                    'card', 'mdl-card',
                    'mdl-cell', 'mdl-cell--4-col',
                    'mdl-color--white', 'mdl-color-text--grey-100',
                    'mdl-shadow--4dp',
                    {'disabled': !vnode.attrs.active},
                ),
            };
            return m('div', data, [
                m('.mdl-card__title.mdl-card--border', [
                    m('h2.mdl-card__title-text', 'Hand'),
                ]),
                m('table.hand.mdl-card__supporting-text', [
                    ['spades', 'hearts', 'diamonds', 'clubs'].map(suit =>  {
                        var cards = table.deal.hands[0][suit];
                        return m('tr', [
                            m('td.suit.'+suit, suitSym[suit]),
                            m('td.cards', cards),
                        ]);
                    }),
                ]),
                m('.mdl-card__actions.mdl-card--border', [
                    m('a.mdl-button.mdl-button--colored', 'Analyze Hand'),
                ]),
            ]);
        },
    };

    BidTable = {
        view: (vnode) => {
            var table = vnode.attrs._table;

            var seatAttrs = {
                class: classNames(
                    'seat',
                    'mdl-button', 'mdl-button--raised',
                    'mdl-button--colored',
                    'mdl-cell',
                    'mdl-cell--3-col',
                    'mdl-cell--2-col-tablet',
                    'mdl-cell--1-col-phone',
                ),
            };

            var bidAttrs = {
                class: classNames(
                    'bid',
                    'mdl-button', 'mdl-button--raised',
                    'mdl-cell',
                    'mdl-cell--3-col',
                    'mdl-cell--2-col-tablet',
                    'mdl-cell--1-col-phone',
                ),
            };

            var nextBidAttrs = {
                class: classNames(
                    'bid', 'waiting',
                    'mdl-button', 'mdl-button--raised',
                    'mdl-cell',
                    'mdl-cell--3-col',
                    'mdl-cell--2-col-tablet',
                    'mdl-cell--1-col-phone',
                ),
            };

            var bids = m('.bids', [
                ['N','S','E','W'].map(seat => {
                    return m('a', seatAttrs, seat);
                }),
                table.bids.map(bid => {
                    return m('a', bidAttrs, bid);
                }),
                m('a', nextBidAttrs, '?'),
            ]);

            var attrs = {
                _title: 'Bids',
                _actions: {
                    'Analyze': false,
                    'Comment': false,
                },
            };

            return m(GridCard, attrs, bids);
        },
    };

    BidButtons = {
        view: (vnode) => {
            var table = vnode.attrs._table;

            var buttons = m('.bidbuttons', [
                ['spades', 'hearts', 'diamonds', 'clubs', 'dbl', 'rdbl'].map(suit =>  {
                    return m('a', {
                        class: classNames(
                            'suit', suit,
                            'mdl-button', 'mdl-cell',
                            'mdl-cell--6-col',
                            'mdl-cell--4-col-tablet',
                            'mdl-cell--2-col-phone',
                        ),
                    }, suitSym[suit]);
                }),
            ]);

            var attrs = {
                _title: 'Your Bid',
                _actions: {
                    'Pass': true,
                    'Submit': false,
                },
            };

            return m(GridCard, attrs, buttons);
        },
    };

    TableCard = {
        view: function(vnode) {
            var table = vnode.attrs._table;
            var name = vnode.attrs._name;
            var icons = {};
            if (set.active) {
                icons['more'] = () => m.route.set('/table/'+table._id);
            };
            return m(Card, {
                disabled: !table.active,
                title: name,
                key: table._id,
                icons: icons,
            });
        },
    };

})();
