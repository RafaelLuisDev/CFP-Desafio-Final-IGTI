import axios from 'axios';

const httpTransaction = axios.create({
    baseURL: 'https://cfp-thecoder-d.herokuapp.com/api/transaction',
    headers: {
        'Content-type': 'application/json',
    },
});

const getPeriods = async () => {
    return await httpTransaction.get('/periods');
};

const getEntriesByPeriod = async (period) => {
    return await httpTransaction.get('/?period=' + period);
};

const postEntry = async (data) => {
    return await httpTransaction.post('/', data);
};

const updateEntry = async (id, data) => {
    return await httpTransaction.patch(`/${id}`, data);
};

const deleteEntry = async (id) => {
    return await httpTransaction.delete(`/${id}`);
};

export default { getPeriods, getEntriesByPeriod, postEntry, updateEntry, deleteEntry };
