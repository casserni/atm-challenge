export function getStorage() {
  try {
    const state = sessionStorage.getItem('overmind');
    return JSON.parse(state || '');
  } catch (e) {
    // noop
  }
}

export function setStorage(state: any) {
  try {
    sessionStorage.setItem('overmind', JSON.stringify(state));
  } catch (e) {
    // noop
  }
}
