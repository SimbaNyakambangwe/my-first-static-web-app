const tabList = document.querySelector(".guest-tabs");
const guestTabs = [...tabList.querySelectorAll("a")];
const guestPanels = [...document.querySelectorAll(".guide-panel")];

function tabFromLocation() {
  return guestTabs.find((tab) => tab.hash === window.location.hash) || guestTabs[0];
}

function activateGuestTab(activeTab) {
  guestTabs.forEach((tab) => {
    const selected = tab === activeTab;
    tab.setAttribute("aria-selected", String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });
  guestPanels.forEach((panel) => {
    panel.hidden = `#${panel.id}` !== activeTab.hash;
  });
}

// Without JavaScript, the category links still open visible sections.
tabList.setAttribute("role", "tablist");
guestTabs.forEach((tab, index) => {
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", tab.hash.slice(1));
  const panel = document.getElementById(tab.hash.slice(1));
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", tab.id);
  panel.tabIndex = 0;

  tab.addEventListener("click", (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    activateGuestTab(tab);
    if (window.location.hash !== tab.hash) {
      window.history.pushState(null, "", tab.hash);
    }
  });
  tab.addEventListener("keydown", (event) => {
    let nextIndex;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % guestTabs.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + guestTabs.length) % guestTabs.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = guestTabs.length - 1;
    else if (event.key === " ") nextIndex = index;
    else return;
    event.preventDefault();
    const nextTab = guestTabs[nextIndex];
    nextTab.click();
    nextTab.focus();
  });
});

activateGuestTab(tabFromLocation());
window.addEventListener("popstate", () => activateGuestTab(tabFromLocation()));
window.addEventListener("hashchange", () => activateGuestTab(tabFromLocation()));
