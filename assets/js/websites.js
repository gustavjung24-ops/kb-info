(() => {
  document.querySelectorAll(".website-card").forEach((card) => {
    const button = card.querySelector("a.card-button");
    if (!button) return;

    card.addEventListener("click", (event) => {
      const isInteractive = event.target.closest("a, button");
      if (isInteractive) return;
      button.click();
    });
  });

  document.querySelectorAll("button.disabled").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "URL đang cập nhật";
      window.setTimeout(() => {
        button.textContent = "Đang làm URL";
      }, 1600);
    });
  });
})();
