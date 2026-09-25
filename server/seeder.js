const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const sampleItems = [
  {
    title: 'Casio FX-991EX Scientific Calculator',
    type: 'Lost',
    category: 'Electronics',
    location: 'Central Library - 2nd Floor Reading Hall',
    date: '2026-09-24',
    description: 'Black Casio scientific calculator with white cover. Has a small yellow smiley sticker on the back. Left on table 14 near the window section around 4:30 PM.',
    contact: 'rohit.sharma@campus.edu / +91 98765 43210',
    status: 'Active',
  },
  {
    title: 'College ID Card & RFID Lanyard',
    type: 'Found',
    category: 'ID & Cards',
    location: 'Canteen Block B near juice counter',
    date: '2026-09-25',
    description: 'Found Computer Science dept student ID card in a blue college lanyard. Name starts with "Aditi". Handed over to Canteen Manager desk, or contact me directly.',
    contact: 'priya.patel@campus.edu / +91 98111 22334',
    status: 'Active',
  },
  {
    title: 'Apple 65W USB-C MacBook Power Adapter',
    type: 'Lost',
    category: 'Electronics',
    location: 'Computer Lab 3 (Turing Lab)',
    date: '2026-09-23',
    description: 'White Apple 65W power adapter with braided USB-C cable. Was plugged into bench socket #8 during the Afternoon Database lab session.',
    contact: 'aman.verma@campus.edu / +91 99223 34455',
    status: 'Active',
  },
  {
    title: 'Black HP Wireless Mouse',
    type: 'Found',
    category: 'Electronics',
    location: 'Seminar Hall 1, Row F',
    date: '2026-09-25',
    description: 'Found an HP wireless mouse with its nano USB receiver attached inside the battery compartment. Found right after the AI Guest Lecture.',
    contact: 'rahul.deshmukh@campus.edu / +91 97654 32109',
    status: 'Active',
  },
  {
    title: 'Engineering Mathematics Vol-II Textbook',
    type: 'Lost',
    category: 'Books & Stationery',
    location: 'Auditorium Quadrangle Benches',
    date: '2026-09-22',
    description: 'Higher Engineering Mathematics by B.S. Grewal (44th edition). Has highlighted chapters on Differential Equations and name written on page 3.',
    contact: 'sneha.reddy@campus.edu / +91 98450 12345',
    status: 'Recovered',
  },
  {
    title: 'Set of 3 Keys with Marvel Captain America Keychain',
    type: 'Found',
    category: 'Keys',
    location: 'Sports Ground Pavilion',
    date: '2026-09-24',
    description: 'Found 2 bike keys and 1 small padlock key attached to a metallic Captain America shield keychain on the spectator bleachers.',
    contact: 'sports.coord@campus.edu / +91 98230 45678',
    status: 'Active',
  },
  {
    title: 'Navy Blue Fastrack Backpack',
    type: 'Lost',
    category: 'Bags & Wallets',
    location: 'Mechanical Engineering Workshop',
    date: '2026-09-21',
    description: 'Navy blue Fastrack backpack containing drawing instruments, mini drafter, and workshop diary. Left on the shelf rack.',
    contact: 'karan.singh@campus.edu / +91 99100 88776',
    status: 'Recovered',
  },
  {
    title: 'Stainless Steel Milton Thermo Water Bottle',
    type: 'Found',
    category: 'Bottles & Containers',
    location: 'Lecture Hall Complex - Room 204',
    date: '2026-09-25',
    description: 'Matte black 750ml Milton insulated bottle with "Never Give Up" laser engraved on the side.',
    contact: 'cleaningsupervisor@campus.edu / +91 97123 89012',
    status: 'Active',
  },
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/campus_lost_found'
    );
    console.log(`Connected to MongoDB for seeding: ${conn.connection.host}`);

    // Clear existing items
    await Item.deleteMany({});
    console.log('Cleared existing items...');

    // Insert sample items
    await Item.insertMany(sampleItems);
    console.log(`✅ Successfully seeded ${sampleItems.length} campus items!`);

    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
