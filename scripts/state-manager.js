const storage = localStorage;
const storageKey = 'app-state';
let loaded = false;

const defaultState = [1];
const state = [];

export function load () {
  if (loaded) return state;
  const storedState = storage.getItem(storageKey);
  if (storedState) state.push(...storedState.split(',').map(s => +s));
  else state.push(...defaultState);
  console.log('state manager - load', storedState);
  loaded = true;
  return state;
}

export function update (id, value) {
  console.log('update', id, value);
  state[id] = value;
  storage.setItem(storageKey, state);
}
