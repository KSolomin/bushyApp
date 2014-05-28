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
    setEntry: function(entry) {
        this.entry = entry;
    },
    setExit: function(exit) {
        this.exit = exit;
    }
}

function flowUnion(id) {
    this.id = id;
    this.type = 'flow';
}

extend(flowUnion, bushyUnion);

function influxUnion(id) {
    this.id = id;
    this.type = 'influx';
}

extend(influxUnion, bushyUnion);

influxUnion.prototype.ibEvent = '';
influxUnion.prototype.setIbEvent = function(ibEvent) {
    this.ibEvent = ibEvent;
}

function furcUnion(id) {
    this.id = id;
    this.type = 'furcation';
    this.exit = []
}

extend(furcUnion, bushyUnion);

furcUnion.prototype.setExit = function(event) {
    this.exit.push(event);
}

furcUnion.prototype.deleteExit = function(idToDelete) {
    for (var i = 0; i < this.exit.length; i++) {
        if (this.exit[i].id === idToDelete) {
            this.exit.remove(i);
        }
    }
}

function confluxUnion(id) {
    this.id = id;
    this.type = 'conflux';
}

extend(confluxUnion, bushyUnion);

confluxUnion.prototype.setEntry = function (event) {
    this.entry.push(event);
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




