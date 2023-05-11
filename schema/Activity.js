"use strict";
/* jshint node: true */

var mongoose = require("mongoose");

/**
 * Define the Mongoose Schema for a Comment.
 */
var activitySchema = new mongoose.Schema({
    user_id: String,
    activity: String,
    photo_id: {type: String, default: null},
    file_name: {type: String, default: null},
    date_time: {type: Date, default: Date.now}
});

/**
 * Create a Mongoose Model for a User using the userSchema.
 */
var Activity = mongoose.model("Activity", activitySchema);

/**
 * Make this available to our application.
 */
module.exports = Activity;
