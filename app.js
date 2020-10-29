const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/kingApp', {useUnifiedTopology: true, useNewUrlParser: true});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const bookSchema = {
    name: String
};

const Book = mongoose.model("Book", bookSchema);

app.get("/", function (req, res) {

    Book.find({ }, function (err, foundBooks) {
        res.render("list", { bookItems: foundBooks });
    });

    
});

app.post("/", function (req, res) {

    const bookItem = req.body.newBook;

    if (bookItem != "") {
            const book = new Book({
        name: bookItem
    });
    book.save();
    }
    
   res.redirect("/");

    // const bookItem = req.body.newBook;
    // console.log(bookItem);
    // res.render("list", { bookItems: bookItem });

});



app.listen(3000, function (req, res) {
    console.log("server started on port 3000");
});