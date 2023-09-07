const pool = require('./../db/postgresModel');
const groupsController = require('./../controllers/groupsController');

describe('groupController', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = { query: {}, params: {} };
    res = { locals: {} };
    next = jest.fn();
  });

  describe('getAllGroups', () => {
    it('Should exit getAllGroups without throwing error', async () => {
      await groupsController.getAllGroups(req, res, next);
      expect(next.mock.calls[0][0]).toEqual(undefined);
    });

    it('Should throw error when provided incorrect data type', async () => {
      req.query.user_id = 'hello world';
      await groupsController.getAllGroups(req, res, next);
      expect(next.mock.calls[0][0]).not.toEqual(undefined);
    });

    it('Should get all groups when not provided with a user_id', async () => {
      await groupsController.getAllGroups(req, res, next);
      // Expect the groups to be of length 2 and have group_ids 1 and 2
      expect(res.locals.allGroups).toBeInstanceOf(Array);
      expect(res.locals.allGroups[0]).toHaveProperty('group_name');
    });

    it('Should get all groups belonging to a user based on user_id', async () => {
      req.query.user_id = 2; //this will supply the call with a user_id argument
      await groupsController.getAllGroups(req, res, next);
      // Expect the groups to be of length 2 and have group_ids 1 and 2
      expect(res.locals.allGroups).toBeInstanceOf(Array);
      expect(res.locals.allGroups.length).toEqual(2);
      expect(res.locals.allGroups[0]).toHaveProperty('group_name');
    });

    it('Should return an empty array if the user belongs to no groups', async () => {
      req.query.user_id = 4; //this will supply the call with a user_id argument
      await groupsController.getAllGroups(req, res, next);
      expect(res.locals.allGroups).toEqual([]);
    });
  });

  describe('createGroup', () => {
    it('Should create a group in the travel_group table and return the id on res.locals', async () => {
      req = {
        body: {
          groupName: 'Test group',
          destination: 'Test destination',
          startDate: '2023-09-10 12:30:00',
          endDate: '2023-10-01 12:30:00',
        },
        params: { user_id: 4 },
      };
      await groupsController.createGroup(req, res, next);
      console.log(res.locals);
      const result = res.locals.group_id;
      const rowNum = await pool.query('SELECT MAX(_id) FROM travel_group;');
      expect(result._id).toEqual(rowNum.rows[0].max);
      const ownerName = await pool.query('SELECT owner_id FROM travel_group WHERE _id = (SELECT MAX(_id) FROM travel_group);');
      expect(Number(ownerName.rows[0].owner_id)).toBe(req.params.user_id);
      req = {
        params: { group_id: rowNum.rows[0].max },
      };
      //Removes the group after the test to prevent filling our DB with test groups
      await groupsController.removeGroup(req, res, next);
    });
  });

  describe('addUserToGroup', () => {
    it('Should add a user to a group', async () => {
      req = { body: { userId: '4', groupId: '1' } };
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

    it('Should throw an error if the user exists as a member of the group', async () => {
      req = { body: { userId: '2', groupId: '1' } };
      await groupsController.addUser(req, res, next);
      expect(next.mock.calls[0][0]).toBeInstanceOf(Object);
    });

    xit('Should throw an error if the user does not exist in the database', () => {});
  });
});
