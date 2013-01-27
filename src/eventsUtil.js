(function(__global__) {
    var handlers = {},
        shift = Array.prototype.shift;

    var eventsUtil = {

        handlers: {},

        /**
         * Register event
         *
         * @param {String}   evname  Event name
         * @param {Function} func    Function
         * @param {Boolean}  once    True if you want to fire this event only one time
         */
        on: function(evname, func, once) {
            if (! handlers[evname]) {
                handlers[evname] = [];
            }

            handlers[evname].push({func: func, once: once});
        },

        /**
         * Register once event
         *
         * @param {String}   evname  Event name
         * @param {Function} func    Function
         *
         * @see mvc.util.events.on
         */
        once: function(evname, func) {
            this.on(evname, func, true);
        },

        /**
         * Fire registered events
         *
         * <pre>
         * arg0:     event name
         * arg1-n:   arguments to this event
         * </pre>
         *
         */
        fire: function() {
            var evname = shift.apply(arguments);
            var events = handlers[evname];
            if (! events) {
                return;
            }

            for (var i = 0, len = events.length; i < len; i++) {
                if (! events[i]) {
                    continue;
                }

                events[i].func.apply(this, arguments);
                if (events[i].once) {
                    events[i] = null;
                }
            }
        },

        /**
         * Delete register event
         *
         * @param {String} evname  Event name. If you not set, delete all events.
         */
        off: function(evname) {
            if (! evname) {
                handlers = {};
                return;
            }

            handlers[evname] = null;
        }

    };

    __global__.eventsUtil = eventsUtil;

})(this);

