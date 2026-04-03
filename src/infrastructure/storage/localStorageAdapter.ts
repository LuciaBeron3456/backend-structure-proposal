// Placeholder local storage adapter for the architecture mockup.
// Real file/object storage behavior will be implemented here later.
export class LocalStorageAdapter {
  async save(_path: string, _contents: string) {
    return true;
  }
}
