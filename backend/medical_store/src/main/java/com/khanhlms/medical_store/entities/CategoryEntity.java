package com.khanhlms.medical_store.entities;

import jakarta.persistence.*;
import jdk.jfr.Enabled;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Auditable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Setter
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Categories")
@Builder
public class CategoryEntity extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    @Column(nullable = false)
    String name;

    @Column(columnDefinition = "TEXT")
    String description;
    @Column(columnDefinition = "TEXT")
    String thumbnailUrl;
    Integer position;
    Boolean active;
    Boolean deleted;
    @Column(columnDefinition = "TEXT")
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL,  orphanRemoval = true, fetch = FetchType.EAGER)
    Set<MedicineEntity> medicines;

}
