"use strict";

var Doodle = function (element) {
    this.element = element;
    this.canvas = null;

    this.lineThickness = 8;
    this.color = '#000000';
    this.drawing = false;
    this.history = [];

    var ua = navigator.userAgent.toLowerCase();
    this.isAndroid = ua.indexOf("android") > -1;
};


Doodle.prototype = {

    init: function () {

        this.canvas = document.createElement('canvas');
        this.element.appendChild(this.canvas);

        this.canvas.setAttribute('width', $(this.element).width());
        this.canvas.setAttribute('height', $(this.element).height());

        this.context = this.canvas.getContext('2d');

        //Setup a fresh canvas
        this.color = '#000000';
        $('#currentColour').css('background-color', this.color);
        this.clear();

        var self = this;

        // Mouse
        if (!this.isAndroid) {
            $(this.canvas).bind('mousedown', function (e) {
                self.drawStart(e);
            });
            $(this.canvas).bind('mousemove', function (e) {
                self.draw(e);
            });
            $(this.canvas).bind('mouseup', function (e) {
                self.drawEnd(e);
            });
            $('body').bind('mouseup', function (e) {
                self.drawEnd(e);
            });
        }

        // Touch
        $(this.canvas).bind('touchstart', function (e) {
            self.drawStart(e);
        });
        $(this.canvas).bind('touchmove', function (e) {
            self.draw(e);
        });
        $(this.canvas).bind('touchend', function (e) {
            self.drawEnd(e);
        });
    },

    clear: function (e) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = this.color;
        this.history = [];
    },

    getImage: function (e) {
        if (this.history.length < 1) {
            return false;
        }
        return this.canvas.toDataURL("image/png");
    },

    saveHistoryState: function () {
        // Limit history size
        while (this.history.length >= 30) {
            this.history.shift();
        }
        this.history.push(this.context.getImageData(0, 0, this.canvas.width, this.canvas.height));
    },

    undo: function () {
        if (this.history.length > 0) {
            this.context.putImageData(this.history[(this.history.length - 1)], 0, 0);
            this.history.pop();
        }
        else {
            alert('Nothing to undo!');
        }
    },

    drawStart: function (e) {
        if (e) {
            e.preventDefault();
        }
        this.saveHistoryState();

        var x, y;
        if (e.originalEvent.touches) {
            x = e.originalEvent.touches[0].pageX - $(this.canvas).offset().left;
            y = e.originalEvent.touches[0].pageY - $(this.canvas).offset().top;
        }
        else {
            x = e.pageX - $(this.canvas).offset().left;
            y = e.pageY - $(this.canvas).offset().top;
        }

        this.drawing = true;
        $(this.canvas).addClass('drawing');

        this.context.lineWidth = this.lineThickness;
        this.context.lineCap = "round";
        this.context.lineJoin = "round";
        this.context.strokeStyle = this.color;
        this.context.fillStyle = this.color;

        this.oldX = x;
        this.oldY = y;

        // Draw a dot at the current position
        this.context.beginPath();
        this.context.arc(x, y, (this.lineThickness / 2), 0, 2 * Math.PI, false);
        this.context.closePath();
        this.context.fill();

        this.context.beginPath();
    },

    draw: function (e) {
        if (e) {
            e.preventDefault();
        }

        var x, y;
        if (e.originalEvent.touches) {
            x = e.originalEvent.touches[0].pageX - $(this.canvas).offset().left;
            y = e.originalEvent.touches[0].pageY - $(this.canvas).offset().top;
        }
        else {
            x = e.pageX - $(this.canvas).offset().left;
            y = e.pageY - $(this.canvas).offset().top;
        }

        if (this.drawing) {
            this.context.moveTo(this.oldX, this.oldY);
            this.context.lineTo(x, y);
            this.context.stroke();
        }

        this.oldX = x;
        this.oldY = y;
    },

    drawEnd: function (e) {
        if (e) {
            e.preventDefault();
        }

        if (this.drawing) {
            this.context.closePath();
            this.context.stroke();
            this.drawing = false;
        }
        $(this.canvas).removeClass('drawing');
    },

    rgbToHex: function (rgb) {
        var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");

        function hex(x) {
            return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
        }

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
};
