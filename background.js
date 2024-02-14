chrome.commands.onCommand.addListener((command) => {
    if (command.startsWith('open-folder-')) {
      // Extract the folder index from the command
      const folderIndex = parseInt(command.split('-')[2], 10) - 1;
      openBookmarksInFolder(folderIndex);
    } else if (command === 'close-tabs') {
      closeAllTabsExceptCurrent();
    }
  });
  
  function openBookmarksInFolder(folderIndex) {
    // Get the entire bookmarks tree
    chrome.bookmarks.getTree((bookmarks) => {
      // Get the children of the bookmarks bar, which is usually the first node
      const bookmarksBar = bookmarks[0].children[0].children;
      // Get the folder at the specified index
      const folder = bookmarksBar[folderIndex];
  
      // Check if the folder exists and has children
      if (folder && folder.children) {
        // Open all bookmarks within the folder
        folder.children.forEach((child) => {
          if (child.url) { // Ensure it is a bookmark, not a subfolder
            chrome.tabs.create({ url: child.url });
          }
        });
      } else {
        console.error(`No folder found at index: ${folderIndex}`);
      }
    });
  }
  
  
  function closeAllTabsExceptCurrent() {
    chrome.tabs.query({ currentWindow: true, active: false }, (tabs) => {
      const tabsToClose = tabs.map(tab => tab.id);
      chrome.tabs.remove(tabsToClose);
    });
  }
  