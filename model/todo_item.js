var CT = this.CT || {};

(function () {

  CT.todo_item = {
    create: function (text) {
      var self = Object.create(this);
      self.text = text;
      return self;
    },
  
    render: function () {
      var checked = this.isComplete ? ' checked' : '';
      return '<li><input type="checkbox"' + checked + '><span>' + this.escapedText() + '</span></li>';
    },
  
    complete: function () {
      this.isComplete = true;
    },
    
    escapedText: function () {
      return this.text.replace('<', '&lt;');
    }
  };

  if (typeof module === 'object') {
    module.exports = CT.todo_item;
  }

}());