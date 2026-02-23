import { Ban, Clock, MessageSquare } from "lucide-react";

export const CommunicationSection = ({ settings, updateNestedSetting }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-2">Communication Settings</h2>
        <p className="text-[var(--color-text-muted)]">Manage how you communicate with others</p>
      </div>

      {/* Message Preferences */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-[var(--color-primary)]" />
          Message Preferences
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Preferred Contact Method</span>
            </label>
            <select
              value={settings.communication.messagePreferences}
              onChange={(e) => updateNestedSetting('communication', 'messagePreferences', null, e.target.value)}
              className="select select-bordered w-full max-w-xs"
            >
              <option value="in-app">In-App Messaging</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          <label className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
            <div>
              <div className="font-medium text-[var(--color-base-content)]">Auto-Reply</div>
              <div className="text-sm text-[var(--color-text-muted)]">Automatically respond when you're busy</div>
            </div>
            <input 
              type="checkbox"
              checked={settings.communication.autoReply}
              onChange={(e) => updateNestedSetting('communication', 'autoReply', null, e.target.checked)}
              className="toggle toggle-primary"
            />
          </label>

          {settings.communication.autoReply && (
            <div>
              <label className="label">
                <span className="label-text font-medium">Auto-Reply Message</span>
              </label>
              <textarea
                value={settings.communication.autoReplyMessage}
                onChange={(e) => updateNestedSetting('communication', 'autoReplyMessage', null, e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Thanks for your message! I'll get back to you soon."
                rows="3"
              />
            </div>
          )}
        </div>
      </div>

      {/* Preferred Contact Hours */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-[var(--color-primary)]" />
          Preferred Contact Hours
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text font-medium">Start Time</span>
            </label>
            <input
              type="time"
              value={settings.communication.preferredHours.start}
              onChange={(e) => updateNestedSetting('communication', 'preferredHours', 'start', e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text font-medium">End Time</span>
            </label>
            <input
              type="time"
              value={settings.communication.preferredHours.end}
              onChange={(e) => updateNestedSetting('communication', 'preferredHours', 'end', e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] mt-2">
          Messages outside these hours will be delivered, but marked as "Outside preferred hours"
        </p>
      </div>

      {/* Blocked Users */}
      <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-[var(--color-base-content)] mb-4 flex items-center gap-2">
          <Ban className="w-5 h-5 text-[var(--color-error)]" />
          Blocked Users ({settings.communication.blockedUsers.length})
        </h3>
        
        {settings.communication.blockedUsers.length === 0 ? (
          <div className="text-center py-8 text-[var(--color-text-muted)]">
            <Ban className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No blocked users</p>
          </div>
        ) : (
          <div className="space-y-2">
            {settings.communication.blockedUsers.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[var(--color-base-100)] dark:bg-[var(--color-base-200)] rounded-lg">
                <span className="text-[var(--color-base-content)]">{user.name}</span>
                <button className="btn btn-ghost btn-sm text-[var(--color-primary)]">
                  Unblock
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};