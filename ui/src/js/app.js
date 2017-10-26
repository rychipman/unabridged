
window.onload = function() {

    m.route(document.body, '/', {

        '/': {
            onmatch: function() {
                    m.route.set('/sets/mine');
                /*
                if (Auth.isAuthenticated()) {
                    m.route.set('/sets/mine');
                } else {
                    m.route.set('/login');
                }
                */
            },
            render: function() {
                return m(Layout,
                    m('h1', 'This is the home page'),
                );
            },
        },

        '/sets/mine': {
            render: function() {
                return m(Layout, m(Sets));
            },
        },

        '/login': {
            render: function() {
                return m(Layout, m(Login));
            },
        },

    });

}
