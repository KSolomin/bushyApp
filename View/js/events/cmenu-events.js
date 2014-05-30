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

$(document).off('contextmenu.cmenu', '.element').on('contextmenu.cmenu', '.element', function (e) {
    'use strict';
    var selectedElement;

    e.preventDefault();
    e.stopPropagation();

    selectedElement = $(this);
    bushApp.cmenu.hide('.create');
    bushApp.cmenu.show('.remove');
    bushApp.cmenu.position('.remove', e.pageX, e.pageY);

    $('#remove-element').off('click.cmenu').on('click.cmenu', function () {

        bushApp.node.removeConnectedArcs(selectedElement);
        selectedElement.remove();

        $(this).off('click.cmenu');
    });

    $(document).off('click.cmenu').on('click.cmenu', function () {
        bushApp.cmenu.hide('.remove');
        $(this).off('click.cmenu');
    });
});