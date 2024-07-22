import { Table } from '@mantine/core';
import { createStyles } from '@mantine/styles';
import React from 'react';
import '../App.css';
import processCropData from './processCropData';

const styles = createStyles((theme) => ({

    table: {
        borderCollapse: 'collapse',
        width: '60%',
        marginLeft: '20%'
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        backgroundColor: theme.colors.gray[1],
        width: '33%',
        wordWrap: 'break-word'
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
        textAlign: 'center',
        width: '33%',
        wordWrap: 'break-word'
    },
    tr: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.colors.gray[0],
        },
        '&:hover': {
            backgroundColor: theme.colors.gray[2],
        },
    },
}));

const CropTables: React.FC = () => {
    const { classes } = styles();

    // Here we are calling " processCropData() " function"
    // That processed data is stored in 2 constants
    // we can retrive each constant data using their element name
    const { maxMinProductionByYear, averageStats } = processCropData();

    return (
        <div className='container'>
            <h2>Crops Production by Year</h2>
            <Table className={classes.table}>
                <thead>
                    <tr className={classes.tr}>
                        <th className={classes.th}>Year</th>
                        <th className={classes.th}>Crop with Maximum Production in that Year</th>
                        <th className={classes.th}>Crop with Minimum Production in that Year</th>
                    </tr>
                </thead>
                <tbody>
                    {maxMinProductionByYear.map((row) => (
                        <tr key={row.Year} className={classes.tr}>
                            <td className={classes.td}>{row.Year}</td>
                            <td className={classes.td}>{row.MaxProductionCrop}</td>
                            <td className={classes.td}>{row.MinProductionCrop}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h2>Average Crop Yield and Cultivation Area</h2>
            <Table className={classes.table}>
                <thead>
                    <tr className={classes.tr}>
                        <th className={classes.th}>Crop</th>
                        <th className={classes.th}>Average Yield of the crop b/w 1950-2020</th>
                        <th className={classes.th}>Average Cultivation Area of the crop b/w 1950-2020</th>
                    </tr>
                </thead>
                <tbody>
                    {averageStats.map((row, index) => (
                        <tr key={index} className={classes.tr}>
                            <td className={classes.td}>{row.Crop}</td>
                            <td className={classes.td}>{row.AverageYield}</td>
                            <td className={classes.td}>{row.AverageArea}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CropTables;
