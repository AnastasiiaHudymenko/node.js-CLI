const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const getAllContacts = await listContacts();
  const contactById = getAllContacts.find(({ id }) => id === contactId);
  return contactById || null;
};

const removeContact = async (contactId) => {
  const getAllContacts = await listContacts();
  const index = getAllContacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [remove] = getAllContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(getAllContacts, null, 2));
  return remove;
};

const addContact = async (name, email, phone) => {
  const getAllContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  getAllContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(getAllContacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };
