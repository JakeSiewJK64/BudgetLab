package com.jakesiewjk64.budgetlab.models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "usertorolebridge")
public class UserToRoleModel implements Serializable {

    @Id
    private Long id;

    private Long userid;

    private Long roleid;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "roleid", referencedColumnName = "id", insertable = false, updatable = false)
    private UserRole userRole;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getRoleid() {
        return roleid;
    }

    public void setRoleid(Long roleid) {
        this.roleid = roleid;
    }

    public UserRole getUserRole() {
        return userRole;
    }

}
