if (typeof Object.create !== 'function') {
    Object.create = function( obj ) {
        function F() {}
        F.prototype = obj;
        return new F();
    }
}

(function ($, window, document, undefined) {
        var Twitter = {
            init: function( options, elem ) {
                var self = this;
                self.elem = elem;
                self.$elem = $(elem);
                self.tweets = [];
                self.url = 'http://search.twitter.com/search.json';
                self.search = (typeof options == 'string')
                    ? options
                    : options.search;

                self.options = $.extend({}, $.fn.searchTwitter.options, options);
                self.run( 1 );
            },

            fetch: function() {
                return $.ajax({
                    url: this.url,
                    dataType: 'jsonp',
                    data: { q: this.search }
                });
            },

            displayTweets: function() {
                var self = this;
                self.$elem[this.options.animateWith]( self.options.animateSpeed, function() {
                    self.$elem.html(self.tweets)[self.options.animateWith]( self.options.animateSpeed );
                });
                return this;
            },

            /**
             * @param results Array
             */
            prepareResults: function( results ) {
                var self = this;
                results = self.limit(results.results, self.options.limit);
                self.tweets = $.map(results, function(elem) {
                    // Appending text to a wrapper
                    return $(self.options.wrapWith).append(elem.text)[0];
                });

                return self;
            },
            
            limit: function( obj, limit ) {
                return obj.slice(0, limit);
            },

            run: function( length ) {

                var self = this;

                setTimeout(function() {
                    self.fetch().done(function( results ) {
                        // Using cached "self" because "this" now is pointing to ajax object
                        self
                        .prepareResults( results )
                        .displayTweets();
                        if (typeof(self.options.onComplete) === 'function') {
                            self.options.onComplete.apply( self.elem, arguments);
                        }
                    });

                    if ( self.options.refresh ) {
                        self.run();
                    }

                }, length || self.options.refresh);
            }
        };

        $.fn.searchTwitter = function( options ) {
            return this.each(function() {
                var twitter = Object.create( Twitter );
                twitter.init(options, this);
            });
        };

    // Default options
    $.fn.searchTwitter.options = {
        limit: '5',
        wrapWith: '<li></li>',
        animateWith: 'slideToggle',
        animateSpeed: 1000,
        refresh: 2000,  // in miliseconds
        onComplete: function() {
            // your code on search complete
        }

    }

}(jQuery, window, document));