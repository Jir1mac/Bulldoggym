import bcrypt from 'bcryptjs';

const password = process.argv[2];

if (!password) {
    console.error('Použití: npx tsx scripts/hash-password.ts TVOJE_HESLO');
    process.exit(1);
}

const hash = bcrypt.hashSync(password, 12);
console.log('\nVygenerovaný hash:');
console.log(hash);
console.log('\nVlož tento řádek do .env souboru:');
console.log(`ADMIN_PASS_HASH="${hash}"`);
