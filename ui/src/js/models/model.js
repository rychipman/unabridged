
(function() {

    AppModel = function(data) {
        data = data || {};
        this.sets = data.sets || [];
        this.removeSet = (id) => {
            for (var i=0; i<this.sets.length; i++) {
                var set = this.sets[i];
                if ( set._id === id ){
                    this.sets.splice(i, 1)
                    return
                }
            }
        };
        this.addSet = () => {
            var last = this.sets.slice(-1)[0];
            var set = new SetModel({
                _id: last._id + 1,
            });
            this.sets.push(set);
        };
    };

    SetModel = function(data) {
        data = data || {};
        this._id = data._id || 'default_id';
        this.name = data.name || 'defaultname';
        this.disabled = data.disabled || false;
        this.active = data.active;
    };

})()
