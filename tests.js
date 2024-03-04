const { mongoConnect } = require('./util/databases');  // Update the path accordingly
const Category = require('./models/category');  // Update the path accordingly
const Album = require('./models/album');  // Update the path accordingly
const Song = require('./models/song');  // Update the path accordingly

async function testCase() {
    try {
         mongoConnect(async (db) => {
            console.log('Connected to the database');
            // Create categories
            const popCategory = new Category('Pop', 'Any Pop Description');
            await popCategory.save();

            const jazzCategory = new Category('Jazz', 'Any Jazz Description');
            await jazzCategory.save();

            // Create an album named "My Album" with category "Pop" and add 3 songs
            const myAlbum = new Album('My Album', 'Any Album Description', true);
            await myAlbum.save(popCategory._id);

            const myAlbumSongs = [
                { name: 'Song1', singer: 'Singer1', category: 'Pop' },
                { name: 'Song2', singer: 'Singer2', category: 'Pop' },
                { name: 'Song3', singer: 'Singer3', category: 'Pop' },
            ];
            await Song.addSongsToAlbum(myAlbum._id, myAlbumSongs);

            // Create an album named "Temp Album" with category "Jazz" and add 3 songs
            const tempAlbum = new Album('Temp Album', 'Any Album Description', true);
            await tempAlbum.save(jazzCategory._id);

            const tempAlbumSongs = [
                { name: 'Song4', singer: 'Singer4', category: 'Jazz' },
                { name: 'Song5', singer: 'Singer5', category: 'Jazz' },
                { name: 'Song6', singer: 'Singer6', category: 'Jazz' },
            ];
            await Song.addSongsToAlbum(tempAlbum._id, tempAlbumSongs);


            // Delete the second album
            await Album.deleteById(tempAlbum._id);

            console.log('Test case completed successfully');
        });
    } catch (error) {
        console.error('Test case failed:', error.message);
    }
    // }
}

// Run the test case
testCase();