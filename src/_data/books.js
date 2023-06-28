// _data/library.js

require('dotenv').config();
const Airtable = require('airtable');
const base = new Airtable({ apiKey: process.env.AIRTABLE }).base( process.env.AIRTABLE_BASE_URL);

module.exports = async () => {
    try {
        let airtableData = []; 
        const baseName = 'Books';
        const viewName = 'Grid view';
        const records = await base(baseName).select({ view: viewName }).all();
        airtableData = records.map(record => ({ customId: record._rawJson.id, ...record._rawJson.fields }));
        return airtableData;
    } catch (err) {
        throw new Error(err);
    }
};