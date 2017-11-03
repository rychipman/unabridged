
(function() {

    Header = {
        view: function(vnode) {
            var headerClasses = classNames(
                'mdl-layout__header',
                'mdl-color--grey-100',
                'mdl-color-text--grey-600',
            );
            return m('header', { class: headerClasses },
                m('.mdl-layout__header-row',
                    m('span.mdl-layout-title', m(Breadcrumbs, {
                        _path: ['Set 2', 'Table 1'],
                    })),
                    m('.mdl-layout-spacer'),
                    m('span.mdl-layout-title', 'Bridge Bidder'),
                ),
            );
        },
    };

    Breadcrumbs = {
        view: (vnode) => {
            var path = vnode.attrs._path;
            return [
                m('a.mdl-button', 'Home'),
                path.map(item => {
                    return [ m('span', ' > '), m('a.mdl-button', item) ];
                }),
            ];
        },
    };

})()
