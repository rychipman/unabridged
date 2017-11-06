
(function() {

    var sets = [
        new SetModel({name: 'one', active: true, tables: [
            new TableModel({
                bids: [PASS],
            }),
        ]}),
        new SetModel({name: 'two'}),
        new SetModel({name: 'three', active: true, tables: [
            new TableModel(),
            new TableModel(),
            new TableModel(),
        ]}),
    ];

    var app = new AppModel({
        sets: sets,
    });
    app.auth.register('ryan@ryanchipman.com', 'password');
    app.auth.login('ryan@ryanchipman.com', 'password');

    var render = function(children) {
        return m(Layout, { app: app }, children);
    };

    window.onload = function() {
        m.route.prefix('');
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
                    return render(m('h1', 'This is the home page'));
                },
            },
            '/table/:id': {
                render: () => {
                    var id = m.route.param('id');
                    var table = app.findTableById(id);
                    if (!table) {
                        console.log('no table');
                        m.route.set('/');
                        return;
                    }
                    return render(m(Table, { _table: table }));
                },
            },
            '/set/:id': {
                render: () => {
                    var id = m.route.param('id');
                    var set = app.findSetById(id);
                    return render(m(Set, { _set: set }));
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
                    return render(m(Sets, {
                        _state: app,
                        _filter: filter,
                    }));
                },
            },
            '/login': {
                render: function() {
                    return render(m(Login));
                },
            },
        });
    };

})()

