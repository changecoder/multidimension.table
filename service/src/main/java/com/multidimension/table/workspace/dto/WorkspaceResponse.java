package com.multidimension.table.workspace.dto;

import com.multidimension.table.workspace.Workspace;
import lombok.Getter;

import java.time.Instant;
import java.util.UUID;

@Getter
public class WorkspaceResponse {

    private final UUID id;
    private final String name;
    private final String description;
    private final Instant createdAt;
    private final Instant updatedAt;

    public WorkspaceResponse(Workspace workspace) {
        this.id = workspace.getId();
        this.name = workspace.getName();
        this.description = workspace.getDescription();
        this.createdAt = workspace.getCreatedAt();
        this.updatedAt = workspace.getUpdatedAt();
    }
}
