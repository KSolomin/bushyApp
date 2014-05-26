function bushyUnion(id) {
    this.id = id;
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

function fluxUnion(id) {
    this.id = id;
    this.type = 'flux';
}

extend(fluxUnion, bushyUnion);

fluxUnion.prototype.ibEvent = '';
fluxUnion.prototype.setIbEvent = function(ibEvent) {
    this.ibEvent = ibEvent;
}

function furcUnion(id) {
    this.id = id;
    this.type = 'furcation';
    this.exit = []
}

extend(furcUnion, bushyUnion);

furcUnion.prototype.addExit = function(event) {
    this.exit.push(event);
}

furcUnion.prototype.deleteExit = function(idToDelete) {
    for (var i = 0; i < this.exit.length; i++) {
        if (this.exit[i].id === idToDelete) {
            this.exit.remove(i);
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




