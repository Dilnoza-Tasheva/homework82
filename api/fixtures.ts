import mongoose from 'mongoose';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import config from './config';
import User from "./models/User";

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

    const admin = new User({
        username: 'admin',
        password: '123',
        role: 'admin',
    });
    admin.generateToken();
    await admin.save();

    const user = new User({
        username: 'user',
        password: '123',
        role: 'user',
    });
    user.generateToken();
    await user.save();


    const [artist1, artist2, artistUnpublished] = await Artist.create(
        {
            name: 'Taylor Swift',
            photo: 'public/fixtures/taylor_swift.jpg',
            information: 'Taylor Swift is a pop and country singer-songwriter.',
            isPublished: true,
        },
        {
            name: 'Imagine Dragons',
            photo: 'fixtures/imagine_dragons.jpg',
            information: 'Imagine Dragons is a rock band known for their energetic anthems.',
            isPublished: true,
        },
        {
            name: 'Unreleased Artist',
            photo: null,
            information: 'This artist is not published yet',
            isPublished: false,
        }
    );

    const [album1, album2, album3, album4, albumUnpublished] = await Album.create(
        {
            title: '1989',
            artist: artist1._id,
            releaseDate: 2014,
            coverImage: 'fixtures/1989.jpg',
            isPublished: true,
        },
        {
            title: 'Lover',
            artist: artist1._id,
            releaseDate: 2019,
            coverImage: 'fixtures/lover.jpg',
            isPublished: true,
        },
        {
            title: 'Evolve',
            artist: artist2._id,
            releaseDate: 2017,
            coverImage: 'fixtures/evolve.jpg',
            isPublished: true,
        },
        {
            title: 'Night Visions',
            artist: artist2._id,
            releaseDate: 2012,
            coverImage: 'fixtures/night_visions.jpg',
            isPublished: true,
        },
        {
            title: 'Unreleased Album',
            artist: artistUnpublished._id,
            releaseDate: 2023,
            coverImage: null,
            isPublished: false,
        }
    );

    await Track.create(
        {
            title: 'Welcome to New York',
            album: album1._id,
            trackNumber: 1,
            length: '3:32',
            performer: artist1._id,
            isPublished: true,
        },
        {
            title: 'Blank Space',
            album: album1._id,
            trackNumber: 2,
            length: '3:51',
            performer: artist1._id,
            isPublished: true,
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
        },
        {
            title: 'Unreleased Song 1',
            album: albumUnpublished._id,
            trackNumber: 1,
            length: '3:30',
            performer: artistUnpublished._id,
            isPublished: false,
        },
        {
            title: 'Unreleased Song 2',
            album: albumUnpublished._id,
            trackNumber: 2,
            length: '4:00',
            performer: artistUnpublished._id,
            isPublished: false,
        },
        {
            title: 'Unreleased Song 3',
            album: albumUnpublished._id,
            trackNumber: 3,
            length: '2:58',
            performer: artistUnpublished._id,
            isPublished: false,
        }
    );
    await db.close();
};

run().catch(console.error);
