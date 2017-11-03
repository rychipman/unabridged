
(function() {

    AppModel = function(data) {
        data = data || {};
        this.auth = data.auth || new AuthModel();
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
        this.findSetById = (id) => {
            for (set of this.sets) {
                if ( set._id === id ) {
                    return set;
                }
            }
        };
        this.findTableById = (id) => {
            for (set of this.sets) {
                var tab = set.findTableById(id);
                if ( tab ) {
                    return tab;
                }
            }
        };
    };

    AuthModel = function(data) {
        data = data || {};
        this.currentUser = null;
        this.users = data.users || [];
        this.login = (email, password) => {
            var user = this.getUser(email);
            if (user && user.password === password) {
                this.currentUser = user;
            }
        };
        this.register = (email, password) => {
            var user = this.getUser(email);
            if (!user) {
                user = new UserModel({
                    email: email,
                    password: password,
                });
                this.users.push(user);
            }
        };
        this.getUser = (email) => {
            for (user of this.users) {
                if (user.email === email) {
                    return user;
                }
            }
        };
        this.logout = () => {
            this.currentUser = null;
        };
    };

    UserModel = function(data) {
        data = data || {};
        this.name = data.name || 'Your Name Here';
        this.email = data.email || 'default@example.com';
        this.password = data.password || 'password';
    };

})()
