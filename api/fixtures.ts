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
            photo: 'public/fixtures/taylor_swift.jpg',
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
            title: 'All You Had To Do Was Stay',
            album: album1._id,
            trackNumber: 5,
            length: '3:13',
        },
        {
            title: 'Shake It Off',
            album: album1._id,
            trackNumber: 6,
            length: '3:39',
        },
        {
            title: 'I Forgot That You Existed',
            album: album2._id,
            trackNumber: 1,
            length: '2:50',
        },
        {
            title: 'Cruel Summer',
            album: album2._id,
            trackNumber: 2,
            length: '2:58',
        },
        {
            title: 'Lover',
            album: album2._id,
            trackNumber: 3,
            length: '3:41',
        },
        {
            title: 'The Archer',
            album: album2._id,
            trackNumber: 4,
            length: '3:31',
        },
        {
            title: 'You Need To Calm Down',
            album: album2._id,
            trackNumber: 5,
            length: '2:51',
        },
        {
            title: 'I Don’t Know Why',
            album: album3._id,
            trackNumber: 1,
            length: '3:10',
        },
        {
            title: 'Whatever It Takes',
            album: album3._id,
            trackNumber: 2,
            length: '3:21',
        },
        {
            title: 'Believer',
            album: album3._id,
            trackNumber: 3,
            length: '3:24',
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
        },
        {
            title: 'I’ll Make It Up To You',
            album: album3._id,
            trackNumber: 6,
            length: '4:22',
        },
        {
            title: 'Radioactive',
            album: album4._id,
            trackNumber: 1,
            length: '3:06',
        },
        {
            title: 'Tiptoe',
            album: album4._id,
            trackNumber: 2,
            length: '3:14',
        },
        {
            title: 'It’s Time',
            album: album4._id,
            trackNumber: 3,
            length: '4:00',
        },
        {
            title: 'Demons',
            album: album4._id,
            trackNumber: 4,
            length: '2:57',
        },
        {
            title: 'On Top of the World',
            album: album4._id,
            trackNumber: 5,
            length: '3:10',
        }
    );
    await db.close();
};

run().catch(console.error);
