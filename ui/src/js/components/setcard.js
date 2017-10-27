
(function() {

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
                icons['more'] = () => console.log('view set');
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
