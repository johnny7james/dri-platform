export type SavedResearchKind = "publication" | "insight";

export type SavedResearchItem = {
  id: string;
  kind: SavedResearchKind;
  title: string;
  subtitle: string;
  label: string;
  date: string;
  href: string;
  savedAt?: string;
};

const SAVED_RESEARCH_KEY = "dri-saved-research";

function notifySavedResearchUpdate() {
  window.dispatchEvent(
    new Event("dri-saved-research-updated"),
  );
}

export function readSavedResearch(): SavedResearchItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedValue = window.localStorage.getItem(
    SAVED_RESEARCH_KEY,
  );

  if (!storedValue) {
    return [];
  }

  try {
    const parsedValue = JSON.parse(
      storedValue,
    ) as SavedResearchItem[];

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.sort((firstItem, secondItem) => {
      const firstDate = firstItem.savedAt
        ? new Date(firstItem.savedAt).getTime()
        : 0;

      const secondDate = secondItem.savedAt
        ? new Date(secondItem.savedAt).getTime()
        : 0;

      return secondDate - firstDate;
    });
  } catch {
    window.localStorage.removeItem(SAVED_RESEARCH_KEY);
    return [];
  }
}

export function isResearchSaved(
  kind: SavedResearchKind,
  id: string,
): boolean {
  return readSavedResearch().some(
    (item) => item.kind === kind && item.id === id,
  );
}

export function toggleSavedResearch(
  item: SavedResearchItem,
): boolean {
  const currentItems = readSavedResearch();

  const itemAlreadyExists = currentItems.some(
    (currentItem) =>
      currentItem.kind === item.kind &&
      currentItem.id === item.id,
  );

  const nextItems = itemAlreadyExists
    ? currentItems.filter(
        (currentItem) =>
          !(
            currentItem.kind === item.kind &&
            currentItem.id === item.id
          ),
      )
    : [
        {
          ...item,
          savedAt: new Date().toISOString(),
        },
        ...currentItems,
      ];

  window.localStorage.setItem(
    SAVED_RESEARCH_KEY,
    JSON.stringify(nextItems),
  );

  notifySavedResearchUpdate();

  return !itemAlreadyExists;
}

export function removeSavedResearch(
  kind: SavedResearchKind,
  id: string,
) {
  const nextItems = readSavedResearch().filter(
    (item) => !(item.kind === kind && item.id === id),
  );

  window.localStorage.setItem(
    SAVED_RESEARCH_KEY,
    JSON.stringify(nextItems),
  );

  notifySavedResearchUpdate();
}

export function clearSavedResearch() {
  window.localStorage.removeItem(SAVED_RESEARCH_KEY);
  notifySavedResearchUpdate();
}
