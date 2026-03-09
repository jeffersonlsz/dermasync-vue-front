import fs from 'fs';
import path from 'path';

// Default configuration
const CONFIG = {
    maxDepth: Infinity,
    ignore: ['.git', 'node_modules', '.DS_Store']
};

// Parse command line arguments
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
    if (args[i] === '-d' || args[i] === '--depth') {
        const depth = parseInt(args[i + 1]);
        if (!isNaN(depth)) {
            CONFIG.maxDepth = depth;
            i++; // Skip next arg
        }
    }
}

function printTree(dir, depth = 0, prefix = '') {
    if (depth > CONFIG.maxDepth) return;

    const name = path.basename(dir);
    if (depth === 0) {
        console.log(name);
    }

    let items;
    try {
        items = fs.readdirSync(dir);
    } catch (e) {
        console.log(`${prefix}└── [Access Denied]`);
        return;
    }

    // Filter ignored items
    items = items.filter(item => !CONFIG.ignore.includes(item));

    // Sort: directories first, then files
    items.sort((a, b) => {
        const aPath = path.join(dir, a);
        const bPath = path.join(dir, b);
        let aStat, bStat;
        try {
            aStat = fs.statSync(aPath);
        } catch { return 1; } // Push errors to end
        try {
            bStat = fs.statSync(bPath);
        } catch { return -1; }

        if (aStat.isDirectory() && !bStat.isDirectory()) return -1;
        if (!aStat.isDirectory() && bStat.isDirectory()) return 1;
        return a.localeCompare(b);
    });

    items.forEach((item, index) => {
        const isLast = index === items.length - 1;
        const itemPath = path.join(dir, item);
        let stats;
        try {
            stats = fs.statSync(itemPath);
        } catch (e) {
            console.log(`${prefix}${isLast ? '└── ' : '├── '}${item} [Error reading stat]`);
            return;
        }

        const connector = isLast ? '└── ' : '├── ';
        const childPrefix = isLast ? '    ' : '│   ';

        console.log(`${prefix}${connector}${item}`);

        if (stats.isDirectory()) {
            printTree(itemPath, depth + 1, prefix + childPrefix);
        }
    });
}

// Start extraction from current directory
console.log(`Directory tree for: ${process.cwd()}`);
console.log(`Max depth: ${CONFIG.maxDepth}`);
console.log('---');
printTree(process.cwd());
