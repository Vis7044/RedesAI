document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const url = tabs[0].url;

        document.getElementById("pasteAndRedirect").addEventListener("click", function () {
            navigator.clipboard.writeText(url).then(() => {
                alert("URL copied to clipboard!");
            });
            const targetSite = "http://localhost:5173/analyse"; // Change this to your React app URL
            const fullUrl = `${targetSite}?youtubeUrl=${encodeURIComponent(url)}`;
            
            chrome.tabs.create({ url: fullUrl });
        });
    });
});
