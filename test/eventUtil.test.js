(function($, __global__) {
    module('eventUtil', {
        teardown: function() {
            eventUtil.off();
        }
    });

    test('Fire not registered events', function() {
        var events = eventUtil;
        events.fire('nothing.event');
        ok(true, "fire not register events");
    });

    test('Fire registered events', function() {
        expect(2);
        var events = eventUtil;

        events.on('test', function() {
            ok(true, "register by on");
        });

        events.fire('test');
        events.fire('test');
    });

    test('Fire registered once events', function() {
        expect(1);
        var events = eventUtil;

        events.once('test', function() {
            ok(true, "register by on");
        });

        events.fire('test');
        events.fire('test');
    });

    test('Register some events with the same event name', function() {
        expect(2);
        var events = eventUtil;

        events.on('test', function() {
            ok(true, "register by on (1)");
        });

        events.on('test', function() {
            ok(true, "register by on (2)");
        });

        events.fire('test');
    });

    test('events arguments', function() {
        expect(2);
        var events = eventUtil;

        events.on('test', function(txt, num) {
            equal(txt, "aaaa", "event argument0");
            equal(num, 100,    "event argument1");
        });

        events.fire('test', "aaaa", 100);
    });

    test('Events off', function() {
        expect(1);
        var events = eventUtil;

        events.on('test', function() {
            ok(! true, "should not call off events");
        });

        events.off('test');
        events.fire('test');

        events.on('test1', function() {
            ok(! true, "should not call off event (1)");
        });
        events.on('test2', function() {
            ok(! true, "should not call off event (2)");
        });

        events.off();
        events.fire('test1');
        events.fire('test2');

        ok(true);
    });

})(this.jQuery, this);

