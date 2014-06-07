$(document).off('contextmenu.cmenu').on('contextmenu.cmenu', function (e) {
    'use strict';

    e.preventDefault();
    bushApp.cmenu.hide('.remove');
    bushApp.cmenu.show('.create');
    bushApp.cmenu.position('.create', e.pageX, e.pageY);

    createLiHandler('node');
    createLiHandler('ia');
    createLiHandler('ib');
    createLiHandler('ii');
    createLiHandler('iii');
    createLiHandler('influx');
    createLiHandler('furcation');
    createLiHandler('conflux');

    $(document).off('click.cmenu').on('click.cmenu', function () {
        bushApp.cmenu.hide('.create');
        $(this).off('click.cmenu');
    });
});
