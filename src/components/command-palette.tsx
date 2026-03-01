"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type CommandItem = {
  label: string;
  href: string;
  detail: string;
  group: "pages" | "entries";
};

type CommandPaletteProps = {
  items: CommandItem[];
};

export default function CommandPalette({ items }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  function openPalette() {
    setOpen(true);
    setSelectedIndex(0);
  }

  function closePalette() {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return items;

    return items.filter((item) => {
      const haystack = `${item.label} ${item.detail} ${item.href}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [items, query]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const isCommandKey = event.ctrlKey || event.metaKey;

      if (isCommandKey && event.key.toLowerCase() === "p") {
        event.preventDefault();
        setOpen((current) => {
          if (current) {
            setQuery("");
          }
          setSelectedIndex(0);
          return !current;
        });
        return;
      }

      if (event.key === "Escape") {
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
        return;
      }

      if (!open) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) => (current + 1) % Math.max(filteredItems.length, 1));
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) =>
          (current - 1 + Math.max(filteredItems.length, 1)) % Math.max(filteredItems.length, 1)
        );
      }

      if (event.key === "Enter" && filteredItems.length > 0) {
        event.preventDefault();
        router.push(filteredItems[selectedIndex].href);
        setOpen(false);
        setQuery("");
        setSelectedIndex(0);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filteredItems, open, router, selectedIndex]);

  const selectedItem = filteredItems[selectedIndex];

  return (
    <>
      <button type="button" className="palette-trigger" onClick={openPalette}>
        <span className="palette-trigger-title">Search Explorer</span>
        <span className="palette-trigger-shortcut">Ctrl+P</span>
      </button>

      {open ? (
        <div className="palette-overlay" role="presentation" onClick={closePalette}>
          <div
            className="palette-shell"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="palette-input-wrap">
              <span className="palette-prefix">&gt;</span>
              <input
                className="palette-input"
                type="text"
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a page or entry name"
                aria-label="Search"
              />
            </div>

            <div className="palette-results" role="listbox" aria-label="Search results">
              {filteredItems.length === 0 ? (
                <p className="palette-empty">No matches</p>
              ) : (
                filteredItems.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <Link
                      key={`${item.group}:${item.href}`}
                      href={item.href}
                      className={`palette-item ${isSelected ? "palette-item--selected" : ""}`}
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={closePalette}
                    >
                      <span className="palette-item-label">{item.label}</span>
                      <span className="palette-item-meta">{item.detail}</span>
                    </Link>
                  );
                })
              )}
            </div>

            {selectedItem ? (
              <div className="palette-footer">
                <span>{selectedItem.group === "entries" ? "Entry" : "Page"}</span>
                <span>{selectedItem.href}</span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
