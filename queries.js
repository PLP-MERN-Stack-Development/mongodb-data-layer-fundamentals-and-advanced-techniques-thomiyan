// TASK 1:

    // - Create a new database called `plp_bookstore`
    // use plp_bookstore;

    // - Create a collection called `books`
    db.createCollection("books")

//


//  TASK 2:

    // - Find all books in a specific genre
    db.books.find({ genre: "Fiction" })

    // - Find books published after a certain year 1950
    db.books.find({ published_year: { $gt: 1950 } })
 
    // - Find books by a specific author
    db.books.find({ author: "George Orwell" })

    // - Update the price of a specific book
    db.books.updateOne({ title: "Animal Farm"}, {$set:  {price: 17 }})

    // - Delete a book by its title
    db.books.deleteOne({ title: "Moby Dick"})

//


// TASK 3:

    // - Find books that are both in stock and published after 2010
    db.books.find({ in_stock: true, published_year: { $gt: 2010 }}, {title: 1, author: 1, price: 1, _id: 0})

    // - Return only the title, author, and price fields
    db.books.find({}, {title: 1, author: 1, price: 1, _id: 0})

    // - Implement sorting to display books by price (both ascending and descending)
    db.books.find({}, {title: 1, author: 1, price: 1, _id: 0}).sort({price: 1})
    db.books.find({}, {title: 1, author: 1, price: 1, _id: 0}).sort({price: -1})
    
    // - Use the `limit` and `skip` methods to implement pagination (5 books per page)
    db.books.find().skip(0).limit(5)
    db.books.find().skip(5).limit(5)

//

   
// TASK 4:

    // - Create an aggregation pipeline to calculate the average price of books by genre
    db.books.aggregate([
        { $group: { _id: "$genre", avgPrice: {$avg: "$price"}}}
    ])

    // - Create an aggregation pipeline to find the author with the most books in the collection
    db.books.aggregate([
        { $group: { _id: "$genre", bookCount: { $sum: 1 }}},
        { $sort: { bookCount: -1 }},
        { $limit: 1 }
    ])

    // - Implement a pipeline that groups books by publication decade and counts them
    db.books.aggregate([
        {$project: {
            $decade: {
                $concat: [
                    {$substr: [{ $subtract: 
                        ["$published_year", { $mod:
                            ["$published_year", 10]
                        }]
                    }, 0, 4]},
                ]
            }
        }},
        { $group: {_id: "$decade", totalBooks: {$sum: 1}}},
        { $sort: {_id: 1}}
    ])

//



// TASK 5:

    // - Create an index on the `title` field for faster searches
    db.books.createIndex({title: 1})

    // - Create a compound index on `author` and `published_year`
    db.books.createIndex({author: 1, published_year: -1})

    // Find all books:
    db.books.find({title: "Dune"}).explain("executionStats")

//