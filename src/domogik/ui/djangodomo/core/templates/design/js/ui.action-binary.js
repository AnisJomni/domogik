(function($) {
    
    $.widget("ui.binary_command", {
        _init: function() {
            var self = this, o = this.options;
            this.states = o.states.toLowerCase().split(/\s*,\s*/);
            this.element.binary_widget_core({
                usage: o.usage,
                states: this.states,
                isCommand: true
            })
                .attr("tabindex", 0)
                .click(function () {self.switchState()})
                .keypress(function (e) {if (e.which == 13 || e.which == 32) {self.switchState()}});

        },
        
        setState: function(state) {
            var self = this;
            if (state == 1 || state.toLowerCase() == this.states[1]) {
                this.currentState = 1;
            } else {
                this.currentState = 0;
            }
            this.displayState(this.currentState);
        },
        
        displayState: function(state) {
            if (state == 1) {
                this.element.binary_widget_core('displayState', 1);
            } else {
                this.element.binary_widget_core('displayState', 0);                
            }
        },
        
        switchState: function() {
            var switchState = (this.currentState == 0)?1:0;
            this.runAction(switchState);
        },
        
        runAction: function(state) {
            this.options.action(this, this.states[state]);
        }
    });
    
    $.extend($.ui.binary_command, {
        defaults: {
        }
    });
    
    /* Widget */
    
    $.widget("ui.binary_widget_core", {
        _init: function() {
            var self = this, o = this.options;
            this.element.addClass('widget_binary');
            this.elementicon = $("<div class='widget_icon'></div>");
            this.elementicon.addClass('icon32-state-' + o.usage);                
            this.element.append(this.elementicon);            
            if(o.isCommand) {
                this.elementstate = $("<div class='widget_state'></div>");
                this.elementicon.append(this.elementstate);
                this.element.addClass('command');
            } else {
                this.elementicon.addClass('binary_1');                
            }
        },
        
        displayState: function(state) {
            if (state == 1) {
                this.elementicon.addClass('binary_1');                
                this.elementicon.removeClass('binary_0');
            } else {
                this.elementicon.addClass('binary_0');                                
                this.elementicon.removeClass('binary_1');                                
            }
            this.elementstate.text(this.options.states[state]);
        }
    });
    
    $.extend($.ui.binary_widget_core, {
        defaults: {
            isCommand: true
        }
    });    
})(jQuery);