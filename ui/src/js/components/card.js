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

})()
