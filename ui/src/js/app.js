
(function() {

    var sets = [
        new SetModel({_id: '1', name: 'one', disabled: true}),
        new SetModel({_id: '2', name: 'two', disabled: true}),
        new SetModel({_id: '3', name: 'three', disabled: true}),
    ];

    var app = new AppModel({
        sets: sets,
    })

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
                    return m(Layout, m(Sets, { _state: app }));
                },
            },
            '/login': {
                render: function() {
                    return m(Layout, m(Login));
                },
            },
        });
    };

})()

