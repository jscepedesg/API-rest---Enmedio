import { Router, Request, Response } from 'express';
import _ = require('underscore');
import Inventory from '../models/inventory';
const CInventory = Router();

/**
 * @description Method for creating inventory.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInventory.post( '/inventory', ( req: Request, res: Response ) => {
    let body = req.body;

    let inventory = new Inventory({
        article_id: body.article_id,
        quantity: body.quantity
    });

    inventory.save((err: any, inventoryDB: any) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            inventory: inventoryDB
        });
    });
});

/**
 * @description Method to get all inventory.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInventory.get( '/inventory', ( req: Request, res: Response ) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 15;
    limit = Number(limit);

    Inventory.find({state: true})
            .skip(from)
            .limit(limit)
            .populate('article_id', 'name')
            .exec((err, inventory) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Inventory.countDocuments({state: true}, (err, count) => {
                    res.json({
                        ok: true,
                        inventory,
                        howMany: count
                    });
                });
            });
});

/**
 * @description Method to inventory by id.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInventory.get( '/inventory/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error inventory doesn't exist"});
    }

        Inventory.findById(id)
                .populate('article_id', 'name')
                .exec((err: any, inventory: any) => {

            if(err) {return res.status(500).json({message: 'Error returning data'});}

            if(! inventory ) return res.status(404).json({message: "Error inventory doesn't exist"});

            return res.status(200).json({
                ok: true,
                inventory
            });

        });
});

/**
 * @description Method that updates the attributes of a inventory.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInventory.put( '/inventory/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    let body =_.pick( req.body, ['article_id', 'quantity', 'state']);

    Inventory.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, inventoryDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! inventoryDB) return res.status(404).json({message: "Error inventory doesn't exist"});

        res.json({
            ok: true,
            inventory: inventoryDB
        });
    });
});

/**
 * @description Method that delete a inventory.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInventory.delete( '/inventory/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };
    Inventory.findByIdAndUpdate( id, changeState, {new: true}, (err, inventoryDelete) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if(inventoryDelete === null){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'inventory not found'
                    }
                });
            }
            res.json({
                ok: true,
                inventory: inventoryDelete
            });
    });
});

export default CInventory;