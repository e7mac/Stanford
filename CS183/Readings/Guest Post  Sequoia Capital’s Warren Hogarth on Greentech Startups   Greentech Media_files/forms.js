function Forms() {
    // ensure that the only way to get back an instance is using new *and* store a reference
    // to self (in case this changes from under us)
    if (! (this instanceof arguments.callee)) {
        return new arguments.callee(arguments);
    }
    var self = this;

    this.init = function() {}

    this.showPrintLinks = function(element) {
        if (window.print) {
            $(element).show().click(function() {
                window.print();
                return false;
            });
        }
    }

    this.init()
}