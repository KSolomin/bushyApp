/*arc.js*/
/*global $, bushApp*/

bushApp.arc = {
    lineWidth:          1,
    snapDistance:       30,
    pattern:            /arc-(\w+\d+_\d+)-(\w+\d+_\d+)$/,

    create:             function (startPort) {
        'use strict';

        var arrow, container, canvas, startID;

        startID = startPort.attr('id');

        container = $('<div></div>')
            .attr('class', 'arc-container')
            .insertBefore($('script').first());

        canvas = $('<canvas>Canvas is not supported!</canvas>')
                    .attr('class', 'arc')
                    .attr('id', 'arc-' + startID);

        canvas.appendTo(container);

        arrow = $('<canvas>Canvas is not supported!</canvas>')
                    .attr('class', 'arrow')
                    .attr('id', 'arrow-' + startID)
                    .insertAfter(canvas);

        arrow.appendTo(container);

        canvas.attr('width', bushApp.grid.width);
        canvas.attr('height', bushApp.grid.height);

        return canvas;
    },
    erase:              function (canvas) {
        'use strict';

        var ctx;

        ctx = document.getElementById(canvas.attr('id')).getContext('2d');
        ctx.clearRect(0, 0, canvas.attr('width'), canvas.attr('height'));
    },
    remove:             function (canvas) {
        'use strict';

        canvas.next().remove();
        canvas.parent().remove();
        canvas.remove();
    },

    lineToRight:        function (canvas, startPos, endPos) {
        'use strict';

        function drawCurve(canvas, startPos, endPos) {
            var ctx;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            ctx.lineWidth = bushApp.arc.lineWidth;

            startPos.x = Math.floor(startPos.x) - 0.5;  //draw strictly
            startPos.y = Math.floor(startPos.y) - 0.5;  //in pixels;

            endPos.x = Math.floor(endPos.x) - 0.5;      //draw strictly
            endPos.y = Math.floor(endPos.y) - 0.5;      //in pixels;

            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(startPos.x + Math.floor((endPos.x - startPos.x) / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize, startPos.y);
            ctx.lineTo(startPos.x + Math.floor((endPos.x - startPos.x) / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize, endPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.stroke();
        }
        function addArrow(canvas, endPos, angle) {
            var ctx, arr_image;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            arr_image = new Image();
            arr_image.src = 'img/arrow.png';

            canvas
                .css('left', endPos.x)
                .css('top', endPos.y);

            arr_image.onload = function () {

                canvas
                    .attr('width', arr_image.width)
                    .attr('height', arr_image.height)
                    .css('margin-left', -arr_image.width / 2)
                    .css('margin-top', -arr_image.height / 2);

                if (angle) {
                    canvas.css('transform', 'rotate(' + angle + 'deg)');
                }

                ctx.drawImage(arr_image, 0, 0);
            };
        }

        canvas.addClass('horizontal');
        bushApp.arc.erase(canvas);
        drawCurve(canvas, startPos, endPos);

        if (canvas.next().length !== 0) {
            addArrow(canvas.next(), endPos);
        }
    },
    lineToBottom:       function (canvas, startPos, endPos) {
        'use strict';

        function drawCurve(canvas, startPos, endPos) {
            var ctx;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            ctx.lineWidth = bushApp.arc.lineWidth;

            startPos.x = Math.floor(startPos.x) - 0.5;  //draw strictly
            startPos.y = Math.floor(startPos.y) - 0.5;  //in pixels;

            endPos.x = Math.floor(endPos.x) - 0.5;      //draw strictly
            endPos.y = Math.floor(endPos.y) - 0.5;      //in pixels;

            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(startPos.x, startPos.y + Math.floor((endPos.y - startPos.y) / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize);
            ctx.lineTo(endPos.x, startPos.y + Math.floor((endPos.y - startPos.y) / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.stroke();
        }
        function addArrow(canvas, endPos, angle) {
            var ctx, arr_image;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            arr_image = new Image();
            arr_image.src = 'img/arrow.png';

            canvas
                .css('left', endPos.x)
                .css('top', endPos.y);

            arr_image.onload = function () {

                canvas
                    .attr('width', arr_image.width)
                    .attr('height', arr_image.height)
                    .css('margin-left', -arr_image.width / 2)
                    .css('margin-top', -arr_image.height / 2);

                if (angle) {
                    canvas.css('transform', 'rotate(' + angle + 'deg)');
                }

                ctx.drawImage(arr_image, 0, 0);
            };
        }

        canvas.addClass('vertical lineToBottom');
        bushApp.arc.erase(canvas);
        drawCurve(canvas, startPos, endPos);

        if (canvas.next().length !== 0) {
            addArrow(canvas.next(), endPos, 90);
        }
    },
    lineFromFurc:       function (canvas, startPos, endPos) {
        'use strict';

        function drawCurve(canvas, startPos, endPos) {
            var ctx;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            ctx.lineWidth = bushApp.arc.lineWidth;

            startPos.x = Math.floor(startPos.x) - 0.5;  //draw strictly
            startPos.y = Math.floor(startPos.y) - 0.5;  //in pixels;

            endPos.x = Math.floor(endPos.x) - 0.5;      //draw strictly
            endPos.y = Math.floor(endPos.y) - 0.5;      //in pixels;

            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(startPos.x, endPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.stroke();
        }
        function addArrow(canvas, endPos, angle) {
            var ctx, arr_image;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            arr_image = new Image();
            arr_image.src = 'img/arrow.png';

            canvas
                .css('left', endPos.x)
                .css('top', endPos.y);

            arr_image.onload = function () {

                canvas
                    .attr('width', arr_image.width)
                    .attr('height', arr_image.height)
                    .css('margin-left', -arr_image.width / 2)
                    .css('margin-top', -arr_image.height / 2);

                if (angle) {
                    canvas.css('transform', 'rotate(' + angle + 'deg)');
                }
                ctx.beginPath();
                ctx.drawImage(arr_image, 0, 0);
            };
        }

        canvas.addClass('horizontal lineFromFurc');
        bushApp.arc.erase(canvas);
        drawCurve(canvas, startPos, endPos);

        window.console.log(canvas.next().attr('id'));

        if (canvas.next().length !== 0) {
            addArrow(canvas.next('canvas'), endPos, 0);
        }
    },
    lineToConflux:      function (canvas, startPos, endPos) {
        'use strict';

        function drawCurve(canvas, startPos, endPos) {
            var ctx;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            ctx.lineWidth = bushApp.arc.lineWidth;

            startPos.x = Math.floor(startPos.x) - 0.5;  //draw strictly
            startPos.y = Math.floor(startPos.y) - 0.5;  //in pixels;

            endPos.x = Math.floor(endPos.x) - 0.5;      //draw strictly
            endPos.y = Math.floor(endPos.y) - 0.5;      //in pixels;

            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(endPos.x, startPos.y);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.stroke();
        }

        canvas.addClass('horizontal lineToConflux');
        bushApp.arc.erase(canvas);
        drawCurve(canvas, startPos, endPos);
    },
    lineToInflux:       function (canvas, startPos, endPos) {
        'use strict';

        function drawCurve(canvas, startPos, endPos) {
            var ctx;

            ctx = document.getElementById(canvas.attr('id')).getContext('2d');
            ctx.lineWidth = bushApp.arc.lineWidth;

            startPos.x = Math.floor(startPos.x) - 0.5;  //draw strictly
            startPos.y = Math.floor(startPos.y) - 0.5;  //in pixels;

            endPos.x = Math.floor(endPos.x) - 0.5;      //draw strictly
            endPos.y = Math.floor(endPos.y) - 0.5;      //in pixels;

            ctx.beginPath();
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(startPos.x, startPos.y + Math.floor((endPos.y - startPos.y) / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize);
            ctx.lineTo(endPos.x, startPos.y + Math.floor((endPos.y - startPos.y) / (2 * bushApp.grid.cellsize)) * bushApp.grid.cellsize);
            ctx.lineTo(endPos.x, endPos.y);
            ctx.stroke();
        }

        canvas.addClass('vertical lineToBottom');
        bushApp.arc.erase(canvas);
        drawCurve(canvas, startPos, endPos);
    },

    getPortsFromArc:    function (canvas) {
        'use strict';

        var canvasID, arcRegExp, arcNums, ports;

        arcRegExp   = bushApp.arc.pattern;
        canvasID    = canvas.attr('id');

        arcNums     = arcRegExp.exec(canvasID);

        ports = {
            start:  $('#' + arcNums[1]),
            end:    $('#' + arcNums[2])
        };

        return ports;
    },
    setType:            function (canvas, port) {
        'use strict';
        var pNum, type;

        pNum = bushApp.port.getNumber(port);
        switch (pNum) {
        case 3:
            canvas.addClass('lineToRight');
            type = 'lineToRight';
            break;
        case 4:
            canvas.addClass('lineToBottom');
            type = 'lineToBottom';
            break;
        case 5:
            canvas.addClass('lineToRight');
            type = 'lineToRight';
            break;
        case 6:
            canvas.addClass('lineToBottom');
            type = 'lineToBottom';
            break;
        case 7:
            canvas.addClass('lineFromFurc');
            type = 'lineFromFurc';
            break;
        case 8:
            canvas.addClass('lineToRight');
            type = 'lineToRight';
            break;
        default:
            window.console.log('Unknown port number!');
            return false;
        }
        return type;
    },
    /*getType:            function (canvas) {
        'use strict';

        var type;

        if (canvas.hasClass('lineToRight')) {
            type = 'lineToRight';
        } else if (canvas.hasClass('lineToBottom')) {
            type = 'lineToBottom';
        } else if (canvas.hasClass('lineFromFurc')) {
            type = 'lineFromFurc';
        } else if (canvas.hasClass('lineToConflux')) {
            type = 'lineToConflux';
        } else if (canvas.hasClass('lineToInflux')) {
            type = 'lineToInflux';
        } else {
            window.console.log('Unknown type of arc!');
            return false;
        }

        return type;
    },*/
    connectPortToMouse: function (canvas, portPos, mousePos, arcType) {
        'use strict';

        switch (arcType) {
        case 'lineToRight':
            bushApp.arc.lineToRight(canvas, portPos, mousePos);
            break;
        case 'lineToBottom':
            bushApp.arc.lineToBottom(canvas, portPos, mousePos);
            break;
        case 'lineFromFurc':
            bushApp.arc.lineFromFurc(canvas, portPos, mousePos);
            break;
        case 'lineToConflux':
            bushApp.arc.lineToConflux(canvas, portPos, mousePos);
            break;
        case 'lineToInflux':
            bushApp.arc.lineToInflux(canvas, portPos, mousePos);
            break;
        }
    },
    connectPorts:       function (canvas, startPort, endPort) {
        'use strict';

        var pos, pNum, arcs, i, isValid = true;
        function changeID(canvas, endPort) {
            var canvasID;

            canvas.attr('id', canvas.attr('id') + '-' + endPort.attr('id'));
            canvas.next('.arrow').attr('id', canvas.next().attr('id') + '-' + endPort.attr('id'));
        }

        pos = {
            start:  bushApp.port.getPosition(startPort),
            end:    bushApp.port.getPosition(endPort)
        };      //ports' positions

        pNum = {
            start:  bushApp.port.getNumber(startPort),
            end:    bushApp.port.getNumber(endPort)
        };     //port's numbers

        arcs = {
            start:  {
                all:    bushApp.port.getConnectedArcs(startPort),
                hor:    null,
                ver:    null
            },
            end:    {
                all:    bushApp.port.getConnectedArcs(endPort),
                hor:    null,
                ver:    null
            }
        };

        changeID(canvas, endPort);

        if (pNum.start === 1 || pNum.start === 2) { isValid = false; }
        if (pNum.start === 3) { // правый выход ноды
            if (pNum.end === 2 || pNum.end === 3 || pNum.end === 4 || pNum.end === 6) { isValid = false; }
        }
        if (pNum.start === 4) { // нижний выход ноды
            if (pNum.end === 1 || pNum.end === 3 || pNum.end === 4 || pNum.end === 6 || pNum.end === 7 || pNum.end === 8) { isValid = false; }
        }
        if (pNum.start === 5) { // правый выход инфлюкса
            if (pNum.end === 2 || pNum.end === 3 || pNum.end === 4 || pNum.end === 5 || pNum.end === 6 || pNum.end === 7 || pNum.end === 8) { isValid = false; }
        }
        if (pNum.start === 6) { // нижний выход инфлюкса
            if (pNum.end === 1 || pNum.end === 3 || pNum.end === 4 || pNum.end === 5 || pNum.end === 7 || pNum.end === 8) { isValid = false; }
        }
        if (pNum.start === 7 || pNum.start === 8) {
            if (pNum.end === 2 || pNum.end === 3 || pNum.end === 4 || pNum.end === 5 || pNum.end === 6 || pNum.end === 7 || pNum.end === 8) { isValid = false; }
        }

        if (isValid) {
            switch (pNum.start) {
            case 1:
                window.console.log('Port ' + pNum.start + ': This is an input port only!');
                break;
            case 2:
                window.console.log('Port ' + pNum.start + ': This is an input port only!');
                break;
            case 3:
                if (arcs.start.all.length !== 0) {
                    for (i = 0; i < arcs.start.all.length; i += 1) {
                        bushApp.arc.remove(arcs.start.all[i]);
                    }
                }
                bushApp.arc.lineToRight(canvas, pos.start, pos.end);
                break;
            case 4:
                if (arcs.start.all.length !== 0) {
                    for (i = 0; i < arcs.start.all.length; i += 1) {
                        bushApp.arc.remove(arcs.start.all[i]);
                    }
                }
                bushApp.arc.lineToBottom(canvas, pos.start, pos.end);
                break;
            case 5:
                if (arcs.start.all.length !== 0) {
                    for (i = 0; i < arcs.start.all.length; i += 1) {
                        if (arcs.start.all[i].next('.arrow').length !== 0) {
                            bushApp.arc.remove(arcs.start.all[i]);
                        }
                    }
                }
                bushApp.arc.lineToRight(canvas, pos.start, pos.end);
                break;
            case 6:
                if (arcs.start.all.length !== 0) {
                    for (i = 0; i < arcs.start.all.length; i += 1) {
                        bushApp.arc.remove(arcs.start.all[i]);
                    }
                }
                bushApp.arc.lineToBottom(canvas, pos.start, pos.end);
                break;
            case 7:
                bushApp.arc.lineFromFurc(canvas, pos.start, pos.end);
                break;
            case 8:
                if (arcs.start.all.length !== 0) {
                    for (i = 0; i < arcs.start.all.length; i += 1) {
                        if (arcs.start.all[i].next('.arrow').length !== 0) {
                            bushApp.arc.remove(arcs.start.all[i]);
                        }
                    }
                }
                break;
            default:
                window.console.log('Unknown port number!');
                break;
            }

            switch (pNum.end) {
            case 1:
                if (arcs.end.all.length !== 0) {
                    for (i = 0; i < arcs.end.all.length; i += 1) {
                        bushApp.arc.remove(arcs.end.all[i]);
                    }
                }
                bushApp.arc.lineToRight(canvas, pos.start, pos.end);
                break;
            case 2:
                if (arcs.end.all.length !== 0) {
                    for (i = 0; i < arcs.end.all.length; i += 1) {
                        bushApp.arc.remove(arcs.end.all[i]);
                    }
                }
                break;
            case 3:
                window.console.log('Port ' + pNum.end + ': This is an output port only!');
                break;
            case 4:
                window.console.log('Port ' + pNum.end + ': This is an output port only!');
                break;
            case 5:
                if (canvas.hasClass('horizontal')) {
                    if (bushApp.port.connectedArcs.hasHorizontal(arcs.end.all)) {
                        arcs.end.hor = bushApp.port.connectedArcs.filter(arcs.end.all, 'horizontal');

                        for (i = 0; i < arcs.end.hor.length; i += 1) {
                            if (arcs.end.hor[i].next('.arrow').length === 0) {
                                bushApp.arc.remove(arcs.end.hor[i]);
                            }
                        }
                    }
                } else if (canvas.hasClass('vertical')) {
                    if (bushApp.port.connectedArcs.hasVertical(arcs.end.all)) {
                        arcs.end.ver = bushApp.port.connectedArcs.filter(arcs.end.all, 'vertical');

                        for (i = 0; i < arcs.end.ver.length; i += 1) {
                            if (arcs.end.ver[i].next('.arrow').length === 0) {
                                bushApp.arc.remove(arcs.end.ver[i]);
                            }
                        }
                    }
                }
                break;
            case 6: // ???
                break;
            case 7:
                if (arcs.end.all.length !== 0) {
                    for (i = 0; i < arcs.end.all.length; i += 1) {
                        if (arcs.end.all[i].next('.arrow').length === 0) {
                            bushApp.arc.remove(arcs.end.all[i]);
                        }
                    }
                }
                break;
            case 8:
                bushApp.arc.lineToConflux(canvas, pos.start, pos.end);
                break;
            default:
                window.console.log('Unknown port number!');
                break;
            }
        } else {
            window.console.log('Arc is not valid!');
            bushApp.arc.remove(canvas);
            return false;
        }
    }
};