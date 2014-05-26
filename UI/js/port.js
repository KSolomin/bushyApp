/*port.js*/
/*global $, bushApp*/

bushApp.port = {
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

            if (arcNums) {
                if (arcNums[1] === portID || arcNums[2] === portID) {
                    selectedArcs.push($(this));
                }
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
};