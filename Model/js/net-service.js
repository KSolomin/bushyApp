var netService = {
    formJson: function(bush) {
        // dunno
    },
    loadFromJson: function() {
        var mockJson = {
            "user": "that-guy",
            "id": "1",
            name: "nonsense-bush",
            events: [{"id": "0",
                      "name": "Ia",
                      "type":"ia",
                      "externalUnion": "0"},
                    {"id": "1",
                     "name": "II",
                     "type":"ii",
                     "externalUnion": "",
                     "internalUnion": "0"}],
            unions: [{"id": "0",
                      "name": "flux",
                      "entry":"0",
                      "exit": "1"}]
        };

        return mockJson;
    }
}