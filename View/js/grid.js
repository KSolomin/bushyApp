/*grid.js*/
/*global $, jQuery, bushApp*/

bushApp.grid = {
    width:          3840,
    height:         2160,
    color:          '#000',  //grid lines color;
    cellsize:       10,     //cellsize in pixels;
    subdivisions:   5,      //number of grid subdivisions
    transparency:   0.1,    //transparency of the whole grid;
    lineWidth:     {
        normal: 1,
        bold:   2
    },   //sets line width for normal and bold lines;
    draw:   function (canvasID) {
        'use strict';

        var canvas, ctx;
        function getCanvasByID(canvasID) {
            var canvas;
            canvas = document.getElementById(canvasID);
            return canvas;
        }
        function drawHLines(canvas) {
            var lineWidth,
                currPos,
                ctx,
                i;

            lineWidth = bushApp.grid.lineWidth.normal;
            currPos = 0;
            i = bushApp.grid.subdivisions;

            ctx     = canvas.getContext('2d');

            while (currPos < canvas.height) {
                if (i === bushApp.grid.subdivisions) {
                    lineWidth = bushApp.grid.lineWidth.bold;
                    i = 0;
                } else {
                    lineWidth = bushApp.grid.lineWidth.normal;
                }
                ctx.moveTo(0, currPos);
                ctx.fillRect(0, currPos, canvas.width, lineWidth);
                currPos += bushApp.grid.cellsize;
                i += 1;
            }
        }
        function drawVLines(canvas) {
            var lineWidth,
                currPos,
                ctx,
                i;

            ctx = canvas.getContext('2d');

            lineWidth = bushApp.grid.lineWidth.normal;
            currPos = 0;
            i = bushApp.grid.subdivisions;

            while (currPos < canvas.width) {
                if (i === bushApp.grid.subdivisions) {
                    lineWidth = bushApp.grid.lineWidth.bold;
                    i = 0;
                } else {
                    lineWidth = bushApp.grid.lineWidth.normal;
                }
                ctx.moveTo(currPos, 0);
                ctx.fillRect(currPos, 0, lineWidth, canvas.height);
                currPos += bushApp.grid.cellsize;
                i += 1;
            }
        }

        canvas = getCanvasByID(canvasID);

        canvas.width    = bushApp.grid.width;
        canvas.height   = bushApp.grid.height;

        ctx = canvas.getContext('2d');

        ctx.fillStyle   = bushApp.grid.color;
        ctx.globalAlpha = bushApp.grid.transparency;

        ctx.save();

        drawHLines(canvas);
        drawVLines(canvas);

        ctx.restore();
    },
    snap:   function (element) {
        'use strict';

        var elemPos;

        elemPos = bushApp.element.getPosition(element);
        elemPos.x = Math.floor(elemPos.x / bushApp.grid.cellsize) * bushApp.grid.cellsize + 1;
        elemPos.y = Math.floor(elemPos.y / bushApp.grid.cellsize) * bushApp.grid.cellsize + 1;
        bushApp.element.setPosition(element, elemPos);
        bushApp.node.redrawConnectedArcs(element);
    }
};