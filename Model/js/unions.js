function bushyUnion(id, type) {
    this.id = id;
    this.type = type;
}

bushyUnion.prototype = {
    id: '',
    type: '',
    entry: '',
    exit: '',
    position: {
        x: 50,
        y: 50
    },
    setPosition: function(pos) {
        this.position = pos;
    },
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

fluxUnion.prototype.entryPort = '';
fluxUnion.prototype.exitPort = '';
fluxUnion.prototype.setEntryPort = function(port) {
    if (port == 1 || 2) {
        this.entryPort = port;
    } else console.log('Invalid entry port for flux connection');
}
fluxUnion.prototype.setExitPort = function(port) {
    if (port == 3 || 4) {
        this.exitPort = port;
    } else console.log('Invalid entry port for flux connection');
}

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

furcUnion.prototype.findInExit = function(eventId) {
    for (var i = 0; i < this.exit.length; i++) {
        if (this.exit[i] == eventId) {
            return true;
        }
    }
}

furcUnion.prototype.deleteExit = function(idToDelete) {
    for (var i = 0; i < this.exit.length; i++) {
        if (this.exit[i] == idToDelete) {
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
confluxUnion.prototype.findInEntry = function(eventId) {
    for (var i = 0; i < this.entry.length; i++) {
        if (this.entry[i] == eventId) {
            return true;
        }
    }
}
confluxUnion.prototype.deleteEntry = function(idToDelete) {
    for (var i = 0; i < this.entry.length; i++) {
        if (this.entry[i] == idToDelete) {
            this.entry.remove(i);
        }
    }
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




