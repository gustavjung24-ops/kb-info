"use strict";
/* Futurebook eCard. R2 media with shared company avatar fallback and optional personal portraits. */
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
    // Keep every media URL within the configured HTTPS R2 origin.
    const base = config && typeof config.r2PublicBaseUrl === "string" ? config.r2PublicBaseUrl.trim() : "";
    if (!base) return;
    let origin;
    try {
      const parsed = new URL(base);
      if (parsed.protocol !== "https:") return;
      origin = parsed.origin;
    } catch (_) { return; }
    function safeMediaUrl(path) {
      if (typeof path !== "string" || !path || path.startsWith("/") || path.includes("..") || /^(?:https?:|data:|\/\/)/i.test(path)) return null;
      try {
        const result = new URL(path, base.endsWith("/") ? base : base + "/");
        return result.origin === origin ? result.href : null;
      } catch (_) { return null; }
    }
    const defaultAvatarUrl = safeMediaUrl(config.defaultAvatar);
    document.querySelectorAll("[data-media]").forEach((slot) => {
      const key = slot.getAttribute("data-media") || "";
      const isAvatar = key === "avatar" || /^avatar[A-Z]/.test(key);
      const personalPath = config.images && config.images[key];
      const personalUrl = safeMediaUrl(personalPath);
      const primaryUrl = personalUrl || (isAvatar ? defaultAvatarUrl : null);
      if (!primaryUrl) return;
      const fallbackUrl = isAvatar && personalUrl !== defaultAvatarUrl ? defaultAvatarUrl : null;
      const img = document.createElement("img");
      img.alt = slot.getAttribute("aria-label") || "";
      img.loading = key === "hero" || isAvatar ? "eager" : "lazy";
      img.decoding = "async";
      const setAvatarMode = (url) => {
        if (isAvatar) slot.classList.toggle("is-default-avatar", url === defaultAvatarUrl);
      };
      img.addEventListener("load", () => slot.classList.add("has-image"));
      img.addEventListener("error", () => {
        if (fallbackUrl && img.src !== fallbackUrl) {
          setAvatarMode(fallbackUrl);
          img.src = fallbackUrl;
          return;
        }
        img.remove();
        slot.classList.remove("has-image");
      });
      // Append lazy images before setting src, otherwise below-fold slots can stay empty.
      slot.replaceChildren(img);
      setAvatarMode(primaryUrl);
      img.src = primaryUrl;
    });
  }
  loadMedia();
})();
