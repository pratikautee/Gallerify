chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

function teardown() {
  window.location.reload();
}

chrome.action.onClicked.addListener(async (tab) => {
  const previousState = await chrome.action.getBadgeText({
    tabId: tab.id,
  });

  await chrome.action.setBadgeText({
    text: previousState === "GLRFY" ? "OFF" : "GLRFY",
  });
  if (previousState === "OFF") {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["gallerify.js"],
    });
  } else {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: teardown,
    });
  }
});
