/*port-events.js*/
/*global $, bushApp*/

$(document).off('mousedown.port', '.port').on('mousedown.port', '.port', function (e) {
    'use strict';
    e.stopPropagation();

    var startPort = $(this), canvas, arcType, mouseIsDown = true;

    canvas  = bushApp.arc.create(startPort);
    arcType = bushApp.arc.setType(canvas, startPort);

    if (mouseIsDown) {
        $(document).on('mousemove.port', function (e) {
            var mousePos, startPos;

            mousePos = { x: e.pageX, y: e.pageY };
            startPos = bushApp.port.getPosition(startPort);

            bushApp.arc.connectPortToMouse(canvas, startPos, mousePos, arcType);
        });

        $(document).on('mouseup.port', function (e) {
            var mousePos, closest, elementType;

            closest     = { port: null, dist: null };
            mousePos    = { x: e.pageX, y: e.pageY };
            mouseIsDown = false;

            closest     = bushApp.element.getClosestPort(startPort, mousePos);
            elementType = bushApp.element.getType(closest.port.parent('.element'));

            if (closest.dist < bushApp.arc.snapDistance) {
                bushApp.arc.connectPorts(canvas, startPort, closest.port);
                if (elementType === 'influx' || elementType === 'furcation' || elementType === 'conflux') {
                    canvas.next('.arrow').remove();
                }
            } else {
                bushApp.arc.remove(canvas);
            }

            $(document).off('mousemove.port');
            $(this).off('mouseup.port');
        });
    }
});