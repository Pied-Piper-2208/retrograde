const client = require('./index');
const { createUser } = require('./users');
const { createGame } = require('./games');

const  dropTables = async () => {
    try {
        console.log('Dropping Tables...');

        await client.query(`
            DROP TABLE IF EXISTS orders_games;
            DROP TABLE IF EXISTS orders;
            DROP TABLE IF EXISTS games;
            DROP TABLE IF EXISTS users;
        `)

        console.log('Finished dropping tables.')
    } catch (error) {
        console.error('Error dropping tables!')
        throw error;
    }
};

const createTables = async () => {
    try {
        console.log('Creating Tables...');

        await client.query(`
            CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            "isAdmin" BOOLEAN DEFAULT false,
            "emailAddress" VARCHAR(50) NOT NULL,
            UNIQUE (username, "emailAddress")
            );

            CREATE TABLE games (
            id SERIAL PRIMARY KEY,
            name VARCHAR(50) UNIQUE NOT NULL,
            price INTEGER NOT NULL,
            genre VARCHAR(20) NOT NULL,
            description TEXT NOT NULL
            );

            CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "userId" INTEGER REFERENCES users(id),
            isOPEN BOOLEAN DEFAULT true
            );

            CREATE TABLE orders_games (
            id SERIAL PRIMARY KEY,
            "orderId" INTEGER REFERENCES orders(id),
            "gameId" INTEGER REFERENCES games(id)
            );
        `)

        console.log('Finished creating tables.')
    } catch (error) {
        console.error('Error creating tables!')
        throw error;
    }
};

const createInitialUsers = async () => {
    try {
        console.log('Creating initial users...')

        await createUser({ username: 'branstark', password: 'broken', emailAddress: 'beststory@gmail.com', isAdmin: true });
        await createUser({ username: 'jonsnow', password: 'ghost', emailAddress: 'hbo@gmail.com' });
        await createUser({ username: 'nedstark', password: 'thenorth', emailAddress: 'winterfell@gmail.com' });
        await createUser({ username: 'hodor', password: 'hodor', emailAddress: 'hodor@hodor.com' });

        console.log('Finished creating initial users.')
    } catch (error) {
        console.error('Error creating initial users!')
        throw error;
    }
};

const createInitialGames = async () => {
    try {
        console.log('Creating initial games...');

        await createGame({ name: 'Oregon Trail', price: 20.00, genre: 'Educational', description: "Originally designed to teach 8th grade schoolchildren about the realities of 19th-century pioneer life on the Oregon Trail. The player assumes the role of a wagon leader guiding a party of settlers from Independence, Missouri, to Oregon's Willamette Valley via a covered wagon in 1848." });
        await createGame({ name: 'Starcraft', price: 50.00, genre: 'Strategy', description: "Set in a fictitious future timeline during the 25th century AD in a distant part of the Milky Way galaxy known as the Koprulu Sector, the game revolves around three intelligent species fighting for dominance: the Terrans are humans exiled from Earth who are now skilled at adapting to any situation; the Zerg are a race of insectoid aliens in pursuit of genetic perfection and obsessed with assimilating other races; the Protoss are a humanoid species with advanced technology and psionic abilities who are attempting to preserve their civilization and strict philosophy about their way of life from the Zerg." });
        await createGame({ name: 'The Secret of Monkey Island', price: 30.00, genre: 'Puzzle', description: "The Secret of Monkey Island is a 2D adventure game played from a third-person perspective. Via a point-and-click interface, the player guides protagonist Guybrush Threepwood through the game's world." });
        await createGame({ name: 'Bloons Tower Defense 3', price: 40.00, genre: 'Strategy', description: "The main objective of Bloons TD is to prevent Bloons (in-game name for balloons) from reaching the end of a defined track on a map which consists of one or more entrances and exits for the bloons." });

        console.log('Finished creating initial games.')
    } catch (error) {
        console.error('Error creating initial games!')
        throw error;
    }
};

const rebuildDB = async () => {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialGames();

        console.log('Finished building DB.')
    } catch (error) {
        console.error('Error rebuilding DB!')
        throw error;
    }
};

rebuildDB()
  .catch(console.error)
  .finally(() => client.end());