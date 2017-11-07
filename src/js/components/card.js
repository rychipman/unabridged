(function() {

    Card = {
        view: function(vnode) {
            var icons = vnode.attrs.icons;
            cardClasses = classNames(
                'fadein',
                'card', 'mdl-card',
                'mdl-cell', 'mdl-cell--4-col',
                'mdl-color--white', 'mdl-color-text--grey-600',
                'mdl-shadow--4dp',
                {'disabled': !vnode.attrs.active},
            );
            return m('div', {
                key: vnode.attrs.key,
                class: cardClasses,
            }, [
                m('h2.mdl-card__title.mdl-card--expand.mdl-color-text--grey-700',
                    vnode.attrs.title,
                ),
                m('.mdl-card__actions', Object.keys(icons).map(key => {
                    var icon = key;
                    var handler = icons[key] || function(){};
                    return m('.mdl-button.mdl-button--icon',
                        m('i.material-icons', {
                            onclick: handler,
                        }, icon),
                    );

                })),
            ]);
        },
    };

    GridCard = {
        view: (vnode) => {
            var key = vnode.attrs._key || '';
            var width = vnode.attrs._width || '4';
            var title = vnode.attrs._title || 'Grid Card Title';
            var actions = vnode.attrs._actions || [];

            var cardAttrs = {
                key: key,
                class: classNames(
                    'fadein',
                    'card', 'mdl-card', 'mdl-cell',
                    'mdl-cell--' + width + '-col',
                    'mdl-shadow--4dp',
                ),
            };

            var titleAttrs = {
                class: classNames(
                    'mdl-card__title',
                    'mdl-color-text--white',
                    'mdl-color--primary',
                ),
            };

            var contentAttrs = {
                class: classNames(
                    'mdl-grid', 'inner-grid',
                    'mdl-card--expand',
                ),
            };

            var actionElts = m('.mdl-card__actions.mdl-card--border', [
                //m('.mdl-layout-spacer'),
                Object.keys(actions).map(action => {
                    var handler = actions[action];
                    var disabled = true;
                    if (handler) {
                        disabled = false;
                    }
                    var btnAttrs = {
                        class: classNames(
                            'mdl-button',
                            'mdl-button--colored',
                        ),
                        disabled: disabled,
                        onclick: handler,
                    };
                    return [
                        m('a', btnAttrs, action),
                     //   m('.mdl-layout-spacer'),
                    ];
                }),
            ]);

            if ( actions.length === 0 ) {
                actionElts = [];
            }

            return m('.gridcard', cardAttrs, [
                m('div', titleAttrs, m('h2.mdl-card__title-text', title)),
                m('.card-contents', contentAttrs, vnode.children),
                actionElts,
            ]);
        },
    };

})()
