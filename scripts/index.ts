#!/usr/bin/env node

import { execSync } from 'node:child_process';
import { packages } from './utils';

const args = process.argv.slice(2);

if (args.length !== 2 || args[0] !== 'add' || !args[1].trim()) {
  console.log('Usage: npx kibo-ui add [name]');
  process.exit(1);
}

if (!packages.includes(args[1].trim())) {
  console.log(`Available components: ${packages.join(', ')}`);
  process.exit(1);
}

const packageName = args[1];

console.log(`Adding ${packageName} component...`);

const url = new URL(`registry/${packageName}.json`, 'https://www.kibo-ui.com');

execSync(`npx shadcn@latest add ${url.toString()}`);
