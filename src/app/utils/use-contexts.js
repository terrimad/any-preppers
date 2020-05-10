import { useContext } from 'react';

import { EntityDbContext, StorageProviderContext, TimezoneContext } from './contexts';

export const useTimezone = () => useContext(TimezoneContext);
export const useEntityDb = () => useContext(EntityDbContext);
export const useStorageProvider = () => useContext(StorageProviderContext);