
(function() {

    Header = {
        view: function(vnode) {
            var headerAttrs = {
                class: classNames(
                    'mdl-layout__header',
                ),
            };
            var buttonAttrs = {
                class: classNames(
                    'mdl-button', 'mdl-button--raised',
                    'mdl-button--accent',
                ),
                onclick: () => m.route.set('/login'),
            };
            return m('header', headerAttrs, m('.mdl-layout__header-row',
                m('span.mdl-layout-title', 'Bridge Bidder'),
                m('.mdl-layout-spacer'),
                m('a', buttonAttrs, 'Log In'),
            ));
        },
    };

})()
