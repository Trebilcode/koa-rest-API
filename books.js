const Router = require('koa-router');

// Prefix all routes with: /books
const router = new Router({
	prefix: '/books'
});

let books = [
	{ id: 101, name: 'Fight Club', author: 'Chuck Palahniuk' },
	{ id: 102, name: 'Sharp Objects', author: 'Gillian Flynn' },
	{ id: 103, name: 'Frankenstein', author: 'Mary Shelley' },
	{ id: 101, name: 'Into The Wild', author: 'John Krakauer' }
];

// Routes
router.get('/', (ctx, next) => {
    ctx.body ={
        status: 'success',
        message: books  
    } 
    next()
})

router.get('/:id', (ctx, next) => {
    let getCurrentBook = books.filter(book => {
        return book.id === ctx.params.id
    })

    if (getCurrentBook.length) {
        ctx.body = getCurrentBook[0]
    } else {
        ctx.response.status = 404
        ctx.body = {
            status: 'error!',
            message: 'Book not found with that id' 
        } 
    }

    next()
})

router.post('/new', (ctx, next) => {
    if (
        !ctx.request.body.id ||
        !ctx.request.body.name ||
        !ctx.request.body.author
        ) {
            ctx.response.status = 400
            ctx.body = {
                status: 'error',
                message: 'Please enter the required data',
            } 
        } else {
            let newBook = {
                id: ctx.request.body.id,
                name: ctx.request.body.name,
                author: ctx.request.body.author
            }
            books.push(newBook)

            ctx.response.status = 201
            ctx.body = {
                status: 'success',
                message: `New book added with id: ${ctx.request.body.id} and name: ${ctx.request.body.name}`
            } 
        }
        next()
})


module.exports = router;