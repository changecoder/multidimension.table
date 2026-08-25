import { LS_DATASHEET_NAMESPACE } from "@/constants/engine";
import { ILocalChangeset, IOperation } from "../types/engine";

export class BufferStorage {
  static bufferStorageNamespace = `${LS_DATASHEET_NAMESPACE}.opBuffer`;
  static pendingChangesetsNamespace = `${LS_DATASHEET_NAMESPACE}.localChangeset`;

  private opBufferStorage = this.lsStore.namespace(
    BufferStorage.bufferStorageNamespace,
  );
  private _localPendingChangeset: ILocalChangeset | undefined;
  private _opBuffer: IOperation[] = [];
  private localPendingChangesetStorage = this.lsStore.namespace(
    BufferStorage.pendingChangesetsNamespace,
  );

  get opBuffer(): IOperation[] {
    return this._opBuffer;
  }

  set opBuffer(value: IOperation[]) {
    this._opBuffer = value;
    if (value == null || value.length === 0) {
      this.opBufferStorage.remove(this.resourceId);
      return;
    }
    try {
      this.opBufferStorage.set(this.resourceId, value);
    } catch (e) {
      console.error(e);
    }
  }

  get localPendingChangeset(): ILocalChangeset | undefined {
    return this._localPendingChangeset;
  }

  set localPendingChangeset(value: ILocalChangeset | undefined) {
    this._localPendingChangeset = value;
    if (value == null) {
      this.localPendingChangesetStorage.remove(this.resourceId);
      return;
    }
    try {
      this.localPendingChangesetStorage.set(this.resourceId, value);
    } catch (e) {
      this.localPendingChangesetStorage.remove(this.resourceId);
      console.error(e);
    }
  }

  constructor(
    public resourceId: string,
    public lsStore: ILsStore,
  ) {
    this.resumeLocalState();
  }

  resumeLocalState() {
    this.localPendingChangeset = this.compatibleLocalChangeset(
      this.localPendingChangesetStorage.get(this.resourceId) || undefined,
    );
    this.opBuffer = this.opBufferStorage.get(this.resourceId) || [];
  }

  private compatibleLocalChangeset(
    changeset: ILocalChangeset | undefined,
  ): ILocalChangeset | undefined {
    if (!changeset) {
      return;
    }
    if (changeset["datasheetId"]) {
      const newLocalChangeset = {
        baseRevision: changeset.baseRevision,
        resourceId: changeset["datasheetId"],
        operations: changeset.operations,
        messageId: changeset.messageId,
      };
      return newLocalChangeset;
    }
    return changeset;
  }
}

export interface ILsStore {
  namespace(namespace: string, noSession?: true): ILsStore;
  remove(key: any, alt?: any): any;
  get(key: any, alt?: any): any;
  set(key: any, data: any, overwrite?: boolean): any;
}
