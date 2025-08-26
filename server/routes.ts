import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertDepartmentSchema,
  insertRoleSchema,
  insertPermissionSchema,
  insertMiniApplicationSchema,
  insertUserRoleSchema,
  insertUserMiniApplicationSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {

  // Auth routes
  // Mock auth route - returns a fake user for demonstration
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      const mockUser = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@companyname.com',
        role: 'admin',
        profileImageUrl: null,
        departmentId: null,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      res.json(mockUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get("/api/users/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter required" });
      }
      const users = await storage.searchUsers(query);
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to search users" });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await storage.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  app.delete("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteUser(id);
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });

  // Department routes
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch departments" });
    }
  });

  app.post("/api/departments", async (req, res) => {
    try {
      const validatedData = insertDepartmentSchema.parse(req.body);
      const department = await storage.createDepartment(validatedData);
      res.json(department);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create department" });
    }
  });

  app.put("/api/departments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const department = await storage.updateDepartment(id, req.body);
      res.json(department);
    } catch (error) {
      res.status(500).json({ message: "Failed to update department" });
    }
  });

  app.delete("/api/departments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteDepartment(id);
      res.json({ message: "Department deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete department" });
    }
  });

  // Role routes
  app.get("/api/roles", async (req, res) => {
    try {
      const roles = await storage.getAllRoles();
      res.json(roles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch roles" });
    }
  });

  app.post("/api/roles", async (req, res) => {
    try {
      const validatedData = insertRoleSchema.parse(req.body);
      const role = await storage.createRole(validatedData);
      res.json(role);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create role" });
    }
  });

  app.put("/api/roles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const role = await storage.updateRole(id, req.body);
      res.json(role);
    } catch (error) {
      res.status(500).json({ message: "Failed to update role" });
    }
  });

  app.delete("/api/roles/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteRole(id);
      res.json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete role" });
    }
  });

  // Permission routes
  app.get("/api/permissions", async (req, res) => {
    try {
      const permissions = await storage.getAllPermissions();
      res.json(permissions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch permissions" });
    }
  });

  app.post("/api/permissions", async (req, res) => {
    try {
      const validatedData = insertPermissionSchema.parse(req.body);
      const permission = await storage.createPermission(validatedData);
      res.json(permission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create permission" });
    }
  });

  app.put("/api/permissions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const permission = await storage.updatePermission(id, req.body);
      res.json(permission);
    } catch (error) {
      res.status(500).json({ message: "Failed to update permission" });
    }
  });

  app.delete("/api/permissions/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deletePermission(id);
      res.json({ message: "Permission deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete permission" });
    }
  });

  // Mini Application routes
  app.get("/api/mini-applications", async (req, res) => {
    try {
      const apps = await storage.getAllMiniApplications();
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch mini applications" });
    }
  });

  app.get("/api/mini-applications/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const apps = await storage.getMiniApplicationsForUser(userId);
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user applications" });
    }
  });

  app.get("/api/mini-applications/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Query parameter required" });
      }
      const apps = await storage.searchMiniApplications(query);
      res.json(apps);
    } catch (error) {
      res.status(500).json({ message: "Failed to search applications" });
    }
  });

  app.post("/api/mini-applications", async (req, res) => {
    try {
      const validatedData = insertMiniApplicationSchema.parse(req.body);
      const app = await storage.createMiniApplication(validatedData);
      res.json(app);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create mini application" });
    }
  });

  app.put("/api/mini-applications/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const app = await storage.updateMiniApplication(id, req.body);
      res.json(app);
    } catch (error) {
      res.status(500).json({ message: "Failed to update mini application" });
    }
  });

  app.delete("/api/mini-applications/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteMiniApplication(id);
      res.json({ message: "Mini application deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete mini application" });
    }
  });

  // Assignment routes
  app.post("/api/users/:userId/roles", async (req, res) => {
    try {
      const { userId } = req.params;
      const { roleId } = req.body;
      const userRole = await storage.assignRoleToUser(userId, roleId);
      res.json(userRole);
    } catch (error) {
      res.status(500).json({ message: "Failed to assign role to user" });
    }
  });

  app.delete("/api/users/:userId/roles/:roleId", async (req, res) => {
    try {
      const { userId, roleId } = req.params;
      await storage.removeRoleFromUser(userId, roleId);
      res.json({ message: "Role removed from user successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove role from user" });
    }
  });

  app.post("/api/users/:userId/applications", async (req, res) => {
    try {
      const { userId } = req.params;
      const { appId, accessLevel } = req.body;
      const assignment = await storage.assignAppToUser(userId, appId, accessLevel);
      res.json(assignment);
    } catch (error) {
      res.status(500).json({ message: "Failed to assign application to user" });
    }
  });

  app.delete("/api/users/:userId/applications/:appId", async (req, res) => {
    try {
      const { userId, appId } = req.params;
      await storage.removeAppFromUser(userId, appId);
      res.json({ message: "Application removed from user successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove application from user" });
    }
  });

  // Analytics routes
  app.get("/api/analytics/statistics", async (req, res) => {
    try {
      const stats = await storage.getStatistics();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  app.get("/api/analytics/activity", async (req, res) => {
    try {
      const activity = await storage.getRecentActivity();
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch recent activity" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
