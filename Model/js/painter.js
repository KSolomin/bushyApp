var painter = {
    paintElements: function(bush) {
        var largestEventId = 0;
        var largestUnionId = 0;

        for (var i = 0; i < bush.events.length; i++) {
            var event = bush.events[i];

            if (event.id > largestEventId) {
                largestEventId = event.id;
            }

            var eventView = bushyApp.bushyView.node.create(event.type, event.id);
            bushyApp.bushyView.element.setPosition(eventView, event.position);
            bushyApp.bushyView.grid.snap(eventView);
        }
        bushyApp.eventCounter = largestEventId + 1;

        for (var i = 0; i < bush.unions.length; i++) {

            var union = bush.unions[i];
            var unionView;

            if (union.id > largestUnionId) {
                largestUnionId = union.id;
            }

            switch (union.type) {
                case 'flux':
                    break;
                case 'influx':
                    unionView = bushyApp.bushyView.influx.create('i' + union.id);
                    bushyApp.bushyView.element.setPosition(unionView, union.position);
                    bushyApp.bushyView.grid.snap(unionView);
                    break;
                case 'furcation':
                    unionView = bushyApp.bushyView.furcation.create();
                    bushyApp.bushyView.furcation.create();
                    break;
                case 'conflux':
                    break;
            }
        }
        bushyApp.unionCounter = largestUnionId + 1;
    },

    paintConnections: function(bush) {

        for (var i = 0; i < bush.unions.length; i++) {
            var union = bush.unions[i];
            var unionView;

            switch (union.type) {
                case 'influx':
                    unionView = $('#workspace').contents().find('body').find('#i' + union.id);
                    if (typeof union.rightExit == 'number') {
                        var startPort = unionView.find('#i' + union.id + '_5');
                        var endPort = $('#workspace').contents().find('body').find('#n' + union.rightExit + '_1');
                        var canvas  = bushyApp.bushyView.arc.create(startPort);

                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                    }

            }
        }
    }
}