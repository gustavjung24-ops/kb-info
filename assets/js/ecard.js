"use strict";
/* Futurebook eCard. One media adapter for all R2 imagery; no fallback photos. */
(() => {
  const cardUrl = document.querySelector('link[rel="canonical"]')?.href || window.location.href;
  const shareTitle = document.querySelector('meta[property="og:title"]')?.content || document.title;
  const shareText = document.querySelector('meta[property="og:description"]')?.content || "";
  const shareButton = document.getElementById("share-card");
  const status = document.getElementById("share-result");

  async function shareCard() {
    try {
      if (navigator.share) {
        await navigator.share({ title: shareTitle, text: shareText, url: cardUrl });
        return;
      }
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cardUrl);
      } else {
        const input = document.createElement("textarea");
        input.value = cardUrl;
        input.setAttribute("readonly", "");
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        if (!document.execCommand("copy")) throw new Error("Không sao chép được");
        input.remove();
      }
      status.textContent = "Đã sao chép liên kết eCard.";
      shareButton.lastChild.textContent = " ✓";
    } catch (error) {
      if (error && error.name === "AbortError") return;
      status.textContent = "Không thể chia sẻ tự động. Hãy sao chép địa chỉ trang.";
    }
  }
  if (shareButton) shareButton.addEventListener("click", shareCard);

  async function loadMedia() {
    let config;
    try {
      const response = await fetch("/config/media.json", { cache: "no-cache" });
      if (!response.ok) return;
      config = await response.json();
    } catch (_) {
      return;
    }
    // Only configured public R2 URLs are eligible. Empty fields leave DOM slots blank.
    const base = config && typeof config.r2PublicBaseUrl === "string" ? config.r2PublicBaseUrl.trim() : "";
    if (!base) return;
    let origin;
    try {
      const parsed = new URL(base);
      if (parsed.protocol !== "https:") return;
      origin = parsed.origin;
    } catch (_) { return; }
    document.querySelectorAll("[data-media]").forEach((slot) => {
      const key = slot.getAttribute("data-media");
      const path = config.images && config.images[key];
      if (typeof path !== "string" || !path || path.startsWith("/") || path.includes("..") || /^(?:https?:|data:|\/\/)/i.test(path)) return;
      let src;
      try {
        src = new URL(path, base.endsWith("/") ? base : base + "/");
        if (src.origin !== origin) return;
      } catch (_) { return; }
      const img = document.createElement("img");
      img.alt = slot.getAttribute("aria-label") || "";
      img.loading = key === "hero" || key === "avatar" ? "eager" : "lazy";
      img.decoding = "async";
      img.addEventListener("load", () => slot.classList.add("has-image"), { once: true });
      img.addEventListener("error", () => {
        img.remove();
        slot.classList.remove("has-image");
      }, { once: true });
      // Lazy images must enter the DOM before loading; a detached lazy image
      // can wait forever, which previously left all cards below the hero blank.
      slot.replaceChildren(img);
      img.src = src.href;
    });
  }
  loadMedia();
})();
