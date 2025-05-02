document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;

        document.getElementById("pasteAndRedirect").addEventListener("click", function () {

            const targetSite = "http://localhost:5173/analyse";
            const checkSite = "http://localhost:5173/"; // Base URL to check against
            const fullUrl = `${targetSite}?youtubeUrl=${encodeURIComponent(url)}`;

            chrome.tabs.query({}, function (allTabs) {
                // Look for an existing tab with the base URL
                const existingTab = allTabs.find(tab => tab.url.startsWith(targetSite));
                const currentTab = allTabs.find(tab => tab.url.startsWith(checkSite));
                

                if (currentTab) {
                    // Update the existing tab and activate it
                    if (currentTab.id !== tabs[0].id) {
                        chrome.tabs.update(currentTab.id, { url: fullUrl, active: true });
                    }
                } else if (existingTab) {
                    chrome.tabs.update(existingTab.id, { url: fullUrl, active: true });
                } else {
                    // Create a new tab if not found
                    chrome.tabs.create({ url: fullUrl });
                }
            });
        });
    });
});
