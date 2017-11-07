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

            var attrs = {
                _title: 'Your Hand',
                _actions: {
                    'Analyze': false,
                },
            };

            var hand = m('.hand.mdl-cell.mdl-cell--12-col.mdl-cell--middle', [
                ['spades', 'hearts', 'diamonds', 'clubs'].map(suit =>  {
                    var cards = table.deal.hands[0][suit];
                    return m('p', m('span.suit.'+suit, suitSym[suit]), ' ', cards);
                }),
            ]);

            return m(GridCard, attrs, hand)
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
                    return m('a', bidAttrs, bid.markup());
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
        oninit: (vnode) => vnode.state.bid = new BidModel(),

        view: (vnode) => {
            var table = vnode.attrs._table;
            var bid = vnode.state.bid;

            var buttons = vnode.state.viewSuitButtons(vnode);
            var actions = {
                'Submit': !bid.canSubmit() ? false : () => {
                    table.makeBid(bid);
                    vnode.state.bid = new BidModel();
                },
                'Clear': bid.empty() ? false : () => vnode.state.bid = new BidModel(),
            };

            if (!bid.empty() && bid.suit) {
                buttons = vnode.state.viewLevelButtons(vnode);
            }

            var currentBid = '?';
            if (!bid.empty()) {
                currentBid = vnode.state.bid.markup();
            }

            var attrs = {
                _title: m('span', 'Your Bid: ', currentBid),
                _actions: actions,
            };

            return m(GridCard, attrs, buttons);
        },

        viewSuitButtons: (vnode) => {
            return m('.bidbuttons', [
                [DBL, RDBL, PASS].map(bid =>  {
                    return m('a', {
                        class: classNames(
                            'suit', bid.pretty().toLowerCase(),
                            'mdl-button', 'mdl-cell',
                            'mdl-cell--6-col',
                            'mdl-cell--4-col-tablet',
                            'mdl-cell--2-col-phone',
                        ),
                        onclick: () => vnode.state.bid = bid,
                    }, bid.markup());
                }),
                [NOTRUMP, SPADES, HEARTS, DIAMONDS, CLUBS].map(suit =>  {
                    return m('a', {
                        class: classNames(
                            'suit', suit.name(),
                            'mdl-button', 'mdl-cell',
                            'mdl-cell--6-col',
                            'mdl-cell--4-col-tablet',
                            'mdl-cell--2-col-phone',
                        ),
                        onclick: () => vnode.state.bid = new BidModel(suit),
                    }, suit.symbol());
                }),
            ]);
        },

        viewLevelButtons: (vnode) => {
            var bid = vnode.state.bid;
            var suit = bid.suit;
            return m('.bidbuttons', [
                ['1', '2', '3', '4', '5', '6', '7'].map(level =>  {
                    var option = new BidModel(bid);
                    option.level = level;
                    return m('a', {
                        class: classNames(
                            'suit',
                            'mdl-button', 'mdl-cell',
                            'mdl-cell--6-col',
                            'mdl-cell--4-col-tablet',
                            'mdl-cell--2-col-phone',
                        ),
                        onclick: () => bid.level = level,
                    }, option.markup());
                }),
            ]);
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
