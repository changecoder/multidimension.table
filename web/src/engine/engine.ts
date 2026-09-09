import { IChangesetPack, IRemoteChangeset } from "@/types/engine";
import * as DatasheetApi from "@/services/datasheet-api";

import { BufferStorage, ILsStore } from "./buffer-storage";

export class Engine {
  resourceId: string;
  bufferStorage: BufferStorage;
  getRevision: () => number;
  getState: () => any;
  private prepared = false;

  constructor(params: {
    resourceId: string;
    getRevision: () => number;
    getState: () => any;
    lsStore: ILsStore;
  }) {
    const { resourceId, getRevision, getState, lsStore } = params;
    this.resourceId = resourceId;
    this.getRevision = getRevision;
    this.getState = getState;
    this.bufferStorage = new BufferStorage(resourceId, lsStore);
  }

  async prepare(checkVersion?: number): Promise<void> {
    try {
      await this.checkLocalDiffChanges(checkVersion);
      this.prepared = true;
    } catch (error) {
      console.error("Engine prepare error: ", error);
    }
  }

  async checkLocalDiffChanges(checkVersion?: number): Promise<void> {
    if (!this.bufferStorage.localPendingChangeset) {
      checkVersion != null && this.checkMissChanges(checkVersion);
      return;
    }
  }

  async checkMissChanges(revisionUpgradeTo: number): Promise<void> {
    const revision = this.getRevision();

    if (revisionUpgradeTo <= revision + 1) {
      return;
    }

    const changesetList = await this.fetchMissVersion(
      revision + 1,
      revisionUpgradeTo,
    );
    changesetList.forEach((cs) => {
      this.applyNewChanges(cs);
    });
  }

  private async fetchMissVersion(
    startRevision: number,
    endRevision: number,
  ): Promise<IRemoteChangeset[]> {
    console.log(
      "fetchingMissVersion",
      this.resourceId,
      startRevision,
      endRevision,
    );
    const result = await DatasheetApi.fetchChangesets<IChangesetPack>(
      this.resourceId,
      startRevision,
      endRevision,
      this.getState().pageParams.nodeId,
      this.getState().pageParams.shareId,
    );
    if (result.data.success) {
      console.log("fetchMissVersion success: ", result.data.data);

      if (endRevision - startRevision !== result.data.data.length) {
        throw new Error("error_the_length_of_changeset_is_inconsistent");
      }
      return result.data.data;
    }

    throw new Error("error_occurred_while_requesting_the_missing_version");
  }

  private applyNewChanges(cs: IRemoteChangeset) {
    if (
      this.bufferStorage.localPendingChangeset &&
      cs.messageId === this.bufferStorage.localPendingChangeset.messageId
    ) {
      console.error(
        "messageId in newChanges is equal to localChangeset and has been converted to ACK",
      );
      return;
    }
  }
}
