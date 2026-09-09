package com.multidimension.table.workspace.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WorkspaceRequest {

    @NotBlank(message = "name is required")
    @Size(max = 128, message = "name must be at most 128 characters")
    private String name;

    @Size(max = 512, message = "description must be at most 512 characters")
    private String description;
}
