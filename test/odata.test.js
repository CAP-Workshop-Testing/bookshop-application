const cds = require('@sap/cds/lib')
const { GET, expect } = cds.test('serve', '--in-memory')

describe('My Bookstore APIs', () => {

    it('serves $metadata documents in v4', async () => {
        const { headers, status, data } = await GET`/catalog/$metadata`
        expect(status).to.equal(200)
        expect(headers).to.contain({
            'content-type': 'application/xml',
            'odata-version': '4.0',
        })
        expect(data).to.contain('<EntitySet Name="Books" EntityType="CatalogService.Books">')
    })

    it('supports $select', async () => {
        const { data } = await GET(`/catalog/Books`, {
            params: { $select: `ID,title` },
        })
        expect(data.value).to.eql([
            { ID: 201, title: 'Wuthering Heights', IsActiveEntity: true },
            { ID: 207, title: 'Jane Eyre', IsActiveEntity: true },
            { ID: 251, title: 'The Raven', IsActiveEntity: true },
            { ID: 252, title: 'Eleonora', IsActiveEntity: true },
            { ID: 271, title: 'Catweazle', IsActiveEntity: true },
        ])
    })

    it('correctly sums up totalStock', async () => {
        const calculatedTotalStock = (await GET`/catalog/totalStock()`).data.value.stock
        const stockValues = (await GET`/catalog/Books`)
                             .data.value.map(book => book.stock)
 
	    let totalStock = 0;
        for (const stock of stockValues) totalStock += stock;
 
        expect(calculatedTotalStock).to.eql(totalStock)
    })


})
