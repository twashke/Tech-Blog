const { ExpressHandlebars } = require("express-handlebars");

module.exports = {
    format_date: (date) => {
        if(!date) {
            return;
        } else {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
        }
    },
    format_plural: (word, amount) => {
        if (amount !==1) {
            return `${word}s`;

        }
        return word;
    },
};