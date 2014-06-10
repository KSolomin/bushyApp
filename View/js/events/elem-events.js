/*elem-events.js*/
/*global $, bushApp*/

function showHideConnectiveBorders(type) {

    'use strict';

    $(document).off('mouseenter.' + type, '.' + type).on('mouseenter.' + type, '.' + type, function () {

        bushApp.element.showBorders($(this));

        $(this).off('mouseleave.' + type).on('mouseleave.' + type, function () {

            bushApp.element.hideBorders($(this));

            $(this).off('mouseleave.' + type);
        });
    });
}

$(document).off('mouseenter.element', '.element').on('mouseenter.element', '.element', function () {
    'use strict';

    bushApp.element.ports.show($(this));

    $(this).off('mouseleave.element').on('mouseleave.element', function () {
        bushApp.element.ports.hide($(this));

        $(this).off('mouseleave.element');
    });
});     //show ports on hover;

$(document).off('mousedown.element').on('mousedown.element', '.element', function (e) {
    'use strict';

    var mouseIsDown, moreThanDelta, startPos, mousePos, mousePosWithOffset, nodePos, delta, deltaX, deltaY, selectedNode, mouseOffset, app, pattern;

    app = window.parent.bushyApp;
    selectedNode    = $(this);
    moreThanDelta   = false;
    mouseIsDown     = true;
    delta           = 20;
    pattern         = /^(\w)(\d+)$/;

    startPos = {
        x: e.pageX,
        y: e.pageY
    };

    nodePos = {
        x: parseInt(selectedNode.css('left'), 10),
        y: parseInt(selectedNode.css('top'), 10)
    };

    mouseOffset = {
        x: startPos.x - nodePos.x,
        y: startPos.y - nodePos.y
    };


    $(document).off('mousemove.element').on('mousemove.element', function (e) {
        if (mouseIsDown) {

            mousePos = {
                x: e.pageX,
                y: e.pageY
            };

            mousePosWithOffset = {
                x: e.pageX - mouseOffset.x,
                y: e.pageY - mouseOffset.y
            };

            deltaX = Math.abs(mousePos.x - startPos.x);
            deltaY = Math.abs(mousePos.y - startPos.y);

            if (deltaX > delta || deltaY > delta) {
                moreThanDelta = true;
            }

            if (moreThanDelta) {
                bushApp.element.setPosition(selectedNode, mousePosWithOffset);
                bushApp.node.redrawConnectedArcs(selectedNode);
            }
        }
    });

    $(document).off('mouseup.element').on('mouseup.element', function () {
        mouseIsDown     = false;
        moreThanDelta   = false;

        bushApp.grid.snap(selectedNode);

        var res = pattern.exec(selectedNode.attr('id'));
        var result = {
            type: res[1],
            id: res[2]
        };

        if (result.type == 'n') {
            app.bushyModel.getEventById(parseInt(result.id)).setPosition(bushApp.element.getPosition(selectedNode));
            console.log(app.bushyModel.getEventById(result.id).position);
        } else {
            app.bushyModel.getUnionById(parseInt(result.id)).setPosition(bushApp.element.getPosition(selectedNode));
            console.log(app.bushyModel.getUnionById(result.id).position);
        }

        $(document).off('mousemove.element');
        $(document).off('mouseup.element');
    });  //continue from here;
});      //move elements with mouse;

showHideConnectiveBorders('influx');
showHideConnectiveBorders('furcation');
showHideConnectiveBorders('conflux');