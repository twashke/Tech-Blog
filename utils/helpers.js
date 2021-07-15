module.exports = {
    // Format date for post and comments created_at
    format_date: (date) => {
        if(!date) {
            return;
        } else {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
        }
    },
    // Used to format comment to plural depending on number of comments
    format_plural: (word, amount) => {
        if (amount !==1) {
            return `${word}s`;

        }
        return word;
    },
};