/*cmenu-events.js*/
/*global $, bushApp*/

function createLiHandler(type) {
    'use strict';
    var app = window.parent.bushyApp;
    $('#create-' + type).off('click.cmenu').on('click.cmenu', function (e) {

        var elem, mousePos, elemType;

        e.preventDefault();
        e.stopPropagation();

        mousePos = {
            x: e.pageX,
            y: e.pageY
        };

        switch (type) {
            case 'node':
                elem = app.addEvent();
                elemType = 'node';
                break;
            case 'ia':
                elem = app.addEvent('ia');
                elemType = 'node';
                break;
            case 'ib':
                elem = app.addEvent('ib');
                elemType = 'node';
                break;
            case 'ii':
                elem = app.addEvent('ii');
                elemType = 'node';
                break;
            case 'iii':
                elem = app.addEvent('iii');
                elemType = 'node';
                break;
            case 'influx':
                elem = app.addUnion('influx');
                elemType = 'union';
                break;
            case 'furcation':
                elem = app.addUnion('furcation');
                elemType = 'union';
                break;
            case 'conflux':
                elem = app.addUnion('conflux');
                elemType = 'union';
                break;
            default:
                window.console.log('Unknown type of element!');
                return;
        }

        app.bushyView.cmenu.hide('.create');
        app.bushyView.element.setPosition(elem, mousePos);
        app.bushyView.grid.snap(elem);

        var position = app.bushyView.element.getPosition(elem);
        console.log('It\'s position');
        if (elemType == 'node') {
            app.bushyModel.getEventById(app.eventCounter - 1).setPosition(position);
            console.log(app.bushyModel.getEventById(app.eventCounter - 1).position);
        } else {
            app.bushyModel.getUnionById(app.unionCounter - 1).setPosition(position);
            console.log(app.bushyModel.getUnionById(app.unionCounter - 1).position);
    }

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

        //проверка, какого типа ивент
        if (elementType == 'n') {
            if (app.bushyModel.getEventById(elementId).type == 'ii' &&
                (typeof app.bushyModel.getEventById(elementId).externalUnion != ('number' || 'object'))) {
                $(document).find('#multi-flux').show();
            } else {
                $(document).find('#multi-flux').hide();
            }
        } else {
            $(document).find('#multi-flux').hide();
        }

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

        $('#multi-flux').off('click.cmenu').on('click.cmenu', function () {
            if (app.bushyModel.getEventById(elementId).multifluxed) {
                app.bushyModel.getEventById(elementId).setMultifluxed(false);
                var rightPort = $(selectedElement).find('#' + elementType + elementId+ '_7');
                rightPort.attr('id', elementType + elementId + '_3');
            } else {
                app.bushyModel.getEventById(elementId).setMultifluxed(true);
                var rightPort = $(selectedElement).find('#' + elementType + elementId+ '_3');
                rightPort.attr('id', elementType + elementId + '_7');
            }
            console.log('Currently multifluxed: ' + app.bushyModel.getEventById(elementId).multifluxed);
        });

        $(document).off('click.cmenu').on('click.cmenu', function () {
            bushApp.cmenu.hide('.remove');
            $(this).off('click.cmenu');
        });
    });
};