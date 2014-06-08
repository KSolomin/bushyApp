/*port-events.js*/
/*global $, bushApp*/

$(document).off('mousedown.port', '.port').on('mousedown.port', '.port', function (e) {
    'use strict';

    e.stopPropagation();
    var app = window.parent.bushyApp;

    var startPort = $(this), canvas, arcType, mouseIsDown = true;

    var pattern = /^(\w)(\d+)_(\d$)/; // getting type, id and port
    var res = pattern.exec(startPort.attr('id'));

    var startElement = {
        type: res[1],
        id: res[2],
        portNum: res[3]
    };

    canvas  = app.bushyView.arc.create(startPort);
    arcType = app.bushyView.arc.setType(canvas, startPort);

    if (mouseIsDown) {
        $(document).on('mousemove.port', function (e) {
            var mousePos, startPos;

            mousePos = { x: e.pageX, y: e.pageY };
            startPos = app.bushyView.port.getPosition(startPort);

            app.bushyView.arc.connectPortToMouse(canvas, startPos, mousePos, arcType);
        });

        $(document).on('mouseup.port', function (e) {
            var mousePos, closest;

            mousePos    = { x: e.pageX, y: e.pageY };
            mouseIsDown = false;

            closest = app.bushyView.element.getClosestPort(startPort, mousePos);
            var res = pattern.exec(closest.port.attr('id'));

            var endElement = {
                type: res[1],
                id: res[2],
                portNum: res[3]
            }


            if (closest.dist < app.bushyView.arc.snapDistance) {
                app.connector.setConnection(startElement, endElement);

                // поооолная чушь:
                app.bushyView.arc.connectPorts(canvas, startPort, closest.port);
                 if (endElement.type === 'i' || endElement.type === 'f' || endElement.type === 'c') {
                     canvas.next('.arrow').remove();
                 }
            } else {
                app.bushyView.arc.remove(canvas);
            }

            $(document).off('mousemove.port');
            $(this).off('mouseup.port');
        });
    }
});