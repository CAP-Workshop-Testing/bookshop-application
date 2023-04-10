using CatalogService from './cat-service';


annotate CatalogService.Books with @odata.draft.enabled;

annotate CatalogService.Books with @(UI : {
    HeaderInfo       : {
        TypeName       : 'Book',
        TypeNamePlural : 'Books',
        Title          : {
            $Type : 'UI.DataField',
            Value : title
        }
    },
    SelectionFields  : [
        author_name,
        title
    ],
    LineItem         : [
        {Value : ID},
        {Value : author_name},
        {Value : title},
        {Value : stock},
        {Value : price},
        {Value : createdBy}
    ],
    Facets           : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Book details',
        Target : '@UI.FieldGroup#Main'
    }],
    FieldGroup #Main : {Data : [
        {Value : ID},
        {Value : author_name},
        {Value : title},
        {Value : stock},
        {Value : price},
        {Value : createdBy}
    ]}
});

annotate CatalogService.Books with {
    ID          @(Common.Label : 'Book ID');
    author_name @(Common.Label : 'Author');
    title       @(Common.Label : 'Title');
    stock       @(Common.Label : 'Stock');
    price       @(Common.Label : 'Price');
    createdBy   @(Common.Label : 'Entry creator');
}