const cds = require('@sap/cds/lib')
const { expect } = cds.test('serve', '--in-memory')

describe('My Bookstore - Consuming Services locally', () => {

    it('bootstrapped the database successfully', () => {
        const { CatalogService } = cds.services
        const { Authors, Books } = CatalogService.entities
        expect(CatalogService).to.exist
        expect(Authors).to.exist
        expect(Books).to.exist
    })

    it('allows reading from local services using cds.ql', async () => {
        const CatalogService = await cds.connect.to('CatalogService')
        const authors = await CatalogService.read(`Authors`, a => {
            a.name, a.books((b) => { b.title })
        }).where(`name like`, 'E%')

        expect(authors).to.containSubset([
            {
                name: 'Emily Brontë',
                books: [
                    { title: 'Wuthering Heights' },
                ],
            },
            {
                name: 'Edgar Allen Poe',
                books: [
                    { title: 'The Raven' },
                    { title: 'Eleonora' },
                ],
            },
        ])
    })
})
