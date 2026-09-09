package com.multidimension.table.workspace;

import com.multidimension.table.common.ApiResponse;
import com.multidimension.table.workspace.dto.WorkspaceRequest;
import com.multidimension.table.workspace.dto.WorkspaceResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/workspaces")
@RequiredArgsConstructor
public class WorkspaceController {

    private final WorkspaceService workspaceService;

    @GetMapping
    public ApiResponse<List<WorkspaceResponse>> list() {
        return ApiResponse.ok(workspaceService.list());
    }

    @GetMapping("/{id}")
    public ApiResponse<WorkspaceResponse> get(@PathVariable UUID id) {
        return ApiResponse.ok(workspaceService.get(id));
    }

    @PostMapping
    public ApiResponse<WorkspaceResponse> create(@Valid @RequestBody WorkspaceRequest request) {
        return ApiResponse.ok(workspaceService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<WorkspaceResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody WorkspaceRequest request) {
        return ApiResponse.ok(workspaceService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable UUID id) {
        workspaceService.delete(id);
        return ApiResponse.ok();
    }
}
