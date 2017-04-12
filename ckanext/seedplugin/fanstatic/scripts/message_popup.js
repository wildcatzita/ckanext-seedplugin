// Enable JavaScript's strict mode. Strict mode catches some common
// programming errors and throws exceptions, prevents some unsafe actions from
// being taken, and disables some confusing and bad JavaScript features.
"use strict";

ckan.module('message_popup', function ($, _) {
  return {
    initialize: function () {
      $.proxyAll(this, /_on/);
      this.el.modal({title: "Test", remote:true, show:false});
      this.el.on('click', this._onClick);

      // Subscribe to 'dataset_popover_clicked' events.
      // Whenever any line of code publishes an event with this topic,
      // our _onPopoverClicked function will be called.
      // this.sandbox.subscribe('button_clicked',
      //                        this._onButtonClicked);
    },

    // teardown: function() {
    //   this.sandbox.unsubscribe('button_clicked',
    //                            this._onButtonClicked);
    // },

    _snippetReceived: false,

    _onClick: function(event) {
        if (!this._snippetReceived) {
            this.sandbox.client.getTemplate('message_popup.html',
                                            this.options,
                                            this._onReceiveSnippet);
            this._snippetReceived = true;
        }

        // Publish a 'dataset_popover_clicked' event for other interested
        // JavaScript modules to receive. Pass the button that was clicked as a
        // parameter to the receiver functions.
        // this.sandbox.publish('button_clicked', this.el);
    },

    // This callback function is called whenever a 'dataset_popover_clicked'
    // event is published.
    // _onButtonClicked: function(button) {

    //   // Wrap this in an if, because we don't want this object to respond to
    //   // its own 'dataset_popover_clicked' event.
    //   if (button != this.el) {

    //     // Hide this button's popover.
    //     // (If the popover is not currently shown anyway, this does nothing).
    //     this.el.popover('hide');
    //   }
    // },

    _onReceiveSnippet: function(html) {
      this.el.modal('destroy');
      this.el.modal({title: "Test", remote:true, show:false});
      this.el.modal('show');
      //alert(html)

      //this.el.on('click', this._onClick);
    },

  };
});
