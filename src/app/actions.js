'use server';

import fs from 'node:fs/promises';
import path from 'node:path';
import { revalidatePath } from 'next/cache';

const productsFilePath = path.join(process.cwd(), 'src', 'data', 'products.json');
const imagesMetaFilePath = path.join(process.cwd(), 'src', 'data', 'images.json');
const publicDir = path.join(process.cwd(), 'public');
const productsImagesDir = path.join(publicDir, 'productos');
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.svg']);

export async function saveProducts(products) {
  const sanitized = products.map(({ isNew, ...rest }) => rest);
  const serialized = JSON.stringify(sanitized, null, 2);
  await fs.writeFile(productsFilePath, serialized, 'utf8');
  revalidatePath('/');
  return { success: true };
}

async function ensureImagesMetaFile() {
  try {
    const raw = await fs.readFile(imagesMetaFilePath, 'utf8');
    return JSON.parse(raw);
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      await fs.writeFile(imagesMetaFilePath, '[]', 'utf8');
      return [];
    }
    throw error;
  }
}

async function collectFilesRecursively(dirPath) {
  const collected = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      const nested = await collectFilesRecursively(entryPath);
      collected.push(...nested);
    } else {
      collected.push(entryPath);
    }
  }

  return collected;
}

export async function getLocalImages() {
  try {
    const files = await collectFilesRecursively(productsImagesDir);
    const meta = await ensureImagesMetaFile();

    const filePaths = files
      .filter((filePath) => imageExtensions.has(path.extname(filePath).toLowerCase()))
      .map((filePath) => `/${path.relative(publicDir, filePath).replace(/\\/g, '/')}`);

    const metaMap = new Map(meta.map((item) => [item.path, item]));

    const synced = filePaths.map((relativePath) => {
      if (metaMap.has(relativePath)) {
        return metaMap.get(relativePath);
      }

      const directory = path.dirname(relativePath).replace(/\\/g, '/');
      const segments = relativePath.split('/').filter(Boolean);
      return {
        path: relativePath,
        directory,
        category: segments[1] ?? null,
        favorite: false,
        tags: [],
      };
    });

    await fs.writeFile(imagesMetaFilePath, JSON.stringify(synced, null, 2), 'utf8');
    return synced;
  } catch (error) {
    if (error && error.code === 'ENOENT') {
      await fs.writeFile(imagesMetaFilePath, '[]', 'utf8');
      return [];
    }
    throw error;
  }
}
