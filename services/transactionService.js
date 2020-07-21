import mongoose from 'mongoose';

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
import EntryModel from '../models/TransactionModel.js';

const getEntriesByPeriod = async (req, res) => {
    try {
        if (req.query.period === undefined) throw new Error('É necessário informar a query "?period=...". Formato válido: yyyy-mm"');
        if (req.query.period.search(/\d{4}-\d{2}/g)) throw new Error('Periodo informado em formato inválido! Formato válido: yyyy-mm');
        const { period } = req.query;
        const foundTRS = await EntryModel.find({ yearMonth: period.toString() }).sort({ day: 1 });

        res.status(200).send({ length: foundTRS.length, entries: foundTRS });
    } catch (error) {
        res.status(500).send({ error: error.message || 'Algum erro ocorreu ao buscar' });
    }
};

const getPeriods = async (req, res) => {
    try {
        const periods = await EntryModel.distinct('yearMonth');

        res.status(200).send(periods.sort((a, b) => a.localeCompare(b)));
    } catch (error) {
        res.status(500).send({ error: error.message || 'Algum erro ocorreu ao buscar' });
    }
};

const postEntry = async (req, res) => {
    try {
        if (Object.entries(req.body).length === 0) throw new Error('É necessário informar dados para salvar!');
        const createdEntry = await EntryModel.create(req.body);

        res.status(200).send({ success: 'Dados salvos com sucesso!', entry: createdEntry });
    } catch (error) {
        res.status(500).send({ error: error.message || 'Algum erro ocorreu ao salvar' });
    }
};

const patchEntry = async (req, res) => {
    try {
        if (Object.entries(req.body).length === 0) throw new Error('É necessário informar dados para atualizar!');
        const { id } = req.params;

        const updateEntry = await EntryModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (updateEntry === null) throw new Error('Não foi possivel atualizar este resgistro. Id não encontrado!');

        res.status(200).send({ success: 'Dados atualizados com sucesso!', entry: updateEntry });
    } catch (error) {
        res.status(500).send({ error: error.message || 'Algum erro ocorreu ao salvar' });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedEntry = await EntryModel.findByIdAndDelete({ _id: id });
        if (deletedEntry === null) throw new Error('Não foi possivel excluir este resgistro. Id não encontrado!');
        res.status(200).send({ success: 'Registro excluido com sucesso!', entry: deletedEntry });
    } catch (error) {
        res.status(500).send({ error: error.message || 'Algum erro ocorreu ao salvar' });
    }
};

export default { getPeriods, getEntriesByPeriod, postEntry, patchEntry, deleteEntry };
