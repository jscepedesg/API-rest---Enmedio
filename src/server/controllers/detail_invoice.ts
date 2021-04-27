import { Router, Request, Response } from 'express';
import _ = require('underscore');
import DetailInvoice from '../models/detail_invoice';
import Inventory from '../models/inventory';
const CDetailInvoice = Router();

/**
 * @description Method for creating detail_invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CDetailInvoice.post( '/detail_invoice', ( req: Request, res: Response ) => {
    let body = req.body;

    let detail_invoice = new DetailInvoice({
        article_id: body.article_id,
        invoice_id: body.invoice_id,
        quantity: body.quantity
    });

    detail_invoice.save((err: any, detailInvoiceDB: any) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Inventory.find({article_id: body.article_id})
        .exec((err, articleInventary: any) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Inventory.findOneAndUpdate({article_id: body.article_id}, {quantity: (articleInventary[0].quantity - body.quantity)}
                , {upsert: true}, (err, doc: any) => {
                    if (err) {
                        return res.status(500).send({
                            success: false,
                            message: "Internal Server Error. Update inventory"
                        });
                    };
                    
                    if (doc === []) {
                        return res.status(404).send({
                            success: false,
                            message: 'Article Not Found.'
                        });
                    };

                    res.json({
                        ok: true,
                        detail_invoice: detailInvoiceDB
                    });
            });
        });
    });
});

/**
 * @description Method to get all detail_invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CDetailInvoice.get( '/detail_invoice', ( req: Request, res: Response ) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 15;
    limit = Number(limit);

    DetailInvoice.find({state: true})
            .skip(from)
            .limit(limit)
            .populate('article_id', 'name')
            .exec((err, detail_invoice) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                DetailInvoice.countDocuments({state: true}, (err, count) => {
                    res.json({
                        ok: true,
                        detail_invoice,
                        howMany: count
                    });
                });
            });
});

/**
 * @description Method to detail_invoice by id.
 * @author jsCespedesg
 * @version 1.0.0
 */
CDetailInvoice.get( '/detail_invoice/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error detail_invoice doesn't exist"});
    }

        DetailInvoice.findById(id, (err: any, detail_invoice: any) => {

            if(err) {return res.status(500).json({message: 'Error returning data'});}

            if(! detail_invoice ) return res.status(404).json({message: "Error detail_invoice doesn't exist"});

            return res.status(200).json({
                ok: true,
                detail_invoice
            });

        });
});

/**
 * @description Method that updates the attributes of a detail_invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CDetailInvoice.put( '/detail_invoice/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    let body =_.pick( req.body, ['article_id', 'invoice_id', 'quantity', 'state']);

    DetailInvoice.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, detailInvoiceDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! detailInvoiceDB) return res.status(404).json({message: "Error detail_invoice doesn't exist"});

        res.json({
            ok: true,
            detail_invoice: detailInvoiceDB
        });
    });
});

/**
 * @description Method that delete a detail_invoice.
 * @author jsCespedesg
 * @version 1.0.0
 */
CDetailInvoice.delete( '/detail_invoice/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };
    DetailInvoice.findByIdAndUpdate( id, changeState, {new: true}, (err, detailInvoiceDelete) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if(detailInvoiceDelete === null){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'detail_invoice not found'
                    }
                });
            }
            res.json({
                ok: true,
                detail_invoice: detailInvoiceDelete
            });
    });
});


/**
 * @description Method to get result Sales.
 * @author sCespedes
 * @version 1.0.0
 */
 CDetailInvoice.get('/total_sales', ( req: Request, res: Response ) => {
    DetailInvoice.aggregate([
        {
            $group: {_id: '$article_id', "saleByArticle": {$sum: "$quantity"}}
        }
    ])
    .exec((err, sales) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        res.status(200).json({
            ok: true,
            sales
        });
    });
});


/**
 * @description Method to get result Sales.
 * @author sCespedes
 * @version 1.0.0
 */
 CDetailInvoice.get('/customer_buy_most', ( req: Request, res: Response ) => {
    DetailInvoice.aggregate([
        {
            $match:{"invoice_id":{"$exists":true}}
        },
        {
            $group: {_id: '$invoice_id', "quantity": {$sum: "$quantity"}}
        },
        {
            $lookup: {from: 'invoices', localField: 'invoice_id', foreignField: '_id', as: 'invoice'}
        },
        // {
        //     $unwind: "$invoice"
        // },
        // {
        //     $project: {
        //         _id: 1,
        //         customer_id: "$invoice.customer_id",
        //         total: "$saleByArticle"
        //     }
        // }
    ])
    .sort({"saleByArticle": -1})
    .exec((err, sales) => {

        if(err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        
        res.status(200).json({
            ok: true,
            sales
        });
    });
});
export default CDetailInvoice;