package com.multidimension.table.workspace;

import com.multidimension.table.workspace.dto.WorkspaceRequest;
import com.multidimension.table.workspace.dto.WorkspaceResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WorkspaceService {

    private final WorkspaceRepository workspaceRepository;

    @Transactional(readOnly = true)
    public List<WorkspaceResponse> list() {
        return workspaceRepository.findAll().stream()
                .map(WorkspaceResponse::new)
                .toList();
    }

    @Transactional(readOnly = true)
    public WorkspaceResponse get(UUID id) {
        return new WorkspaceResponse(findOrThrow(id));
    }

    @Transactional
    public WorkspaceResponse create(WorkspaceRequest request) {
        Workspace workspace = new Workspace();
        workspace.setName(request.getName());
        workspace.setDescription(request.getDescription());
        return new WorkspaceResponse(workspaceRepository.save(workspace));
    }

    @Transactional
    public WorkspaceResponse update(UUID id, WorkspaceRequest request) {
        Workspace workspace = findOrThrow(id);
        workspace.setName(request.getName());
        workspace.setDescription(request.getDescription());
        return new WorkspaceResponse(workspaceRepository.save(workspace));
    }

    @Transactional
    public void delete(UUID id) {
        if (!workspaceRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "workspace not found");
        }
        workspaceRepository.deleteById(id);
    }

    private Workspace findOrThrow(UUID id) {
        return workspaceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "workspace not found"));
    }
}
