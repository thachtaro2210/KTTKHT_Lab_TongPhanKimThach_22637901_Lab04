/**
 * Plugin Loader & Registry - Microkernel core
 */

import { emit } from './event-bus';

type EventListener = (payload: any) => void;

export interface Plugin {
  name: string;
  version: string;
  init: (api: PluginAPI) => void;
  hooks?: Record<string, Function>;
}

export interface PluginAPI {
  eventBus: {
    on: (event: string, listener: EventListener) => void;
    emit: (event: string, payload: any) => void;
  };
  db: any; // Reference to database module
  logger: {
    log: (msg: string) => void;
    error: (msg: string, err?: any) => void;
  };
}

const registry: Record<string, Plugin> = {};

export function registerPlugin(plugin: Plugin) {
  registry[plugin.name] = plugin;
  console.log(`Plugin registered: ${plugin.name}@${plugin.version}`);
  emit('plugin:registered', { name: plugin.name, version: plugin.version });
}

export function getPlugin(name: string): Plugin | undefined {
  return registry[name];
}

export function getAllPlugins(): Plugin[] {
  return Object.values(registry);
}

export function initializePlugins(api: PluginAPI) {
  Object.values(registry).forEach(plugin => {
    try {
      plugin.init(api);
      console.log(`Plugin initialized: ${plugin.name}`);
      emit('plugin:initialized', { name: plugin.name });
    } catch (err) {
      console.error(`Failed to initialize plugin ${plugin.name}:`, err);
    }
  });
}
