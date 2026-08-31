import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, '..');
const sourceDir = resolve(projectRoot, 'node_modules', 'stencilrecipe', 'dist', 'stencilrecipe');
const targetDir = resolve(projectRoot, 'static', 'stencilrecipe');

if (!existsSync(sourceDir)) {
	throw new Error(`Stencil asset source was not found at ${sourceDir}`);
}

rmSync(targetDir, { recursive: true, force: true });
mkdirSync(targetDir, { recursive: true });
cpSync(sourceDir, targetDir, { recursive: true });