/*cmenu-events.js*/
/*global $, bushApp*/

function createLiHandler(type) {
    'use strict';

    $('#create-' + type).off('click.cmenu').on('click.cmenu', function (e) {

        var elem, mousePos;

        e.preventDefault();
        e.stopPropagation();

        mousePos = {
            x: e.pageX,
            y: e.pageY
        };

        switch (type) {
            case 'node':
                elem = bushApp.node.create();
                break;
            case 'ia':
                elem = bushApp.node.create('ia');
                break;
            case 'ib':
                elem = bushApp.node.create('ib');
                break;
            case 'ii':
                elem = bushApp.node.create('ii');
                break;
            case 'iii':
                elem = bushApp.node.create('iii');
                break;
            case 'influx':
                elem = bushApp.influx.create();
                break;
            case 'furcation':
                elem = bushApp.furcation.create();
                break;
            case 'conflux':
                elem = bushApp.conflux.create();
                break;
            default:
                window.console.log('Unknown type of element!');
                return;
        }

        bushApp.cmenu.hide('.create');
        bushApp.element.setPosition(elem, mousePos);
        bushApp.grid.snap(elem);

        $(this).off('click.cmenu');
    });
}   //reusable template;

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