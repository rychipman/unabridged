
(function() {

    Drawer = {
        view: function(vnode) {
            var app = vnode.attrs.app;

            var links = [
                ['home', 'Home', '/'],
                ['list', 'My Sets', '/sets/mine'],
                ['play_arrow', 'Bid My Sets', '/sets/mine/active'],
                ['schedule', 'Sets in Flight', '/sets/mine/waiting'],
            ];

            var drawerClasses = classNames(
                'drawer',
                'mdl-layout__drawer',
                //'mdl-color--blue-grey-900', 'mdl-color-text--blue-grey-50',
            );

            return m('div', {class: drawerClasses}, [
                m(DrawerHeader, { user: app.auth.currentUser }),
                m(DrawerNav, { links: links }),
            ]);

        },
    };

    DrawerHeader = {
        oncreate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        onupdate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        view: (vnode) => {
            var user = vnode.attrs.user;
            var name;
            var email;
            if (user) {
                name = user.name;
                email = user.email;
            }

            return m('header.drawer-header', [
                m('span.mdl-layout-title', name || 'Not Logged In'),
                m('.user-dropdown',
                    m('span', email || 'Login or Register'),
                    m('span.mdl-layout-spacer'),
                    m('button#accbtn.mdl-button.mdl-js-button.mdl-button--icon',
                        m('i.material-icons', 'arrow_drop_down'),
                    ),
                ),
            ]);
        },
    };

    DrawerNav = {
        view: (vnode) => {
            var navClasses = classNames(
                'drawer-nav',
                'mdl-navigation',
                //'mdl-color--blue-grey-800',
            );
            var linkClasses = classNames(
                'drawer-nav-link',
                'mdl-navigation__link',
            );
            var iconClasses = classNames(
                'drawer-nav-icon',
                'material-icons',
            );
            return m('nav', {class: navClasses}, [
                vnode.attrs.links.map(function(row) {
                    var data = {
                        class: linkClasses,
                        href: row[2],
                        onclick: row[3],
                        oncreate: m.route.link,
                        onupdate: m.route.link,
                    };
                    return m('a', data, [
                        m('i', {class: iconClasses}, row[0]),
                        m('span', row[1]),
                    ]);
                }),
                m('.mdl-layout-spacer'),
                m('a', { class: linkClasses },
                    m('i', {class: iconClasses}, 'help'),
                    'Help',
                ),
            ]);
        },
    };
})()
