(function() {

    SuitModel = function(str) {
        var suit = str[0].toUpperCase();
        switch (suit) {
        case 'S':
        case 'H':
        case 'D':
        case 'C':
        case 'N':
            this.suit = suit;
        }

        this.name = () => {
            switch (suit) {
            case 'S':
                return 'spades';
            case 'H':
                return 'hearts';
            case 'D':
                return 'diamonds';
            case 'C':
                return 'clubs';
            case 'N':
                return 'notrump';
            }
        };

        this.symbol = () => {
            switch (suit) {
            case 'S':
                return '\u2660';
            case 'H':
                return '\u2665';
            case 'D':
                return '\u2666';
            case 'C':
                return '\u2663';
            case 'N':
                return 'NT';
            }
        };
    };

    NOTRUMP = new SuitModel('n');
    SPADES = new SuitModel('s');
    HEARTS = new SuitModel('h');
    DIAMONDS = new SuitModel('d');
    CLUBS = new SuitModel('c');

    BidModel = function(data) {
        if (data instanceof BidModel) {
            this.pass = data.pass;
            this.dbl = data.dbl;
            this.rdbl = data.rdbl;
            this.level = data.level;
            this.suit = data.suit;
        } else if (data instanceof SuitModel) {
            this.suit = data;
        } else if (data) {
            switch (data[0].toUpperCase()) {
            case 'P':
                this.pass = true;
                break;
            case 'D':
                this.dbl = true;
                break;
            case 'R':
                this.rdbl = true;
                break;
            default:
                this.level = data[0];
                this.suit = new SuitModel(data.slice(1));
            }
        }

        this.empty = () => {
            return !(this.pass || this.dbl || this.rdbl || this.level || this.suit);
        };

        this.pretty = () => {
            if (this.pass) {
                return 'Pass';
            } else if (this.dbl) {
                return 'Dbl';
            } else if (this.rdbl) {
                return 'Rdbl';
            }

            if (!this.suit) {
                return '__empty__';
            }

            var level = this.level || '?';
            return level + this.suit.symbol();
        };

        this.markup = () => {
            if (this.pass) {
                return 'Pass';
            } else if (this.dbl) {
                return 'Dbl';
            } else if (this.rdbl) {
                return 'Rdbl';
            }

            if (!this.suit) {
                return '__empty__';
            }

            var level = this.level || '?';

            var attrs = {
                class: 'suit ' + this.suit.name(),
            };

            return m('span', [
                level,
                m('span', attrs, this.suit.symbol()),
            ]);
        };

        this.submit = () => {
            console.log('submitted!');
        };

        this.canSubmit = () => {
            return (this.pass || this.dbl || this.rdbl || (this.suit && this.level));
        };
    }

    DBL = new BidModel('double');
    RDBL = new BidModel('redouble');
    PASS = new BidModel('pass');

    SetModel = function(data) {
        data = data || {};
        this._id = data._id || 'default_id';
        this.name = data.name || 'defaultname';
        this.active = data.active || false;
        this.players = data.players || [];
        this.tables = data.tables || [];
        this.findTableById = (id) => {
            for (tab of this.tables) {
                if ( tab._id === id ) {
                    return tab;
                }
            }
        };
    };

    TableModel = function(data) {
        data = data || {};
        this._id = data._id || 'default_id';
        this.active = true;
        this.deal = data.deal || new DealModel();
        this.bids = data.bids || [];
        this.makeBid = (bid) => {
            this.bids.push(bid);
        };
        this.paginatedBids = () => {
            var bids = this.bids.slice();
            var pages = [];
            var dealer = 'E';
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

            // paginate bids
            for ( var i=0; i+4<=bids.length; i+=4 ) {
                pages.push(bids.slice(i, i+4));
            }

            return pages;
        };
    };

    DealModel = function(data) {
        data = data || {};
        this._id = data._id || '';
        this.dealer = data.dealer || 'N';
        this.hands = data.hands || [
            new HandModel(),
            new HandModel(),
            new HandModel(),
            new HandModel(),
        ];
    };

    HandModel = function(data) {
        data = data || {};
        this._id = data._id || '';
        this.spades = data.spades || '2345';
        this.hearts = data.hearts || '234';
        this.diamonds = data.diamonds || '234';
        this.clubs = data.clubs || '234';
    };

})();
