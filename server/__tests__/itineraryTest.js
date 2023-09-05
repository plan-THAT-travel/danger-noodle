const pool = require('./../db/postgresModel');
const itineraryController = require('./../controllers/itineraryController');

describe('itineraryController', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {params: {groupId: '1'}};
        res = {locals: {userId: '2'}};
        next = jest.fn();
        }
    )
    describe('verifyUserGroup', ()=>{

        it('Should contain a method for verifyUserGroup', () => {
            expect(itineraryController).hasOwnProperty('verifyUserGroup');
            expect(typeof itineraryController.verifyUserGroup).toEqual('function');
        })

        it('Should handle successful requests by returning next() and not adding to res.locals', async() => {
            
            await itineraryController.verifyUserGroup(req, res, next)
            expect(next).toBeCalledTimes(1);
            expect(next.mock.calls[0][0]).toBe(undefined);
            expect(req).toEqual(req);
            expect(res).toEqual(res);
        })

        it('Should throw an error for incorrectly formated queries', async() => {
            req = {params: '1'}
            await itineraryController.verifyUserGroup(req, res, next)
            expect(next.mock.calls[0][0]).toBeInstanceOf(Object);
        }) 
        
        it('Should throw an error for queries with incorrect groupId', async() => {
            req = {params: {groupId: '5'}};
            res = {locals: {}};
            await itineraryController.verifyUserGroup(req, res, next);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Object);
        })

        it('Should throw an error for queries with incorrect userId', async() => {
            res = {locals: {userId: '7'}};
            req = {params: {}};
            await itineraryController.verifyUserGroup(req, res, next);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Object);
        })
    })

    describe('getAllItineraries', () => {
        beforeEach(() => {
            req = {params: {groupId: '1'}};
        })
        it('Should contain a method for getAllItineraries', () => {
            expect(itineraryController).hasOwnProperty('getAllItineraries');
            expect(typeof itineraryController.getAllItineraries).toEqual('function');
        })

        it('Should store itineraries on res.local.itineraries and should be of type array and not error', async() => {
            await itineraryController.getAllItineraries(req, res, next);
            expect(res.locals).toHaveProperty('itineraries');
            expect(res.locals['itineraries']).toBeInstanceOf(Array);
            expect(next.mock.calls[0][0]).toEqual(undefined);
        })

        it('Should return an empty array if no itineraries exist for a query', async() => {
            req = {params: {groupId: '5'}};
            await itineraryController.getAllItineraries(req, res, next);
            expect(res.locals.itineraries).toEqual([]);

        })
    })
    xdescribe('updateItinerary', () => {
        it('Should contain a method for updateItinerary', () => {
            expect(itineraryController).hasOwnProperty('updateItinerary');
            expect(typeof itineraryController.updateItinerary).toEqual('function');
        })
    })

    xdescribe('deleteItinerary', () => {
        it('Should contain a method for deleteItinerary', () => {
            expect(itineraryController).hasOwnProperty('deleteItinerary');
            expect(typeof itineraryController.deleteItinerary).toEqual('function');
        })

        it('Should delete an entry from the database', async() => {
            const text = `
            INSERT INTO itinerary_item(group_id, title, category, hyperlink, cost, date_of_event)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING _id;
            `
            const values = ['1', 'test title', 'test category', 'http://test', '11.50', '2023-09-02'];
            const result = await pool.query(text, values);
            const id = await result.rows[0]._id;
            req = {params: {id}};
            await itineraryController.deleteItinerary(req, res, next);
            const getValText = `
            SELECT *
            FROM itinerary_item
            WHERE _id=($1);
            ` ;
            const itemValues = [id];
            const resultItem = await pool.query(getValText, itemValues);
            expect(resultItem.rows[0].length).toEqual(0);
        })

        it ('Should return an object for an error if the id does not exist', async() => {
            req = {params: {id: 100}};
            await itineraryController.deleteItinerary(req, res, next);
            expect(next.mock.calls[0][0]).toBeInstanceOf(Object);
        })
    })
})

