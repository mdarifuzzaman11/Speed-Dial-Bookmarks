document.addEventListener('DOMContentLoaded', () => {
    const folderListElement = document.getElementById('folderList');
    const loadingElement = document.createElement('div');
    loadingElement.textContent = 'Loading...';
    folderListElement.appendChild(loadingElement);

    // Fetch the bookmarks
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        // Clear the loading message
        folderListElement.innerHTML = '';

        const bookmarksBar = bookmarkTreeNodes[0].children[0].children;
        bookmarksBar.forEach((node, index) => {
            if (!node.url) { // Ensure it is a folder
                const folderElement = document.createElement('div');
                folderElement.textContent = `Folder ${index + 1}: ${node.title}`;
                folderElement.className = 'folder';
                folderListElement.appendChild(folderElement);
            }
        });

        if (bookmarksBar.length === 0) {
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'No bookmark folders found.';
            folderListElement.appendChild(errorMessage);
        }
    });

    // Handle the How to Use button click
    document.getElementById('howToUseBtn').addEventListener('click', () => {
        chrome.tabs.create({ url: chrome.runtime.getURL('how-to-use.html') });
    });
});
