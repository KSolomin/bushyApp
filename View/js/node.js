/*node.js*/
/*global $, jQuery, bushApp*/

bushApp.node = {
    pattern:    /^n(\d+)$/,
    width:      bushApp.grid.cellsize * 14,
    height:     bushApp.grid.cellsize * 6,
    ports:  {
        setPosition:   function (node) {
            'use strict';

            var nodeDims, nodeID, ports;

            ports   = node.children('.port');
            nodeID  = node.attr('id');
            nodeDims = {
                width:  parseInt(node.css('width'), 10),
                height: parseInt(node.css('height'), 10)
            };

            ports.filter('#' + nodeID + '_1')
                .css('top', Math.floor(nodeDims.height / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize + 'px');

            ports.filter('#' + nodeID + '_2')
                .css('left', Math.floor(nodeDims.width / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize + 'px');

            ports.filter('#' + nodeID + '_3')
                .css('left', Math.floor(nodeDims.width / bushApp.grid.cellsize) * bushApp.grid.cellsize + 'px')
                .css('top', Math.floor(nodeDims.height / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize + 'px');

            ports.filter('#' + nodeID + '_4')
                .css('left', Math.floor(nodeDims.width / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize + 'px')
                .css('top', Math.floor(nodeDims.height / bushApp.grid.cellsize) * bushApp.grid.cellsize + 'px');

            ports.filter('#' + nodeID + '_7')
                .css('left', Math.floor(nodeDims.width / bushApp.grid.cellsize) * bushApp.grid.cellsize + 'px')
                .css('top', Math.floor(nodeDims.height / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize + 'px');
        }
    },
    create:                 function (type) {
        'use strict';
        var node, nodeID;
        nodeID = bushApp.element.generateID('node');
        switch(type) {
            case 'ia':
                $('<div></div>')
                .attr('id', nodeID)
                .attr('class', 'element node')
                .insertBefore($('script').first())
                .css('width', bushApp.node.width + 'px')
                .css('height', bushApp.node.height + 'px')
                    .append($('<p>Event description goes here.</p>'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_3'));

                node = $('#' + nodeID);
                bushApp.node.ports.setPosition(node);
                return node;
                break;

            case 'ib':
                $('<div></div>')
                    .attr('id', nodeID)
                    .attr('class', 'element node')
                    .insertBefore($('script').first())
                    .css('width', bushApp.node.width + 'px')
                    .css('height', bushApp.node.height + 'px')
                    .append($('<p>Event description goes here.</p>'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_4'));

                node = $('#' + nodeID);
                bushApp.node.ports.setPosition(node);
                return node;
                break;

            case 'ii':
                $('<div></div>')
                    .attr('id', nodeID)
                    .attr('class', 'element node')
                    .insertBefore($('script').first())
                    .css('width', bushApp.node.width + 'px')
                    .css('height', bushApp.node.height + 'px')
                    .append($('<p>Event description goes here.</p>'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_1'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_2'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_3')) ///!!!!!
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_4'));

                node = $('#' + nodeID);
                bushApp.node.ports.setPosition(node);
                return node;
                break;

            case 'iii':
                $('<div></div>')
                    .attr('id', nodeID)
                    .attr('class', 'element node')
                    .insertBefore($('script').first())
                    .css('width', bushApp.node.width + 'px')
                    .css('height', bushApp.node.height + 'px')
                    .append($('<p>Event description goes here.</p>'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_1'));

                node = $('#' + nodeID);
                bushApp.node.ports.setPosition(node);
                return node;
                break;
            default:
                $('<div></div>')
                    .attr('id', nodeID)
                    .attr('class', 'element node')
                    .insertBefore($('script').first())
                    .css('width', bushApp.node.width + 'px')
                    .css('height', bushApp.node.height + 'px')
                    .append($('<p>Event description goes here.</p>'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_1'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_2'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_3'))
                    .append($('<div></div>').attr('class', 'port hidden').attr('id', nodeID + '_4'));

                node = $('#' + nodeID);
                bushApp.node.ports.setPosition(node);
                return node;
                break;
        }
    },
    resize:                 function (node) {
        'use strict';

        var p, padding;

        p = {
            height: document.getElementById(node.attr('id')).children[0].clientHeight
        };

        padding = {
            top: parseInt(node.css('padding-top'), 10),
            bottom: parseInt(node.css('padding-bottom'), 10)
        };

        node.css('height', Math.ceil((p.height + padding.top + padding.bottom) / bushApp.grid.cellsize) * bushApp.grid.cellsize);
    },
    getConnectedArcs:       function (node) {
        'use strict';

        var portArcs, nodeArcs = [], i;

        node.children('.port').each(function () {
            portArcs = bushApp.port.getConnectedArcs($(this));

            for (i = 0; i < portArcs.length; i += 1) {
                nodeArcs.push(portArcs[i]);
            }
        });

        return nodeArcs;
    },
    redrawConnectedArcs:    function (node) {
        'use strict';

        var arcs, arcPorts, i;

        arcs = bushApp.node.getConnectedArcs(node);

        if (arcs.length !== 0) {
            arcPorts = {
                ref: null,
                pos: { start: null, end: null}
            };

            for (i = 0; i < arcs.length; i += 1) {
                arcPorts.ref = bushApp.arc.getPortsFromArc(arcs[i]);

                arcPorts.pos.start  = bushApp.port.getPosition(arcPorts.ref.start);
                arcPorts.pos.end    = bushApp.port.getPosition(arcPorts.ref.end);

                if (arcs[i].hasClass('lineToRight')) { bushApp.arc.lineToRight(arcs[i], arcPorts.pos.start, arcPorts.pos.end); }
                if (arcs[i].hasClass('lineToBottom')) { bushApp.arc.lineToBottom(arcs[i], arcPorts.pos.start, arcPorts.pos.end); }
                if (arcs[i].hasClass('lineFromFurc')) { bushApp.arc.lineFromFurc(arcs[i], arcPorts.pos.start, arcPorts.pos.end); }
                if (arcs[i].hasClass('lineToConflux')) { bushApp.arc.lineToConflux(arcs[i], arcPorts.pos.start, arcPorts.pos.end); }
                if (arcs[i].hasClass('lineToInflux')) { bushApp.arc.lineToConflux(arcs[i], arcPorts.pos.start, arcPorts.pos.end); }
            }
        }

    },
    removeConnectedArcs:    function (node) {
        'use strict';

        var connectedArcs, i;

        connectedArcs = bushApp.node.getConnectedArcs(node);

        for (i = 0; i < connectedArcs.length; i += 1) {
            if (connectedArcs[i].next('canvas').length !== 0) {
                connectedArcs[i].next('canvas').remove();
            }
            connectedArcs[i].parent('div').remove();
            connectedArcs[i].remove();
        }
    }
};


