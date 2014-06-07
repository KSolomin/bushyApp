function bushyNode(id, type) {
    this.id = id;
    this.type = type;
}

bushyNode.prototype = {
    id: '',
    name: '',
    type: '',
    rename: function(name) {
        this.name = name;
    },
    setType: function(type) {
        this.type = type;
    }
}

function iaNode(id) {
    this.id = id;
    this.type = 'ia';
}

extend(iaNode, bushyNode);

iaNode.prototype.externalUnion = '';
iaNode.prototype.setExternalUnion = function(unionId) {
    this.externalUnion = unionId;
}

function ibNode(id) {
    this.id = id;
    this.type = 'ib';
}

extend(ibNode, bushyNode);

// must specify that node can only be an influx!!
ibNode.prototype.externalUnion = '';
ibNode.prototype.setExternalUnion = function(unionId) {
    this.externalUnion = unionId;
}

function iiNode(id) {
    this.id = id;
    this.type = 'ii';
}

extend(iiNode, bushyNode);

iiNode.prototype.internalUnion = '';
iiNode.prototype.setInternalUnion = function(unionId) {
    this.internalUnion = unionId;
}

iiNode.prototype.externalUnion = '';
iiNode.prototype.setExternalUnion = function(unionId) {
    this.externalUnion = unionId;
}

function iiiNode(id) {
    this.id = id;
    this.type = 'iii';
}

extend(iiiNode, bushyNode);

iiiNode.prototype.internalUnion = '';
iiiNode.prototype.setInternalUnion = function(unionId) {
    this.internalUnion = unionId;
}

// utilities functions
function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
}
