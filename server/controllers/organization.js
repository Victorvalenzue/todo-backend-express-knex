const organizationQueries = require("../database/organization-queries.js");

async function getAllOrganizations(req, res) {
  const allEntries = await organizationQueries.all();
  return res.send(allEntries);
}

async function getOrganization(req, res) {
  const organization = await organizationQueries.get(req.params.id);
  return res.send(organization);
}

async function postOrganization(req, res) {
  const created = await organizationQueries.create({
    name: req.body.name,
  });
  return res.status(201).send(created);
}

async function updateOrganization(req, res) {
  const updated = await organizationQueries.update(req.params.id, {
    name: req.body.name,
  });
  return res.send(updated);
}

async function deleteOrganization(req, res) {
  const deleted = await organizationQueries.delete(req.params.id);
  return res.send(deleted);
}

module.exports = {
  getAllOrganizations,
  getOrganization,
  postOrganization,
  updateOrganization,
  deleteOrganization,
};
