chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'organizeTabs') {
      organizeTabs();
    } else if (request.action === 'ungroupAll') {
      ungroupAllTabs();
    }
  });
  
  async function organizeTabs() {
    const tabs = await chrome.tabs.query({currentWindow: true});
    const categories = await categorizeTabs(tabs);
    
    for (const [category, tabIds] of Object.entries(categories)) {
      if (tabIds.length > 1) {
        const group = await chrome.tabs.group({tabIds});
        await chrome.tabGroups.update(group, {title: category});
      }
    }
  }
  
//   async function categorizeTabs(tabs) {
//     // This is a simplified categorization. In a real implementation,
//     // you would call an AI service here.
//     const categories = {};
//     for (const tab of tabs) {
//       const domain = new URL(tab.url).hostname;
//       if (!categories[domain]) {
//         categories[domain] = [];
//       }
//       categories[domain].push(tab.id);
//     }
//     return categories;
//   }
async function categorizeTabs(tabs) {
    const tabData = tabs.map(tab => ({
      url: tab.url,
      title: tab.title
    }));
  
    const response = await fetch('http://localhost:5000/categorize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tabData)
    });
  
    const categories = await response.json();
  
    // Convert category indices to tab IDs
    const categorizedTabs = {};
    for (const [category, indices] of Object.entries(categories)) {
      categorizedTabs[category] = indices.map(index => tabs[index].id);
    }
  
    return categorizedTabs;
  }
  
  
  async function ungroupAllTabs() {
    const tabs = await chrome.tabs.query({currentWindow: true});
    await chrome.tabs.ungroup(tabs.map(tab => tab.id));
  }
  