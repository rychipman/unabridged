(function() {

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
            console.log(bid);
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
