const db = require("./contacts");
const { Command } = require("commander");
const program = new Command();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "read":
      const getAll = await db.listContacts();
      return console.log(getAll);
    case "findById":
      const getById = await db.getContactById(id);
      return console.log(getById);
    case "remove":
      const removeById = await db.removeContact(id);
      return console.log(removeById);
    case "add":
      const addContact = await db.addContact(name, email, phone);
      return console.log(addContact);
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

invokeAction(argv);
