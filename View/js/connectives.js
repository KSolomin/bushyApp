/*connectives.js*/
/*global $, bushApp*/

bushApp.influx = {
    create:         function (id) {
        'use strict';
        var influx = bushApp.element.create('influx', id);
        return influx;
    }
};

bushApp.furcation = {
    create: function (id) {
        'use strict';

        var furc = bushApp.element.create('furcation', id);
        return furc;
    }
};

bushApp.conflux = {
    create: function (id) {
        'use strict';

        var conflux = bushApp.element.create('conflux', id);
        return conflux;
    }
};