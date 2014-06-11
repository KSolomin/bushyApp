var painter = {

    clearTheGrid: function() {
        $('#workspace').contents().find('body').find('.element').remove();
        $('#workspace').contents().find('body').find('.arc').remove();
        $('#workspace').contents().find('body').find('.arrow').remove();
    },
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
                    unionView = bushyApp.bushyView.furcation.create('f' + union.id);
                    bushyApp.bushyView.element.setPosition(unionView, union.position);
                    bushyApp.bushyView.grid.snap(unionView);
                    break;
                case 'conflux':
                    unionView = bushyApp.bushyView.conflux.create('c' + union.id);
                    bushyApp.bushyView.element.setPosition(unionView, union.position);
                    bushyApp.bushyView.grid.snap(unionView);
                    break;
            }
        }
        bushyApp.unionCounter = largestUnionId + 1;
    },

    paintConnections: function(bush) {

        for (var i = 0; i < bush.unions.length; i++) {
            var union = bush.unions[i];
            var unionView;

            var startPort;
            var endPort;
            var canvas;

            switch (union.type) {
                case 'influx':
                    unionView = $('#workspace').contents().find('body').find('#i' + union.id);
                    // setting all possible connections
                    if (typeof union.rightExit == 'number') {
                        startPort = unionView.find('#i' + union.id + '_5');
                        endPort = $('#workspace').contents().find('body').find('#n' + union.rightExit + '_1');

                        canvas  = bushyApp.bushyView.arc.create(startPort);
                        bushyApp.bushyView.arc.setType(canvas, startPort);
                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                    }
                    if (typeof union.bottomExit == 'number') {
                        startPort = unionView.find('#i' + union.id + '_6');
                        endPort = $('#workspace').contents().find('body').find('#n' + union.bottomExit + '_2');

                        canvas  = bushyApp.bushyView.arc.create(startPort);
                        bushyApp.bushyView.arc.setType(canvas, startPort);
                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                    }
                    if (typeof union.leftEntry == 'number') {
                        endPort = unionView.find('#i' + union.id + '_5');
                        startPort = $('#workspace').contents().find('body').find('#n' + union.leftEntry + '_3');

                        canvas  = bushyApp.bushyView.arc.create(startPort);
                        bushyApp.bushyView.arc.setType(canvas, startPort);
                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                        canvas.next('.arrow').remove();
                    }
                    if (typeof union.topEntry == 'number') {
                        endPort = unionView.find('#i' + union.id + '_5');
                        startPort = $('#workspace').contents().find('body').find('#n' + union.topEntry + '_4');

                        canvas  = bushyApp.bushyView.arc.create(startPort);
                        bushyApp.bushyView.arc.setType(canvas, startPort);
                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                        canvas.next('.arrow').remove();
                    }
                    break;

                case 'furcation':
                    unionView = $('#workspace').contents().find('body').find('#f' + union.id);
                    if (typeof union.entry == 'number') {
                        endPort = unionView.find('#i' + union.id + '_7');
                        startPort = $('#workspace').contents().find('body').find('#n' + union.entry + '_3'); // 4 CAN BE TOOOOO

                        canvas  = bushyApp.bushyView.arc.create(startPort);
                        bushyApp.bushyView.arc.setType(canvas, startPort);
                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                        canvas.next('.arrow').remove();
                    }

                    // TEST IT LATER
                    if (union.exit.length) {
                        for (var i = 0; i < union.exit.length; i++) {
                            startPort = unionView.find('#i' + union.id + '_7');
                            endPort = $('#workspace').contents().find('body').find('#n' + union.exit[i] + '_1');

                            canvas  = bushyApp.bushyView.arc.create(startPort);
                            bushyApp.bushyView.arc.setType(canvas, startPort);
                            bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                        }
                    }
                    break;
                case 'conflux':
                    unionView = $('#workspace').contents().find('body').find('#f' + union.id);
                    if (typeof union.exit == 'number') {
                        startPort = unionView.find('#i' + union.id + '_8');
                        endPort = $('#workspace').contents().find('body').find('#n' + union.exit + '_1');

                        canvas  = bushyApp.bushyView.arc.create(startPort);
                        bushyApp.bushyView.arc.setType(canvas, startPort);
                        bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                    }

                    // TEST IT LATER
                    if (union.entry.length) {
                        for (var i = 0; i < union.entry.length; i++) {
                            endPort = unionView.find('#i' + union.id + '_8');
                            startPort = $('#workspace').contents().find('body').find('#n' + union.entry[i] + '_3');

                            canvas  = bushyApp.bushyView.arc.create(startPort);
                            bushyApp.bushyView.arc.setType(canvas, startPort);
                            bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                            canvas.next('.arrow').remove();
                        }
                    }
                    break;
                case 'flux':
                    startPort = $('#workspace').contents().find('body').find('#n' + union.entry + '_3'); /// CAN BE OTHER SITUATIONS
                    endPort = $('#workspace').contents().find('body').find('#n' + union.exit + '_1');

                    canvas  = bushyApp.bushyView.arc.create(startPort);
                    bushyApp.bushyView.arc.setType(canvas, startPort);
                    bushyApp.bushyView.arc.connectPorts(canvas, startPort, endPort);
                    break;
            }
        }
    }
}