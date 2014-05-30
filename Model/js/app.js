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
            case 'flow':
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

    //пока мы этого не умеем
    removeEvent: function(id) {

    },
    removeUnion: function(id) {

    }
}