import { defineStore } from 'pinia';

export interface SharedUserState {
  profile: any;
  preferences: any;
}

export const useSharedUserStore = defineStore('sharedUser', {
  state: (): SharedUserState => ({
    profile: null,
    preferences: {}
  }),

  actions: {
    setProfile(profile: any) {
      this.profile = profile;
    },

    setPreferences(preferences: any) {
      this.preferences = preferences;
    }
  }
});
