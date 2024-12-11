import supertest from 'supertest';
import chai from 'chai'
import api from '../server';

global.app = api;
global.request = supertest(api);
global.request = chai.expect;
global.assert = chai.assert;