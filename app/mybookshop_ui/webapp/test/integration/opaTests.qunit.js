sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'mybookshopui/test/integration/FirstJourney',
		'mybookshopui/test/integration/pages/BooksList',
		'mybookshopui/test/integration/pages/BooksObjectPage'
    ],
    function(JourneyRunner, opaJourney, BooksList, BooksObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('mybookshopui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheBooksList: BooksList,
					onTheBooksObjectPage: BooksObjectPage
                }
            },
            opaJourney.run
        );
    }
);