import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

const DATA_DIR = path.join(__dirname, '..', '..', 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

interface DBCollection {
  [key: string]: any[];
}

const DB: DBCollection = {
  users: [],
  contents: [],
  media: []
};

const PATHS = {
  users: path.join(DATA_DIR, 'users.json'),
  contents: path.join(DATA_DIR, 'contents.json'),
  media: path.join(DATA_DIR, 'media.json')
};

// Load data from files
export function loadDB() {
  Object.keys(PATHS).forEach(key => {
    const filePath = PATHS[key as keyof typeof PATHS];
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      DB[key] = JSON.parse(data || '[]');
    } else {
      DB[key] = [];
    }
  });
  console.log('Database loaded from files');
}

// Save collection to file
function saveCollection(name: keyof typeof PATHS) {
  const filePath = PATHS[name];
  fs.writeFileSync(filePath, JSON.stringify(DB[name], null, 2));
}

// Get all docs from collection
export function getAll(collection: keyof DBCollection): any[] {
  return DB[collection] || [];
}

// Find single doc
export function findOne(collection: keyof DBCollection, query: Record<string, any>): any {
  const items = DB[collection] || [];
  return items.find(item => {
    return Object.entries(query).every(([key, value]) => item[key] === value);
  });
}

// Find by ID
export function findById(collection: keyof DBCollection, id: string): any {
  return findOne(collection, { _id: id });
}

// Insert doc
export function insert(collection: keyof DBCollection, doc: any): any {
  doc._id = doc._id || randomUUID();
  doc.createdAt = doc.createdAt || new Date().toISOString();
  doc.updatedAt = doc.updatedAt || new Date().toISOString();
  if (!DB[collection]) DB[collection] = [];
  DB[collection].push(doc);
  saveCollection(collection as any);
  return doc;
}

// Update doc
export function update(collection: keyof DBCollection, id: string, updates: any): any {
  const items = DB[collection] || [];
  const index = items.findIndex(item => item._id === id);
  if (index === -1) return null;
  const updated = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
  items[index] = updated;
  saveCollection(collection as any);
  return updated;
}

// Delete doc
export function remove(collection: keyof DBCollection, id: string): boolean {
  const items = DB[collection] || [];
  const index = items.findIndex(item => item._id === id);
  if (index === -1) return false;
  items.splice(index, 1);
  saveCollection(collection as any);
  return true;
}

// Delete by query
export function deleteOne(collection: keyof DBCollection, query: Record<string, any>): boolean {
  const items = DB[collection] || [];
  const index = items.findIndex(item => {
    return Object.entries(query).every(([key, value]) => item[key] === value);
  });
  if (index === -1) return false;
  items.splice(index, 1);
  saveCollection(collection as any);
  return true;
}

// Count docs
export function count(collection: keyof DBCollection): number {
  return (DB[collection] || []).length;
}

// Modified: 2026-03-13T07:37:56.436Z