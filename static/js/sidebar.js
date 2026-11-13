document.addEventListener("DOMContentLoaded", () => {
  const links = Array.from(
    document.querySelectorAll(".sidebar__toc a[href^='#']")
  );

  const headings = links
    .map((link) => {
      const id = decodeURIComponent(link.hash.slice(1));
      return document.getElementById(id);
    })
    .filter(Boolean);

  if (!headings.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.boundingClientRect.top - b.boundingClientRect.top
        );

      if (!visible.length) return;

      const activeId = visible[0].target.id;

      links.forEach((link) => {
        const isActive =
          decodeURIComponent(link.hash.slice(1)) === activeId;

        link.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    },
    {
      rootMargin: "-10% 0px -70% 0px",
      threshold: 0,
    }
  );

  headings.forEach((heading) => observer.observe(heading));
});