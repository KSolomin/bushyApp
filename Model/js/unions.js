function bushyUnion(id, type) {
    this.id = id;
    this.type = type;
}

bushyUnion.prototype = {
    id: '',
    type: '',
    entry: '',
    exit: '',
    setType: function(type) {
        this.type = type;
    },
    setEntry: function(entryId) {
        this.entry = entryId;
    },
    setExit: function(exitId) {
        this.exit = exitId;
    }
}

function fluxUnion(id) {
    this.id = id;
    this.type = 'flux';
}

extend(fluxUnion, bushyUnion);

function influxUnion(id) {
    this.id = id;
    this.type = 'influx';
}

extend(influxUnion, bushyUnion);

influxUnion.prototype.topEntry = '';
influxUnion.prototype.leftEntry = '';
influxUnion.prototype.bottomExit = '';
influxUnion.prototype.rightExit = '';
influxUnion.prototype.setTopEntry = function(eventId) {
    this.topEntry = eventId;
}
influxUnion.prototype.setLeftEntry = function(eventId) {
    this.leftEntry = eventId;
}
influxUnion.prototype.setBottomExit = function(eventId) {
    this.bottomExit = eventId;
}
influxUnion.prototype.setRightExit = function(eventId) {
    this.rightExit = eventId;
}

function furcUnion(id) {
    this.id = id;
    this.type = 'furcation';
    this.exit = [];
}

extend(furcUnion, bushyUnion);

furcUnion.prototype.setExit = function(eventId) {
    this.exit.push(eventId);
}

furcUnion.prototype.deleteExit = function(idToDelete) {
    for (var i = 0; i < this.exit.length; i++) {
        if (this.exit[i] === idToDelete) {
            this.exit.remove(i);
        }
    }
}

function confluxUnion(id) {
    this.id = id;
    this.type = 'conflux';
    this.entry = [];
}

extend(confluxUnion, bushyUnion);

confluxUnion.prototype.setEntry = function (eventId) {
    this.entry.push(eventId);
}

// utilities functions
function extend(Child, Parent) {
    var F = function() { }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};




