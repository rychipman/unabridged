
(function() {

    Sets = {
        view: function(vnode) {
            var state = vnode.attrs._state;
            var sets = vnode.attrs._state.sets;
            var filter = vnode.attrs._filter;
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );
            return m('div', {class: gridClasses}, [
                sets.filter(filter).map(function(set) {
                    return m(SetCard, {
                        _set: set,
                        _onremove: state.removeSet,
                    });
                }),
                m(NewSetCard, { _onadd: state.addSet }),
            ]);
        },
    };

    Set = {
        view: (vnode) => {
            var set = vnode.attrs._set;
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );
            return m('div', {class: gridClasses}, [
                set.tables.map(table => {
                    return m(TableCard, {
                        _table: table,
                        _name: 'Table ' + table._id,
                    });
                }),
            ]);
        },
    };

    SetCard = {
        view: function(vnode) {
            var set = vnode.attrs._set;
            var onremove = () => {
                vnode.attrs._onremove(set._id);
            };

            var icons = {
                delete: onremove,
            };
            if (set.active) {
                icons['more'] = () => m.route.set('/set/'+set._id);
                icons['star'] = () => {
                    var bar = document.querySelector('#snackbar');
                    bar.MaterialSnackbar.showSnackbar({
                        message: 'Notification text',
                        timeout: 1500,
                    });
                }
            };

            return m(Card, {
                disabled: !set.active,
                title: set.name,
                key: set._id,
                icons: icons,
            });
        },
    };

    NewSetCard = {
        view: function(vnode) {
            return m(Card, {
                title: 'Add New Set',
                icons: {
                    add: vnode.attrs._onadd,
                },
            });
        },
    };

})()
