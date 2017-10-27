
(function() {

    var sets = [
        new SetModel({_id: '1', name: 'one', active: true}),
        new SetModel({_id: '2', name: 'two'}),
        new SetModel({_id: '3', name: 'three', active: true}),
    ];

    var app = new AppModel({
        sets: sets,
    })

    window.onload = function() {
        m.route(document.body, '/', {
            '/': {
                onmatch: function() {
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
                onmatch: function() {
                    m.route.set('/sets/mine/all');
                },
            },
            '/sets/mine/:filter': {
                render: function() {
                    var filter = () => true;
                    switch (m.route.param('filter')) {
                        case 'active':
                            filter = (set) => set.active;
                            break;
                        case 'waiting':
                            filter = (set) => !set.active;
                            break;
                    }
                    return m(Layout, m(Sets, {
                        _state: app,
                        _filter: filter,
                    }));
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

