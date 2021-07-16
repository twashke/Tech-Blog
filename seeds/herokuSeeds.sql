-- post seeds

INSERT INTO post (title, content, user_id)
VALUE ("To many applications are tracking your private data!", "Now that everyone uses cell phones and tablets for everyday things, your private data is being tracked.  It's shocking to learn how many applications we use are tracking everything we do!",1);

INSERT INTO post (title, content, user_id)
VALUE ("README Generator now available on github","Sick of recreating README documents for every project?  Clone the README Generator onto your computer to easily create a README for each project.  By answering a few simple prompts on the command line, this application will write a README.md file that includes license information and a badge, github links and badge, as well as the avatar used by the github user (located in the Contact portion of the README).",2);

INSERT INTO post (title, content, user_id)
VALUE ("MVC using Handlebars","Model-View-Controller is a popular way to design web applications these days.  By using a simplet templating language like Handlebars, entry level web developers can create full stack web applications!",3);

INSERT INTO post (title, content, user_id)
VALUE ("Use Bootstrap to quickly design a website page!","Sick of trying to figure out flex box or how to format a webpage?  Try out Bootstrap to quickly design and create a webpage (or multiple)!  There is a lot of documentation available which makes it easy to quickly format a clean and responsive page.", 4);

-- comment seeds

INSERT INTO comment (text, user_id, post_id)
VALUE ("I read about this and it blew my mind!", 1, 1);

INSERT INTO comment (text, user_id, post_id)
VALUE ("Wow, I can't believe this happened!", 1, 1);

INSERT INTO comment (text, user_id, post_id)
VALUE ("Looking forward to trying this application!", 2, 2);

INSERT INTO comment (text, user_id, post_id)
VALUE ("Awesome! What a cool idea!", 2, 2);

INSERT INTO comment (text, user_id, post_id)
VALUE ("How cool, we were just discussing this in class!", 3, 3);

INSERT INTO comment (text, user_id, post_id)
VALUE ("The more I read about this, the more interested I am!", 4, 4);

-- user seeds

INSERT INTO user (username, email, password)
VALUE ("JackDaniels","jack@daniels.com","password12345");

INSERT INTO user (username, email, password)
VALUE ("JimBean","jim@bean.com","password12345");

INSERT INTO user (username, email, password)
VALUE ("JillValentine","jill@valentine.com","password12345");

INSERT INTO user (username, email, password)
VALUE ("JackSkellington","jack@skellington.com","password12345");

INSERT INTO user (username, email, password)
VALUE ("Tiffany ✌🏻","tiffany@me.com","password12345");