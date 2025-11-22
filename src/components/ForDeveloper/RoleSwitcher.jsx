import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FiUser, FiHome, FiSearch, FiSettings } from 'react-icons/fi';
import useUser from '../../../hooks/useUser';

const RoleSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
// console.log('object',userInfo);
const currentUser =useUser('tanvir@gmail.com')
  // Debug: Check what currentUser contains
  // console.log('RoleSwitcher currentUser:', currentUser);
//   console.log('Is developer?', currentUser?.developer);

  // Mutation to update user role
  const { mutate: updateRole, isPending } = useMutation({
    mutationFn: async (newRole) => {
      console.log('Attempting to update role to:', newRole);
      console.log('User ID:', currentUser?._id);
      
      const response = await fetch('/api/users/update-role', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: currentUser._id, 
          role: newRole 
        }),
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update role');
      }
      
      return data;
    },
    onSuccess: (data) => {
      console.log('Role update successful:', data);
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
  if (!currentUser?.developer) {
    console.log('User is not a developer, hiding RoleSwitcher');
    return null;
  }
  if (currentUser?.developer=='false') {
    console.log('User is not a developer, hiding RoleSwitcher', currentUser?.developer);
    return null;
  }

  // Rest of your component remains the same...
  const roles = [
    { key: 'user', label: 'User', icon: FiUser, color: 'bg-neutral' },
    { key: 'seeker', label: 'Seeker', icon: FiSearch, color: 'bg-primary' },
    { key: 'provider', label: 'Provider', icon: FiHome, color: 'bg-secondary' },
    { key: 'admin', label: 'Admin', icon: FiSettings, color: 'bg-accent' },
  ];

  return (
    <div className="relative">
      {/* Role Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-outline btn-sm gap-2"
        disabled={isPending}
      >
        <FiSettings className="w-4 h-4" />
        Switch Role ({currentUser.role || 'unknown'})
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
          <div className="absolute top-12 right-0 z-50 w-64 p-2 bg-base-100 border border-base-300 rounded-lg shadow-lg">
            <div className="text-sm font-semibold p-2 border-b border-base-300">
              Developer Role Switch
            </div>
            
            <div className="space-y-1 p-2">
              {roles.map(({ key, label, icon: Icon, color }) => (
                <button
                  key={key}
                  onClick={() => updateRole(key)}
                  disabled={isPending || currentUser.role === key}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    currentUser.role === key 
                      ? 'bg-primary text-primary-content' 
                      : 'hover:bg-base-200'
                  } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-base-100" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{label}</div>
                    {currentUser.role === key && (
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