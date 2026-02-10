import React from 'react';
import {
  Home,
  DollarSign,
  Calendar,
  MapPin,
  Users,
  Shield,
  Dog,
  Cigarette,
  Wine,
  Clock,
  Coffee,
  Dumbbell,
  Moon,
  Sun,
  ChefHat,
  Image,
  Film,
  Star,
  CheckCircle2,
  ExternalLink,
  Upload,
  X,
  Plus
} from 'lucide-react';

// Lifestyle Tab Component
export const LifestyleTab = ({ profile }) => (
  <div className="space-y-8">
    {/* Daily Schedule */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-[var(--color-primary)]" />
        Daily Schedule & Habits
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[var(--color-warning)]/10 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-6 h-6 text-[var(--color-warning)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Wake Time</div>
          </div>
          <div className="text-2xl font-bold text-[var(--color-base-content)]">
            {profile.schedule.wakeTime}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-info)]/10 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-6 h-6 text-[var(--color-info)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Bedtime</div>
          </div>
          <div className="text-2xl font-bold text-[var(--color-base-content)]">
            {profile.schedule.bedTime}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-secondary)]/10 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-6 h-6 text-[var(--color-secondary)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Work From Home</div>
          </div>
          <div className="text-lg font-bold text-[var(--color-base-content)] capitalize">
            {profile.schedule.workFromHome}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center gap-3 mb-2">
            <ChefHat className="w-6 h-6 text-[var(--color-primary)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Cooking</div>
          </div>
          <div className="text-lg font-bold text-[var(--color-base-content)] capitalize">
            {profile.schedule.cookingFrequency}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center gap-3 mb-2">
            <Dumbbell className="w-6 h-6 text-[var(--color-accent-content)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Gym Schedule</div>
          </div>
          <div className="text-lg font-bold text-[var(--color-base-content)] capitalize">
            {profile.schedule.gymSchedule}
          </div>
        </div>
      </div>
    </section>

    {/* Pets Section */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Dog className="w-6 h-6 text-[var(--color-primary)]" />
        Pets
      </h2>
      
      {profile.mustHaves.petsOwned && profile.mustHaves.petsOwned.length > 0 ? (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.mustHaves.petsOwned.map((pet, idx) => (
              <div 
                key={idx}
                className="bg-gradient-to-br from-[var(--color-primary)]/5 to-transparent p-6 rounded-xl border border-[var(--color-section-border)] hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-[var(--color-primary)]/10 p-3 rounded-full">
                    <Dog className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-base-content)] text-lg">{pet.name}</div>
                    <div className="text-sm text-[var(--color-text-muted)] capitalize">{pet.type}</div>
                  </div>
                </div>
                <div className="text-sm text-[var(--color-base-content)]">
                  <span className="text-[var(--color-text-muted)]">Age:</span> {pet.age} years old
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl">
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Pet Policy Preference</div>
            <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
              {profile.mustHaves.pets}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-8 rounded-xl text-center">
          <Dog className="w-12 h-12 text-[var(--color-text-muted)] mx-auto mb-3 opacity-50" />
          <p className="text-[var(--color-text-muted)]">No pets</p>
          <p className="text-sm text-[var(--color-text-muted)] mt-2 capitalize">
            Preference: {profile.mustHaves.pets}
          </p>
        </div>
      )}
    </section>

    {/* Smoking & Drinking */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Wine className="w-6 h-6 text-[var(--color-primary)]" />
        Habits & Preferences
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl border-l-4 border-[var(--color-error)]">
          <div className="flex items-center gap-3 mb-2">
            <Cigarette className="w-5 h-5 text-[var(--color-text-muted)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Smoking</div>
          </div>
          <div className="text-lg font-bold text-[var(--color-base-content)] capitalize">
            {profile.habits.smoking === 'no' ? 'Non-smoker' : profile.habits.smoking}
          </div>
        </div>

        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl border-l-4 border-[var(--color-warning)]">
          <div className="flex items-center gap-3 mb-2">
            <Wine className="w-5 h-5 text-[var(--color-text-muted)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Drinking</div>
          </div>
          <div className="text-lg font-bold text-[var(--color-base-content)] capitalize">
            {profile.habits.drinking}
          </div>
        </div>

        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl border-l-4 border-[var(--color-info)]">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-[var(--color-text-muted)]" />
            <div className="text-sm text-[var(--color-text-muted)]">Substances</div>
          </div>
          <div className="text-lg font-bold text-[var(--color-base-content)] capitalize">
            {profile.habits.substances === 'no' ? 'None' : profile.habits.substances}
          </div>
        </div>
      </div>

      <div className="mt-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
        <div className="text-sm text-[var(--color-text-muted)] mb-2">Household Preference</div>
        <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
          {profile.mustHaves.smoking}
        </div>
      </div>
    </section>

    {/* Social Preferences */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-[var(--color-primary)]" />
        Social Preferences
      </h2>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-[var(--color-primary)]/5 to-transparent p-6 rounded-xl border border-[var(--color-section-border)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-[var(--color-base-content)]">Socializing Level</span>
            <span className="text-lg font-bold text-[var(--color-primary)]">
              {profile.socialPreferences.socializingLevel}/10
            </span>
          </div>
          <div className="w-full bg-[var(--color-base-200)] rounded-full h-3 mb-3">
            <div 
              className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] h-3 rounded-full transition-all"
              style={{ width: `${profile.socialPreferences.socializingLevel * 10}%` }}
            ></div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            {profile.socialPreferences.socializingLevel <= 3 && "Prefers quiet, independent living"}
            {profile.socialPreferences.socializingLevel > 3 && profile.socialPreferences.socializingLevel <= 7 && "Balanced - friendly but values privacy"}
            {profile.socialPreferences.socializingLevel > 7 && "Very social, enjoys regular interaction"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Roommate Interaction</div>
            <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
              {profile.socialPreferences.roommateInteraction}
            </div>
          </div>

          <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Guest Policy</div>
            <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
              {profile.socialPreferences.guestPolicy}
            </div>
          </div>

          <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
            <div className="text-sm text-[var(--color-text-muted)] mb-2">Communication Style</div>
            <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
              {profile.socialPreferences.communicationStyle}
            </div>
          </div>

          <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
            <div className="text-sm text-[var(--color-text-muted)] mb-2">House Meetings</div>
            <div className="text-lg font-semibold text-[var(--color-base-content)] capitalize">
              {profile.socialPreferences.houseMeetings}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Cleaning Style */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Home className="w-6 h-6 text-[var(--color-primary)]" />
        Cleaning & Household
      </h2>
      
      <div className="bg-gradient-to-br from-[var(--color-success)]/5 to-transparent p-8 rounded-xl border border-[var(--color-section-border)]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-[var(--color-base-content)]">Cleanliness Rating</span>
          <span className="text-3xl font-bold text-[var(--color-success)]">
            {profile.lifestyle.cleanliness}/10
          </span>
        </div>
        <div className="w-full bg-[var(--color-base-200)] rounded-full h-4 mb-4">
          <div 
            className="bg-[var(--color-success)] h-4 rounded-full"
            style={{ width: `${profile.lifestyle.cleanliness * 10}%` }}
          ></div>
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-6">
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Cleaning Schedule</div>
            <div className="text-base font-semibold text-[var(--color-base-content)] capitalize">
              {profile.mustHaves.cleaning}
            </div>
          </div>
          <div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Shared Expenses</div>
            <div className="text-base font-semibold text-[var(--color-base-content)] capitalize">
              {profile.mustHaves.sharedExpenses}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Preferences Tab Component
export const PreferencesTab = ({ profile }) => (
  <div className="space-y-8">
    {/* Looking For */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Home className="w-6 h-6 text-[var(--color-primary)]" />
        What I'm Looking For
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent p-6 rounded-xl border border-[var(--color-primary)]/20">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Room Type</div>
          <div className="text-xl font-bold text-[var(--color-primary)] capitalize">
            {profile.preferences.roomType} Room
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-success)]/10 to-transparent p-6 rounded-xl border border-[var(--color-success)]/20">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Budget Range</div>
          <div className="text-xl font-bold text-[var(--color-success)]">
            ${profile.preferences.budgetMin} - ${profile.preferences.budgetMax}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-warning)]/10 to-transparent p-6 rounded-xl border border-[var(--color-warning)]/20">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Move-in Date</div>
          <div className="text-xl font-bold text-[var(--color-warning)]">
            {new Date(profile.preferences.moveInDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric' 
            })}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-secondary)]/10 to-transparent p-6 rounded-xl border border-[var(--color-secondary)]/20">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Lease Duration</div>
          <div className="text-xl font-bold text-[var(--color-secondary)] capitalize">
            {profile.preferences.leaseDuration}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-info)]/10 to-transparent p-6 rounded-xl border border-[var(--color-info)]/20">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Max Roommates</div>
          <div className="text-xl font-bold text-[var(--color-info)]">
            {profile.preferences.maxRoommates} people
          </div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent p-6 rounded-xl border border-[var(--color-accent)]/20">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Gender Preference</div>
          <div className="text-xl font-bold text-[var(--color-accent-content)] capitalize">
            {profile.preferences.genderPreference}
          </div>
        </div>
      </div>
    </section>

    {/* Preferred Areas */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <MapPin className="w-6 h-6 text-[var(--color-primary)]" />
        Preferred Neighborhoods
      </h2>
      
      <div className="flex flex-wrap gap-3">
        {profile.preferences.preferredAreas.map((area, idx) => (
          <div 
            key={idx}
            className="px-6 py-3 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            <MapPin className="w-4 h-4 inline mr-2" />
            {area}
          </div>
        ))}
      </div>
    </section>

    {/* Ideal Living Situation */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-[var(--color-primary)]" />
        Ideal Living Situation
      </h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="text-sm text-[var(--color-text-muted)] mb-3">Household Type</div>
          <div className="flex flex-wrap gap-2">
            {profile.preferences.householdType.map((type, idx) => (
              <span 
                key={idx}
                className="px-4 py-2 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-lg font-medium capitalize"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-6 rounded-xl">
          <div className="text-sm text-[var(--color-text-muted)] mb-2">Age Range</div>
          <div className="text-lg font-semibold text-[var(--color-base-content)]">
            {profile.preferences.ageRange[0]} - {profile.preferences.ageRange[1]} years old
          </div>
        </div>
      </div>
    </section>

    {/* Must-Haves & Deal-breakers */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Shield className="w-6 h-6 text-[var(--color-primary)]" />
        Must-Haves & Deal-breakers
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-success)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Must-Haves
          </h3>
          
          <div className="space-y-3">
            <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl border-l-4 border-[var(--color-success)]">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Pet Policy</div>
              <div className="font-semibold text-[var(--color-base-content)] capitalize">
                {profile.mustHaves.pets}
              </div>
            </div>

            <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl border-l-4 border-[var(--color-success)]">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Smoking Policy</div>
              <div className="font-semibold text-[var(--color-base-content)] capitalize">
                {profile.mustHaves.smoking}
              </div>
            </div>

            <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl border-l-4 border-[var(--color-success)]">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Guest Policy</div>
              <div className="font-semibold text-[var(--color-base-content)] capitalize">
                {profile.mustHaves.guests}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[var(--color-info)] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Expectations
          </h3>
          
          <div className="space-y-3">
            <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl border-l-4 border-[var(--color-info)]">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Cleaning</div>
              <div className="font-semibold text-[var(--color-base-content)] capitalize">
                {profile.mustHaves.cleaning}
              </div>
            </div>

            <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-4 rounded-xl border-l-4 border-[var(--color-info)]">
              <div className="text-sm text-[var(--color-text-muted)] mb-1">Shared Expenses</div>
              <div className="font-semibold text-[var(--color-base-content)] capitalize">
                {profile.mustHaves.sharedExpenses}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Financial Information */}
    <section>
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <DollarSign className="w-6 h-6 text-[var(--color-primary)]" />
        Financial Information
      </h2>
      
      <div className="bg-gradient-to-br from-[var(--color-success)]/5 to-transparent p-8 rounded-xl border border-[var(--color-section-border)]">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
              profile.financial.employmentVerified 
                ? 'bg-[var(--color-success)]/20' 
                : 'bg-[var(--color-base-200)]'
            }`}>
              <CheckCircle2 className={`w-8 h-8 ${
                profile.financial.employmentVerified 
                  ? 'text-[var(--color-success)]' 
                  : 'text-[var(--color-text-muted)]'
              }`} />
            </div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Employment</div>
            <div className="font-semibold text-[var(--color-base-content)]">
              {profile.financial.employmentVerified ? 'Verified' : 'Not Verified'}
            </div>
          </div>

          <div className="text-center">
            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
              profile.financial.securityDepositReady 
                ? 'bg-[var(--color-success)]/20' 
                : 'bg-[var(--color-base-200)]'
            }`}>
              <DollarSign className={`w-8 h-8 ${
                profile.financial.securityDepositReady 
                  ? 'text-[var(--color-success)]' 
                  : 'text-[var(--color-text-muted)]'
              }`} />
            </div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Security Deposit</div>
            <div className="font-semibold text-[var(--color-base-content)]">
              {profile.financial.securityDepositReady ? 'Ready' : 'Not Ready'}
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center bg-[var(--color-primary)]/20">
              <DollarSign className="w-8 h-8 text-[var(--color-primary)]" />
            </div>
            <div className="text-sm text-[var(--color-text-muted)] mb-1">Budget Range</div>
            <div className="font-bold text-[var(--color-primary)]">
              ${profile.financial.budgetRange[0]} - ${profile.financial.budgetRange[1]}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

// Schedule Tab Component
export const ScheduleTab = ({ profile }) => (
  <div className="space-y-8">
    <div className="bg-gradient-to-br from-[var(--color-primary)]/5 via-[var(--color-secondary)]/5 to-transparent p-8 rounded-2xl border border-[var(--color-section-border)]">
      <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6 text-[var(--color-primary)]" />
        Typical Daily Schedule
      </h2>
      
      <div className="space-y-6">
        {/* Morning */}
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-warning)]/20 p-4 rounded-xl">
            <Sun className="w-8 h-8 text-[var(--color-warning)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-base-content)] mb-2">Morning</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Wake Time</div>
                <div className="text-xl font-bold text-[var(--color-base-content)]">
                  {profile.schedule.wakeTime}
                </div>
              </div>
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Gym Routine</div>
                <div className="text-base font-semibold text-[var(--color-base-content)] capitalize">
                  {profile.schedule.gymSchedule}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daytime */}
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-primary)]/20 p-4 rounded-xl">
            <Briefcase className="w-8 h-8 text-[var(--color-primary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-base-content)] mb-2">Daytime</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Work Schedule</div>
                <div className="text-base font-semibold text-[var(--color-base-content)] capitalize">
                  {profile.occupation.schedule}
                </div>
              </div>
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Work From Home</div>
                <div className="text-base font-semibold text-[var(--color-base-content)] capitalize">
                  {profile.schedule.workFromHome}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Evening */}
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-secondary)]/20 p-4 rounded-xl">
            <ChefHat className="w-8 h-8 text-[var(--color-secondary)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-base-content)] mb-2">Evening</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Cooking</div>
                <div className="text-base font-semibold text-[var(--color-base-content)] capitalize">
                  {profile.schedule.cookingFrequency}
                </div>
              </div>
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Typical Activities</div>
                <div className="text-base text-[var(--color-base-content)]">
                  Relaxing, hobbies, cooking
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Night */}
        <div className="flex items-start gap-4">
          <div className="bg-[var(--color-info)]/20 p-4 rounded-xl">
            <Moon className="w-8 h-8 text-[var(--color-info)]" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[var(--color-base-content)] mb-2">Night</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Bedtime</div>
                <div className="text-xl font-bold text-[var(--color-base-content)]">
                  {profile.schedule.bedTime}
                </div>
              </div>
              <div className="bg-white dark:bg-[var(--color-base-200)] p-4 rounded-xl">
                <div className="text-sm text-[var(--color-text-muted)] mb-1">Schedule Type</div>
                <div className="flex items-center gap-2">
                  {profile.lifestyle.schedule === 'early-bird' ? (
                    <>
                      <Sun className="w-5 h-5 text-[var(--color-warning)]" />
                      <span className="font-semibold text-[var(--color-base-content)]">Early Bird</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-5 h-5 text-[var(--color-info)]" />
                      <span className="font-semibold text-[var(--color-base-content)]">Night Owl</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Media Tab Component  
export const MediaTab = ({ profile }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="space-y-8">
      {/* Photo Gallery */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-base-content)] flex items-center gap-2">
            <Image className="w-6 h-6 text-[var(--color-primary)]" />
            Photo Gallery
          </h2>
          <button className="btn btn-primary btn-sm gap-2">
            <Upload className="w-4 h-4" />
            Add Photos
          </button>
        </div>

        {profile.photos && profile.photos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {profile.photos.map((photo, idx) => (
              <div 
                key={idx}
                className="relative group cursor-pointer rounded-xl overflow-hidden aspect-square"
                onClick={() => setSelectedImage(photo)}
              >
                <img 
                  src={photo} 
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
            
            {/* Add Photo Card */}
            <button className="aspect-square rounded-xl border-2 border-dashed border-[var(--color-section-border)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/5 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)]">
              <Plus className="w-8 h-8" />
              <span className="text-sm font-medium">Add Photo</span>
            </button>
          </div>
        ) : (
          <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-12 rounded-xl text-center border-2 border-dashed border-[var(--color-section-border)]">
            <Image className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />
            <p className="text-[var(--color-text-muted)] mb-4">No photos yet</p>
            <button className="btn btn-primary gap-2">
              <Upload className="w-4 h-4" />
              Upload Photos
            </button>
          </div>
        )}
      </section>

      {/* Video Introduction */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-base-content)] flex items-center gap-2">
            <Film className="w-6 h-6 text-[var(--color-primary)]" />
            Video Introduction
          </h2>
          <button className="btn btn-secondary btn-sm gap-2">
            <Upload className="w-4 h-4" />
            Upload Video
          </button>
        </div>

        {profile.videoIntro ? (
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <video 
              src={profile.videoIntro} 
              controls
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="aspect-video bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-[var(--color-section-border)]">
            <Film className="w-16 h-16 text-[var(--color-text-muted)] mb-4 opacity-50" />
            <p className="text-[var(--color-text-muted)] mb-4">No video introduction yet</p>
            <p className="text-sm text-[var(--color-text-muted)] mb-4 max-w-md text-center">
              Add a short video to introduce yourself and stand out to potential roommates!
            </p>
            <button className="btn btn-primary gap-2">
              <Upload className="w-4 h-4" />
              Record or Upload Video
            </button>
          </div>
        )}
      </section>

      {/* Social Links */}
      <section>
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] mb-6 flex items-center gap-2">
          <ExternalLink className="w-6 h-6 text-[var(--color-primary)]" />
          Social Links
        </h2>

        <div className="space-y-4">
          {profile.socialLinks.linkedin && (
            <a 
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#0077B5]/10 p-3 rounded-lg">
                  <ExternalLink className="w-5 h-5 text-[#0077B5]" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-base-content)]">LinkedIn</div>
                  <div className="text-sm text-[var(--color-text-muted)]">Professional profile</div>
                </div>
              </div>
              <ExternalLink className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
            </a>
          )}

          {!profile.socialLinks.linkedin && (
            <button className="w-full flex items-center justify-between p-4 bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] rounded-xl border-2 border-dashed border-[var(--color-section-border)] hover:border-[var(--color-primary)] transition-all">
              <div className="flex items-center gap-3">
                <Plus className="w-5 h-5 text-[var(--color-text-muted)]" />
                <span className="text-[var(--color-text-muted)]">Add LinkedIn Profile</span>
              </div>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

// References Tab Component
export const ReferencesTab = ({ profile }) => (
  <div className="space-y-8">
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[var(--color-base-content)] flex items-center gap-2">
          <Star className="w-6 h-6 text-[var(--color-primary)]" />
          Reviews & References
        </h2>
        <button className="btn btn-primary btn-sm gap-2">
          <Plus className="w-4 h-4" />
          Request Reference
        </button>
      </div>

      {profile.references && profile.references.length > 0 ? (
        <div className="space-y-4">
          {profile.references.map((reference, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-[var(--color-base-200)] p-6 rounded-xl border border-[var(--color-section-border)] shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-[var(--color-base-content)] mb-1">
                    {reference.name}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">{reference.type}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(reference.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-[var(--color-warning)] fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-[var(--color-base-content)] italic">
                "{reference.comment}"
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[var(--color-base-100)] dark:bg-[var(--color-base-300)] p-12 rounded-xl text-center border-2 border-dashed border-[var(--color-section-border)]">
          <Star className="w-16 h-16 text-[var(--color-text-muted)] mx-auto mb-4 opacity-50" />
          <p className="text-[var(--color-text-muted)] mb-4">No references yet</p>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">
            References from previous roommates or landlords help build trust
          </p>
          <button className="btn btn-primary gap-2">
            <Plus className="w-4 h-4" />
            Request Your First Reference
          </button>
        </div>
      )}
    </section>
  </div>
);