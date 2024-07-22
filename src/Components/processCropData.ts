import '../App.css';
import { Data } from './Data';


const processCropData = () => {

    // Here we are getting year to display in the table Year column
    // by using match method, we are finding here 4 digit sequence
    // by using filter method creating a array of elements whcich matches match sequence
    const years = [...new Set(Data.map(item => item.Year.match(/\d{4}/)?.[0]).filter(year => year !== undefined))];

    const maxMinProductionByYear = years.map(year => {

        // Filtering the data for that particular year
        const cropsInYear = Data.filter(item => item.Year.includes(year!));

        // Getting total production of each crop
        // reduce() method :
        // it is used to iterate over an array
        const productionByCrop = cropsInYear.reduce((acc, item) => {
            const cropName = item['Crop Name'];
            const production = item['Crop Production (UOM:t(Tonnes))'];

            if (typeof production === 'number') {
                if (!acc[cropName]) {
                    acc[cropName] = 0;
                }
                acc[cropName] += production;
            }

            return acc;
        }, {} as { [key: string]: number });

        const productionArray = Object.keys(productionByCrop).map(crop => ({
            CropName: crop,
            TotalProduction: productionByCrop[crop]
        }));

        // finding maximum production crop
        // using 2 parameters, current and previous production
        // updating current one if it is greater than comparing one
        const maxCrop = productionArray.reduce((prev, curr) =>
            curr.TotalProduction > prev.TotalProduction ? curr : prev,
            productionArray[0]
        );

        // finding minimum production crop
        const minCrop = productionArray.reduce((prev, curr) =>
            curr.TotalProduction < prev.TotalProduction ? curr : prev,
            productionArray[0]
        );

        // now returning an object with all elements
        return {
            Year: year,
            MaxProductionCrop: maxCrop ? maxCrop.CropName : 'N/A',
            MaxProduction: maxCrop ? maxCrop.TotalProduction.toFixed(3) : 'N/A',
            MinProductionCrop: minCrop ? minCrop.CropName : 'N/A',
            MinProduction: minCrop ? minCrop.TotalProduction.toFixed(3) : 'N/A',
        };
    });




    // Now calculate average yield and average cultivation for each crop

    const cropStats = Data.reduce((acc, item) => {
        const cropName = item['Crop Name'];
        if (!acc[cropName]) {
            acc[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
        }


        // Adding all the yield, and their Area, and their count to calculate Average
        if (typeof item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] === 'number' && typeof item['Area Under Cultivation (UOM:Ha(Hectares))'] === 'number') {
            acc[cropName].totalYield += item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'];
            acc[cropName].totalArea += item['Area Under Cultivation (UOM:Ha(Hectares))'];
            acc[cropName].count += 1;
        }

        return acc;
    }, {} as { [key: string]: { totalYield: number; totalArea: number; count: number } });

    // iterating over cropStats data to calculate individual data
    const averageStats = Object.keys(cropStats).map(crop => {
        const { totalYield, totalArea, count } = cropStats[crop];
        return {
            Crop: crop,
            // resulting in 3 decimal points
            AverageYield: count > 0 ? (totalYield / count).toFixed(3) : '0.000',
            AverageArea: count > 0 ? (totalArea / count).toFixed(3) : '0.000',
        };
    });

    // Return the processed data
    return { maxMinProductionByYear, averageStats };
};

export default processCropData;
