var model = {};

(function() {

    model = model || {};

    model.Set = function(data) {
        data = data || {};
        this._id = data._id || '';
        this.players = data.players || [];
        this.tables = data.tables || [];
    };

    model.Table = function(data) {
        data = data || {};
        this._id = data._id || '';
        this.deal = data.deal || new model.Deal();
        this.bids = data.bids || [];
    };

    model.Deal = function(data) {
        data = data || {};
        this._id = data._id || '';
        this.dealer = data.dealer || 'N';
        this.hands = data.hands || [
            new model.Hand(),
            new model.Hand(),
            new model.Hand(),
            new model.Hand(),
        ];
    };

    model.Hand = function(data) {
        data = data || {};
        this._id = data._id || '';
        this.spades = data.spades || '2345';
        this.hearts = data.hearts || '234';
        this.diamonds = data.diamonds || '234';
        this.clubs = data.clubs || '234';
    };

})();
