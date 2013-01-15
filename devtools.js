(function(){
var getSelectedEmberView = function() {
  // _V is a global of the selected view for experimentation in the console
  _V = undefined;

  var level;
  function findView(elm, n) {
    if (elm == null) { return undefined; }
    level = n || 0;
    var found = Ember.View.views[elm.id];
    if (found == null) {
      level++;
      found = findView(elm.parentElement, level);
    }
    return found;
  }

  var view = findView($0),
      data = { __proto__: null };
  if (view) {
    _V = view;
    if (level > 0) { data.distance = level; }
    data.id = view.get('elementId');
    data.type = view.toString().match(/^<(.*):/)[1];
    data.view = view;
  }
  return data;
};

chrome.devtools.panels.elements.createSidebarPane(
  "Ember View",
  function(sidebar) {
    function updatePanel() {
      sidebar.setExpression("(" + getSelectedEmberView.toString() + ")()");
    }

    updatePanel();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updatePanel);
  }
);
})();