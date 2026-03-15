import bcrypt from 'bcryptjs';
import * as readline from 'readline';

function escapeForEnv(hash: string): string {
    return hash.replace(/\$/g, '\\$');
}

const password = process.argv[2];

if (password) {
    const hash = bcrypt.hashSync(password, 12);
    console.log(`ADMIN_PASS_HASH="${escapeForEnv(hash)}"`);
    process.exit(0);
} else {
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
    rl.question('', (input) => {
        rl.close();
        if (!input) process.exit(1);
        const hash = bcrypt.hashSync(input, 12);
        console.log(`ADMIN_PASS_HASH="${escapeForEnv(hash)}"`);
        process.exit(0);
    });
}