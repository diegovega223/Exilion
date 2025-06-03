const STORAGE_KEY = 'exilion-save';

export function saveGame(data) {
  try {
    const json = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, json);
    console.log('[SaveManager] Game saved to localStorage.');
  } catch (err) {
    console.error('[SaveManager] Error saving:', err);
  }
}

export function loadGame() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('[SaveManager] Error loading:', err);
    return null;
  }
}

export function hasSavedGame() {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function deleteSave() {
  localStorage.removeItem(STORAGE_KEY);
  console.log('[SaveManager] Save deleted from localStorage.');
}