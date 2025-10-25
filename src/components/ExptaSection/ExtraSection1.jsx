import React, { useState, useEffect } from 'react';

const ExtraSection1 = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-gray-800 transition-colors duration-300">
      <button 
        onClick={() => setIsDark(!isDark)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      {/* Test 1: Basic background colors */}
      <div className="p-4 mb-4 bg-white dark:bg-gray-700 text-black dark:text-white rounded-lg border">
        Test 1: Background colors (white → gray-700)
      </div>

      {/* Test 2: Text colors */}
      <div className="p-4 mb-4 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded">
        Test 2: Text colors (gray-800 → gray-200)
      </div>

      {/* Test 3: Your custom colors */}
      <div className="p-4 mb-4 bg-custom-100 dark:bg-custom-300 text-white rounded">
        Test 3: Custom colors (custom-100 → custom-300)
      </div>

      {/* Test 4: Red colors as you wanted */}
      <div className="p-4 mb-4 bg-red-500 dark:bg-green-800 text-white rounded">
        Test 4: Red colors (red-500 → red-800)
      </div>

      {/* Debug info */}
      <div className="p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded">
        <p>Debug Info:</p>
        <p>Dark Mode State: {isDark ? 'ON' : 'OFF'}</p>
        <p>HTML has 'dark' class: {document.documentElement.classList.contains('dark') ? 'YES' : 'NO'}</p>
      </div>
    </div>
  );
};

export default ExtraSection1;