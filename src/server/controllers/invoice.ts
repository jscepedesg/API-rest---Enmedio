import { Router, Request, Response } from 'express';
import _ = require('underscore');
import Invoice from '../models/invoice';
const CInvoice = Router();

/**
 * @description Method for creating invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInvoice.post( '/invoice', ( req: Request, res: Response ) => {
    let body = req.body;

    let invoice = new Invoice({
        customer_id: body.customer_id,
        date: body.date
    });

    invoice.save((err: any, invoiceDB: any) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            invoice: invoiceDB
        });
    });
});

/**
 * @description Method to get all invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInvoice.get( '/invoice', ( req: Request, res: Response ) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 15;
    limit = Number(limit);

    Invoice.find({state: true})
            .skip(from)
            .limit(limit)
            .exec((err, invoice) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Invoice.countDocuments({state: true}, (err, count) => {
                    res.json({
                        ok: true,
                        invoice,
                        howMany: count
                    });
                });
            });
});

/**
 * @description Method to invoice by id.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInvoice.get( '/invoice/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error invoice doesn't exist"});
    }

        Invoice.findById(id, (err: any, invoice: any) => {

            if(err) {return res.status(500).json({message: 'Error returning data'});}

            if(! invoice ) return res.status(404).json({message: "Error invoice doesn't exist"});

            return res.status(200).json({
                ok: true,
                invoice
            });

        });
});

/**
 * @description Method that updates the attributes of a invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInvoice.put( '/invoice/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    let body =_.pick( req.body, ['customer_id', 'date', 'state']);

    Invoice.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, invoiceDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! invoiceDB) return res.status(404).json({message: "Error invoice doesn't exist"});

        res.json({
            ok: true,
            invoice: invoiceDB
        });
    });
});

/**
 * @description Method that delete a invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CInvoice.delete( '/invoice/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };
    Invoice.findByIdAndUpdate( id, changeState, {new: true}, (err, invoiceDelete) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if(invoiceDelete === null){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'invoice not found'
                    }
                });
            }
            res.json({
                ok: true,
                invoice: invoiceDelete
            });
    });
});

export default CInvoice;