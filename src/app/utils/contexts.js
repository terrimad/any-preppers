import { createContext } from 'react';

import StorageProvider from './storage-provider';

export const TimezoneContext = createContext('Europe/Stockholm');
export const EntityDbContext = createContext({});
export const StorageProviderContext = createContext(new StorageProvider());
