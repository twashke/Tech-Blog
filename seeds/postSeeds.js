const { User } = require("../models");

const postData = [{
        title: "To many applications are tracking your private data!",
        content: "Now that everyone uses cell phones and tablets for everyday things, your private data is being tracked.  It's shocking to learn how many applications we use are tracking everything we do!",
        user_id: 1,
    },
    {
        title: "README Generator now available on github",
        content: "Sick of recreating README documents for every project?  Clone the README Generator onto your computer to easily create a README for each project.  By answering a few simple prompts on the command line, this application will write a README.md file that includes license information and a badge, github links and badge, as well as the avatar used by the github user (located in the Contact portion of the README).",
        user_id: 2,
    },
    {
        title: "MVC using Handlebars",
        content: "Model-View-Controller is a popular way to design web applications these days.  By using a simplet templating language like Handlebars, entry level web developers can create full stack web applications!",
        user_id: 3
    },
    {
        title: "Use Bootstrap to quickly design a website page!",
        content: "Sick of trying to figure out flex box or how to format a webpage?  Try out Bootstrap to quickly design and create a webpage (or multiple)!  There is a lot of documentation available which makes it easy to quickly format a clean and responsive page.",
        user_id: 4,
    },
];

const postData = () => User.bulkCreate(postData);

module.exports = postData;