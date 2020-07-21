import React, { useEffect, useState } from 'react';
import transactionsService from '../Services/transactionsService';
import formatHelpers from '../Helpers/formatHelpers';

export default function Informations({ filteredEntriesByPeriod, onChangePeriod }) {
    const [allPeriods, setAllPeriods] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState('');
    const entries = filteredEntriesByPeriod.length;
    const income = filteredEntriesByPeriod
        .filter((entry) => {
            return entry.type === '+';
        })
        .reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);
    const expenses = filteredEntriesByPeriod
        .filter((entry) => {
            return entry.type === '-';
        })
        .reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);
    const balance = income - expenses;

    useEffect(() => {
        const getPeriods = async () => {
            return await transactionsService.getPeriods();
        };

        getPeriods()
            .then((success) => {
                const allPeriods = success.data;
                setAllPeriods(allPeriods);
                setPeriod(allPeriods[Math.floor(allPeriods.length / 2)]);
            })
            .catch((error) => {
                console.log(error, error.response, error.message);
            });
    }, []);

    useEffect(() => {
        const leftArrow = document.getElementById('leftArrow');
        const rightArrow = document.getElementById('rightArrow');

        if (selectedPeriod === allPeriods[0]) leftArrow.classList.add('disabled');
        else leftArrow.classList.remove('disabled');

        if (selectedPeriod === allPeriods[allPeriods.length - 1]) rightArrow.classList.add('disabled');
        else rightArrow.classList.remove('disabled');
    }, [selectedPeriod, allPeriods]);

    const handleChangeSelectPeriod = (event) => {
        setPeriod(event.target.value);
    };

    const handleClickLeftArrow = (event) => {
        const indexSelected = allPeriods.findIndex((period) => period === selectedPeriod);
        setPeriod(allPeriods[indexSelected - 1]);
    };

    const handleClickRightArrow = (event) => {
        const indexSelected = allPeriods.findIndex((period) => period === selectedPeriod);
        setPeriod(allPeriods[indexSelected + 1]);
    };

    const setPeriod = (newPeriod) => {
        setSelectedPeriod(newPeriod);
        onChangePeriod(newPeriod);
    };

    return (
        <div>
            <div className="row">
                <div className="col s1 offset-s4">
                    <button id="leftArrow" className="waves-effect waves-light btn" onClick={handleClickLeftArrow}>
                        <i className="material-icons">keyboard_arrow_left</i>
                    </button>
                </div>
                <div className="col s2">
                    <select id="selectPeriod" className="browser-default" value={selectedPeriod} onChange={handleChangeSelectPeriod}>
                        {allPeriods.map((period, index) => {
                            return (
                                <option value={period} key={index}>
                                    {formatHelpers.getMonthName(period.split('-')[1]).slice(0, 3) + '/' + period.split('-')[0]}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div className="col s1">
                    <button href="#" id="rightArrow" className="waves-effect waves-light btn" onClick={handleClickRightArrow}>
                        <i className="material-icons">keyboard_arrow_right</i>
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col s3">Lançamentos: {entries}</div>
                <div className="col s3">Receitas: {formatHelpers.formatValue(income)}</div>
                <div className="col s3">Despesas: {formatHelpers.formatValue(expenses)}</div>
                <div className="col s3">Saldo: {formatHelpers.formatValue(balance)}</div>
            </div>
        </div>
    );
}
