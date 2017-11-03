
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
                m(Snackbar, { _app: app }),
            );
        },
    };

    Snackbar = {
        oncreate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },
        onupdate: function(vnode) {
            componentHandler.upgradeElement(vnode.dom);
        },

        view: (vnode) => {
            var cls = classNames(
                'mdl-snackbar', 'mdl-js-snackbar',
            );
            return m('div#snackbar', {class: cls}, [
                m('div.mdl-snackbar__text'),
                m('button.mdl-snackbar__action'),
            ]);
        },
    };

})()
