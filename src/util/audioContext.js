// I don't think there's any reason to have multiple audio contexts on a page
// so we'll just have a single top-level constant that every call to `useAudio`
// can reuse.
export const ctx = new AudioContext()
