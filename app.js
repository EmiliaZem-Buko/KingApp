const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { send } = require("process");
mongoose.connect('mongodb://localhost:27017/kingApp', {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false});
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const bookSchema = {
    name: String,
    checked: Number
};

const Book = mongoose.model("Book", bookSchema);

app.get("/", function (req, res) {

    Book.find({}, function (err, foundBooks) {
        res.render("list", { bookItems: foundBooks});
    });
});

app.post("/", function (req, res) {

    const bookItem = req.body.newBook;

    if (bookItem != "") {
            const book = new Book({
                name: bookItem,
                checked: 0
    });
    book.save();
    }
    
   res.redirect("/");
});

app.post("/update", function (req, res) {

    const bookId = req.body.bookId;
    let checked = 0;
    const newName = req.body.bookName;

    if (req.body.checkbox === "on") {
        checked = 1;
    }

    Book.findOneAndUpdate({ _id: bookId }, { checked: checked, name: newName}, function (err) {
        res.redirect("/");
    });

    console.log(req.body);

});

app.post("/delete", function (req, res) {

    const deleteIcon = req.body.trash;

    Book.findByIdAndRemove(deleteIcon, function (err) {
        if (!err) {
            res.redirect("/");
            console.log(req.body);
        } else {
            console.send(err);
        }
    });
});

app.post("/edit", function (req, res) {
    
})


app.listen(3000, function (req, res) {
    console.log("server started on port 3000");
});