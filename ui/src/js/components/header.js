
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
                    m('span.mdl-layout-title', 'Bridge Bidder'),
                    m('.mdl-layout-spacer'),
                ),
            );
        },
    };

})()
