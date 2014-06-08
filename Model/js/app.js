// Эта хрень должна соединять модель с вьюхой - куст с графоном
var bushyApp = {
    bushyView: null,
    bushyModel: new Bush(1),
    connector: connector,
    eventCounter: 0,
    unionCounter: 0,
    addEvent: function(type) {
        this.bushyModel.addEvent(this.eventCounter, type);
        this.eventCounter++;
        return this.bushyView.node.create(type);
    },
    addUnion: function(type) {
        this.bushyModel.addUnion(this.unionCounter, type);
        this.unionCounter++;
        switch (type) {
            case 'flux':
                // some code
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
                console.log('Fuck you: the type of union is incorrect');
                break;
        }
    },
    removeEvent: function(id) {

       if (typeof this.bushyModel.getEventById(id).externalUnion == 'number') {
           var externalUnion = this.bushyModel.getUnionById(this.bushyModel.getEventById(id).externalUnion);
       }
       if (externalUnion && externalUnion.type =='flux') {
           this.bushyModel.getEventById(externalUnion.exit).setInternalUnion();
           this.removeUnion(externalUnion.id);
       }

       if (typeof this.bushyModel.getEventById(id).internalUnion == 'number') {
           var internalUnion = this.bushyModel.getUnionById(this.bushyModel.getEventById(id).internalUnion);
       }
       if (internalUnion && internalUnion.type =='flux') {
           this.bushyModel.getEventById(internalUnion.entry).setExternalUnion();
           this.removeUnion(internalUnion.id);
       }

        this.bushyModel.deleteEvent(id);

        if (this.bushyModel.events[0] != undefined) {
            this.eventCounter = this.bushyModel.events[this.bushyModel.events.length - 1].id + 1;
        }
        else this.eventCounter = 0;
    },

    removeUnion: function(id) {
        this.bushyModel.deleteUnion(id);

        if (this.bushyModel.unions[0] != undefined) {
            this.unionCounter = this.bushyModel.unions[this.bushyModel.unions.length - 1].id + 1;
        }
        else this.unionCounter = 0;
    }
}