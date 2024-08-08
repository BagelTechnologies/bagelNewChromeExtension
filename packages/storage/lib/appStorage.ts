import { BaseStorage, createStorage, StorageType } from './base';

// Define types for tabs and selected request
type Tab = 'create-new-request' | 'my-requests' | string;
type SelectedRequest = string | null; // ObjectId or null
type Title = string | null; // string or null
type Description = string | null; // string or null

// Define the structure of your storage
type StorageState = {
  tab: Tab;
  selectedRequest: SelectedRequest;
  auth0: any;
  title: Title;
  description: Description;
};

// Extend the base storage type with custom methods
type AppStorage = BaseStorage<StorageState> & {
  // eslint-disable-next-line no-unused-vars
  setTab: (tab: Tab) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  selectRequest: (requestId: SelectedRequest) => Promise<void>;
  resetSelection: () => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setAuthObject: (auth0: any) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setTitle: (title: string) => Promise<void>;
  // eslint-disable-next-line no-unused-vars
  setDescription: (description: string) => Promise<void>;
};

// Create initial state
const initialState: StorageState = {
  tab: 'my-requests',
  selectedRequest: null,
  auth0: null,
  title: null,
  description: null,
};

// Create storage with the initial state
const storage = createStorage<StorageState>('app-storage-key', initialState, {
  storageType: StorageType.Local,
  liveUpdate: true,
});

export const appStorage: AppStorage = {
  ...storage,
  // Method to set the active tab
  setTab: async (tab: Tab) => {
    await storage.set(state => ({
      ...state,
      tab,
    }));
  },
  // Method to set the selected request
  selectRequest: async (requestId: SelectedRequest) => {
    await storage.set(state => ({
      ...state,
      selectedRequest: requestId,
    }));
  },
  // Method to reset the selected request
  resetSelection: async () => {
    await storage.set(state => ({
      ...state,
      selectedRequest: null,
    }));
  },
  setAuthObject: async (auth0: any) => {
    await storage.set(state => ({
      ...state,
      auth0,
    }));
  },
  setTitle: async (title: string) => {
    await storage.set(state => ({
      ...state,
      title,
    }));
  },
  setDescription: async (description: string) => {
    await storage.set(state => ({
      ...state,
      description,
    }));
  },
};
