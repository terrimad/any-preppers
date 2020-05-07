import { useContext } from 'react';

import { MaterialDbContext, StorageProviderContext, TimezoneContext } from './contexts';

export const useTimezone = () => useContext(TimezoneContext);
export const useMaterialDb = () => useContext(MaterialDbContext);
export const useStorageProvider = () => useContext(StorageProviderContext);