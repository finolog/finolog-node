import {assert} from 'chai';
import 'dotenv/config';

import FinologImport from '../dist/index';
const FinologRequire = require('../dist/index');

describe('Instance', () => {
    it('IMPORT', () => {
        const finolog = new FinologImport(process.env.api_token);
        assert.isNotEmpty(finolog);
    });
    it('REQUIRE', () => {
        const finolog = new FinologRequire.Client(process.env.api_token);
        assert.isNotEmpty(finolog);
    });
});
