var bushyApp = {
    bushyView: null,
    bushyModel: new Bush(1),
    connector: connector, //better through constructor
    painter: painter,
    eventCounter: 0,
    unionCounter: 0,
    netService: netService,
    loadJson: function() {
        this.painter.clearTheGrid();
        this.bushyModel = this.netService.loadFromJson();
        this.painter.paintElements(this.bushyModel);
        this.painter.paintConnections(this.bushyModel);
    },
    saveJson: function() {

    },
    addEvent: function(type) {
        this.bushyModel.addEvent(this.eventCounter, type);
        var newEvent = this.bushyView.node.create(type);
        console.log('Added new event: ' + this.eventCounter);

        this.eventCounter++;
        return newEvent;
    },
    addUnion: function(type) {
        this.bushyModel.addUnion(this.unionCounter, type);
        console.log('Added new union: ' + this.unionCounter);
        this.unionCounter++;
        switch (type) {
            case 'flux':
                break;
            case 'influx':
                return this.bushyView.influx.create();
                break;
            case 'furcation':
                return this.bushyView.furcation.create();
                break;
            case 'conflux':
                return this.bushyView.conflux.create();
                break;
            default:
                console.log('The type of union is incorrect');
                break;
        }
    },
    removeEvent: function(id) {

        if (this.bushyModel.getEventById(id).multifluxed == true) {
           var unionsToDelete = [];
           for (var i = 0; i < bushyApp.bushyModel.unions.length; i++) {
               if (bushyApp.bushyModel.unions[i].type == 'flux' && bushyApp.bushyModel.unions[i].entry == id) {
                   unionsToDelete.push(bushyApp.bushyModel.unions[i].id);
               }
           }
            if (unionsToDelete.length > 0) {
                for (var i = 0; i < unionsToDelete.length; i++) {
                    this.removeUnion(unionsToDelete[i]);
                }
            }
       }

        //удаляем unions, если они были присоед. к ивенту
       if (typeof this.bushyModel.getEventById(id).externalUnion == 'number') {
           var externalUnion = this.bushyModel.getUnionById(this.bushyModel.getEventById(id).externalUnion);
           console.log(externalUnion);
       }
       if (externalUnion && externalUnion.type =='flux') { //&& this.bushyModel.getEventById(externalUnion.exit).type != 'iii'
           this.bushyModel.getEventById(externalUnion.exit).setInternalUnion();
           this.removeUnion(externalUnion.id);
       }

        //обновляем значения входов инфлюксов
        if (externalUnion && externalUnion.type =='influx' && (externalUnion.leftEntry == id)) {
            externalUnion.setLeftEntry('');
        }

        if (externalUnion && externalUnion.type =='influx' && (externalUnion.topEntry == id)) {
            externalUnion.setTopEntry('');
        }

        //обновляемс значения входа фуркатов
        if (externalUnion && externalUnion.type == 'furcation' && (externalUnion.entry == id)) {
            externalUnion.setEntry('');
        }

        //обновляем значения входов конфлюксов
        if (externalUnion && externalUnion.type == 'conflux' && externalUnion.findInEntry(id)) {
            externalUnion.deleteEntry(id);
        }

        //удаляем unions, если они были присоед. к ивенту
       if (typeof this.bushyModel.getEventById(id).internalUnion == 'number') {
           var internalUnion = this.bushyModel.getUnionById(this.bushyModel.getEventById(id).internalUnion);
       }
       if (internalUnion && internalUnion.type =='flux' && (this.bushyModel.getEventById(internalUnion.entry).type != 'ia' || 'ib')) {
           this.bushyModel.getEventById(internalUnion.entry).setExternalUnion();
           this.removeUnion(internalUnion.id);
       }

        //обновляем значения выходов инфлюксов
       if (internalUnion && internalUnion.type =='influx' && (internalUnion.rightExit == id)) {
           internalUnion.setRightExit('');
       }

        if (internalUnion && internalUnion.type =='influx' && (internalUnion.bottom == id)) {
            internalUnion.setBottomExit('');
        }

        //обновляемс значения выходов фуркатов
        if (internalUnion && internalUnion.type == 'furcation' && (internalUnion.findInExit(id))) {
            console.log('I found an exit!');
            internalUnion.deleteExit(id);
        }

        //обновляем значения выхода конфлюксов
        if (internalUnion && internalUnion.type == 'conflux' && (internalUnion.exit == id)) {
            internalUnion.setExit('');
        }

        console.log('Event ' + id + ' is deleted');
        this.bushyModel.deleteEvent(id);

        if (this.bushyModel.events[0] != undefined) {
            this.eventCounter = this.bushyModel.events[this.bushyModel.events.length - 1].id + 1;
        }
        else this.eventCounter = 0;
    },

    removeUnion: function(id) {
        if (typeof this.bushyModel.getUnionById(id) == 'object') {
            if (id == '') {
                return; // Разберись почему
            }
        // обновляем входы у ивентов если они были присоединеын к юниону
        if (typeof this.bushyModel.getUnionById(id).entry == 'number') {
            var entry =  this.bushyModel.getEventById(this.bushyModel.getUnionById(id).entry);
            entry.setExternalUnion('');
        } else if (typeof this.bushyModel.getUnionById(id).entry == 'object') {
            var entries = [];
            for (var i = 0; i < this.bushyModel.getUnionById(id).entry.length; i++) {
                entries.push(this.bushyModel.getEventById(this.bushyModel.getUnionById(id).entry[i]));
                entries[i].setExternalUnion('');
            }
        } else if (this.bushyModel.getUnionById(id).type = 'influx') {
            if (typeof this.bushyModel.getUnionById(id).leftEntry == 'number') {
                this.bushyModel.getEventById(this.bushyModel.getUnionById(id).leftEntry).setExternalUnion('');
            }

            if (typeof this.bushyModel.getUnionById(id).topEntry == 'number') {
                this.bushyModel.getEventById(this.bushyModel.getUnionById(id).topEntry).setExternalUnion('');
            }
        }

        // обновляем выходы у ивентов если они были присоединеын к юниону
        if (typeof this.bushyModel.getUnionById(id).exit == 'number') {
            var exit = this.bushyModel.getEventById(this.bushyModel.getUnionById(id).exit);
            exit.setInternalUnion('');
        } else if (typeof this.bushyModel.getUnionById(id).exit == 'object') {
            var exits = [];
            for (var i = 0; i <this.bushyModel.getUnionById(id).exit.length; i++) {
                exits.push(this.bushyModel.getEventById(this.bushyModel.getUnionById(id).exit[i]));
                exits[i].setInternalUnion('');
            }
        } else if (this.bushyModel.getUnionById(id).type == 'influx') {
            if (typeof this.bushyModel.getUnionById(id).bottomExit == 'number') {
                this.bushyModel.getEventById(this.bushyModel.getUnionById(id).bottomExit).setInternalUnion('');
            }

            if (typeof this.bushyModel.getUnionById(id).rightExit == 'number') {
                this.bushyModel.getEventById(this.bushyModel.getUnionById(id).rightExit).setInternalUnion('');
            }
        }

        console.log('Union ' + id + ' is deleted');
        this.bushyModel.deleteUnion(id);

        if (this.bushyModel.unions[0] != undefined) {
            this.unionCounter = this.bushyModel.unions[this.bushyModel.unions.length - 1].id + 1;
        }
        else this.unionCounter = 0;
    }
    }
}