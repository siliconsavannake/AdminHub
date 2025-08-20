import {
  users,
  departments,
  roles,
  permissions,
  miniApplications,
  rolePermissions,
  userRoles,
  userMiniApplications,
  type User,
  type UpsertUser,
  type Department,
  type InsertDepartment,
  type Role,
  type InsertRole,
  type Permission,
  type InsertPermission,
  type MiniApplication,
  type InsertMiniApplication,
  type UserRole,
  type InsertUserRole,
  type UserMiniApplication,
  type InsertUserMiniApplication,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, like, ilike } from "drizzle-orm";

export interface IStorage {
  // User operations (required for authentication)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // User management
  getAllUsers(): Promise<User[]>;
  getUsersByDepartment(departmentId: string): Promise<User[]>;
  getUsersWithRoles(): Promise<any[]>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
  searchUsers(query: string): Promise<User[]>;
  
  // Department operations
  getAllDepartments(): Promise<Department[]>;
  createDepartment(department: InsertDepartment): Promise<Department>;
  updateDepartment(id: string, data: Partial<Department>): Promise<Department>;
  deleteDepartment(id: string): Promise<void>;
  
  // Role operations
  getAllRoles(): Promise<Role[]>;
  getRolesWithPermissions(): Promise<any[]>;
  createRole(role: InsertRole): Promise<Role>;
  updateRole(id: string, data: Partial<Role>): Promise<Role>;
  deleteRole(id: string): Promise<void>;
  
  // Permission operations
  getAllPermissions(): Promise<Permission[]>;
  createPermission(permission: InsertPermission): Promise<Permission>;
  updatePermission(id: string, data: Partial<Permission>): Promise<Permission>;
  deletePermission(id: string): Promise<void>;
  
  // Mini Application operations
  getAllMiniApplications(): Promise<MiniApplication[]>;
  getMiniApplicationsForUser(userId: string): Promise<any[]>;
  createMiniApplication(app: InsertMiniApplication): Promise<MiniApplication>;
  updateMiniApplication(id: string, data: Partial<MiniApplication>): Promise<MiniApplication>;
  deleteMiniApplication(id: string): Promise<void>;
  searchMiniApplications(query: string): Promise<MiniApplication[]>;
  
  // Association operations
  assignRoleToUser(userId: string, roleId: string): Promise<UserRole>;
  removeRoleFromUser(userId: string, roleId: string): Promise<void>;
  assignAppToUser(userId: string, appId: string, accessLevel: string): Promise<UserMiniApplication>;
  removeAppFromUser(userId: string, appId: string): Promise<void>;
  assignPermissionToRole(roleId: string, permissionId: string): Promise<void>;
  removePermissionFromRole(roleId: string, permissionId: string): Promise<void>;
  
  // Analytics
  getStatistics(): Promise<any>;
  getRecentActivity(): Promise<any[]>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.createdAt));
  }

  async getUsersByDepartment(departmentId: string): Promise<User[]> {
    return await db.select().from(users).where(eq(users.departmentId, departmentId));
  }

  async getUsersWithRoles(): Promise<any[]> {
    return await db
      .select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        departmentId: users.departmentId,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .orderBy(desc(users.createdAt));
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async searchUsers(query: string): Promise<User[]> {
    return await db
      .select()
      .from(users)
      .where(
        ilike(users.firstName, `%${query}%`).or(
          ilike(users.lastName, `%${query}%`)
        ).or(
          ilike(users.email, `%${query}%`)
        )
      );
  }

  // Department operations
  async getAllDepartments(): Promise<Department[]> {
    return await db.select().from(departments).orderBy(departments.name);
  }

  async createDepartment(department: InsertDepartment): Promise<Department> {
    const [newDepartment] = await db.insert(departments).values(department).returning();
    return newDepartment;
  }

  async updateDepartment(id: string, data: Partial<Department>): Promise<Department> {
    const [department] = await db
      .update(departments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(departments.id, id))
      .returning();
    return department;
  }

  async deleteDepartment(id: string): Promise<void> {
    await db.delete(departments).where(eq(departments.id, id));
  }

  // Role operations
  async getAllRoles(): Promise<Role[]> {
    return await db.select().from(roles).orderBy(roles.name);
  }

  async getRolesWithPermissions(): Promise<any[]> {
    return await db
      .select({
        id: roles.id,
        name: roles.name,
        description: roles.description,
        isActive: roles.isActive,
        createdAt: roles.createdAt,
      })
      .from(roles)
      .orderBy(roles.name);
  }

  async createRole(role: InsertRole): Promise<Role> {
    const [newRole] = await db.insert(roles).values(role).returning();
    return newRole;
  }

  async updateRole(id: string, data: Partial<Role>): Promise<Role> {
    const [role] = await db
      .update(roles)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(roles.id, id))
      .returning();
    return role;
  }

  async deleteRole(id: string): Promise<void> {
    await db.delete(roles).where(eq(roles.id, id));
  }

  // Permission operations
  async getAllPermissions(): Promise<Permission[]> {
    return await db.select().from(permissions).orderBy(permissions.name);
  }

  async createPermission(permission: InsertPermission): Promise<Permission> {
    const [newPermission] = await db.insert(permissions).values(permission).returning();
    return newPermission;
  }

  async updatePermission(id: string, data: Partial<Permission>): Promise<Permission> {
    const [permission] = await db
      .update(permissions)
      .set(data)
      .where(eq(permissions.id, id))
      .returning();
    return permission;
  }

  async deletePermission(id: string): Promise<void> {
    await db.delete(permissions).where(eq(permissions.id, id));
  }

  // Mini Application operations
  async getAllMiniApplications(): Promise<MiniApplication[]> {
    return await db.select().from(miniApplications).orderBy(desc(miniApplications.createdAt));
  }

  async getMiniApplicationsForUser(userId: string): Promise<any[]> {
    return await db
      .select({
        id: miniApplications.id,
        name: miniApplications.name,
        description: miniApplications.description,
        category: miniApplications.category,
        icon: miniApplications.icon,
        url: miniApplications.url,
        status: miniApplications.status,
        accessLevel: userMiniApplications.accessLevel,
      })
      .from(miniApplications)
      .innerJoin(userMiniApplications, eq(miniApplications.id, userMiniApplications.miniApplicationId))
      .where(eq(userMiniApplications.userId, userId));
  }

  async createMiniApplication(app: InsertMiniApplication): Promise<MiniApplication> {
    const [newApp] = await db.insert(miniApplications).values(app).returning();
    return newApp;
  }

  async updateMiniApplication(id: string, data: Partial<MiniApplication>): Promise<MiniApplication> {
    const [app] = await db
      .update(miniApplications)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(miniApplications.id, id))
      .returning();
    return app;
  }

  async deleteMiniApplication(id: string): Promise<void> {
    await db.delete(miniApplications).where(eq(miniApplications.id, id));
  }

  async searchMiniApplications(query: string): Promise<MiniApplication[]> {
    return await db
      .select()
      .from(miniApplications)
      .where(
        ilike(miniApplications.name, `%${query}%`).or(
          ilike(miniApplications.description, `%${query}%`)
        )
      );
  }

  // Association operations
  async assignRoleToUser(userId: string, roleId: string): Promise<UserRole> {
    const [userRole] = await db.insert(userRoles).values({ userId, roleId }).returning();
    return userRole;
  }

  async removeRoleFromUser(userId: string, roleId: string): Promise<void> {
    await db.delete(userRoles).where(
      and(eq(userRoles.userId, userId), eq(userRoles.roleId, roleId))
    );
  }

  async assignAppToUser(userId: string, appId: string, accessLevel: string): Promise<UserMiniApplication> {
    const [assignment] = await db
      .insert(userMiniApplications)
      .values({ userId, miniApplicationId: appId, accessLevel })
      .returning();
    return assignment;
  }

  async removeAppFromUser(userId: string, appId: string): Promise<void> {
    await db.delete(userMiniApplications).where(
      and(eq(userMiniApplications.userId, userId), eq(userMiniApplications.miniApplicationId, appId))
    );
  }

  async assignPermissionToRole(roleId: string, permissionId: string): Promise<void> {
    await db.insert(rolePermissions).values({ roleId, permissionId });
  }

  async removePermissionFromRole(roleId: string, permissionId: string): Promise<void> {
    await db.delete(rolePermissions).where(
      and(eq(rolePermissions.roleId, roleId), eq(rolePermissions.permissionId, permissionId))
    );
  }

  // Analytics
  async getStatistics(): Promise<any> {
    const totalApps = await db.select().from(miniApplications);
    const activeUsers = await db.select().from(users).where(eq(users.isActive, true));
    const totalDepartments = await db.select().from(departments);
    const totalRoles = await db.select().from(roles);

    return {
      totalApps: totalApps.length,
      activeUsers: activeUsers.length,
      departments: totalDepartments.length,
      permissionGroups: totalRoles.length,
    };
  }

  async getRecentActivity(): Promise<any[]> {
    // Return recent activity data
    const recentUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt))
      .limit(5);

    return recentUsers.map(user => ({
      type: 'user_created',
      user: `${user.firstName} ${user.lastName}`,
      action: 'was added to the system',
      timestamp: user.createdAt,
    }));
  }
}

export const storage = new DatabaseStorage();
