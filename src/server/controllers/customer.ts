import { Router, Request, Response } from 'express';
import _ = require('underscore');
import Customer from '../models/customer';
const CCustomer = Router();

/**
 * @description Method for creating customer.
 * @author jsCespedesg
 * @version 1.0.0
 */
CCustomer.post( '/customer', ( req: Request, res: Response ) => {
    let body = req.body;

    let customer = new Customer({
        firstname: body.firstname,
        lastname: body.lastname,
        phone: body.phone,
        email: body.email
    });

    customer.save((err: any, customerDB: any) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            customer: customerDB
        });
    });
});

/**
 * @description Method to get all customer.
 * @author jsCespedesg
 * @version 1.0.0
 */
CCustomer.get( '/customer', ( req: Request, res: Response ) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 15;
    limit = Number(limit);

    Customer.find({state: true})
            .skip(from)
            .limit(limit)
            .exec((err, customer) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Customer.countDocuments({state: true}, (err, count) => {
                    res.json({
                        ok: true,
                        customer,
                        howMany: count
                    });
                });
            });
});

/**
 * @description Method to customer by id.
 * @author jsCespedesg
 * @version 1.0.0
 */
CCustomer.get( '/customer/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error customer doesn't exist"});
    }

        Customer.findById(id, (err: any, customer: any) => {

            if(err) {return res.status(500).json({message: 'Error returning data'});}

            if(! customer ) return res.status(404).json({message: "Error customer doesn't exist"});

            return res.status(200).json({
                ok: true,
                customer
            });

        });
});

/**
 * @description Method that updates the attributes of a customer.
 * @author jsCespedesg
 * @version 1.0.0
 */
CCustomer.put( '/customer/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    let body =_.pick( req.body, ['firstname', 'lastname', 'phone', 'email', 'state']);

    Customer.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, customerDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! customerDB) return res.status(404).json({message: "Error customer doesn't exist"});

        res.json({
            ok: true,
            customer: customerDB
        });
    });
});

/**
 * @description Method that delete a customer.
 * @author jsCespedesg
 * @version 1.0.0
 */
CCustomer.delete( '/customer/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };
    Customer.findByIdAndUpdate( id, changeState, {new: true}, (err, customerDelete) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if(customerDelete === null){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'customer not found'
                    }
                });
            }
            res.json({
                ok: true,
                customer: customerDelete
            });
    });
});

export default CCustomer;