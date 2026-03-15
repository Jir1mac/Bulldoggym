import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const password = process.argv[2];

if (password) {
    const hash = bcrypt.hashSync(password, 12);
    console.log('\nVygenerovaný hash:');
    console.log(hash);
    console.log('\nVlož tento řádek do .env souboru:');
    console.log(`ADMIN_PASS_HASH="${hash}"`);
} else {
    const rl = readline.createInterface({ input: process.stdin, output: process.stderr });
    rl.question('Zadej nové heslo: ', (input) => {
        rl.close();
        if (!input) {
            console.error('Heslo nesmí být prázdné.');
            process.exit(1);
        }
        const hash = bcrypt.hashSync(input, 12);
        console.log('\nVygenerovaný hash:');
        console.log(hash);
        console.log('\nVlož tento řádek do .env souboru:');
        console.log(`ADMIN_PASS_HASH="${hash}"`);
    });
}
