import mongoose from 'mongoose';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import config from './config';

const run = async () => {
    await mongoose.connect(config.db);

    const db = mongoose.connection;

    try {
        await db.dropCollection('artists');
        await db.dropCollection('albums');
        await db.dropCollection('tracks');
    } catch (e) {
        console.log('Collections were not present');
    }

    const [artist1, artist2] = await Artist.create(
        {
            name: 'Taylor Swift',
            photo: 'fixtures/taylor_swift.jpg',
            information: 'Taylor Swift is a pop and country singer-songwriter.',
        },
        {
            name: 'Imagine Dragons',
            photo: 'fixtures/imagine_dragons.jpg',
            information: 'Imagine Dragons is a rock band known for their energetic anthems.',
        }
    );

    const [album1, album2, album3, album4] = await Album.create(
        {
            title: '1989',
            artist: artist1._id,
            releaseDate: 2014,
            coverImage: 'fixtures/1989.jpg',
        },
        {
            title: 'Lover',
            artist: artist1._id,
            releaseDate: 2019,
            coverImage: 'fixtures/lover.jpg',
        },
        {
            title: 'Evolve',
            artist: artist2._id,
            releaseDate: 2017,
            coverImage: 'fixtures/evolve.jpg',
        },
        {
            title: 'Night Visions',
            artist: artist2._id,
            releaseDate: 2012,
            coverImage: 'fixtures/night_visions.jpg',
        }
    );

    await Track.create(
        {
            title: 'Welcome to New York',
            album: album1._id,
            trackNumber: 1,
            length: '3:32',
        },
        {
            title: 'Blank Space',
            album: album1._id,
            trackNumber: 2,
            length: '3:51',
        },
        {
            title: 'Style',
            album: album1._id,
            trackNumber: 3,
            length: '3:51',
        },
        {
            title: 'Out of the Woods',
            album: album1._id,
            trackNumber: 4,
            length: '3:55',
        },
        {
            title: 'Shake It Off',
            album: album1._id,
            trackNumber: 5,
            length: '3:39',
        },
        {
            title: 'Believer',
            album: album3._id,
            trackNumber: 1,
            length: '3:24',
        },
        {
            title: 'Thunder',
            album: album3._id,
            trackNumber: 2,
            length: '3:07',
        },
        {
            title: 'Whatever It Takes',
            album: album3._id,
            trackNumber: 3,
            length: '3:21',
        },
        {
            title: 'Walking the Wire',
            album: album3._id,
            trackNumber: 4,
            length: '3:52',
        },
        {
            title: 'Rise Up',
            album: album3._id,
            trackNumber: 5,
            length: '3:51',
        }
    );
    await db.close();
};

run().catch(console.error);
