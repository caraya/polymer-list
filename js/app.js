document.addEventListener('polymer-ready', function() {
  var navicon = document.getElementById('navicon');
  var drawerPanel = document.getElementById('drawerPanel');
  
  // Attaches click event listener to navicon to toggle drawerPanel
  navicon.addEventListener('click', function() {
    drawerPanel.togglePanel();
  });
  
});