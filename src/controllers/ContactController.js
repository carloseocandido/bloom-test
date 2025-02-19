const Contact = require('../models/Contact');
const mongoose = require('mongoose');
const { WeatherService } = require('../services/weatherService');

class ContactController {

    static async create(req, res) {
        try {
            const contact = new Contact(req.body);
            await contact.save();
            res.status(201).send(contact);
        } catch (error) {
            res.status(400).send({ error: error.message });
        }
    }

    static async list(req, res) {
        try {
            const { name, address, email, phone } = req.query; 
            let filter = { isDeleted: false };
    
            if (name) {
                filter.name = { $regex: new RegExp(name, 'i') }; 
            }

            if (address) {
                filter.address = { $regex: new RegExp(address, 'i') };
                console.log(filter)
            }

            if (email) {
                filter.email = { $regex: new RegExp(email, 'i') };
            }
    
            if (phone) {
                filter.phones = { $in: [phone] }; 
            }

            const contactsFromDB = await Contact.find(filter);
            const contacts = await Promise.all(contactsFromDB.map(async (contact) => {
    
                const weatherService = new WeatherService(contact.address);
    
                let message = await weatherService.getMessage();
    
                if (message) {
                    message = message.replace('%s', contact.name);
                }
    
                return {
                    id: contact._id,
                    name: contact.name,
                    address: contact.address,
                    phones: contact.phones,
                    email: contact.email,
                    message: message || ''
                };
            }));

            res.send(contacts.sort((a, b) => a.name.localeCompare(b.name)));
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async listById(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ error: 'Invalid ID format' });
            }
    
            const contact = await Contact.findById(id);
            if (!contact) {
                return res.status(404).send({ error: 'Contact not found' });
            }

            const weatherService = new WeatherService(contact.address);
            let message = await weatherService.getMessage();
    
            if (message) {
                message = message.replace('%s', contact.name);
            }            

            const formattedContact = {
                id: contact._id,
                name: contact.name,
                address: contact.address,
                phones: contact.phones,
                email: contact.email,
                message: message || '',
                isDeleted: contact.isDeleted
            };

            res.send(formattedContact);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ error: 'Invalid ID format' });
            }
    
            const contact = await Contact.findById(id);
            if (!contact) {
                return res.status(404).send({ error: 'Contact not found' });
            }

            if (contact.isDeleted) {
                return res.status(404).send({ error: 'Contact not found' });
            }

            contact.isDeleted = true;
            await contact.save();

            res.send({ message: 'Contact deleted successfully' });
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { name, address, phones, email } = req.body;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ error: 'Invalid ID format' });
            }
    
            const contact = await Contact.findById(id);
            if (!contact) {
                return res.status(404).send({ error: 'Contact not found' });
            }

            if (contact.isDeleted) {
                return res.status(404).send({ error: 'Contact not found' });
            }

            contact.name = name;
            contact.address = address;
            contact.phones = phones;
            contact.email = email;
            await contact.save();

            res.send(contact);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    }
}

module.exports = ContactController;
