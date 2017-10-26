
(function() {

    Sets = {
        view: function(vnode) {
            var state = vnode.attrs._state;
            var sets = vnode.attrs._state.sets;
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );
            return m('div', {class: gridClasses}, [
                sets.map(function(set) {
                    return m(SetCard, {
                        _set: set,
                        _onremove: state.removeSet,
                    });
                }),
                m(NewSetCard),
            ]);
        },
    };

    Login = {

        view: function(vnode) {
            var gridClasses = classNames(
                'main-grid',
                'mdl-grid',
            );

            return m('div', {class: gridClasses}, [
                m('.mdl-layout-spacer'),
                m(GiantCard, {
                    title: 'Login',
                    text: 'Submit',
                },),
                m('.mdl-layout-spacer'),
            ]);
        },
    };

})()
