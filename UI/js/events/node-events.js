/*node-events.js*/
/*global $, bushApp*/

$(document).off('dblclick.node', '.node').on('dblclick.node', '.node', function (e) {
    'use strict';

    var currentNode = $(this), timer;

    timer = setInterval(function () {
        bushApp.node.resize(currentNode);
        bushApp.node.ports.setPosition(currentNode);
        bushApp.node.redrawConnectedArcs(currentNode);
    }, 50);

    currentNode.off('mousemove.element');

    currentNode.children('p')
        .attr('contenteditable', true)
        .focus();

    currentNode.off('click.node').on('click.node', function (e) {

        e.stopPropagation();
    });

    $(document).off('click.node contextmenu.node').on('click.node contextmenu.node', function () {

        clearInterval(timer);
        timer = null;

        currentNode.children('p').attr('contenteditable', false);
        currentNode.on('mousemove.element');

        $(this).off('click.node contextmenu.node');
        currentNode.off('click.node');
    });

});        //make content editable on double click;