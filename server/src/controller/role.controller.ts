import { Request, Response } from "express";
import Role from "../model/role.model";
import { sendResponse, sendError } from "../utils/responseHandler";
import { logger } from "../config/logger";
import { PERMISSIONS } from "../config/permissions";

// Flatten valid permissions for validation
const VALID_PERMISSIONS = Object.values(PERMISSIONS).flatMap((module) =>
  Object.values(module)
);

// @desc    Get all roles
// @route   GET /api/admin/roles
// @access  Admin
export const getRoles = async (req: Request, res: Response) => {
  try {
    // In the future, we can aggregate user counts here
    const roles = await Role.find().sort({ createdAt: 1 });
    return sendResponse(res, 200, true, "Roles fetched successfully", roles);
  } catch (error: any) {
    logger.error(`Error fetching roles: ${error.message}`);
    return sendError(res, 500, "Failed to fetch roles");
  }
};

// @desc    Get single role
// @route   GET /api/admin/roles/:id
// @access  Admin
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      return sendError(res, 404, "Role not found");
    }
    return sendResponse(res, 200, true, "Role fetched successfully", role);
  } catch (error: any) {
    logger.error(`Error fetching role: ${error.message}`);
    return sendError(res, 500, "Failed to fetch role");
  }
};

// @desc    Create new role
// @route   POST /api/admin/roles
// @access  Admin
export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description, permissions } = req.body;

    if (!name) {
      return sendError(res, 400, "Role name is required");
    }

    const roleExists = await Role.findOne({ name });
    if (roleExists) {
      return sendError(res, 400, "Role already exists");
    }

    // Validate permissions
    if (permissions && Array.isArray(permissions)) {
      const invalidPerms = permissions.filter(
        (p) => !VALID_PERMISSIONS.includes(p)
      );
      if (invalidPerms.length > 0) {
        return sendError(
          res,
          400,
          `Invalid permissions: ${invalidPerms.join(", ")}`
        );
      }
    }

    const role = await Role.create({
      name,
      description,
      permissions: permissions || [],
      isSystem: false,
    });

    return sendResponse(res, 201, true, "Role created successfully", role);
  } catch (error: any) {
    logger.error(`Error creating role: ${error.message}`);
    return sendError(res, 500, "Failed to create role");
  }
};

// @desc    Update role
// @route   PUT /api/admin/roles/:id
// @access  Admin
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { name, description, permissions } = req.body;

    const role = await Role.findById(req.params.id);
    if (!role) {
      return sendError(res, 404, "Role not found");
    }

    // Prevent renaming system roles (optional logic, but good practice)
    if (role.isSystem && name && name !== role.name) {
      return sendError(res, 400, "Cannot rename system roles");
    }

    // Validate permissions
    if (permissions && Array.isArray(permissions)) {
      const invalidPerms = permissions.filter(
        (p) => !VALID_PERMISSIONS.includes(p)
      );
      if (invalidPerms.length > 0) {
        return sendError(
          res,
          400,
          `Invalid permissions: ${invalidPerms.join(", ")}`
        );
      }
    }

    role.name = name || role.name;
    role.description =
      description !== undefined ? description : role.description;
    role.permissions = permissions || role.permissions;

    await role.save();

    return sendResponse(res, 200, true, "Role updated successfully", role);
  } catch (error: any) {
    logger.error(`Error updating role: ${error.message}`);
    return sendError(res, 500, "Failed to update role");
  }
};

// @desc    Delete role
// @route   DELETE /api/admin/roles/:id
// @access  Admin
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return sendError(res, 404, "Role not found");
    }

    if (role.isSystem) {
      return sendError(res, 400, "Cannot delete system roles");
    }

    await Role.deleteOne({ _id: role._id });

    return sendResponse(res, 200, true, "Role deleted successfully", null);
  } catch (error: any) {
    logger.error(`Error deleting role: ${error.message}`);
    return sendError(res, 500, "Failed to delete role");
  }
};
