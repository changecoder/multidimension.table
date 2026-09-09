package com.multidimension.table.workspace;

import com.multidimension.table.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "workspaces")
public class Workspace extends BaseEntity {

    @Column(nullable = false, length = 128)
    private String name;

    @Column(length = 512)
    private String description;
}
