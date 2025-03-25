import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Save, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Permission {
  id: string;
  name: string;
  description: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
}

interface RolePermissionMatrixProps {
  roles: Role[];
  permissions: Permission[];
  onSave: (roles: Role[]) => void;
}

const RolePermissionMatrix: React.FC<RolePermissionMatrixProps> = ({
  roles: initialRoles,
  permissions,
  onSave,
}) => {
  const [roles, setRoles] = useState<Role[]>(initialRoles);
  const [isAddingRole, setIsAddingRole] = useState(false);
  const [newRoleName, setNewRoleName] = useState("");
  const [editingRoleId, setEditingRoleId] = useState<string | null>(null);

  const handlePermissionToggle = (roleId: string, permissionId: string) => {
    setRoles(
      roles.map((role) => {
        if (role.id === roleId) {
          const hasPermission = role.permissions.includes(permissionId);
          return {
            ...role,
            permissions: hasPermission
              ? role.permissions.filter((id) => id !== permissionId)
              : [...role.permissions, permissionId],
          };
        }
        return role;
      }),
    );
  };

  const handleAddRole = () => {
    if (!newRoleName.trim()) return;

    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      permissions: [],
    };

    setRoles([...roles, newRole]);
    setNewRoleName("");
    setIsAddingRole(false);
  };

  const handleDeleteRole = (roleId: string) => {
    setRoles(roles.filter((role) => role.id !== roleId));
  };

  const handleSaveChanges = () => {
    onSave(roles);
  };

  const handleRoleNameChange = (roleId: string, newName: string) => {
    setRoles(
      roles.map((role) =>
        role.id === roleId ? { ...role, name: newName } : role,
      ),
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Role & Permission Management</h2>
        <Button onClick={handleSaveChanges} className="bg-[#0A1128]">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-3 text-left font-medium text-gray-500 w-40">
                Roles
              </th>
              {permissions.map((permission) => (
                <th
                  key={permission.id}
                  className="p-3 text-center font-medium text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <span>{permission.name}</span>
                    <span className="text-xs text-gray-400">
                      {permission.description}
                    </span>
                  </div>
                </th>
              ))}
              <th className="p-3 text-center font-medium text-gray-500 w-20">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  {editingRoleId === role.id ? (
                    <div className="flex items-center">
                      <Input
                        value={role.name}
                        onChange={(e) =>
                          handleRoleNameChange(role.id, e.target.value)
                        }
                        className="w-full"
                      />
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setEditingRoleId(null)}
                        className="ml-2"
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="font-medium cursor-pointer hover:underline"
                      onClick={() => setEditingRoleId(role.id)}
                    >
                      {role.name}
                    </div>
                  )}
                </td>
                {permissions.map((permission) => (
                  <td
                    key={`${role.id}-${permission.id}`}
                    className="p-3 text-center"
                  >
                    <Checkbox
                      id={`${role.id}-${permission.id}`}
                      checked={role.permissions.includes(permission.id)}
                      onCheckedChange={() =>
                        handlePermissionToggle(role.id, permission.id)
                      }
                    />
                  </td>
                ))}
                <td className="p-3 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRole(role.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddingRole ? (
        <div className="mt-4 p-3 border rounded-md">
          <h3 className="font-medium mb-2">Add New Role</h3>
          <div className="flex items-center">
            <Input
              placeholder="Enter role name"
              value={newRoleName}
              onChange={(e) => setNewRoleName(e.target.value)}
              className="flex-1 mr-2"
            />
            <Button onClick={handleAddRole} className="bg-[#0A1128]">
              Add
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setIsAddingRole(false);
                setNewRoleName("");
              }}
              className="ml-2"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAddingRole(true)}
          variant="outline"
          className="mt-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Role
        </Button>
      )}
    </div>
  );
};

export default RolePermissionMatrix;
