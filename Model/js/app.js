// Эта хрень должна соединять модель с вьюхой - куст с графоном
var bushyApp = {
    bushyView: null,
    bushyModel: new Bush(1),
    eventCounter: 0,
    unionCounter: 0,
    addEvent: function(type) {
        this.bushyModel.addEvent(this.eventCounter, type);
        this.bushyView.node.create(type);
        this.eventCounter++;
    },
    addUnion: function(type) {
        this.bushyModel.addUnion(this.unionCounter, type);
        switch (type) {
            case 'influx':
                this.bushyView.influx.create();
                break;
            case 'furcation':
                this.bushyView.furcation.create();
                break;
            case 'conflux':
                this.bushyView.conflux.create();
                break;
            default:
                console.log('Fuck you: the type of union is incorrect');
                break;
        }
        this.unionCounter++;
    },

    //пока мы этого не умеем
    removeEvent: function(id) {

    },
    removeUnion: function(id) {

    }
}