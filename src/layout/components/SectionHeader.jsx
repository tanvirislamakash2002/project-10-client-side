export const SectionHeader = ({ title, sidebarCollapsed }) => (
  !sidebarCollapsed && (
    <div className="px-4 py-3 mb-2">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {title}
      </h3>
    </div>
  )
);