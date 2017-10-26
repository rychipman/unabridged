
(function() {

    SetCard = {
        view: function(vnode) {
            var set = vnode.attrs._set;
            var onremove = vnode.attrs._onremove;
            return m(Card, {
                ondelete: onremove,
                disabled: set.disabled,
                title: set.name,
                key: set._id,
                icons: ['share', 'delete'],
            });
        },
    };

    NewSetCard = {
        view: function(vnode) {
            return m(Card, {
                title: 'Add New Set',
                icons: ['more', 'add', 'star'],
            });
        },
    };

})()
