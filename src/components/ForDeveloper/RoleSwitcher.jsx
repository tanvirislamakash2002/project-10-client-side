import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUser, FiHome, FiSearch, FiSettings } from 'react-icons/fi';
import useUser from '../../../hooks/useUser';
import useAxios from '../../../hooks/useAxios';

const RoleSwitcher = ({ justifyEnd, right0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const currentUser = useUser()
  const axiosInstance = useAxios()
  // Mutation to update user role
  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async (newRole) => {
      const response = await axiosInstance.patch(`/api/v1/role/update-role`, {
        userId: currentUser?.user?._id,
        role: newRole
      });

      const data = response.data

      if (data && !data.success) {
        throw new Error(data.message || 'Failed to update role');
      }

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error updating role:', error);
      alert(`Failed to update role: ${error.message}`);
    },
  });

  // Only show if user is developer
  if (!currentUser?.user?.developer) {
    return null;
  }
  if (currentUser?.user?.developer == 'false') {
    return null;
  }

  // Rest of your component remains the same...
  const roles = [
    // { key: 'user', label: 'User', icon: FiUser, color: 'bg-neutral' },
    { key: 'seeker', label: 'Seeker', icon: FiSearch, color: 'bg-primary' },
    { key: 'provider', label: 'Provider', icon: FiHome, color: 'bg-secondary' },
    { key: 'admin', label: 'Admin', icon: FiSettings, color: 'bg-yellow-800' },
  ];

  return (
    <div className={`relative flex  z-50 ${justifyEnd}`}>
      {/* Role Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-outline btn-sm gap-2 fixed z-50 top-32 py-6 opacity-40 hover:opacity-100 transition-opacity duration-200"
        disabled={isPending}
      >
        <FiSettings className="w-8 h-8" />
        Switch Role ({currentUser?.user?.role || 'unknown'})
        {isPending && <span className="loading loading-spinner loading-xs"></span>}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className={`fixed top-26 ${right0 ? right0 : 'left-0'} z-50 w-64 p-2 bg-base-100 border border-base-300 rounded-lg shadow-lg`}>
            <div className="text-sm font-semibold p-2 border-b border-base-300">
              Developer Role Switch
            </div>

            <div className="space-y-1 p-2">
              {roles.map(({ key, label, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => updateRole(key)}
                  disabled={isPending || currentUser?.user?.role === key}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${currentUser.role === key
                    ? 'bg-primary text-primary-content'
                    : 'hover:bg-base-200'
                    } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-base-100" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{label}</div>
                    {currentUser?.user?.role === key && (
                      <div className="text-xs opacity-80">Current Role</div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-base-300 text-xs text-gray-500">
              Developer mode enabled
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoleSwitcher;