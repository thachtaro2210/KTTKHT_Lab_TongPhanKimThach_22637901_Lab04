/**
 * Event Bus - Simple pub/sub for plugins to communicate
 */

type EventListener = (payload: any) => void;

const listeners: Record<string, EventListener[]> = {};

export function on(event: string, listener: EventListener) {
  if (!listeners[event]) listeners[event] = [];
  listeners[event].push(listener);
}

export function off(event: string, listener: EventListener) {
  if (!listeners[event]) return;
  listeners[event] = listeners[event].filter(l => l !== listener);
}

export function emit(event: string, payload: any) {
  if (!listeners[event]) return;
  listeners[event].forEach(listener => {
    try {
      listener(payload);
    } catch (err) {
      console.error(`Error in event listener for ${event}:`, err);
    }
  });
}

// Modified: 2026-03-13T07:37:54.777Z