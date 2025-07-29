(() => {
  const patterns = ["Similar Paints","Similar Colours","Similar Colors"];
  const headingRE = new RegExp(
    patterns.map(p => p.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")).join("|"),
    "i"
  );

  // Hide immediately
  document.documentElement.style.backgroundColor = "#000";
  document.documentElement.style.visibility = "hidden";

  function isolate() {
    const h2 = Array.from(document.querySelectorAll("h2"))
      .find(el => headingRE.test(el.textContent));
    if (!h2) return false;

    let container = h2;
    while (container.parentElement && container.parentElement !== document.body) {
      container = container.parentElement;
    }

    const clone = container.cloneNode(true);
    document.body.innerHTML = "";
    document.body.appendChild(clone);
    document.documentElement.style.visibility = "";
    const credit = document.createElement("a");
    credit.textContent = "Powered by Encycolorpedia";
    credit.href = "https://encycolorpedia.com/";
    credit.target = "_blank";
    Object.assign(credit.style, {
      position: "fixed", bottom: "10px", right: "10px",
      fontSize: "12px", color: "#fff", textDecoration: "none",
      opacity: "0.7", zIndex: "9999"
    });
    document.body.appendChild(credit);
    return true;
  }

  if (!isolate()) {
    const obs = new MutationObserver((_, o) => {
      if (isolate()) o.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
  }
})();