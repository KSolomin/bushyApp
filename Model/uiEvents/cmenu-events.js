/*cmenu-events.js*/
/*global $, bushApp*/

function createLiHandler(type) {
    'use strict';
    // это ОЧЕНЬ кривое решение - создавать обработчик событий который биндится к модели из iframe
    // пока не знаю как сделать лучше
    var app = window.parent.bushyApp;
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
                elem = app.addEvent();
                break;
            case 'ia':
                elem = app.addEvent('ia');
                break;
            case 'ib':
                elem = app.addEvent('ib');
                break;
            case 'ii':
                elem = app.addEvent('ii');
                break;
            case 'iii':
                elem = app.addEvent('iii');
                break;
            case 'influx':
                elem = app.addUnion('influx');
                break;
            case 'furcation':
                elem = app.addUnion('furcation');
                break;
            case 'conflux':
                elem = app.addUnion('conflux');
                break;
            default:
                window.console.log('Fuck you: Unknown type of element!');
                return;
        }

        app.bushyView.cmenu.hide('.create');
        app.bushyView.element.setPosition(elem, mousePos);
        app.bushyView.grid.snap(elem);

        $(this).off('click.cmenu');
    });

    $(document).off('contextmenu.cmenu', '.element').on('contextmenu.cmenu', '.element', function (e) {
        'use strict';
        var selectedElement;
        var app = window.parent.bushyApp;

        e.preventDefault();
        e.stopPropagation();

        selectedElement = $(this);

        var elementId = selectedElement.attr('id').substr(1);
        var elementType = selectedElement.attr('id').substr(0, 1);

        bushApp.cmenu.hide('.create');
        bushApp.cmenu.show('.remove');
        bushApp.cmenu.position('.remove', e.pageX, e.pageY);

        $('#remove-element').off('click.cmenu').on('click.cmenu', function () {

         bushApp.node.removeConnectedArcs(selectedElement);

            switch (elementType) {
                case 'n':
                    app.removeEvent(elementId);
                    break;
                case 'f':
                    app.removeUnion(elementId);
                    break;
                case 'i':
                    app.removeUnion(elementId);
                    break;
                case 'c':
                    app.removeUnion(elementId);
                    break;
                default:
                    console.log('Unknown type of element');
            }


         selectedElement.remove();

         $(this).off('click.cmenu');
         });

        $(document).off('click.cmenu').on('click.cmenu', function () {
            bushApp.cmenu.hide('.remove');
            $(this).off('click.cmenu');
        });
    });
};