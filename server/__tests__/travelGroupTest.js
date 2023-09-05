const pool = require('./../db/postgresModel');
const groupsController = require('./../controllers/groupsController');
describe('groupController', () => {
    let req;
    let res;
    let next;
    beforeEach(() => {
        req = {};
        res = {locals: {userId: '2'}};
        next = function(errObj) {
            return errObj;
        }
    });
    describe('getGroups', () => {

        it('Should call next without any arguments', async() => {
            const result = await groupsController.getGroups(req, res, next);
            expect(result).toEqual(undefined);
        })

        it('Should get all groups belonging to a user based on user_id', async() => {
            const result = await groupsController.getGroups(req, res, next);
            // Expect the groups to be of length 2 and have group_ids 1 and 2
            expect(res.locals.userGroups).toBeInstanceOf(Array);
            expect(res.locals.userGroups.length).toEqual(2);
            expect(res.locals.userGroups[0]).toHaveProperty('group_name');
        });

        it('Should return an empty array if the user belongs to no groups', async() => {
            res = {locals: {userId: '4'}};
            const result = await groupsController.getGroups(req, res, next);
            expect(res.locals.userGroup).toEqual([]);
        })
    })

    describe('createGroup', () => {
        it('Should create a group in the travel_group table and return the id on res.locals', async() => {
            req = {body: {groupName: "Test group", travelDestination: "Test destination"}};
            expect(res.locals.groupId).not.toBe(undefined);
            const text = `
            SELECT *
            FROM travel_group
            WHERE _id=($1);
            `;
            const values = [res.locals.groupId];
            const result = await pool.query(text, values);
            expect(result.rows.length).toEqual(1);
        });

        xit('Should set owner_id to res.locals.userId upon creation', ()=>{});
    })

    describe('addUserToGroup', () => {

        it('Should add a user to a group', async() => {
            req = {body: {userId: '4', groupId: '1'}};
            const text = `
            SELECT *
            FROM group_members
            WHERE user_id=($1) AND group_id=($2);
            `;
            const values = [req.body.userId, req.body.groupId];
            const resultPrior = await pool.query(text, values);
            expect(resultPrior.rows.length).toEqual(0);
            await groupsController.addUser(req, res, next);
            const resultPost = await pool.query(text, values);
            expect(resultPost.rows.length).toEqual(1);
        });

        it('Should throw an error if the user exists as a member of the group', async() => {
            req = {body: {userId: '2', groupId: '1'}};
            const result = await groupsController.addUser(req, res, next);
            expect(result).toBeInstanceOf(Object);
        })

        xit('Should throw an error if the user does not exist in the database', ()=>{});
    })
})