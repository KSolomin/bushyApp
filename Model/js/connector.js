var connector = {
    setConnection: function(firstElem, secondElem) {
        if (firstElem.type === 'n' && secondElem.type === 'n') {
            bushyApp.addUnion('flux');
            var newFlux = bushyApp.bushyModel.unions[bushyApp.unionCounter - 1];

            bushyApp.bushyModel.events[firstElem.id].setExternalUnion(newFlux);
            bushyApp.bushyModel.events[secondElem.id].setInternalUnion(newFlux);
            bushyApp.bushyModel.unions[bushyApp.unionCounter - 1].setEntry(bushyApp.bushyModel.events[firstElem.id]);
            bushyApp.bushyModel.unions[bushyApp.unionCounter - 1].setExit(bushyApp.bushyModel.events[secondElem.id]);
            return true
        }

        else if (false) {

        }
    }
}