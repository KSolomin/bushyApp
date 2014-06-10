var netService = {
    formJson: function(bush) {
        // dunno
    },
    loadFromJson: function() {
        var mockJson = {
            user: "that-guy",
            id: 1,
            name: "nonsense-bush",
            events: [{id: 0,
                      name: "Ia",
                      type: "ia",
                      externalUnion: 100,
                      position: {
                            x: 50,
                            y: 50
                    }},
                    {id: 300,
                     name: "II",
                     type:"ii",
                     externalUnion: "",
                     internalUnion: 100,
                     position: {
                            x: 300,
                            y: 300
                     },
                     internalUnion: 0}],
            unions: [{id: 100,
                      type: "influx",
                      topEntry: '',
                      leftEntry: 0,
                      rightExit: 300,
                      bottomExit: '',
                      position: {
                        x: 500,
                        y: 300
                    }}]
        };

        this.typeCastJson(mockJson);
        return mockJson;
    },

    typeCastJson: function(bush) {
        bush.__proto__ = Bush.prototype; // C'est le genial)
        for (var i = 0; i < bush.events.length; i++) {
            switch (bush.events[i].type) {
                case 'ia':
                    bush.events[i].__proto__ = iaNode.prototype;
                    break;
                case 'ib':
                    bush.events[i].__proto__ = ibNode.prototype;
                    break;
                case 'ii':
                    bush.events[i].__proto__ = iiNode.prototype;
                    break;
                case 'iii':
                    bush.events[i].__proto__ = iiiNode.prototype;
                    break;
            }
        }

        for (var i = 0; i < bush.unions.length; i++) {
            switch (bush.unions[i].type) {
                case 'flux':
                    bush.unions[i].__proto__ = fluxUnion.prototype;
                    break;
                case 'influx':
                    bush.unions[i].__proto__ = influxUnion.prototype;
                    break;
                case 'furcation':
                    bush.unions[i].__proto__ = furcUnion.prototype;
                    break;
                case 'conflux':
                    bush.unions[i].__proto__ = confluxUnion.prototype;
                    break;
            }
        }
    }
}