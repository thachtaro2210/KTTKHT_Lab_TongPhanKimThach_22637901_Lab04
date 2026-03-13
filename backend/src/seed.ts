import * as db from './data/db';
import bcrypt from 'bcryptjs';

async function run() {
  db.loadDB();
  console.log('Seeding database...');

  // create admin
  const adminEmail = 'admin@example.com';
  let admin = db.findOne('users', { email: adminEmail });
  if (!admin) {
    const passwordHash = await bcrypt.hash('password', 10);
    admin = db.insert('users', { name: 'Admin', email: adminEmail, passwordHash, roles: ['admin'] });
    console.log('Created admin user:', adminEmail);
  } else {
    console.log('Admin already exists');
  }

  // create sample contents
  const count = db.count('contents');
  if (count === 0) {
    db.insert('contents', {
      title: 'Welcome to CMS',
      slug: 'welcome-to-cms',
      body: '<p>This is a sample article. Edit or delete it.</p>',
      status: 'published',
      author: admin._id,
      tags: ['welcome', 'sample'],
      versions: [{ body: '<p>This is a sample article. Edit or delete it.</p>', author: admin._id, createdAt: new Date() }],
      publishedAt: new Date()
    });
    console.log('Created sample content');
  } else {
    console.log('Contents already exist');
  }

  console.log('Done');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

// Modified: 2026-03-13T07:38:00.032Z