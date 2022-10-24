const fs = require('fs/promises');
const contactsPath = require('./filePath');
const { v4 } = require('uuid');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const updateList = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const targetContact = contacts.find((it) => it.id === contactId);
  return targetContact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((it) => it.id === contactId);

  if (idx === -1) return null;

  const removedContact = contacts.filter((_, index) => index !== idx);
  updateList(removedContact);
  return contacts[idx];
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: v4() };

  updateList([...contacts, newContact]);
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((it) => it.id === id);

  if (idx === -1) return null;

  contacts[idx] = { ...body, id };
  updateList(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
