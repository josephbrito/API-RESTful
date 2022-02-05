const express = require("express");
const router = express.Router();
const personController = require("../routesController/routesController");

router.get("/", personController.readPeople);
router.get("/:id", personController.showPerson);

router.post("/", personController.registerPerson);

router.patch("/:id", personController.updatePerson);

router.delete("/:id", personController.deletePerson);

module.exports = router;
