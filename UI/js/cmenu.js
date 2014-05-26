/*cmenu.js*/
/*global $, bushApp*/

bushApp.cmenu = {
    show:       function (menuClass) {
        'use strict';

        $('.cmenu').filter(menuClass)
            .removeClass('hidden')
            .addClass('visible');
    },
    hide:       function (menuClass) {
        'use strict';

        $('.cmenu').filter(menuClass)
            .removeClass('visible')
            .addClass('hidden');
    },
    position:   function (menuClass, x, y) {
        'use strict';

        var cmenu, newPos;

        cmenu = {
            width:  $('.cmenu').filter('.create').width(),
            height: $('.cmenu').filter('.create').height(),
            margin: 20
        };

        newPos =  {
            x:  $(window).scrollLeft() + $(window).width() - cmenu.width - cmenu.margin,
            y:  $(window).scrollTop() + $(window).height() - cmenu.height - cmenu.margin
        };

        if (x > newPos.x) {
            x = newPos.x;
        }

        if (y > newPos.y) {
            y = newPos.y;
        }

        $('.cmenu').filter(menuClass)
            .css('left', x)
            .css('top', y);
    }
};