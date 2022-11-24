async function copyTextToClipboard(textToCopy) {
    try {
        await navigator.clipboard.writeText(window.location.hostname + textToCopy);
        alert("URL has been copied to the clipboard.")
    } catch (error) {
        console.log('URL failed to copy to clipboard. error=' + error);
    }
}