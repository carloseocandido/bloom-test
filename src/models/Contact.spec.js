import { describe, it, beforeAll, afterAll, beforeEach, expect } from 'vitest';
import { mongoose } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import Contact from './Contact';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

beforeEach(async () => {
    await Contact.deleteMany();
})

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Contact model', () => {
    it('should create a contact', async () => {
        const contact = new Contact({
            name: 'John Doe',
            address: '123 Main St',
            phones: ['(99) 9999-9999', '(11) 11111-1111'],
            email: 'john_doe@email.com'
        });

        const savedContact = await contact.save();

        expect(savedContact._id).toBeDefined();
        expect(savedContact.name).toBe(contact.name);
        expect(savedContact.address).toBe(contact.address);
        expect(savedContact.phones).toEqual(contact.phones);
        expect(savedContact.email).toBe(contact.email);
    });

    it('shoud list contacts', async () => {
        const contact = new Contact({
            name: 'John Doe',
            address: '123 Main St',
            phones: ['(99) 9999-9999', '(11) 11111-1111'],
            email: 'john_doe@email.com'
        });

        await contact.save();

        const contacts = await Contact.find();

        expect(contacts).toHaveLength(1);
    });
})