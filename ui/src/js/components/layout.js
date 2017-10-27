
(function() {

    Layout = {

        oncreate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        onupdate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        view: function(vnode) {
            var app = vnode.attrs.app;
            var layoutClasses = classNames(
                'dashboard',
                'mdl-layout', 'mdl-js-layout',
                'mdl-layout--fixed-drawer', 'mdl-layout--fixed-header',
            )
            var mainClasses = classNames(
                'main-content',
                'mdl-layout__content',
                'mdl-color--grey-100',
            )
            return m('div', { class: layoutClasses },
                m(Header),
                m(Drawer, { app: app }),
                m('main', { class: mainClasses }, [
                    vnode.children,
                ]),
            );
        },

    };

})()
