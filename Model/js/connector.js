var connector = {
    setConnection: function(firstElem, secondElem) {
        // проверка, нужно ли удалять какую-то связь
        if (firstElem.type == 'n' && secondElem.type == 'n') {
            //1) проверить что у первого нет исходящий союз
            if (bushyApp.bushyModel.getUnionById(bushyApp.bushyModel.getEventById(firstElem.id).externalUnion)) {
                if (bushyApp.bushyModel.getUnionById(bushyApp.bushyModel.getEventById(firstElem.id).externalUnion).type == 'flux') {
                    console.log('Im a catbug');
                    bushyApp.removeUnion(bushyApp.bushyModel.getEventById(firstElem.id).externalUnion);
                }
            }
            //2) проверить что у второго входящего союза
            if (bushyApp.bushyModel.getUnionById(bushyApp.bushyModel.getEventById(secondElem.id).internalUnion)) {
                if (bushyApp.bushyModel.getUnionById(bushyApp.bushyModel.getEventById(secondElem.id).internalUnion).type == 'flux') {
                    console.log('Im an impossibear');
                    bushyApp.removeUnion(bushyApp.bushyModel.getElementById(secondElem.id).internalUnion);
                }
            }

            //3) проверить что элемент не один и тот же!
            // если нет, добавить союз
            if (firstElem.id != secondElem.id) {
                bushyApp.addUnion('flux'); //можно сделать через factory
                var newFlux = bushyApp.bushyModel.getUnionById(bushyApp.unionCounter - 1);

                bushyApp.bushyModel.getEventById(firstElem.id).setExternalUnion(parseInt(newFlux.id));
                bushyApp.bushyModel.getEventById(secondElem.id).setInternalUnion(parseInt(newFlux.id));
                bushyApp.bushyModel.getUnionById(bushyApp.unionCounter - 1).setEntry(parseInt(firstElem.id));
                bushyApp.bushyModel.getUnionById(bushyApp.unionCounter - 1).setExit(parseInt(secondElem.id));
            }
        }

        else if (firstElem.type === 'n' && secondElem.type === 'i') {
            bushyApp.bushyModel.getEventById(firstElem.id).setExternalUnion(parseInt(secondElem.id));

            if (firstElem.portNum == 4) {
                bushyApp.bushyModel.getUnionById(secondElem.id).setTopEntry(parseInt(firstElem.id));
            }
            else if (firstElem.portNum == 3) {
                bushyApp.bushyModel.getUnionById(secondElem.id).setLeftEntry(parseInt(firstElem.id));
            }
        }

        else if (firstElem.type === 'i' && secondElem.type === 'n') {
            bushyApp.bushyModel.getEventById(secondElem.id).setInternalUnion(parseInt(firstElem.id));

            if (secondElem.portNum == 1) {
                bushyApp.bushyModel.getUnionById(firstElem.id).setRightExit(parseInt(secondElem.id));
            }
            if (secondElem.portNum == 2) {
                bushyApp.bushyModel.getUnionById(firstElem.id).setBottomExit(parseInt(secondElem.id));
            }
        }

        else if (firstElem.type === 'n' && secondElem.type === 'f') {
            bushyApp.bushyModel.getEventById(firstElem.id).setExternalUnion(parseInt(secondElem.id));
            bushyApp.bushyModel.getUnionById(secondElem.id).setEntry(parseInt(firstElem.id));
        }

        else if (firstElem.type === 'f' && secondElem.type === 'n') {
            bushyApp.bushyModel.getEventById(secondElem.id).setInternalUnion(parseInt(firstElem.id));
            bushyApp.bushyModel.getUnionById(firstElem.id).setExit(parseInt(secondElem.id));
        }

        else if (firstElem.type === 'n' && secondElem.type === 'c') {
            bushyApp.bushyModel.getEventById(firstElem.id).setExternalUnion(parseInt(secondElem.id));
            bushyApp.bushyModel.getUnionById(secondElem.id).setEntry(parseInt(firstElem.id));
        }

        else if (firstElem.type === 'c' && secondElem.type === 'n') {
            bushyApp.bushyModel.getEventById(secondElem.id).setInternalUnion(parseInt(firstElem.id));
            bushyApp.bushyModel.getUnionById(firstElem.id).setExit(parseInt(secondElem.id));
        }
    }
}