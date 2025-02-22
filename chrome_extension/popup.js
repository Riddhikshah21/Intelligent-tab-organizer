// document.getElementById('organizeTabs').addEventListener('click', () => {
//     chrome.runtime.sendMessage({action: 'organizeTabs'});
//   });
  
//   document.getElementById('ungroup').addEventListener('click', () => {
//     chrome.runtime.sendMessage({action: 'ungroupAll'});
//   });
  
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('organizeTabs').addEventListener('click', organizeTabs);
    document.getElementById('ungroupAll').addEventListener('click', ungroupAllTabs);
  });
  
  function organizeTabs() {
    chrome.runtime.sendMessage({action: 'organizeTabs'}, function(response) {
      document.getElementById('status').textContent = 'Tabs organized!';
    });
  }
  
  function ungroupAllTabs() {
    chrome.runtime.sendMessage({action: 'ungroupAll'}, function(response) {
      document.getElementById('status').textContent = 'All tabs ungrouped!';
    });
  }
  