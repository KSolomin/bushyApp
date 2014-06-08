var connector = {
    setConnection: function(firstElem, secondElem) {
        // проверка, нужно ли удалять какую-то связь
        if (firstElem.type === 'n' && secondElem.type === 'n') {
            bushyApp.addUnion('flux');
            var newFlux = bushyApp.bushyModel.unions[bushyApp.unionCounter - 1];

            bushyApp.bushyModel.getEventById(firstElem.id).setExternalUnion(parseInt(newFlux.id));
            bushyApp.bushyModel.getEventById(secondElem.id).setInternalUnion(parseInt(newFlux.id));
            bushyApp.bushyModel.getUnionById(bushyApp.unionCounter - 1).setEntry(parseInt(firstElem.id));
            bushyApp.bushyModel.getUnionById(bushyApp.unionCounter - 1).setExit(parseInt(secondElem.id));
        }

        else if (firstElem.type === 'n' && secondElem.type === 'i') {
            //var influx = bushyApp.bushyModel.unions[secondElem.id]
            bushyApp.bushyModel.events[firstElem.id].setExternalUnion(secondElem.id);

            if (firstElem.portNum == 4) {
                bushyApp.bushyModel.unions[secondElem.id].setTopEntry(firstElem.id);
            }
            else if (firstElem.portNum == 3) {
                bushyApp.bushyModel.unions[secondElem.id].setLeftEntry(firstElem.id);
            }
        }

        else if (firstElem.type === 'i' && secondElem.type === 'n') {
            var influx = bushyApp.bushyModel.unions[firstElem.id];
            bushyApp.bushyModel.events[secondElem.id].setInternalUnion(firstElem.id);

            if (secondElem.portNum == 1) {
                bushyApp.bushyModel.unions[firstElem.id].setRightExit(secondElem.id);
            }
            if (secondElem.portNum == 2) {
                bushyApp.bushyModel.unions[firstElem.id].setBottomExit(secondElem.id);
            }
        }

        else if (firstElem.type === 'n' && secondElem.type === 'f') {
            var furcation = bushyApp.bushyModel.unions[secondElem.id];
            bushyApp.bushyModel.events[firstElem.id].setExternalUnion(secondElem.id);
            bushyApp.bushyModel.unions[secondElem.id].setEntry(firstElem.id);
        }

        else if (firstElem.type === 'f' && secondElem.type === 'n') {
            var furcation = bushyApp.bushyModel.unions[firstElem.id];
            bushyApp.bushyModel.events[secondElem.id].setInternalUnion(firstElem.id);
            bushyApp.bushyModel.unions[firstElem.id].setExit(secondElem.id);
        }

        else if (firstElem.type === 'n' && secondElem.type === 'c') {
            var conflux = bushyApp.bushyModel.unions[secondElem.id];
            bushyApp.bushyModel.events[firstElem.id].setExternalUnion(secondElem.id);
            bushyApp.bushyModel.unions[secondElem.id].setEntry(firstElem.id);
        }

        else if (firstElem.type === 'c' && secondElem.type === 'n') {
            var conflux = bushyApp.bushyModel.unions[firstElem.id];
            bushyApp.bushyModel.events[secondElem.id].setInternalUnion(firstElem.id);
            bushyApp.bushyModel.unions[firstElem.id].setExit(secondElem.id);
        }
    }
}