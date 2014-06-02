//element.js
/*global $, bushApp*/

bushApp.element = {
    pattern:        /^([a-z])(\d+)$/,
    ports: {
        pattern:    /^(\w+)(\d+)_(\d+)$/,
        port: {
            connectedArcs:  {
                filter:         function (arcsArray, position) {
                    'use strict';

                    var selected = [], i;

                    if (!arcsArray) {
                        window.console.log('Arcs array is not specified!');
                        return false;
                    }

                    if (!position) {
                        window.console.log('Arc position is not specified!');
                        return false;
                    }

                    for (i = 0; i < arcsArray.length; i += 1) {
                        if (arcsArray[i].hasClass(position)) {
                            selected.push(arcsArray[i]);
                        }
                    }
                    return selected;
                },
                hasHorizontal:  function (arcsArray) {
                    'use strict';

                    if (bushApp.port.connectedArcs.filter(arcsArray, 'horizontal').length !== 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                hasVertical:    function (arcsArray) {
                    'use strict';

                    if (bushApp.port.connectedArcs.filter(arcsArray, 'vertical').length !== 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            getConnectedArcs:   function (port) {
                'use strict';

                var portID, arcNums, arcRegExp, selectedArcs = [];

                portID = port.attr('id');

                arcRegExp = bushApp.arc.pattern;

                $('.arc').each(function () {
                    arcNums = arcRegExp.exec($(this).attr('id'));

                    if (arcNums[1] === portID || arcNums[2] === portID) {
                        selectedArcs.push($(this));
                    }
                });

                return selectedArcs;
            },
            getPosition:        function (port) {
                'use strict';

                var elemPos, portPos, portRadius;

                elemPos = bushApp.element.getPosition(port.parent());

                portPos = {
                    x: elemPos.x + parseInt(port.css('left'), 10),
                    y: elemPos.y + parseInt(port.css('top'), 10)
                };

                return portPos;
            },
            getNumber:          function (port) {
                'use strict';

                var portID, portNum;

                portID = port.attr('id');
                portNum = parseInt(bushApp.element.ports.pattern.exec(portID)[3], 10);

                return portNum;
            }
        },
        /*getRadius:  function () {
            'use strict';

            var radius;
            radius = $('.port').first().width() / 2;
            return radius;
        },*/
        show:   function (node) {
            'use strict';

            node.children('.port').removeClass('hidden').addClass('visible');
        },
        hide:   function (node) {
            'use strict';

            node.children('.port').removeClass('visible').addClass('hidden');
        }
    },
    generateID:     function (type) {
        'use strict';

        var elemID, elems, letter;

        switch (type) {
        case 'node':
            letter = 'n';
            break;
        case 'influx':
            letter = 'i';
            break;
        case 'furcation':
            letter = 'f';
            break;
        case 'conflux':
            letter = 'c';
            break;
        default:
            window.console.log('Unknown type of element!');
            return;
        }

        elemID = letter + '0';

        elems = $('.' + type);

        if (elems.length !== 0) {
            elemID = bushApp.element.pattern.exec(elems.last().attr('id'))[2];
            elemID = parseInt(elemID, 10);
            elemID += 1;
            elemID = letter + elemID;
        }

        return elemID;

    },
    create:         function (type) {
        'use strict';

        var elem, elemID, insPoint, portNum;

        elemID = bushApp.element.generateID(type);
        insPoint = $('script').first();

        switch (type) {
        case 'influx':
            var portNums = [5, 6];

            elem = $('<div></div>')
                .attr('class', 'element ' + type)
                .attr('id', elemID)
                .append($('<div></div>').attr('class', 'port hidden').attr('id', elemID + '_' + portNums[0]))
                .append($('<div></div>').attr('class', 'port hidden').attr('id', elemID + '_' + portNums[1]).css('top', '10px'))
                .insertBefore(insPoint);

            break;
        case 'furcation':
            portNum = 7;

            elem = $('<div></div>')
                .attr('class', 'element ' + type)
                .attr('id', elemID)
                .append($('<div></div>').attr('class', 'port hidden').attr('id', elemID + '_' + portNum))
                .insertBefore(insPoint);

            break;
        case 'conflux':
            portNum = 8;

            elem = $('<div></div>')
                .attr('class', 'element ' + type)
                .attr('id', elemID)
                .append($('<div></div>').attr('class', 'port hidden').attr('id', elemID + '_' + portNum))
                .insertBefore(insPoint);

            break;
        default:
            window.console.log('Unknown type of element!');
            break;
        }

        return elem;
    },
    getPosition:    function (element) {
        'use strict';

        var pos;

        pos = {
            x: parseInt(element.css('left'), 10),
            y: parseInt(element.css('top'), 10)
        };

        return pos;
    },
    setPosition:    function (element, position) {
        'use strict';

        element.css('left', position.x + 'px');
        element.css('top', position.y + 'px');
    },
    getClosestPort: function (startPort, currPos) {
        'use strict';

        var portPos, distToPort, closest;

        closest = {
            port: null,
            dist: 0
        };

        $('.port').each(function () {
            portPos = bushApp.port.getPosition($(this));

            distToPort = Math.sqrt(Math.pow(currPos.x - portPos.x, 2) + Math.pow(currPos.y - portPos.y, 2));

            if (closest.dist === 0 || distToPort < closest.dist) {
                if (startPort !== $(this)) {
                    closest.dist = distToPort;
                    closest.port = $(this);
                }
            }
        });

        return closest;
    },
    /*getType:        function (element) {
        'use strict';

        var letter, type;

        letter = bushApp.element.pattern.exec(element.attr('id'))[1];

        switch (letter) {
        case 'n':
            type = 'node';
            break;
        case 'i':
            type = 'influx';
            break;
        case 'f':
            type = 'furcation';
            break;
        case 'c':
            type = 'conflux';
            break;
        default:
            type = null;
            window.console.log('Unknown type of element!');
            break;
        }
        return type;
    }, */
    showBorders:    function (element) {
        'use strict';

        element.addClass('outline');
    },
    hideBorders:    function (element) {
        'use strict';

        element.removeClass('outline');
    }
};