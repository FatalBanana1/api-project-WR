"use strict";

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");
let options = {};

if (process.env.NODE_ENV === "production") {
	options.schema = process.env.SCHEMA;
}

// join 1-many: group-groupimages

module.exports = {
	up: async (queryInterface, Sequelize) => {
		options.tableName = "GroupImages";
		return queryInterface.bulkInsert(
			options,
			[
				{
					GroupId: "1",
					url: "../../upload/skydiving/1.jpg",
					preview: true,
				},
				{
					GroupId: "1",
					url: "../../upload/skydiving/2.jpg",
					preview: false,
				},
				{
					GroupId: "1",
					url: "../../upload/skydiving/3.jpg",
					preview: false,
				},
			],
			{}
		);
	},

	down: async (queryInterface, Sequelize) => {
		options.tableName = "GroupImages";
		const Op = Sequelize.Op;
		return queryInterface.bulkDelete(
			options,
			{
				id: {
					[Op.in]: [1, 2, 3],
				},
			},
			{}
		);
	},
};
