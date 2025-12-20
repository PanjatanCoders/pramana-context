import { saveContext, getContextByUrl } from "../storage/contextStore";
import { createContext } from "../storage/contextModel.js";

chrome.tabs.onActivated.addListener(async ({ tabId }) => {
  const tab = await chrome.tabs.get(tabId);

  if (!tab || !tab.url || tab.url.startsWith("chrome://")) return;

  let context = await getContextByUrl(tab.url);

  if (!context) {
    context = createContext({
      url: tab.url,
      title: tab.title,
    });
  } else {
    context.lastVisitedAt = Date.now();
    context.visitCount++;
  }
  await saveContext(context);
});
