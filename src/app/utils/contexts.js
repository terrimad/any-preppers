import { createContext } from 'react';

import StorageProvider from './storage-provider';

export const TimezoneContext = createContext('Europe/Stockholm');
export const MaterialDbContext = createContext({});
export const StorageProviderContext = createContext(new StorageProvider());
