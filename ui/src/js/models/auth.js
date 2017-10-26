
(function() {

    AppModel = function(data) {
        data = data || {};
        this.sets = data.sets || [];
        this.removeSet = (id) => {
            console.log('removing' + id);
            for (var i=0; i<this.sets.length; i++) {
                var set = this.sets[i];
                if ( set._id === id ){
                    this.sets.splice(i, 1)
                    return
                }
            }
        };
    };

    SetModel = function(data) {
        data = data || {};
        this._id = data._id || 'default_id';
        this.name = data.name || 'defaultname';
        this.disabled = data.disabled || false;
    };

    Auth = {

        isAuthenticated: function() {
            return false;
        },

    }

})()
