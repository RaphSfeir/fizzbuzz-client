#! /usr/bin/env node

const { program } = require("commander");
const list = require("./commands/list");
const favorite = require("./commands/favorite");
const unfavorite = require("./commands/unfavorite");

program
  .command("list")
  .option("-p, --page [...pages]", "specify page")
  .option("-s, --page-size [...page-sizes]", "specify page size")
  .description("List all the FizzBuzz elements, with pagination.")
  .action(list);

program
  .command("favorite")
  .option("-n, --number [...numbers]", "The numbers to mark as favorites.")
  .description("Mark a number as a favorite.")
  .action(favorite);

program
  .command("unfavorite")
  .option("-n, --number [...numbers]", "The numbers to delete as favorites.")
  .description("Delete a number as a favorite.")
  .action(unfavorite);

program.parse();
