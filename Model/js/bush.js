//сраный кустяра. он же bushyModel в представлении bushyApp.
function Bush(userId) {
    this.user = userId;
}

Bush.prototype = {
    user: '',
    id: '',
    name: '',
    events: [],
    unions: [],
    // возможно разделение на ивенты по типу
    // в методах будет пиздец функциональности
    rename: function(name) {
        this.name = name;
    },
    addEvent: function(id, type) {
        switch (type) {
            case 'ia':
                this.events.push(new iaNode(id));
                break;
            case 'ib':
                this.events.push(new ibNode(id));
                break;
            case 'ii':
                this.events.push(new iiNode(id));
                break;
            case 'iii':
                this.events.push(new iiiNode(id));
                break;
            default:
                console.log('Fuck you: the type of event is incorrect');
                break;
        }
    },
    deleteEvent: function(id) {
        for (var i = 0; i < this.events.length; i++) {
            if (this.events[i].id === id) {
                this.events.remove(i);
            }
        }
    },
    addUnion: function(id, type) {
        switch (type) {
            case 'influx':
                this.unions.push(new influxUnion(id));
                break;
            case 'furcation':
                this.unions.push(new furcUnion(id));
                break;
            case 'conflux':
                this.unions.push(new confluxUnion(id));
                break;
            default:
                console.log('Fuck you: the type of union is incorrect');
                break;
        }
    },
    deleteUnion: function(unionId) {
        for (var i = 0; i < this.events.length; i++) {
            if (this.unions[i].id === unionId) {
                this.unions.remove(i);
            }
        }
    }
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
