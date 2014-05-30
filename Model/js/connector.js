var connector = {
    setConnection: function(firstElem, secondElem) {
        if (firstElem.type === 'n') {
            console.log('I am a very clever connector');
            bushyApp.addUnion('flow');
        }
    }
}