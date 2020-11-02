const dimensionCategorizer = require('./helpers/sizeDimension.js');
const handlingCategorizer = require('./helpers/handling.js');
const locationCategorizer = require('./helpers/location.js');
const levelCategorizer = require('./helpers/level.js');
const consumptionStorageCalculator = require('./helpers/consumptionStorage.js');
const partCost = require('./helpers/cost.js');
const costLocalCalculator = require('./helpers/costLocal.js');

const { Cart, Item } = require('./models');

class WarehouseController {

    static async createCart (req, res, next) {

        try {
            const cart = await Cart.create();
    
            res.status(201).json({
                message: 'Success Create Cart',
                cart
            })
        } catch (error) {
            // next(error);
            console.error(error);
        }
    }

    static async getAllCarts (req, res, next) {
        try {
            const carts = await Cart.findAll();
            console.log(carts);
            res.status(200).json({
                carts
            })

        } catch (error) {
            console.error(error);
        }
    }

    static async getCartItems (req, res, next) {
        const { id } = req.params;
        console.log(req.params)
        try {
            const items = await Item.findAll({
                where: {
                    CartId: id
                }
            });
            console.log(items);
            res.status(200).json({
                items
            })

        } catch (error) {
            console.error(error);
        }
    }

    static async calculateInput (req, res, next) {
        const {
            cargoType,
            warehouseType,
            storageLocation,
            quantity,
            totalArea,
            volume,
            weight,
            stackBin,
            totalPallet,
            diameter,
            wrapping,
            stickerLabel,
            cartId
        } = req.body;

        console.log(req.body);

        const openYard = ['Tyre B (Non Stack)', 'Container 20 ft.', 'Container 40 ft.', 'Container HC 20 ft.', 'Container HC 20 ft.', 'Heavy Equipment'];

        const volumeQty = +quantity * volume;
        const sizeDimension = dimensionCategorizer(cargoType, volume, diameter);
        const totalWeight = +quantity * +weight;
        const handling = handlingCategorizer(cargoType, +weight);
        const addedServices = [];
        let consumptionStorage = 0;
        let localSuggestion;
        let levelSuggestion;
        let cost;
        let addedCost = 0;

        console.log(cargoType, weight)
        console.log(handling)

        if (warehouseType === 'PLB') {
            localSuggestion = 'Floor'
        } else {
            if (cargoType === 'Parts') {
                localSuggestion = locationCategorizer(volumeQty);
                levelSuggestion = levelCategorizer(+weight, localSuggestion);
            } else if (openYard.includes(cargoType) || storageLocation === 'Open Yard') {
                localSuggestion = 'Floor Open';
            } else if (cargoType === 'Pallet' && storageLocation === 'Cover Yard') {
                localSuggestion = 'Racking Cover';
            } else {
                localSuggestion = 'Floor Cover';
            }
        }

        if (warehouseType === 'PLB') {
            if (storageLocation === 'Open Yard') {
                cost = totalArea * 22000;
            } else {
                cost = totalArea * 50000;
            }
        } else {
            if (cargoType === ' Parts') {
                cost = partCost(volumeQty, localSuggestion);
            } else if (storageLocation === 'Open Yard') {
                cost = totalArea * 22000;
            } else if (cargoType === 'Pallet' && storageLocation === 'Cover Yard') {
                cost = 52018 * totalPallet;
            } else {
                cost = totalArea * 50000;
            }
        }

        if (warehouseType === 'NON-PLB') {
            if (cargoType === 'Parts') {
                consumptionStorage = consumptionStorageCalculator(localSuggestion, totalArea, volumeQty);
            } else {
                consumptionStorage = totalArea;
            }
        }

        if (cargoType === 'Parts' && warehouseType === 'NON-PLB') {
            const costLocal = costLocalCalculator(localSuggestion, consumptionStorage);
            cost = costLocal;
        }

        if (stickerLabel) {
            addedCost += (1000 * consumptionStorage);
            addedServices.push('Sticker Label');
        }

        if (wrapping) {
            addedCost += (5000 * consumptionStorage);
            addedServices.push('Wrapping');
        }

        const totalCost = cost + addedCost;

        const obj = {
            type: cargoType,
            warehouse_type: warehouseType,
            storage_location: storageLocation,
            quantity,
            total_area: totalArea,
            volume,
            weight: totalWeight,
            stack_per_bin: stackBin,
            total_pallet: totalPallet,
            diameter,
            volume_quantity: volumeQty,
            size_dimension: sizeDimension,
            handling,
            consumption_storage: consumptionStorage,
            location: localSuggestion,
            level: levelSuggestion,
            added_services: addedServices.join(', '),
            cost,
            added_cost: addedCost,
            total_cost: totalCost,
            CartId: cartId
        }

        console.log(obj)

        // try {
        //     await Item.create({
        //         type: cargoType,
        //         warehouse_type: warehouseType,
        //         storage_location: storageLocation,
        //         quantity,
        //         total_area: totalArea,
        //         volume,
        //         weight: totalWeight,
        //         stack_per_bin: stackBin,
        //         total_pallet: totalPallet,
        //         diameter,
        //         volume_quantity: volumeQty,
        //         size_dimension: sizeDimension,
        //         handling,
        //         consumption_storage: consumptionStorage,
        //         location: localSuggestion,
        //         level: levelSuggestion,
        //         wrapping,
        //         sticker_label: stickerLabel,
        //         cost,
        //         added_cost: addedCost,
        //         total_cost: totalCost,
        //         CartId: cartId
        //     })

        //     res.status(201).json({
        //         message: 'Success Add New Item'
        //     })
        // } catch (error) {
        //     console.error(error);
        // }
    }

    static async deleteItems (req, res, next) {
        const { id } = req.params;

        try {
            await Items.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                message: `Success delete item with id ${id}`
            })
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = WarehouseController;
