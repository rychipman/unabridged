(function() {

    view = view || {};

    view.Layout = {
        view: (vnode) => {
            return [
                m('header', m('h1', 'Bridge the Gap')),
                m('hr'),
                m('section.content', vnode.children),
                m('hr'),
                m(view.Footer),
            ];
        },
    };

    view.Footer = {
        view: (vnode) => {
            return m('footer', [
                m('p', 'this is the footer'),
                m('a[href=/]', { oncreate: m.route.link }, 'Home'),
            ]);
        },
    };

})();
